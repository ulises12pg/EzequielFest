# 🎉 Invitación Dinámica - 80 Años de Ezequiel Maturano 🇲🇽

Invitación web interactiva y responsiva inspirada en la temática tradicional mexicana:
- Fondo neutro elegante que resalta **trompos**, **canicas de cristal** y **resorteras artesanales** flotantes.
- Detalles coloridos inspirados en el centro de mesa artesanal con el letrero *"Feliz Cumpleaños Ezequiel"*, listón sarape mexicano, girasoles y rosas.
- Diseñada con enfoque **mobile-first** para verse espectacular en teléfonos celulares al compartirse por WhatsApp.

---

## 🌟 Características Incluidas

1. ⏳ **Cuenta Regresiva en Tiempo Real:** Días, horas, minutos y segundos exactos hasta el **19 de Diciembre a la 1:00 PM**.
2. ⛪ **Itinerario y Ubicaciones en Google Maps:**
   - **Misa de Acción de Gracias (1:00 PM):** Convento de las Hermanas Agustinas, Huerto Nantzha, Tula de Allende, Hgo.
   - **Recepción & Festejo (3:00 PM):** Calle Galeana, San Andrés Tultepec, Tula de Allende, Hgo.
3. 💬 **Confirmación de Asistencia (RSVP) por WhatsApp:**
   - Formulario directo hacia el número **5535793557**.
   - Fecha límite de confirmación: **15 de Diciembre**.
   - Incluye animación de confeti festivo mexicano 🎉.
4. 🎵 **Música de Fondo:**
   - Reproducción de **`lameta.mp3`** con botón flotante interactivo y aviso en pantalla.
5. 📱 **Espacio para Código QR (Álbum de Google Drive):**
   - Módulo interactivo con código QR dinámico listo para vincular la carpeta de Google Drive donde los invitados subirán sus fotos.
6. 📅 **Botón para agendar en Google Calendar / Apple Calendar (.ics)**.
7. 👔 **Código de vestimenta:** *Formal Mexicano / Guayabera o Traje*.

---

## ⚙️ Archivo de Configuración Rápida

Los datos del evento se gestionan en [`config.js`](file:///c:/Users/ELITE%20DESK/Documents/GitHub/EzequielFest/config.js):

```javascript
// En config.js:
whatsapp: {
  telefono: "525535793557",
},
misa: {
  hora: "1:00 PM",
  googleMapsUrl: "https://maps.app.goo.gl/wixcihzfQL3ETNLC9?g_st=iw"
},
recepcion: {
  hora: "3:00 PM",
  googleMapsUrl: "https://maps.app.goo.gl/prCUdthFrGbAzz4W7?g_st=iw"
},
drive: {
  // Pega aquí la URL de tu carpeta compartida:
  carpetaUrl: "https://drive.google.com/drive/folders/tu-id-de-carpeta"
},
musica: {
  archivo: "assets/lameta.mp3",
  titulo: "La Meta"
}
```

---

## 🚀 Cómo Visualizar y Compartir la Invitación

1. **En tu computadora (Local):**
   - Puedes abrir directamente [`index.html`](file:///c:/Users/ELITE%20DESK/Documents/GitHub/EzequielFest/index.html) en tu navegador, o visitar [http://localhost:8000](http://localhost:8000) mientras el servidor esté activo.

2. **Para compartirla por WhatsApp a los invitados:**
   - **Opción 1 (GitHub Pages):** Sube el repositorio a GitHub y activa *Pages* en la configuración (gratis).
   - **Opción 2 (Netlify Drop / Vercel):** Arrastra esta carpeta a [app.netlify.com/drop](https://app.netlify.com/drop) para obtener un enlace público instantáneo tipo `ezequiel80.netlify.app`.
