const BASE = import.meta.env?.VITE_API_URL || "";
async function req(path, opts) {
  const res = await fetch(`${BASE}/api${path}`, {
    headers: { "Content-Type": "application/json" }, ...opts });
  if (!res.ok) throw new Error(`${res.status}`);
  return res.status === 204 ? null : res.json();
}
export const listUrls = () => req("/urls");
export const createUrl = (target, code) =>
  req("/urls", { method: "POST", body: JSON.stringify(code ? { target, code } : { target }) });
export const deleteUrl = (id) => req(`/urls/${id}`, { method: "DELETE" });
