import { getStore } from "@netlify/blobs";

const json = (o, status = 200) =>
  new Response(JSON.stringify(o), { status, headers: { "content-type": "application/json", "cache-control": "no-store" } });

export default async (req) => {
  const path = new URL(req.url).pathname.replace(/^\/api\/?/, "");
  const store = getStore({ name: "wallplanner", consistency: "strong" });

  if (path === "doc") {
    if (req.method === "GET") {
      const d = await store.get("doc", { type: "json" });
      return json(d || { rev: 0, doc: null });
    }
    if (req.method === "PUT") {
      const body = await req.json();
      if (!body || !body.doc) return json({ error: "missing doc" }, 400);
      const cur = await store.get("doc", { type: "json" });
      const rev = ((cur && cur.rev) || 0) + 1;
      await store.setJSON("doc", { rev, doc: body.doc, t: Date.now() });
      return json({ rev });
    }
  }

  if (path.startsWith("file/")) {
    const key = "file/" + decodeURIComponent(path.slice(5));
    if (req.method === "GET") {
      const r = await store.getWithMetadata(key, { type: "arrayBuffer" });
      if (!r) return new Response("not found", { status: 404 });
      return new Response(r.data, {
        headers: { "content-type": (r.metadata && r.metadata.type) || "application/octet-stream", "cache-control": "public, max-age=31536000, immutable" },
      });
    }
    if (req.method === "PUT") {
      const buf = await req.arrayBuffer();
      await store.set(key, buf, { metadata: { type: req.headers.get("content-type") || "image/jpeg" } });
      return json({ ok: true });
    }
    if (req.method === "DELETE") {
      await store.delete(key);
      return json({ ok: true });
    }
  }

  return json({ error: "not found" }, 404);
};

export const config = { path: "/api/*" };
