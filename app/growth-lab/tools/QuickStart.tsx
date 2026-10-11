import { useT } from "../shared/locale";
import { categoryFor } from "./navigation";

export const workflowSteps: Record<string, [string, string, string, string]> = {
  Design: ["Choose a template or open one of your saved projects.", "Edit Content first. Use Style for selected objects and Design for page colours, fonts and size.", "Check every page or card face. Use Layers to reach covered objects and review print warnings.", "Open Export, choose a format and keep an editable backup in Projects & Backups."],
  Images: ["Choose your images or try a small sample file.", "Start with a preset. Choose All Images or Selected Image Only before fine tuning.", "Compare before and after, check each thumbnail and retry any failed files.", "Download the finished image or batch ZIP. Keep your original files."],
  "PDF Documents": ["Choose your PDFs or images, or try a sample document.", "Set the page order, selection, rotation and any stamps. Open the output settings for format and size.", "Read the result strip in order. Selected stage pages are the pages that will be exported.", "Download the PDF, page images or ZIP. Open the result in your usual reader before sharing."],
  "QR and Contacts": ["Choose a use case or a content type, then replace the example information.", "Enter your link, contact or Wi-Fi details. Add a heading and adjust the style.", "Check the decoded content and scan status. Resolve any warning before exporting.", "Download the code or sign, then test the printed size on real phones."],
  Business: ["Start with your business and client details, or open a saved document.", "Add line items, currency and applicable taxes. Reuse saved clients and items when useful.", "Review the number, dates, totals and actual payment details. A quote can become a separate invoice copy.", "Download the document and an editable backup. Saved copies remain only in this browser."],
  "3D Printing": ["Choose a calculator or open an STL, 3MF or OBJ file on the Model tab.", "Confirm units and inputs. Apply your own printer preset or enter its build volume.", "Open Measurements for model checks and reports. Calculator outputs are estimates, not physical print proof.", "Download your calculation or model report and save useful settings in My Printer Presets."],
};
export default function QuickStart({ slug }: { slug: string }) {
  const tr = useT(), steps = workflowSteps[categoryFor(slug)];
  return <section className="tool-start" aria-label={tr("Quick Start")}>
    <h2>{tr("Quick Start")}</h2>
    <ol>{steps.map((text, i) => <li key={text}><strong><span>{String(i + 1).padStart(2, "0")}</span> {tr(["Start", "Edit", "Preview", "Download"][i])}</strong><p>{tr(text)}</p></li>)}</ol>
    <p className="fine">{tr("Undo restores edits. Download files before closing, and keep backups of saved projects.")}</p>
  </section>;
}
