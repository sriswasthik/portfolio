// Shape checks for each editable section. Anything not listed here is
// dropped, strings are trimmed and capped, and links must be http(s) or
// site-relative so a saved value can never become a `javascript:` href.

const MAX_ITEMS = 100;

function text(value, max = 200) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

function url(value) {
  const v = text(value, 2000);
  if (!v) return "";
  if (v.startsWith("/") && !v.startsWith("//")) return v;
  try {
    const parsed = new URL(v);
    return parsed.protocol === "https:" || parsed.protocol === "http:" ? v : "";
  } catch {
    return "";
  }
}

function strings(value, max = 60) {
  if (!Array.isArray(value)) return [];
  return value.map((v) => text(v, max)).filter(Boolean).slice(0, 50);
}

const sections = {
  skills: (item) => ({
    group: text(item.group, 60),
    items: strings(item.items),
  }),

  projects: (item) => ({
    title: text(item.title, 120),
    category: text(item.category, 120),
    description: text(item.description, 2000),
    tech: strings(item.tech),
    links: (Array.isArray(item.links) ? item.links : [])
      .map((link) => ({ label: text(link?.label, 40), href: url(link?.href) }))
      .filter((link) => link.label && link.href)
      .slice(0, 10),
  }),

  gallery: (item) => ({
    title: text(item.title, 160),
    src: url(item.src),
    thumb: url(item.thumb),
  }),

  activity: (item) => ({
    title: text(item.title, 160),
    host: text(item.host, 120),
    year: text(item.year, 20),
    note: text(item.note, 1000),
  }),
};

// The field every item must have for the section to save.
const required = { skills: "group", projects: "title", gallery: "src", activity: "title" };

// Returns { items } or { error }.
function validate(section, items) {
  const clean = sections[section];
  if (!clean) return { error: "Unknown section" };
  if (!Array.isArray(items)) return { error: "Expected an array of items" };
  if (items.length > MAX_ITEMS) return { error: `At most ${MAX_ITEMS} items` };

  const cleaned = items.map((item) => clean(item && typeof item === "object" ? item : {}));
  const missing = cleaned.findIndex((item) => !item[required[section]]);
  if (missing !== -1) {
    return { error: `Item ${missing + 1} needs a valid ${required[section]}` };
  }
  return { items: cleaned };
}

module.exports = { SECTIONS: Object.keys(sections), validate };
