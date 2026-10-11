import { useT, useLocale, useLocalLink } from "../../shared/locale";
import { lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { download } from "../../shared/browser";
import { DraftFiles, ExportBar, History, useEditor } from "../../shared/kit";
import ProjectLibrary from "../../shared/ProjectLibrary";
import { isPrinterProfile, type PrinterProfile } from "./profiles";
import { AddFiles, Icon, PresetRows, Segmented, useElementSize, useFileDrop } from "../../shared/workspace";
import { ToolIcon } from "../../shared/toolIcons";
import { modelScales, useModel } from "./ModelViewer";
import {
  convert,
  defaults,
  filament,
  fit,
  fitSource,
  guideSource,
  layers,
  measure,
  number,
  printCost,
  printerFit,
  printers,
  units,
  validSettings,
  type PrintingMode,
  type Settings,
  type System,
} from "./model";
import type { ViewApi, ViewName } from "./Viewport";
const Viewport = lazy(() => import("./Viewport"));

type Tab = "model" | Exclude<PrintingMode, "model-viewer">;
const tabs: [Tab, string][] = [
  ["model", "Model"],
  ["print-cost-calculator", "Cost"],
  ["filament-calculator", "Filament"],
  ["nozzle-layer-guide", "Layers"],
  ["tolerance-calculator", "Fit"],
  ["unit-converter", "Units"],
];
const inputTips: Record<Tab, string> = {
  model: "Choose a model, confirm its units, then pick your printer. Open Measurements for dimensions, mesh checks and downloadable reports.",
  "print-cost-calculator": "Start with material price and print time. Advanced geometry and machine costs refine an estimate; they do not replace your slicer or measured usage.",
  "filament-calculator": "Choose length or weight, then enter your filament diameter, density and price. Use the spool maker’s density when available.",
  "nozzle-layer-guide": "Match the nozzle fitted to your printer. Compare example layer heights, then check the actual slicer profile before printing.",
  "tolerance-calculator": "Clearance is the difference between hole and shaft diameters. Enter uncertainty from a measured test print; the drawing exaggerates the gap.",
  "unit-converter": "Choose a quantity and compatible units. Results update as you type; changing units does not change an imported model’s scale.",
};
// Camera names keep their own French: the shared "Front" means a card's recto.
const views: [ViewName, string, string][] = [
  ["iso", "3D", "3D"],
  ["top", "Top", "Dessus"],
  ["front", "Front", "Face"],
  ["side", "Side", "Côté"],
];
/** The 3D printing family's neon (ToolPage), used for the plate edge and the part's box. */
const accent = "#FF6A00";
const custom = printers.length - 1;
const categoryNames: Record<string, string> = { length: "Length", volume: "Volume", mass: "Mass", time: "Time" };
const decimal = /^(?:\d+(?:\.\d*)?|\.\d+)$/,
  signedDecimal = /^-?(?:\d+(?:\.\d*)?|\.\d+)$/;
function attempt<T>(run: () => T): [T | null, string] {
  try {
    return [run(), ""];
  } catch (e) {
    return [null, (e as Error).message];
  }
}

/** A typed value stored in one unit and shown in another (mm as inches, m as feet). */
function UnitField({
  label,
  value,
  onChange,
  factor,
  unit,
  signed = false,
}: {
  label: string;
  value: string;
  onChange: (stored: string) => void;
  factor: number;
  unit: string;
  signed?: boolean;
}) {
  const [draft, setDraft] = useState<string | null>(null);
  const pattern = signed ? signedDecimal : decimal;
  const shown =
    draft ?? (factor !== 1 && pattern.test(value.trim()) ? String(+(Number(value) / factor).toFixed(4)) : value);
  return (
    <label>
      {label} <span className="ws-unit">({unit})</span>
      <input
        inputMode="decimal"
        value={shown}
        onFocus={() => setDraft(shown)}
        onBlur={() => setDraft(null)}
        onChange={(e) => {
          const text = e.target.value;
          setDraft(text);
          onChange(factor !== 1 && pattern.test(text.trim()) ? String(+(Number(text) * factor).toFixed(6)) : text);
        }}
      />
    </label>
  );
}

/** Shaft in hole, gap drawn larger than life so it can be seen. */
function FitDrawing({ clearance, label }: { clearance: number; label: [string, string] }) {
  const gap = Math.max(-9, Math.min(9, clearance * 30));
  const shaft = 52,
    hole = shaft + gap;
  return (
    <svg className="pw-drawing" viewBox="0 0 260 150" role="img" aria-label={label.join(", ")}>
      <rect x="20" y="15" width="120" height="120" rx="10" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.25)" />
      <circle cx="80" cy="75" r={hole} fill="#0e1213" stroke="#FF6A00" strokeWidth="2" />
      <circle cx="80" cy="75" r={shaft} fill={gap < 0 ? "rgba(255,45,146,0.55)" : "rgba(232,228,220,0.9)"} />
      {gap < 0 && <circle cx="80" cy="75" r={hole} fill="none" stroke="#ff2d92" strokeWidth="2" strokeDasharray="4 3" />}
      <text x="160" y="62" fill="#FF6A00" fontSize="12" fontFamily="Geist Mono Variable, monospace">{label[0]}</text>
      <text x="160" y="92" fill="#e8e4dc" fontSize="12" fontFamily="Geist Mono Variable, monospace">{label[1]}</text>
    </svg>
  );
}

