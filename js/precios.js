// Trae los precios desde la base de datos. Si falla, quedan los de config.js.
async function cargarPrecios() {
  try {
    const ctrl = new AbortController();
    const t = setTimeout(() => ctrl.abort(), 4000);
    const r = await fetch("/api/catalogos", { signal: ctrl.signal });
    clearTimeout(t);
    if (!r.ok) throw new Error("sin respuesta");

    const db = await r.json();
    db.forEach((d) => {
      const c = window.SITE.catalogos.find((x) => x.id === d.clave);
      if (!c || !d.paquetes || !d.paquetes.length) return;
      c.titulo = d.titulo;
      c.detalle = d.detalle;
      c.paquetes = d.paquetes.map((p) => ({
        nombre: p.nombre,
        precio: Number(p.precio),
        incluye: p.incluye
      }));
    });
  } catch (e) {
    // Sin base de datos: la página sigue con los datos de config.js
  }
}