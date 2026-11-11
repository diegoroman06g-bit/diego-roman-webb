// Aquí cambias tus datos y todo el sitio se actualiza solo.
window.SITE = {
  correo: "diegoroman06g@gmail.com",
  nombre: "Diego Román",
  whatsapp: "59164647156",
  redes: {
    instagram: "https://www.instagram.com/diegoroman_ft",
    facebook: "https://www.facebook.com/share/1Ecz28wy9d/",
    tiktok: "https://www.tiktok.com/@diegoroman_ft"
  },
  moneda: "Bs",
  catalogos: [
    {
      id: "deportiva",
      titulo: "Fotografía deportiva",
      detalle: "Todas las fotos son digitales y editadas.",
      fotos: ["images/deporte1.jpeg", "images/deporte2.jpeg", "images/deporte3.jpeg"],
      paquetes: [
        { nombre: "Un solo jugador", precio: 60, incluye: "6 a 8 fotos digitales editadas" },
        { nombre: "Más de 3 jugadores (precio por jugador)", precio: 40, incluye: "4 a 6 fotos digitales editadas por jugador" },
        { nombre: "Cobertura de equipo completo", precio: 250, incluye: "35 a 40 fotos digitales. Una o dos por jugador, cuerpo técnico, médicos, utileros y fotos grupales del equipo" }
      ]
    },
    {
      id: "sesiones",
      titulo: "Sesiones fotográficas (solo exteriores)",
      detalle: "Cumpleañeras, niños, parejas y familias. Momentos naturales, emociones reales y recuerdos auténticos.",
      fotos: ["images/sesion1.jpeg", "images/sesion2.jpeg", "images/sesion3.jpeg"],
      paquetes: [
        { nombre: "Paquete 1", precio: 250, incluye: "1 persona · 45 minutos · 6 fotos editadas en alta calidad · 1 lugar (escogido por ti) · 1 vestuario" },
        { nombre: "Paquete 2", precio: 400, incluye: "1 persona · 1 hora · 10 fotos editadas en alta calidad · 1 lugar (escogido por ti) · hasta 2 vestuarios" },
        { nombre: "Paquete 3", precio: 450, incluye: "Parejas (novios o mejores amig@s) o familia pequeña · 1 hora · 12 fotos editadas en alta calidad · 1 lugar (escogido por ti)" }
      ],
      notas: [
        "Para la reserva se paga la mitad, y la otra mitad al terminar la sesión.",
        "Las fotos se entregan entre 2 y 3 días hábiles. Si no se paga la mitad restante al terminar la sesión, se entregan una vez completado el pago.",
        "No se hacen reembolsos. Si no puedes en la fecha acordada, se busca otra fecha.",
        "Si el lugar es fuera de la ciudad, se coordina el transporte.",
        "Si la locación de las fotos tiene costo, lo cubre el cliente."
      ]
    }
  ],
  portafolio: [
    "images/foto1.jpeg", "images/foto2.jpeg", "images/foto3.jpeg",
    "images/foto4.jpeg", "images/foto5.jpeg", "images/foto6.jpeg"
  ]
};
