export const API_URL = (
  import.meta.env.VITE_API_URL || "https://portfolio-xda6.onrender.com"
).replace(/\/$/, "");

export const ADMIN_EMAIL = (
  import.meta.env.VITE_ADMIN_EMAIL || "sriswasthik006@gmail.com"
).toLowerCase();

export async function fetchContent(signal) {
  const res = await fetch(`${API_URL}/api/content`, { signal });
  if (!res.ok) throw new Error(`Content request failed (${res.status})`);
  return res.json();
}

// `token` is the Clerk session token; the API re-checks the account's email.
export async function saveSection(section, items, token) {
  const res = await fetch(`${API_URL}/api/content/${section}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items }),
  });
  const body = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(body.error || `Save failed (${res.status})`);
  return body.items;
}
