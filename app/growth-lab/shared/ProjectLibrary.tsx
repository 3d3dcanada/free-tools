import { useState } from "react";
import { download } from "./browser";
import Dialog from "./Dialog";
import { ToolSlot } from "./chrome";
import { useLocale, useT } from "./locale";
import { changeLibrary, checkRevision, isLibrary, projectKey, projectName, readLibrary, type Project } from "./projects";

export default function ProjectLibrary<T>({ value, valid, onLoad, name, label = "Projects & Backups", defaultName }: {
  value: T; valid: (v: unknown) => v is T; onLoad: (v: T) => void; name: string; label?: string; defaultName?: string;
}) {
  const tr = useT(), locale = useLocale();
  const [open, setOpen] = useState(false), [title, setTitle] = useState(defaultName?.slice(0, 100) || name);
  const [projects, setProjects] = useState<Project<T>[]>([]), [message, setMessage] = useState("");
  const [broken, setBroken] = useState(false);
  const run = (action: () => void) => { try { action(); } catch (e) { setMessage((e as Error).message); } };
  const refresh = () => {
    setMessage(""); setBroken(false);
    try { setProjects(readLibrary(localStorage, name, valid).projects); }
    catch (e) { setBroken(true); setProjects([]); setMessage((e as Error).message); }
  };
  const update = (change: (p: Project<T>[]) => Project<T>[]) => {
    setProjects(changeLibrary(localStorage, name, valid, change).projects);
    setMessage("Saved on this device");
  };
  const snapshot = (): Project<T> => ({ id: crypto.randomUUID(), name: projectName(title), updated: new Date().toISOString(), value });
  const load = (next: T) => {
    if (!window.confirm(tr("Open this project? Your current work will be saved as a recovery copy first."))) return;
    try {
      update(p => [...p, { ...snapshot(), name: projectName(title).slice(0, 65) + " · " + tr("Recovery copy") }]);
    } catch (e) {
      setMessage((e as Error).message);
      if (!window.confirm(tr("A recovery copy could not be saved. Open anyway? Download your current draft first if you need to keep it."))) return;
    }
    onLoad(next); setOpen(false);
  };
  return <>
    <ToolSlot name="menu">
      <button type="button" onClick={() => { refresh(); if (defaultName?.trim()) setTitle(defaultName.slice(0, 100)); setOpen(true); }} aria-haspopup="dialog">{tr(label)}</button>
    </ToolSlot>
    <Dialog open={open} onClose={() => setOpen(false)} title={tr(label)} className="growth-lab library-layer">
      <section className="library-panel">
        <header><div><h2>{tr(label)}</h2><p className="fine">{tr("Saved only in this browser. Download backups to move devices or keep a permanent copy.")}</p></div>
          <button type="button" onClick={() => setOpen(false)} aria-label={tr("Close")}>×</button></header>
        <div className="library-body">
          <label>{tr("Project name")}<input value={title} maxLength={100} onChange={e => setTitle(e.target.value)} /></label>
          <div className="library-actions">
            <button type="button" disabled={broken || !valid(value)} onClick={() => run(() => update(p => [...p, snapshot()]))}>{tr("Save New Copy")}</button>
            <button type="button" onClick={() => run(() => download(`${projectName(title)}.json`, JSON.stringify(value, null, 2), "application/json"))}>{tr("Download Current Draft")}</button>
            <button type="button" disabled={broken || !projects.length} onClick={() => run(() => {
              const current = readLibrary(localStorage, name, valid);
              download(`${name}-projects.json`, JSON.stringify(current, null, 2), "application/json");
            })}>{tr("Back Up All Projects")}</button>
          </div>
          <label>{tr("Import Draft or Project Backup")}<input type="file" accept=".json,application/json" onChange={async e => {
            const file = e.target.files?.[0]; e.target.value = ""; if (!file) return;
            try {
              if (file.size > 60_000_000) throw new Error("Draft must be smaller than 60 MB.");
              const parsed: unknown = JSON.parse(await file.text());
              if (isLibrary(parsed, name, valid)) {
                update(p => [...p, ...parsed.projects.map(item => ({ ...item, id: crypto.randomUUID() }))]);
              } else if (valid(parsed)) load(parsed);
              else throw new Error("This file is not a valid draft for this tool.");
            } catch (error) { setMessage(error instanceof SyntaxError ? "This file is not a valid draft for this tool." : (error as Error).message); }
          }} /></label>
          <p className="fine" role="status">{tr(message)}</p>
          {broken ? <div className="library-actions">
            <button type="button" onClick={() => run(() => download(`${name}-recovery.txt`, localStorage.getItem(projectKey(name)) ?? "", "text/plain"))}>{tr("Download Original Data")}</button>
            <button type="button" onClick={() => run(() => {
              if (!window.confirm(tr("Reset this unreadable library? Download its original data first. This cannot be undone."))) return;
              localStorage.removeItem(projectKey(name)); refresh();
            })}>{tr("Reset Local Library")}</button>
          </div> : <>
            <h3>{tr("Recent Projects")} <span className="fine">{projects.length}/30</span></h3>
            {!projects.length && <p className="fine">{tr("No saved projects yet. Name your work and save a copy above.")}</p>}
            <ul className="project-list">{[...projects].sort((a, b) => b.updated.localeCompare(a.updated)).map(p => <li key={p.id}>
              <div><strong>{p.name}</strong><time dateTime={p.updated}>{new Date(p.updated).toLocaleString(locale === "fr" ? "fr-CA" : "en-CA")}</time></div>
              <div className="library-actions">
                <button type="button" aria-label={`${tr("Open")}: ${p.name}`} onClick={() => run(() => load(p.value))}>{tr("Open")}</button>
                <button type="button" aria-label={`${tr("Duplicate")}: ${p.name}`} onClick={() => run(() => update(list => {
                  checkRevision(list, p);
                  return [...list, { ...p, id: crypto.randomUUID(), name: `${p.name.slice(0, 75)} · ${tr("New Copy")}`, updated: new Date().toISOString() }];
                }))}>{tr("Duplicate")}</button>
                <button type="button" aria-label={`${tr("Rename")}: ${p.name}`} onClick={() => run(() => {
                  const next = window.prompt(tr("Project name"), p.name); if (next === null) return;
                  update(list => { checkRevision(list, p); return list.map(x => x.id === p.id ? { ...x, name: projectName(next) } : x); });
                })}>{tr("Rename")}</button>
                <button type="button" aria-label={`${tr("Replace")}: ${p.name}`} disabled={!valid(value)} onClick={() => run(() => {
                  if (!window.confirm(`${p.name}\n${tr("Replace this saved project with your current work?")}`)) return;
                  update(list => { checkRevision(list, p); return list.map(x => x.id === p.id ? { ...x, value, updated: new Date().toISOString() } : x); });
                })}>{tr("Replace")}</button>
                <button type="button" aria-label={`${tr("Delete")}: ${p.name}`} onClick={() => run(() => {
                  if (!window.confirm(`${p.name}\n${tr("Delete this saved project? Download a backup first. This cannot be undone.")}`)) return;
                  update(list => { checkRevision(list, p); return list.filter(x => x.id !== p.id); });
                })}>{tr("Delete")}</button>
              </div>
            </li>)}</ul>
          </>}
        </div>
      </section>
    </Dialog>
  </>;
}