/** Four printed lines in section: the nozzle sets the width, the layer the height. */
function LayerDrawing({ ratio }: { ratio: number }) {
  const width = 150,
    height = Math.max(6, Math.min(width, width * ratio));
  const ok = ratio < 0.8;
  return (
    <svg className="pw-drawing" viewBox="0 0 260 150" role="img" aria-hidden="true">
      <path d={`M${130 - 34} 4 L${130 + 34} 4 L${130 + width / 2 - 52} 38 L${130 - width / 2 + 52} 38 Z`} fill="rgba(255,255,255,0.18)" />
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          x={130 - width / 2}
          y={146 - (i + 1) * Math.min(height, 26) - i * 2}
          width={width}
          height={Math.min(height, 26)}
          rx={Math.min(height, 26) / 2}
          fill={ok ? (i === 3 ? "#FF6A00" : "rgba(232,228,220,0.85)") : "#ff2d92"}
          opacity={i === 3 ? 1 : 0.55 + i * 0.12}
        />
      ))}
    </svg>
  );
}

export default function PrintingTools({ mode }: { mode: PrintingMode }) {
  const tr = useT(),
    locale = useLocale(),
    link = useLocalLink();
  const fr = locale === "fr";
  const editor = useEditor(`3d3d-${mode}-v1`, defaults, validSettings),
    s = editor.value;
  const patch = (next: Partial<Settings>) => editor.setValue({ ...s, ...next });
  const [tab, setTab] = useState<Tab>(mode === "model-viewer" ? "model" : mode);
  const [system, setSystem] = useState<System>("metric");
  const [printer, setPrinter] = useState(0);
  const [own, setOwn] = useState(["220", "220", "250"]);
  const [ownName, setOwnName] = useState(tr("My Printer"));
  const [margin, setMargin] = useState("5");
  const [linked, setLinked] = useState(true);
  const [reportOpen, setReportOpen] = useState(mode !== "model-viewer");
  const [colour, setColour] = useState("#e8e4dc");
  const [section, setSection] = useState(100);
  const [fullscreen, setFullscreen] = useState(false);
  const [viewError, setViewError] = useState("");
  const workspaceRef = useRef<HTMLElement>(null);
  useEffect(() => {
    const changed = () => setFullscreen(document.fullscreenElement === workspaceRef.current);
    document.addEventListener("fullscreenchange", changed);
    return () => document.removeEventListener("fullscreenchange", changed);
  }, []);
  const m = useModel();
  const api = useRef<ViewApi | null>(null);
  const stageRef = useRef<HTMLDivElement>(null),
    cardRef = useRef<HTMLElement>(null);
  const stageSize = useElementSize(stageRef),
    cardSize = useElementSize(cardRef);
  // Side card on a wide stage, bottom sheet on a phone: tell the viewer which edge it covers.
  const cover: [number, number, number] =
    !cardSize.width || !stageSize.width
      ? [0, 0, 0]
      : cardSize.width < stageSize.width * 0.6
        ? [Math.round(cardSize.width + 60), 0, 0]
        : [0, Math.round(cardSize.height + 40), 64];
  const drop = useFileDrop(([file]) => void m.load(file));
  const u = measure(locale, system);
  const imperial = system === "imperial";
  const inch = imperial ? 25.4 : 1;
  const n = (value: number, digits = 2) => u.n(value, digits);
  const money = (value: number) => `${s.currency} ${u.n(value, 2, 2)}`;
  const r = m.report;
  const volume = r?.volumeMm3 ?? null;
  const fromModel = linked && volume !== null;
  const modelNumbers = (base: Settings): Settings =>
    volume === null || !r
      ? base
      : { ...base, volume: (volume / 1000).toFixed(6), area: (r.surfaceMm2 / 100).toFixed(6) };

  const [ownBed, bedError] =
    printer === custom ? attempt(() => own.map((v, i) => number(v, `build axis ${i + 1}`, 1, 10000))) : [null, ""];
  const bed = ownBed ?? printers[printer].size;
  const printerName = printer === custom ? ownName : printers[printer].name;
  const profile: PrinterProfile = { version: 1, name: printerName, bed: printer === custom ? own : bed.map(String), margin, settings: s };
  const [placement, placementError] = r
    ? attempt(() => printerFit(r.dimensions, bed, number(margin, "edge margin", 0, 100)))
    : [null, ""];
  const [cost, costError] = attempt(() => printCost(fromModel ? modelNumbers(s) : s));
  const [spool, spoolError] = attempt(() => filament(s));
  const [modelCost] = volume !== null ? attempt(() => printCost(modelNumbers(s))) : [null];
  const [modelSpool] = modelCost
    ? attempt(() => filament({ ...s, filamentMode: "weight", grams: modelCost.grams.toFixed(3) }))
    : [null];
  const [layer, layerError] = attempt(() => layers(s));
  const [fitting, fitError] = attempt(() => fit(s));
  const [conversion, conversionError] = attempt(() => convert(s));
  const dims = r ? (r.dimensions.map((d) => u.length(d)) as [string, string, string]) : null;
  const bedText = (size: number[]) =>
    `${size.map((v) => u.lengthNumber(v, imperial ? 1 : 0)).join(" × ")} ${u.lengthUnit}`;
  const placementText = placement
    ? placement.current
      ? tr("Bounding box fits in this orientation.")
      : placement.rotation
        ? `${tr("Could fit after a 90° axis rotation:")} ${placement.rotation.map((v) => u.lengthNumber(v)).join(" × ")} ${u.lengthUnit}.`
        : tr("Bounding box does not fit any of the six axis-aligned orientations.")
    : "";
  const field = (key: keyof Settings, label: string) => (
    <label key={key}>
      {tr(label)}
      <input aria-label={tr(label)} inputMode="decimal" value={s[key]} onChange={(e) => patch({ [key]: e.target.value })} />
    </label>
  );
  const length = (key: keyof Settings, label: string, signed = false) => (
    <UnitField
      key={key}
      label={tr(label)}
      value={s[key]}
      factor={inch}
      unit={u.lengthUnit}
      signed={signed}
      onChange={(stored) => patch({ [key]: stored })}
    />
  );
  const toggle = (
    <Segmented
      label={tr("Units")}
      className="pw-units"
      value={system}
      options={[
        ["metric", "mm"],
        ["imperial", fr ? "po" : "in"],
      ]}
      onChange={setSystem}
    />
  );
  const currency = (
    <Segmented
      label={tr("Cost Currency")}
      value={s.currency}
      options={["CAD", "USD", "EUR", "GBP"].map((c) => [c, c] as [string, string])}
      onChange={(c) => patch({ currency: c })}
    />
  );
  const calculation = (tool: string, result: unknown) => (
    <ExportBar
      actions={{
        "Download Calculation": () =>
          download(
            `${tool}.json`,
            JSON.stringify(
              {
                tool,
                inputs: s,
                model: tool === "print-cost-calculator" && fromModel ? m.model?.name : undefined,
                result,
                notice: "Planning calculation only; verify in a slicer or with a physical test.",
              },
              null,
              2,
            ),
            "application/json",
          ),
      }}
    />
  );
  const problem = (message: string) => (
    <p role="alert" className="pw-alert">
      {tr(message)}
    </p>
  );

  // The large result for the open tab. The same numbers also head the panel on a phone.
  const results: Record<Tab, { eyebrow: string; big: ReactNode; body: ReactNode; units?: boolean }> = {
    model: {
      eyebrow: "Measurements",
      units: true,
      big: r ? (
        <span className="pw-axes">
          {(["X", "Y", "Z"] as const).map((axis, i) => (
            <span key={axis}>
              <b>{axis}</b>
              {u.lengthNumber(r.dimensions[i])}
            </span>
          ))}
          <em>{u.lengthUnit}</em>
        </span>
      ) : (
        ""
      ),
      body: r ? (
        <>
          <dl className="pw-rows">
            <dt>{tr("Enclosed volume")}</dt>
            <dd>{volume === null ? tr("Unavailable: topology or multiple shells") : u.volume(volume)}</dd>
            <dt>{tr("Surface area")}</dt>
            <dd>{u.area(r.surfaceMm2)}</dd>
            <dt>{tr("Triangles")}</dt>
            <dd>{r.triangles.toLocaleString(fr ? "fr-CA" : "en-CA")}</dd>
            <dt>{tr("Topology")}</dt>
            <dd>{r.closed ? tr("Closed, consistent edge and vertex topology") : tr("Mesh warnings found")}</dd>
          </dl>
          {placement && (
            <p className="pw-verdict" data-state={placement.current ? "ok" : placement.rotation ? "turn" : "no"}>
              {printerName}: {placementText}
            </p>
          )}
          {placementError && problem(placementError)}
          {r.warnings.length > 0 && (
            <ul className="pw-warnings">
              {r.warnings.map((w) => (
                <li key={w}>{tr(w)}</li>
              ))}
            </ul>
          )}
          <ExportBar
            actions={{
              "Download Measurement Report": () =>
                download(
                  "model-measurements.json",
                  JSON.stringify(
                    {
                      file: m.model!.name,
                      unit: "mm",
                      sourceUnits: m.model!.nativeUnits,
                      printer: { name: printerName, buildVolumeMm: bed, edgeMarginMm: margin },
                      fit: placement,
                      ...r,
                      limitations: "No self-intersection, boolean union, support or physical print verification.",
                    },
                    null,
                    2,
                  ),
                  "application/json",
                ),
              "Download View PNG": () => {
                if (!api.current) throw new Error("Wait for the 3D view, or use the measurement report.");
                const a = document.createElement("a");
                a.download = "model-view.png";
                a.href = api.current.capture();
                a.click();
              },
            }}
          />
        </>
      ) : (
        <p className="pw-note">{tr("Open a model to measure it and check it against the bed.")}</p>
      ),
    },
    "print-cost-calculator": {
      eyebrow: "Estimate for your own print",
      units: true,
      big: cost ? money(cost.total) : "",
      body: cost ? (
        <>
          <div className="pw-split" aria-hidden="true">
            <i style={{ flexGrow: cost.material, background: "#04D9C4" }} />
            <i style={{ flexGrow: cost.electricity, background: "#FF6A00" }} />
            <i style={{ flexGrow: cost.wear, background: "#FF2D92" }} />
          </div>
          <dl className="pw-rows">
            <dt>
              <i style={{ background: "#04D9C4" }} />
              {tr("Filament cost")}
            </dt>
            <dd>{money(cost.material)}</dd>
            <dt>
              <i style={{ background: "#FF6A00" }} />
              {tr("Electricity")}
            </dt>
            <dd>
              {money(cost.electricity)} · {n(cost.energyKwh, 3)} {tr("kWh")}
            </dd>
            <dt>
              <i style={{ background: "#FF2D92" }} />
              {tr("Machine allowance")}
            </dt>
            <dd>{money(cost.wear)}</dd>
            <dt>{tr("Estimated material")}</dt>
            <dd>{u.mass(cost.grams)}</dd>
          </dl>
          <p className="pw-note">
            {fromModel && volume !== null && r
              ? `${tr("From your model:")} ${u.volume(volume)} · ${u.area(r.surfaceMm2)}`
              : tr("Volume and area typed by hand.")}{" "}
            {tr("This rough estimate excludes labour, tax, delivery and profit. It is not a 3D3D price. A slicer's material and time forecast is more specific to the actual toolpaths.")}
          </p>
          {calculation("print-cost-calculator", cost)}
        </>
      ) : (
        problem(costError)
      ),
    },
    "filament-calculator": {
      eyebrow: "Filament, without the spool",
      units: true,
      big: spool ? u.mass(spool.grams) : "",
      body: spool ? (
        <>
          <dl className="pw-rows">
            <dt>{tr("Length")}</dt>
            <dd>{u.long(spool.metres)}</dd>
            <dt>{tr("Material cost")}</dt>
            <dd>{money(spool.cost)}</dd>
          </dl>
          {modelCost && modelSpool ? (
            <p className="pw-verdict" data-state="ok">
              {tr("Your model, at the shell and infill on the Cost tab:")} {u.mass(modelCost.grams)} ·{" "}
              {u.long(modelSpool.metres)} · {money(modelSpool.cost)}
            </p>
          ) : (
            <p className="pw-note">{tr("Open a model to see how much filament it needs.")}</p>
          )}
          {calculation("filament-calculator", spool)}
        </>
      ) : (
        problem(spoolError)
      ),
    },
    "nozzle-layer-guide": {
      eyebrow: "Layer-to-nozzle ratio",
      units: true,
      big: layer ? `${n(layer.ratio * 100, 1)}%` : "",
      body: layer ? (
        <>
          <LayerDrawing ratio={layer.ratio} />
          <p className="pw-verdict" data-state={layer.belowBoundary ? "ok" : "no"}>
            {layer.belowBoundary
              ? tr("Below the general 80% boundary. Confirm your printer profile.")
              : tr("At or above the general 80% boundary. Reduce layer height or choose an appropriate larger nozzle.")}
          </p>
          <dl className="pw-rows">
            <dt>{tr("Fine example")}</dt>
            <dd>{u.length(layer.fineExample, imperial ? 4 : 2)}</dd>
            <dt>{tr("Balanced example")}</dt>
            <dd>{u.length(layer.balancedExample, imperial ? 4 : 2)}</dd>
            <dt>{tr("Coarse example")}</dt>
            <dd>{u.length(layer.coarseExample, imperial ? 4 : 2)}</dd>
            {r && (
              <>
                <dt>{tr("Layers for your model")}</dt>
                <dd>
                  {Math.ceil(r.dimensions[2] / layer.layer - 1e-9).toLocaleString(fr ? "fr-CA" : "en-CA")} ·{" "}
                  {u.length(r.dimensions[2])}
                </dd>
              </>
            )}
          </dl>
          {calculation("nozzle-layer-guide", layer)}
        </>
      ) : (
        problem(layerError)
      ),
    },
    "tolerance-calculator": {
      eyebrow: "Nominal hole diameter",
      units: true,
      big: fitting ? u.length(fitting.hole, imperial ? 4 : 2) : "",
      body: fitting ? (
        <>
          <FitDrawing
            clearance={fitting.clearance}
            label={[`${tr("Hole")} Ø ${u.length(fitting.hole, imperial ? 4 : 2)}`, `${tr("Shaft")} Ø ${u.length(fitting.shaft, imperial ? 4 : 2)}`]}
          />
          <dl className="pw-rows">
            <dt>{tr("Radial gap")}</dt>
            <dd>{u.length(fitting.radialGap, imperial ? 4 : 3)}</dd>
            <dt>{tr("Worst-case diametral range")}</dt>
            <dd>
              {u.length(fitting.minimumClearance, imperial ? 4 : 3)} {tr("to")} {u.length(fitting.maximumClearance, imperial ? 4 : 3)}
            </dd>
          </dl>
          <p className="pw-verdict" data-state={fitting.minimumClearance < 0 ? "turn" : "ok"}>
            {fitting.minimumClearance < 0
              ? tr("Your uncertainty allows interference. Test the pair before relying on a sliding fit.")
              : tr("The entered uncertainty leaves no negative clearance in this diameter-only model.")}{" "}
            {tr("Shape error, surface ridges, thermal changes and insertion length still matter.")}
          </p>
          {calculation("tolerance-calculator", fitting)}
        </>
      ) : (
        problem(fitError)
      ),
    },
    "unit-converter": {
      eyebrow: `${s.amount} ${tr(s.from)} ${tr("equals")}`,
      big: conversion ? `${u.n(conversion.value, 9)} ${tr(s.to)}` : "",
      body: conversion ? (
        <>
          <p className="pw-note">
            {tr(
              "Exports retain the full JavaScript numeric precision; the display rounds to nine decimal places. US customary inch, foot, ounce and pound definitions are used.",
            )}
          </p>
          {calculation("unit-converter", conversion)}
        </>
      ) : (
        problem(conversionError)
      ),
    },
  };
  const shown = results[tab];

  const modelCard = (
    <>
      <p className="panel-label">{tr("Model")}</p>
      {m.model && r ? (
        <div className="pw-file">
          <Icon name="box" />
          <span>
            <strong>{m.model.name}</strong>
            <small>
              {r.triangles.toLocaleString(fr ? "fr-CA" : "en-CA")} {tr("triangles")} ·{" "}
              {volume === null ? tr("Mesh warnings found") : u.volume(volume)}
            </small>
          </span>
          <button type="button" aria-label={tr("Close the model")} onClick={m.clear}>
            <Icon name="close" />
          </button>
        </div>
      ) : (
        <p className="fine">{tr("Drop a model or open the sample cube.")}</p>
      )}
      <div className="ws-files">
        <AddFiles
          label={tr(m.model ? "Open Another Model" : "Open 3D Model")}
          accept=".stl,.obj,.3mf"
          primary={!m.model}
          onFiles={([file]) => void m.load(file)}
        />
        <button type="button" className="ws-quiet" disabled={m.busy} onClick={m.sample}>
          {tr("View Sample Cube")}
        </button>
      </div>
      {m.busy && <p role="status">{tr("Reading geometry and checking topology…")}</p>}
      {m.error && (
        <p role="alert" className="notice">
          {tr(m.error)}
        </p>
      )}
    </>
  );

  const panels: Record<Tab, ReactNode> = {
    model: (
      <>
        {modelCard}
        {m.model && !m.model.fixedUnits && (
          <>
            <p className="panel-label">{tr("File Units")}</p>
            <Segmented
              label={tr("Model Units")}
              value={m.unit}
              options={Object.keys(modelScales).map((v) => [v, v === "in" && fr ? "po" : v] as [string, string])}
              onChange={m.setUnit}
            />
          </>
        )}
        <p className="fine">
          {tr(
            "STL and OBJ do not define units. 3MF units and build transforms are read from the file. Geometry only: paint, textures, materials, slicer settings and beam lattices are not rendered. Limit: 20 MB and 150,000 triangles.",
          )}
        </p>
        <p className="panel-label">{tr("Printer")}</p>
        <PresetRows
          label={tr("Printer")}
          value={String(printer)}
          onPick={(id) => setPrinter(+id)}
          items={printers.map((p, i) => ({
            id: String(i),
            title: p.name,
            detail: i === custom ? "Type your own build volume." : p.name === "Bambu Lab H2D" ? "Single-nozzle printing volume." : "",
            meta: i === custom ? "" : bedText(p.size),
          }))}
        />
        {printer === custom && (
          <><label>{tr("Printer Name")}<input value={ownName} maxLength={100} onChange={e => setOwnName(e.target.value)} /></label><div className="field-grid pw-three">
            {own.map((v, i) => (
              <UnitField
                key={i}
                label={`${tr("Build")} ${"XYZ"[i]}`}
                value={v}
                factor={inch}
                unit={u.lengthUnit}
                onChange={(stored) => setOwn(own.map((x, j) => (i === j ? stored : x)))}
              />
            ))}
          </div></>
        )}
        {bedError && problem(bedError)}
        <UnitField label={tr("XY Edge Margin")} value={margin} factor={inch} unit={u.lengthUnit} onChange={setMargin} />
        {placement && (
          <p className="pw-verdict is-paper" data-state={placement.current ? "ok" : placement.rotation ? "turn" : "no"} role="status">
            {placementText}
          </p>
        )}
        <p className="fine">
          {tr(
            "This compares box dimensions, not brim, supports, toolhead clearance or excluded bed regions. Camera rotation does not reorient the part. Confirm placement in your slicer. Build volumes checked on each maker's page on 9 October 2026.",
          )}{" "}
          {printers[printer].source && <a href={printers[printer].source}>{tr("Manufacturer specifications")}</a>}
        </p>
      </>
    ),
    "print-cost-calculator": (
      <>
        <p className="panel-label">{tr("Model")}</p>
        {volume !== null && r ? (
          <div className="pw-link" data-on={fromModel || undefined}>
            <span>
              {tr(fromModel ? "Using your model's volume and area" : "Your model is open")}
              <b>
                {u.volume(volume)} · {u.area(r.surfaceMm2)}
              </b>
            </span>
            <button type="button" className="ws-quiet" onClick={() => setLinked(!linked)}>
              {tr(fromModel ? "Type My Own" : "Use the Model")}
            </button>
          </div>
        ) : (
          <p className="fine">
            {tr(r ? "This model has no measurable volume. Repair it, or type the numbers below." : "Open a model, on the Model tab or by dropping it on the stage, to use its volume and area.")}
          </p>
        )}
        {!fromModel && (
          <div className="field-grid">
            <UnitField label={tr("Model Volume")} value={s.volume} factor={imperial ? 16.387064 : 1} unit={imperial ? `${fr ? "po" : "in"}³` : "cm³"} onChange={(v) => patch({ volume: v })} />
            <UnitField label={tr("Model Surface Area")} value={s.area} factor={imperial ? 6.4516 : 1} unit={imperial ? `${fr ? "po" : "in"}²` : "cm²"} onChange={(v) => patch({ area: v })} />
          </div>
        )}
        <p className="panel-label">{tr("Material")}</p>
        <div className="field-grid">
          {length("wall", "Shell Thickness")}
          {field("infill", "Infill (%)")}
          {field("density", "Density (g/cm³)")}
          {field("waste", "Extra Material (%)")}
          {field("price", "Filament Price per kg")}
        </div>
        <p className="panel-label">{tr("Machine")}</p>
        <div className="field-grid">
          {field("hours", "Print Time (hours)")}
        </div>
        <details><summary>{tr("Advanced Machine Costs")}</summary>
        <div className="field-grid">
          {field("watts", "Average Printer Power (W)")}
          {field("kwh", "Electricity Price per kWh")}
          {field("wear", "Machine Cost per Hour")}
        </div>
        <p className="fine">{tr("These inputs contribute to the estimate even when this section is closed. Use measured power and your own machine costs.")}</p>
        </details>
        <p className="panel-label">{tr("Cost Currency")}</p>
        {currency}
        <p className="fine">
          {tr(
            "Example density 1.24 is only a starting input. Use your spool's data sheet. Shell thickness approximates walls plus top and bottom, with overlapping shell volume capped at the solid volume. Enter support, purge and failed-print allowances under extra material.",
          )}
        </p>
        <p className="fine">
          {tr(
            "Formula: shell = min(solid volume, surface area × thickness). Remaining volume × infill is added to shell, then multiplied by density and your extra-material allowance.",
          )}
        </p>
      </>
    ),
    "filament-calculator": (
      <>
        <p className="panel-label">{tr("Known Measurement")}</p>
        <Segmented
          label={tr("Known Measurement")}
          value={s.filamentMode}
          options={[
            ["length", tr("Length to weight")],
            ["weight", tr("Weight to length")],
          ]}
          onChange={(filamentMode) => patch({ filamentMode })}
        />
        <div className="field-grid">
          {s.filamentMode === "length" ? (
            <UnitField label={tr("Filament Length")} value={s.length} factor={imperial ? 0.3048 : 1} unit={imperial ? (fr ? "pi" : "ft") : "m"} onChange={(v) => patch({ length: v })} />
          ) : (
            <UnitField label={tr("Filament Weight")} value={s.grams} factor={imperial ? 28.349523125 : 1} unit={imperial ? "oz" : "g"} onChange={(v) => patch({ grams: v })} />
          )}
          {field("diameter", "Filament Diameter (mm)")}
          {field("density", "Density (g/cm³)")}
          {field("price", "Filament Price per kg")}
        </div>
        <p className="panel-label">{tr("Cost Currency")}</p>
        {currency}
        <p className="fine">
          {tr(
            "Use net filament weight without the spool. Filled, foaming and moisture-laden materials need measured density. A diameter error is squared in the volume calculation.",
          )}
        </p>
        <p className="fine">
          {tr(
            "Grams = length in metres × π × (diameter in millimetres ÷ 2)² × density in g/cm³. Cost = grams ÷ 1,000 × your kilogram price.",
          )}
        </p>
      </>
    ),
    "nozzle-layer-guide": (
      <>
        <p className="panel-label">{tr("Nozzle")}</p>
        <PresetRows
          label={tr("Nozzle")}
          value={s.nozzle}
          onPick={(nozzle) => patch({ nozzle })}
          items={[
            { id: "0.25", title: "0.25 mm", detail: "Finer lines for small detail.", meta: imperial ? u.length(0.25, 4) : "" },
            { id: "0.4", title: "0.4 mm", detail: "The usual default on desktop printers.", meta: imperial ? u.length(0.4, 4) : "" },
            { id: "0.6", title: "0.6 mm", detail: "Wider lines, fewer passes.", meta: imperial ? u.length(0.6, 4) : "" },
            { id: "0.8", title: "0.8 mm", detail: "Very wide lines for large parts.", meta: imperial ? u.length(0.8, 4) : "" },
          ]}
        />
        <div className="field-grid">
          {field("nozzle", "Nozzle Diameter (mm)")}
          {field("layer", "Layer Height (mm)")}
        </div>
        <p className="fine">
          {tr(
            "Prusa recommends layer height below 80% of nozzle diameter. The three examples here are 25%, 50% and 75%, not guaranteed profiles. Use the manufacturer's profile for flow, extrusion width, first layer and speed.",
          )}{" "}
          <a href={guideSource}>{tr("Source checked 8 October 2026")}</a>.
        </p>
      </>
    ),
    "tolerance-calculator": (
      <>
        <p className="panel-label">{tr("Starting Fit")}</p>
        <PresetRows
          label={tr("Fit Starting Example")}
          value={s.fit}
          onPick={(id) =>
            patch({ fit: id, clearance: { press: "-0.05", slide: "0.2", clearance: "0.4", custom: s.clearance }[id] ?? s.clearance })
          }
          items={[
            { id: "press", title: "Press Fit", detail: "−0.05 mm diametral interference.", meta: u.length(-0.05, imperial ? 4 : 2) },
            { id: "slide", title: "Sliding Fit", detail: "+0.20 mm diametral clearance.", meta: u.length(0.2, imperial ? 4 : 2) },
            { id: "clearance", title: "Loose Fit", detail: "+0.40 mm diametral clearance.", meta: u.length(0.4, imperial ? 4 : 2) },
            { id: "custom", title: "My Tested Value", detail: "The clearance you measured on a test pair.", meta: "" },
          ]}
        />
        <div className="field-grid">
          {length("shaft", "Nominal Shaft Diameter")}
          {length("clearance", "Diametral Clearance", true)}
          {length("uncertainty", "Diameter Uncertainty per Part (±)")}
        </div>
        <p className="fine">
          {tr(
            "Examples are trial-coupon values, not fit standards. Positive clearance makes the hole larger; negative clearance creates interference. Use measured uncertainty from your printer, material and orientation. Print a small test pair before a full assembly.",
          )}{" "}
          <a href={fitSource}>{tr("Prusa's design guidance")}</a>.
        </p>
      </>
    ),
    "unit-converter": (
      <>
        <p className="panel-label">{tr("Measurement Type")}</p>
        <Segmented
          label={tr("Measurement Type")}
          value={s.category}
          options={Object.keys(units).map((c) => [c, tr(categoryNames[c] ?? c)] as [string, string])}
          onChange={(category) => {
            const keys = Object.keys(units[category]);
            patch({ category, from: keys[0], to: keys[1] });
          }}
        />
        {field("amount", "Amount")}
        <div className="field-grid">
          {(["from", "to"] as const).map((key) => (
            <label key={key}>
              {key === "from" ? tr("From Unit") : tr("To Unit")}
              <select aria-label={tr(key === "from" ? "From Unit" : "To Unit")} value={s[key]} onChange={(e) => patch({ [key]: e.target.value })}>
                {Object.keys(units[s.category]).map((v) => (
                  <option key={v} value={v}>
                    {tr(v)}
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>
        <button
          type="button"
          className="ws-quiet"
          onClick={() => patch({ from: s.to, to: s.from, amount: conversion ? String(conversion.value) : s.amount })}
        >
          {tr("Swap Units")}
        </button>
        <p className="fine">
          {tr(
            "Length, volume, mass and time are separate dimensions. Millimetres cubed do not convert to grams without a material density. Changing an STL's unit interpretation changes lengths, areas and volumes by different powers.",
          )}
        </p>
      </>
    ),
  };

  return (
    <section ref={workspaceRef} className="workspace pw" data-report={reportOpen ? "open" : "closed"} aria-label={tr("3D printing workspace")}>
      <History editor={editor} />
      <div className="two-column">
        <div className="controls pw-panel">
          <ProjectLibrary value={profile} valid={isPrinterProfile} name="printer-profiles" defaultName={printerName} label="My Printer Presets" onLoad={p => {
            setPrinter(custom); setOwnName(p.name); setOwn(p.bed); setMargin(p.margin); editor.setValue(p.settings);
          }} />
          <p className="fine">{tr("Presets keep your build volume, margin and calculator inputs. Model files stay in this tab and are not included.")}</p>
          <div className="pw-tabs" role="group" aria-label={tr("3D printing tools")}>
            {tabs.map(([id, name]) => (
              <button key={id} type="button" id={`pw-tab-${id}`} aria-pressed={tab === id} aria-controls="pw-tabpanel" onClick={() => { setTab(id); setReportOpen(id !== "model"); }}>
                <ToolIcon slug={id === "model" ? "model-viewer" : id} />
                {tr(name)}
              </button>
            ))}
          </div>
          <div className="pw-mini" aria-hidden="true">
            <span>{tr(shown.eyebrow)}</span>
            <strong>{shown.big}</strong>
          </div>
          <div id="pw-tabpanel" role="region" aria-labelledby={`pw-tab-${tab}`}>
            <p className="fine">{tr(inputTips[tab])}</p>
            {tab !== "model" && tab !== "unit-converter" && tab !== "tolerance-calculator" && m.model && (
              <p className="pw-using">
                <Icon name="box" /> {m.model.name}
              </p>
            )}
            {panels[tab]}
          </div>
          {tab !== "model" && (
            <>
              <button type="button" onClick={() => {
                if (window.confirm(tr("Load example calculator values? Undo restores your inputs."))) { editor.setValue({ ...defaults }); setLinked(false); }
              }}>{tr("Load Example Inputs")}</button>
              <DraftFiles value={s} valid={validSettings} onLoad={editor.setValue} name={mode} />
              <p className="fine" role="status">
                {tr(editor.storage)}
              </p>
            </>
          )}
          <p className="fine">
            {tr("Want 3D3D to make it?")} <a href={link("/quote")}>{tr("Request a quote for your part")}</a>.
          </p>
        </div>
        <div
          ref={stageRef}
          className={`output ws-stage pw-stage${drop.dragging ? " is-dropping" : ""}`}
          style={{ ["--cover-left" as string]: `${cover[0]}px`, ["--cover-bottom" as string]: `${cover[1]}px` }}
          {...drop.bind}
        >
          <Suspense fallback={<div className="pw-viewport pw-wait">{tr("Loading the local 3D viewer…")}</div>}>
            <Viewport
              positions={m.positions}
              bed={bed}
              bedLabel={`${printerName} · ${bedText(bed)}`}
              fits={placement ? placement.current : null}
              dims={dims}
              accent={accent}
              api={api}
              cover={cover}
              colour={colour}
              section={section}
            />
          </Suspense>
          <div className="pw-top">
            <p className="pw-chip ws-glass">
              <Icon name="box" />
              <span>
                <strong>{m.busy ? tr("Reading geometry and checking topology…") : m.model?.name ?? tr("No model open")}</strong>
                <small>{r ? `${r.dimensions.map((d) => u.lengthNumber(d)).join(" × ")} ${u.lengthUnit}` : printerName}</small>
              </span>
            </p>
            <div className="pw-views ws-glass" role="toolbar" aria-label={fr ? "Caméra" : "Camera"}>
              {views.map(([view, en, french]) => (
                <button key={view} type="button" onClick={() => api.current?.view(view)}>
                  {fr ? french : en}
                </button>
              ))}
            </div>
          </div>
          <div className="pw-workbar ws-glass" role="toolbar" aria-label={fr ? "Vue du modèle" : "Model view"}>
            <button type="button" aria-pressed={reportOpen} onClick={() => setReportOpen(!reportOpen)}>{fr ? "Mesures" : "Measurements"}</button>
            <label className="pw-colour">{fr ? "Couleur" : "Colour"}<input type="color" value={colour} aria-label={fr ? "Couleur du modèle" : "Model colour"} onChange={(e) => setColour(e.target.value)} /></label>
            <button type="button" aria-pressed={section < 100} onClick={() => setSection(section < 100 ? 100 : 50)}>{fr ? "Coupe" : "Section"}</button>
            <button type="button" aria-pressed={fullscreen} onClick={async () => {
              setViewError("");
              try {
                if (document.fullscreenElement === workspaceRef.current) await document.exitFullscreen();
                else await workspaceRef.current?.requestFullscreen();
              } catch { setViewError(fr ? "Plein écran indisponible dans cette fenêtre." : "Fullscreen is unavailable in this window."); }
            }}>{fullscreen ? (fr ? "Réduire" : "Exit Fullscreen") : (fr ? "Plein écran" : "Fullscreen")}</button>
            {section < 100 && <label className="pw-section">{fr ? "Hauteur Z" : "Z Height"}<input type="range" min="0" max="100" value={section} aria-label={fr ? "Hauteur de coupe Z" : "Z section height"} onChange={(e) => setSection(Number(e.target.value))} /><output>{section}%</output></label>}
          </div>
          {viewError && <p className="pw-view-error" role="status">{viewError}</p>}
          {!m.model && (
            <div className="pw-empty">
              <strong>{tr("Drop an STL, 3MF or OBJ")}</strong>
              <span>{tr("Measured on this device, on the printer you pick. Nothing is uploaded.")}</span>
              <span className="pw-empty-actions">
                <AddFiles primary label={tr("Open 3D Model")} accept=".stl,.obj,.3mf" onFiles={([file]) => void m.load(file)} />
                <button type="button" className="ws-quiet" disabled={m.busy} onClick={m.sample}>
                  {tr("View Sample Cube")}
                </button>
              </span>
              {m.busy && <span role="status">{tr("Reading geometry and checking topology…")}</span>}
              {m.error && <span role="alert">{tr(m.error)}</span>}
            </div>
          )}
          <section ref={cardRef} className="pw-result ws-glass" aria-live="polite" aria-label={tr(shown.eyebrow)}>
            <header>
              <p className="eyebrow">{tr(shown.eyebrow)}</p>
              {shown.units && toggle}
              <button type="button" className="pw-report-close" aria-label={fr ? "Fermer les mesures" : "Close measurements"} onClick={() => setReportOpen(false)}>×</button>
            </header>
            {shown.big && <p className="pw-big">{shown.big}</p>}
            {shown.body}
          </section>
        </div>
      </div>
    </section>
  );
}
