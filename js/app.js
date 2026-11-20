const S = window.SITE,
  $ = (id) => document.getElementById(id);
const wa = (t) => `https://wa.me/${S.whatsapp}?text=${encodeURIComponent(t)}`;
const ph = (src, alt) =>
  `<div class="ph"><img src="${src}" alt="${alt}" loading="lazy" onerror="this.remove()"></div>`;
$("wa-hero").href = wa("Hola Diego, quiero agendar una sesión.");
$("wa-foot").href = wa("Hola Diego, quiero información.");
$("ig").href = S.redes.instagram;
$("fb").href = S.redes.facebook;
$("tt").href = S.redes.tiktok;
$("mail").href = "mailto:" + S.correo;
$("y").textContent = new Date().getFullYear();
$("portafolio-grid").innerHTML = S.portafolio
  .map((f, i) => ph(f, "Fotografía de Diego Román " + (i + 1)))
  .join("");
$("catalogos-box").innerHTML = S.catalogos
  .map(
    (
      c,
    ) => `<article class="cat" id="${c.id}"><h3>${c.titulo}</h3><p>${c.detalle}</p>
<div class="pk">${c.paquetes
      .map(
        (
          p,
          i,
        ) => `<div class="item">${c.fotos[i] ? ph(c.fotos[i], p.nombre) : ""}<div class="info"><span>${p.nombre}</span><strong>${S.moneda} ${p.precio}</strong><small>${p.incluye}</small>
<a class="btn wa" href="${wa(`Hola Diego, quiero agendar: ${c.titulo} - ${p.nombre} (${S.moneda} ${p.precio}).`)}">Agendar por WhatsApp</a></div></div>`,
      )
      .join(
        "",
      )}</div>${c.notas ? `<ul class="notas">${c.notas.map((n) => `<li>${n}</li>`).join("")}</ul>` : ""}</article>`,
  )
  .join("");

  const igs = S.instagram || [];
if (!igs.length) {
  $("instagram").remove();
} else {
  $("ig-grid").innerHTML = igs.map(u =>
    `<blockquote class="instagram-media" data-instgrm-permalink="${u}" data-instgrm-version="14"></blockquote>`
  ).join("");
  $("ig-mas").href = S.redes.instagram;
  const sc = document.createElement("script");
  sc.async = true;
  sc.src = "https://www.instagram.com/embed.js";
  document.body.appendChild(sc);
}