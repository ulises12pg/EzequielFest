// ==========================================================================
// LÓGICA DINÁMICA - INVITACIÓN 80 AÑOS EZEQUIEL MATURANO
// ==========================================================================

document.addEventListener("DOMContentLoaded", () => {
  initDynamicData();
  initCountdown();
  initQRCode();
  initRSVP();
  initConfetti();
  initAudio();
});

// 1. INICIALIZAR DATOS DINÁMICOS DESDE CONFIG.JS
function initDynamicData() {
  if (typeof EVENT_CONFIG === "undefined") return;

  // Actualizar textos básicos
  const nameEls = document.querySelectorAll(".dyn-festejado");
  nameEls.forEach(el => el.textContent = EVENT_CONFIG.festejado);

  const edadEls = document.querySelectorAll(".dyn-edad");
  edadEls.forEach(el => el.textContent = EVENT_CONFIG.edad);

  const fechaEls = document.querySelectorAll(".dyn-fecha");
  fechaEls.forEach(el => el.textContent = EVENT_CONFIG.fechaTexto);

  // Misa
  const misaHora = document.querySelector(".dyn-misa-hora");
  if (misaHora) misaHora.textContent = EVENT_CONFIG.misa.hora;
  
  const misaLugar = document.querySelector(".dyn-misa-lugar");
  if (misaLugar) misaLugar.textContent = EVENT_CONFIG.misa.lugar;
  
  const misaDir = document.querySelector(".dyn-misa-dir");
  if (misaDir) misaDir.textContent = EVENT_CONFIG.misa.direccion;

  const misaMapsBtn = document.getElementById("btn-maps-misa");
  if (misaMapsBtn) {
    misaMapsBtn.href = EVENT_CONFIG.misa.googleMapsUrl || "https://maps.google.com";
  }

  // Recepción
  const recepHora = document.querySelector(".dyn-recepcion-hora");
  if (recepHora) recepHora.textContent = EVENT_CONFIG.recepcion.hora;
  
  const recepLugar = document.querySelector(".dyn-recepcion-lugar");
  if (recepLugar) recepLugar.textContent = EVENT_CONFIG.recepcion.lugar;
  
  const recepDir = document.querySelector(".dyn-recepcion-dir");
  if (recepDir) recepDir.textContent = EVENT_CONFIG.recepcion.direccion;

  const recepMapsBtn = document.getElementById("btn-maps-recepcion");
  if (recepMapsBtn) {
    recepMapsBtn.href = EVENT_CONFIG.recepcion.googleMapsUrl || "https://maps.google.com";
  }

  // Vestimenta
  const vestTipo = document.querySelector(".dyn-vestimenta-tipo");
  if (vestTipo) vestTipo.textContent = EVENT_CONFIG.codigoVestimenta.tipo;
  
  const vestDesc = document.querySelector(".dyn-vestimenta-desc");
  if (vestDesc) vestDesc.textContent = EVENT_CONFIG.codigoVestimenta.descripcion;

  // Botón directo a Google Drive
  const driveBtn = document.getElementById("btn-open-drive");
  if (driveBtn) {
    driveBtn.href = EVENT_CONFIG.drive.carpetaUrl || "#";
  }
}

// 2. CUENTA REGRESIVA AL EVENTO
function initCountdown() {
  const targetDate = new Date(EVENT_CONFIG.fechaEvento).getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    const daysEl = document.getElementById("count-days");
    const hoursEl = document.getElementById("count-hours");
    const minutesEl = document.getElementById("count-minutes");
    const secondsEl = document.getElementById("count-seconds");

    if (distance < 0) {
      if (daysEl) daysEl.textContent = "00";
      if (hoursEl) hoursEl.textContent = "00";
      if (minutesEl) minutesEl.textContent = "00";
      if (secondsEl) secondsEl.textContent = "00";
      const title = document.getElementById("countdown-heading");
      if (title) title.textContent = "¡Hoy es el gran día de celebración!";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    if (daysEl) daysEl.textContent = days < 10 ? "0" + days : days;
    if (hoursEl) hoursEl.textContent = hours < 10 ? "0" + hours : hours;
    if (minutesEl) minutesEl.textContent = minutes < 10 ? "0" + minutes : minutes;
    if (secondsEl) secondsEl.textContent = seconds < 10 ? "0" + seconds : seconds;
  }

  update();
  setInterval(update, 1000);
}

// 3. GENERADOR DE CÓDIGO QR PARA GOOGLE DRIVE
function initQRCode() {
  const qrContainer = document.getElementById("qrcode");
  if (!qrContainer) return;

  const url = EVENT_CONFIG.drive.carpetaUrl || "https://drive.google.com";

  // Usando la librería QRCode.js
  if (typeof QRCode !== "undefined") {
    qrContainer.innerHTML = "";
    new QRCode(qrContainer, {
      text: url,
      width: 180,
      height: 180,
      colorDark: "#08162b",
      colorLight: "#ffffff",
      correctLevel: QRCode.CorrectLevel.M
    });
  } else {
    // Fallback con API de QR SVG
    qrContainer.innerHTML = `<img src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=${encodeURIComponent(url)}" alt="Código QR Google Drive" style="width:180px;height:180px;border-radius:8px;">`;
  }
}

