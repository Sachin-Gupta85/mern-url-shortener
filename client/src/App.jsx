import React, { useEffect, useState } from "react";
import { listUrls, createUrl, deleteUrl } from "./api.js";

export default function App() {
  const [urls, setUrls] = useState([]);
  const [target, setTarget] = useState("");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function refresh() { setUrls(await listUrls()); }
  useEffect(() => { refresh(); }, []);

  async function onAdd(e) {
    e.preventDefault();
    try {
      await createUrl(target.trim(), code.trim());
      setTarget(""); setCode(""); setError(""); refresh();
    } catch {
      setError("Could not shorten (bad URL or code taken)");
    }
  }

  const origin = typeof window !== "undefined" ? window.location.origin : "";

  return (
    <main style={{ maxWidth: 640, margin: "2rem auto", fontFamily: "system-ui" }}>
      <h1>🔗 URL Shortener</h1>
      <form onSubmit={onAdd} style={{ display: "flex", gap: 8, marginBottom: 12 }}>
        <input aria-label="target" placeholder="https://long-url…" value={target} onChange={(e) => setTarget(e.target.value)} style={{ flex: 2 }} />
        <input aria-label="code" placeholder="custom code (optional)" value={code} onChange={(e) => setCode(e.target.value)} style={{ flex: 1 }} />
        <button type="submit">Shorten</button>
      </form>
      {error && <p role="alert">{error}</p>}
      <ul style={{ listStyle: "none", padding: 0 }}>
        {urls.map((u) => (
          <li key={u.id} style={{ borderBottom: "1px solid #eee", padding: 8 }}>
            <a href={`${origin}/r/${u.code}`}>/r/{u.code}</a> → {u.target} <small>({u.clicks} clicks)</small>
            <button onClick={async () => { await deleteUrl(u.id); refresh(); }} style={{ float: "right" }}>✕</button>
          </li>
        ))}
      </ul>
    </main>
  );
}
