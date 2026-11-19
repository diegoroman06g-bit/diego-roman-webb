import { supabase, BUCKET, esAdmin } from "./_db.js";

function crearSlug(titulo) {
  const base =
    titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 40) || "galeria";
  const azar = Math.random().toString(36).slice(2, 8);
  return `${base}-${azar}`;
}

export default async function handler(req, res) {
  try {
    const { slug, admin } = req.query;

    // Ver una galería (pública o privada) con su enlace
    if (req.method === "GET" && slug) {
      const { data: g, error } = await supabase
        .from("galerias")
        .select("id, titulo, visibilidad")
        .eq("slug", slug)
        .maybeSingle();
      if (error) throw error;
      if (!g) return res.status(404).json({ error: "No existe" });

      const { data: fotos, error: e2 } = await supabase
        .from("fotos")
        .select("url, nombre")
        .eq("galeria_id", g.id)
        .order("orden")
        .order("id");
      if (e2) throw e2;

      return res.json({ titulo: g.titulo, visibilidad: g.visibilidad, fotos });
    }

    // Lista de galerías: públicas para todos, todas solo para ti
    if (req.method === "GET") {
      if (admin && !esAdmin(req)) {
        return res.status(401).json({ error: "No autorizado" });
      }
      let consulta = supabase
        .from("galerias")
        .select("titulo, slug, visibilidad, creado_en, fotos(count)")
        .order("creado_en", { ascending: false });
      if (!admin) consulta = consulta.eq("visibilidad", "publica");

      const { data, error } = await consulta;
      if (error) throw error;

      return res.json(
        data.map((g) => ({
          titulo: g.titulo,
          slug: g.slug,
          visibilidad: g.visibilidad,
          total: g.fotos?.[0]?.count ?? 0,
        }))
      );
    }

    // De aquí en adelante solo tú, con contraseña
    if (!esAdmin(req)) {
      return res.status(401).json({ error: "No autorizado" });
    }

    // Crear galería
    if (req.method === "POST") {
      const { titulo, visibilidad } = req.body || {};
      if (!titulo || !["publica", "privada"].includes(visibilidad)) {
        return res.status(400).json({ error: "Datos incompletos" });
      }
      const nuevoSlug = crearSlug(titulo);
      const { error } = await supabase
        .from("galerias")
        .insert({ titulo, slug: nuevoSlug, visibilidad });
      if (error) throw error;
      return res.json({ slug: nuevoSlug });
    }

    // Eliminar galería y sus fotos
    if (req.method === "DELETE" && slug) {
      const { data: g } = await supabase
        .from("galerias")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!g) return res.status(404).json({ error: "No existe" });

      const { data: fotos } = await supabase
        .from("fotos")
        .select("nombre")
        .eq("galeria_id", g.id);
      if (fotos?.length) {
        await supabase.storage
          .from(BUCKET)
          .remove(fotos.map((f) => `${slug}/${f.nombre}`));
      }
      const { error } = await supabase.from("galerias").delete().eq("id", g.id);
      if (error) throw error;
      return res.json({ ok: true });
    }

    res.status(405).end();
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || "Error del servidor" });
  }
} 