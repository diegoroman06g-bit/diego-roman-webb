import { supabase } from "./_db.js";

export default async function handler(req, res) {
  try {
    if (req.method !== "GET") return res.status(405).end();

    const { data, error } = await supabase
      .from("catalogos")
      .select("clave, titulo, detalle, orden, paquetes(nombre, precio, incluye, orden)")
      .order("orden");
    if (error) throw error;

    data.forEach((c) => c.paquetes.sort((a, b) => a.orden - b.orden));

    res.setHeader("Cache-Control", "s-maxage=60, stale-while-revalidate=300");
    res.json(data);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e.message || "Error del servidor" });
  }
}