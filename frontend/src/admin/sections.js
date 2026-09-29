// What each admin tab edits. `fields` drive the generic editor in Admin.jsx;
// the API applies the same rules again (backend/content.js).
export const SECTIONS = {
  skills: {
    label: "skills",
    noun: "group",
    blank: { group: "", items: [] },
    heading: (item) => item.group,
    fields: [
      { key: "group", label: "Group", type: "text", required: true },
      { key: "items", label: "Skills", type: "list", hint: "Separate with commas" },
    ],
  },
  projects: {
    label: "projects",
    noun: "project",
    blank: { title: "", category: "", description: "", tech: [], links: [] },
    heading: (item) => item.title,
    fields: [
      { key: "title", label: "Title", type: "text", required: true },
      { key: "category", label: "Category", type: "text", hint: "e.g. Web app · Live" },
      { key: "description", label: "Description", type: "textarea" },
      { key: "tech", label: "Built with", type: "list", hint: "Separate with commas" },
      { key: "links", label: "Links", type: "links" },
    ],
  },
  gallery: {
    label: "gallery",
    noun: "photo",
    blank: { title: "", src: "", thumb: "" },
    heading: (item) => item.title,
    preview: true,
    fields: [
      { key: "title", label: "Caption", type: "text" },
      { key: "src", label: "Image URL", type: "url", required: true },
      {
        key: "thumb",
        label: "Thumbnail URL",
        type: "url",
        hint: "Optional, a smaller copy for the grid",
      },
    ],
  },
  activity: {
    label: "activity",
    noun: "event",
    blank: { title: "", host: "", year: "", note: "" },
    heading: (item) => [item.title, item.host].filter(Boolean).join(" · "),
    fields: [
      { key: "title", label: "Event", type: "text", required: true },
      { key: "host", label: "Host", type: "text" },
      { key: "year", label: "Year", type: "text", inputMode: "numeric" },
      { key: "note", label: "Note", type: "textarea" },
    ],
  },
};

export const SECTION_KEYS = Object.keys(SECTIONS);

// Trims text, drops empty list entries and half-filled links before saving.
export function cleanItems(section, items) {
  return items.map((item) => {
    const out = {};
    for (const field of SECTIONS[section].fields) {
      const value = item[field.key];
      if (field.type === "list") {
        out[field.key] = (value ?? []).map((v) => v.trim()).filter(Boolean);
      } else if (field.type === "links") {
        out[field.key] = (value ?? [])
          .map((l) => ({ label: l.label.trim(), href: l.href.trim() }))
          .filter((l) => l.label && l.href);
      } else {
        out[field.key] = (value ?? "").trim();
      }
    }
    return out;
  });
}