// 4. CONFIRMACIÓN POR WHATSAPP (RSVP)
function initRSVP() {
  const form = document.getElementById("rsvp-form");
  if (!form) return;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const nombre = document.getElementById("rsvp-name").value.trim();
    const personas = document.getElementById("rsvp-guests").value;
    const asistencia = document.getElementById("rsvp-attending").value;
    const mensaje = document.getElementById("rsvp-message").value.trim();

    if (!nombre) {
      showToast("Por favor ingresa tu nombre");
      return;
    }

    let texto = `*¡Hola! Quiero confirmar mi asistencia al 80 Aniversario de Don Ezequiel Maturano* 🇲🇽🎉\n\n`;
    texto += `👤 *Nombre(s):* ${nombre}\n`;
    texto += `👥 *Total de asistentes:* ${personas}\n`;
    texto += `📍 *Asistiremos a:* ${asistencia}\n`;
    if (mensaje) {
      texto += `💌 *Mensaje especial:* "${mensaje}"\n`;
    }
    texto += `\n_¡Muchas felicidades y nos vemos pronto!_ ✨`;

    const telefono = EVENT_CONFIG.whatsapp.telefono.replace(/[^0-9]/g, '');
    const waUrl = `https://wa.me/${telefono}?text=${encodeURIComponent(texto)}`;

    // Lanzar confeti de celebración
    lanzarConfeti();
    showToast("Abriendo WhatsApp para enviar confirmación...");

    setTimeout(() => {
      window.open(waUrl, "_blank");
    }, 450);
  });
}

// 5. EFECTO CONFETI MEXICANO
function lanzarConfeti() {
  if (typeof confetti === "undefined") return;

  const count = 200;
  const defaults = {
    origin: { y: 0.7 }
  };

  function fire(particleRatio, opts) {
    confetti({
      ...defaults,
      ...opts,
      particleCount: Math.floor(count * particleRatio),
      colors: ['#d4af37', '#164282', '#c1121f', '#fbbf24', '#06b6d4', '#10b981', '#f97316']
    });
  }

  fire(0.25, { spread: 26, startVelocity: 55 });
  fire(0.2, { spread: 60 });
  fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
  fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
  fire(0.1, { spread: 120, startVelocity: 45 });
}

function initConfetti() {
  const btnConfetti = document.getElementById("btn-confetti");
  if (btnConfetti) {
    btnConfetti.addEventListener("click", () => {
      lanzarConfeti();
      showToast("¡Viva la fiesta y viva Don Ezequiel! 🎉🇲🇽");
    });
  }
}

// 6. AMBIENTACIÓN SONORA (Música Mexicana: Trompetas, Huapango y Marimba)
let audioCtx = null;
let isAudioPlaying = false;
let audioTimer = null;
let customAudio = null;

function initAudio() {
  const btnMusic = document.getElementById("btn-music");
  if (!btnMusic) return;

  // Intentar cargar archivo de audio Huapango (WAV o MP3)
  try {
    // Probamos primero el audio generado o personalizado
    customAudio = new Audio('assets/musica.wav');
    customAudio.loop = true;
    customAudio.addEventListener('error', () => {
      // Si falla .wav, intentamos .mp3
      try {
        customAudio = new Audio('assets/musica.mp3');
        customAudio.loop = true;
      } catch (err) {
        customAudio = null;
      }
    });
  } catch (e) {
    customAudio = null;
  }

  btnMusic.addEventListener("click", () => {
    if (!isAudioPlaying) {
      if (customAudio) {
        customAudio.play().then(() => {
          isAudioPlaying = true;
          btnMusic.classList.add("playing");
          btnMusic.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
          showToast("¡Suenan las trompetas y la marimba! 🎺🇲🇽");
        }).catch(() => {
          // Si el navegador bloquea o no encuentra el archivo, usamos síntesis nativa de trompetas
          playMexicanTrumpetHuapango(btnMusic);
        });
      } else {
        playMexicanTrumpetHuapango(btnMusic);
      }
    } else {
      if (customAudio && !customAudio.paused) {
        customAudio.pause();
      }
      stopAmbientMelody();
      isAudioPlaying = false;
      btnMusic.classList.remove("playing");
      btnMusic.innerHTML = '<i class="fa-solid fa-music"></i>';
      showToast("Música pausada");
    }
  });
}

function playMexicanTrumpetHuapango(btnMusic) {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  startHuapangoSynthesis();
  isAudioPlaying = true;
  btnMusic.classList.add("playing");
  btnMusic.innerHTML = '<i class="fa-solid fa-volume-high"></i>';
  showToast("¡Trompetas y marimba tradicional! 🎺🇲🇽");
}

