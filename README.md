# 🎉 Invitación Dinámica - 80 Años de Ezequiel Maturano 🇲🇽

Invitación web interactiva y responsiva inspirada en la temática mexicana elegante:
- Colores **Azul Talavera / Azul Rey**, **Dorado Colonial** y vivos tonos florales.
- Centro de mesa tradicional con el letrero *"Feliz Cumpleaños Ezequiel"*, trompo, rebozo y girasoles.
- Diseñada con enfoque **mobile-first** para verse espectacular en teléfonos celulares al compartirse por WhatsApp.

---

## 🌟 Características Incluidas

1. ⏳ **Cuenta Regresiva en Tiempo Real:** Días, horas, minutos y segundos exactos hasta el 19 de Diciembre a la 1:00 PM.
2. ⛪ **Itinerario de Misa y Recepción:**
   - **Misa de Acción de Gracias:** 1:00 PM con botón directo a Google Maps.
   - **Recepción & Festejo:** 3:00 PM con botón directo a Google Maps.
3. 💬 **Confirmación de Asistencia (RSVP) por WhatsApp:**
   - Formulario donde el invitado pone su nombre, número de personas y mensaje de felicitación.
   - Abre automáticamente WhatsApp con el mensaje estructurado listo para enviar.
4. 📱 **Espacio para Código QR (Álbum de Google Drive):**
   - Genera automáticamente un código QR interactivo de la carpeta de Google Drive configurada.
   - Incluye botón directo para abrir la carpeta desde el navegador.
5. 🎺 **Música y Efectos Interactivos:**
   - Botón de audio ambiental con melodía acústica festiva.
   - Botón de confeti mexicano con los colores tradicionales del evento.
6. 📅 **Botón para agendar en Google Calendar / Apple Calendar (.ics)**.
7. 👔 **Código de vestimenta & Lluvia de sobres**.

---

## ⚙️ Cómo Actualizar las Ubicaciones, WhatsApp y Drive

Solo necesitas abrir el archivo [`config.js`](file:///c:/Users/ELITE%20DESK/Documents/GitHub/EzequielFest/config.js) y reemplazar los valores:

```javascript
// 1. WhatsApp del organizador (con código de país, ej. 52 para México + 10 dígitos)
telefono: "521234567890",

// 2. Enlace de Google Maps para la Misa
googleMapsUrl: "https://maps.app.goo.gl/tu-enlace-misa",

// 3. Enlace de Google Maps para la Recepción
googleMapsUrl: "https://maps.app.goo.gl/tu-enlace-recepcion",

// 4. Enlace de la Carpeta de Google Drive para las fotos
carpetaUrl: "https://drive.google.com/drive/folders/tu-id-de-carpeta"
```

El código QR del sitio se regenerará automáticamente en cuanto guardes tu enlace de Google Drive.

---

## 🚀 Cómo Visualizar la Invitación

Puedes abrir el archivo [`index.html`](file:///c:/Users/ELITE%20DESK/Documents/GitHub/EzequielFest/index.html) directamente en tu navegador (doble clic en el archivo o clic derecho -> Abrir con Chrome/Edge).

Para compartirla en línea por WhatsApp a todos los invitados:
- Sube el repositorio a **GitHub Pages** (gratuito).
- O arrastra la carpeta a **Vercel** o **Netlify Drop** (gratuito, te da un enlace tipo `ezequiel80.netlify.app` en 1 minuto).

