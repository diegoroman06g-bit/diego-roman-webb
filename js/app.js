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

// ===== PESTAÑAS PRINCIPALES =====
const nombresTab = {
  catalogos: "Catálogos y precios",
  portafolio: "Portafolio",
  instagram: "Instagram"
};
const panes = ["catalogos", "portafolio", "instagram"].map($).filter(Boolean);
const barra = document.createElement("section");
barra.className = "tabsec";
barra.innerHTML = `<div class="tabs">${panes.map(p =>
  `<button type="button" data-tab="${p.id}">${nombresTab[p.id]}</button>`
).join("")}</div>`;
$("portafolio").before(barra);

function mostrarTab(id) {
  panes.forEach(p => {
    p.classList.add("pane");
    p.hidden = p.id !== id;
  });
  barra.querySelectorAll("button").forEach(b =>
    b.classList.toggle("on", b.dataset.tab === id)
  );
  if (id === "instagram" && window.instgrm) window.instgrm.Embeds.process();
}

barra.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (b) mostrarTab(b.dataset.tab);
});

// Enlaces como "Ver catálogos y precios" abren la pestaña correcta
document.addEventListener("click", e => {
  const a = e.target.closest('a[href^="#"]');
  if (!a) return;
  const id = a.getAttribute("href").slice(1);
  if (panes.some(p => p.id === id)) mostrarTab(id);
});

mostrarTab(
  panes.some(p => "#" + p.id === location.hash)
    ? location.hash.slice(1)
    : "catalogos"
);

// ===== PESTAÑAS DENTRO DE CATÁLOGOS =====
const cats = [...document.querySelectorAll("#catalogos-box .cat")];
if (cats.length > 1) {
  const sub = document.createElement("div");
  sub.className = "tabs sub";
  sub.innerHTML = S.catalogos.map(c =>
    `<button type="button" data-cat="${c.id}">${c.titulo.split(" (")[0]}</button>`
  ).join("");
  $("catalogos-box").before(sub);

  const verCat = id => {
    cats.forEach(a => { a.hidden = a.id !== id; });
    sub.querySelectorAll("button").forEach(b =>
      b.classList.toggle("on", b.dataset.cat === id)
    );
  };
  sub.addEventListener("click", e => {
    const b = e.target.closest("button");
    if (b) verCat(b.dataset.cat);
  });
  verCat(cats[0].id);
}