// Síntesis de Trompeta de Mariachi con filtro pasa-bajos resonante
function playBrassTrumpet(freq, time, duration, isHarmony = false) {
  if (!audioCtx || freq <= 0) return;
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }

  const osc = audioCtx.createOscillator();
  const filter = audioCtx.createBiquadFilter();
  const gain = audioCtx.createGain();

  osc.type = "sawtooth";
  osc.frequency.setValueAtTime(freq, time);

  // Filtro característico de trompeta brillante
  filter.type = "lowpass";
  filter.Q.setValueAtTime(3.2, time);
  filter.frequency.setValueAtTime(800, time);
  filter.frequency.exponentialRampToValueAtTime(3600, time + 0.03);
  filter.frequency.exponentialRampToValueAtTime(2400, time + duration);

  // Envolvente de volumen tipo latón / metal
  const vol = isHarmony ? 0.09 : 0.12;
  gain.gain.setValueAtTime(0.001, time);
  gain.gain.linearRampToValueAtTime(vol, time + 0.02);
  gain.gain.setValueAtTime(vol * 0.9, time + duration - 0.04);
  gain.gain.exponentialRampToValueAtTime(0.0001, time + duration);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + duration);
}

// Síntesis de Marimba / Clave con ataque de madera
function playMarimbaNote(freq, time, duration = 0.25) {
  if (!audioCtx || freq <= 0) return;
  const osc = audioCtx.createOscillator();
  const gain = audioCtx.createGain();

  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, time);

  gain.gain.setValueAtTime(0.18, time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  osc.connect(gain);
  gain.connect(audioCtx.destination);

  osc.start(time);
  osc.stop(time + duration);
}

// Melodía festiva Huapango en Sol Mayor (Dúo de trompetas en terceras)
const huapangoTheme = [
  // Trompeta 1 (Lead), Trompeta 2 (Armonía), Duración (segundos)
  { t1: 392.00, t2: 293.66, dur: 0.15 }, // G4 / D4
  { t1: 493.88, t2: 392.00, dur: 0.15 }, // B4 / G4
  { t1: 587.33, t2: 493.88, dur: 0.15 }, // D5 / B4
  { t1: 783.99, t2: 587.33, dur: 0.35 }, // G5 / D5 (Fanfarria)
  { t1: 739.99, t2: 554.37, dur: 0.15 }, // F#5 / C#5
  { t1: 783.99, t2: 587.33, dur: 0.15 }, // G5 / D5
  { t1: 880.00, t2: 659.25, dur: 0.38 }, // A5 / E5 (Acento)
  { t1: 739.99, t2: 554.37, dur: 0.15 }, // F#5
  { t1: 587.33, t2: 440.00, dur: 0.15 }, // D5
  { t1: 659.25, t2: 493.88, dur: 0.15 }, // E5
  { t1: 739.99, t2: 554.37, dur: 0.15 }, // F#5
  { t1: 783.99, t2: 493.88, dur: 0.50 }  // G5 / B4 (Resolución)
];

let huapangoStep = 0;

function startHuapangoSynthesis() {
  if (audioTimer) clearInterval(audioTimer);

  huapangoStep = 0;
  audioTimer = setInterval(() => {
    if (!isAudioPlaying || !audioCtx) return;
    const now = audioCtx.currentTime;
    const item = huapangoTheme[huapangoStep];

    // Tocar dúo de trompetas mariachi
    playBrassTrumpet(item.t1, now, item.dur, false);
    playBrassTrumpet(item.t2, now, item.dur, true);

    // Acompañamiento de marimba en contratiempo huapango
    playMarimbaNote(196.00, now, 0.2); // Bajo de marimba (G3)
    playMarimbaNote(392.00, now + 0.08, 0.15); // Repique de marimba

    huapangoStep = (huapangoStep + 1) % huapangoTheme.length;
  }, 220);
}

function stopAmbientMelody() {
  if (audioTimer) {
    clearInterval(audioTimer);
    audioTimer = null;
  }
}

// 7. FUNCIÓN AGREGAR A CALENDARIO (.ics)
function downloadICS() {
  const title = `80 Años de ${EVENT_CONFIG.festejado}`;
  const desc = `Festejo de 80 Aniversario.\\nMisa: ${EVENT_CONFIG.misa.hora}\\nRecepción: ${EVENT_CONFIG.recepcion.hora}`;
  const icsContent = 
`BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//EzequielFest//Invitacion//ES
BEGIN:VEVENT
SUMMARY:${title}
DESCRIPTION:${desc}
DTSTART:20261219T190000Z
DTEND:20261220T040000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

  const blob = new Blob([icsContent], { type: "text/calendar;charset=utf-8" });
  const link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute("download", `Festejo_80_Ezequiel_Maturano.ics`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  showToast("Recordatorio descargado para tu calendario 📅");
}

window.downloadICS = downloadICS;

// 8. TOAST NOTIFICATION HELPER
function showToast(msg) {
  let toast = document.getElementById("toast-notice");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "toast-notice";
    toast.className = "toast-notice";
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.classList.add("show");

  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

