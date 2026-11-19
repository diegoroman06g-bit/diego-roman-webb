import { supabase, BUCKET, esAdmin } from "./_db.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "POST") return res.status(405).end();
    if (!esAdmin(req)) return res.status(401).json({ error: "No autorizado" });

    const { slug, orden } = req.query;
    const { data: g } = await supabase
      .from("galerias")
      .select("id")
      .eq("slug", slug)
      .maybeSingle();
    if (!g) return res.status(404).json({ error: "La galería no existe" });

    if (!Buffer.isBuffer(req.body) || req.body.length === 0) {
      return res.status(400).json({ error: "Falta la foto" });
    }

    const nombre = `${Date.now()}-${Math.random().toString(36).slice(2, 7)}.jpg`;
    const ruta = `${slug}/${nombre}`;

    const { error } = await supabase.storage
      .from(BUCKET)
      .upload(ruta, req.body, { contentType: "image/jpeg" });
    if (error) throw error;

    const { data: pub } = supabase.storage.from(BUCKET).getPublicUrl(ruta);

    const { error: e2 } = await supabase.from("fotos").insert({
      galeria_id: g.id,
      nombre,
      url: pub.publicUrl,
      orden: Number(orden) || 0,
    });
    if (e2) throw e2;

    res.json({ ok: true, url: pub.publicUrl });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || "Error del servidor" });
  }
}