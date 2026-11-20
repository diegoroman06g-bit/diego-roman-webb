const S = window.SITE;
const $ = (id) => document.getElementById(id);
const wa = (t) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}`;
const ph = (src, alt, pos) =>
  `<div class="ph"><img src="${src}" alt="${alt}" loading="lazy" ${pos ? `style="object-position:${pos}"` : ""} onerror="this.remove()"></div>`;

// Botones y redes
$("wa-hero").href = wa("Hola Diego, quiero agendar una sesión.");
$("wa-foot").href = wa("Hola Diego, quiero información.");
$("ig").href = S.redes.instagram;
$("fb").href = S.redes.facebook;
$("tt").href = S.redes.tiktok;
$("mail").href = "mailto:" + S.correo;
$("y").textContent = new Date().getFullYear();

// Portafolio
$("portafolio-grid").innerHTML = S.portafolio
  .map((f, i) => ph(f, "Fotografía de Diego Román " + (i + 1)))
  .join("");

// Tarjetas de catálogos: cada una abre catalogo.html
$("catalogos-box").innerHTML = S.catalogos
  .map(
    (c) => `
  <a class="cardlink" href="catalogo.html?c=${c.id}">
        ${ph(c.fotos[0], c.titulo, c.posFoto)}
    <div class="cl-text">
      <h3>${c.titulo.split(" (")[0]}</h3>
      <span>Ver paquetes y precios →</span>
    </div>
  </a>`
  )
  .join("");

// Si no hay publicaciones de Instagram, se esconde la sección
if (!(S.instagram || []).length) $("instagram").remove();