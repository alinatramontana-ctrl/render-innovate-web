// Menú responsive (se queda igual)
const navToggle = document.getElementById("navToggle");
const nav = document.getElementById("nav");

navToggle?.addEventListener("click", () => {
  nav.classList.toggle("active");
});

// ===== SLIDER HERO =====
const slides = Array.from(document.querySelectorAll(".slide"));
const dotsWrap = document.getElementById("dots");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let current = 0;
let timer = null;

function render(){
  slides.forEach((s,i)=> s.classList.toggle("is-active", i === current));
  const dots = Array.from(document.querySelectorAll(".dot"));
  dots.forEach((d,i)=> d.classList.toggle("active", i === current));
}

function goTo(index){
  current = (index + slides.length) % slides.length;
  render();
  restartAuto();
}

function next(){ goTo(current + 1); }
function prev(){ goTo(current - 1); }

function startAuto(){
  timer = setInterval(next, 4500);
}
function stopAuto(){
  if(timer) clearInterval(timer);
  timer = null;
}
function restartAuto(){
  stopAuto();
  startAuto();
}

// Crear puntitos
if(dotsWrap){
  slides.forEach((_,i)=>{
    const b = document.createElement("button");
    b.className = "dot" + (i===0 ? " active" : "");
    b.setAttribute("aria-label", `Ir al slide ${i+1}`);
    b.addEventListener("click", ()=> goTo(i));
    dotsWrap.appendChild(b);
  });
}

prevBtn?.addEventListener("click", prev);
nextBtn?.addEventListener("click", next);

render();
startAuto();
// Animaciones al hacer scroll (reveal)
const revealEls = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target); // anima solo una vez
      }
    });
  },
  { threshold: 0.15 }
);

revealEls.forEach((el) => observer.observe(el));
// Envío del formulario sin salir de la página (Formspree)
const form = document.getElementById("contactForm");
const statusEl = document.getElementById("formStatus");

if (form) {
  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    statusEl.textContent = "Enviando...";

    try {
      const data = new FormData(form);
      const res = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { "Accept": "application/json" }
      });

      if (res.ok) {
        form.reset();
        statusEl.textContent = "¡Listo! Te respondemos a la brevedad.";
      } else {
        statusEl.textContent = "Ups, hubo un error. Probá de nuevo o escribinos por WhatsApp.";
      }
    } catch (err) {
      statusEl.textContent = "No se pudo enviar. Probá de nuevo o escribinos por WhatsApp.";
    }
  });
}
// ===== Galería fullscreen (Visualización Arquitectónica) =====
(function initVAGallery(){
  const gallery = document.getElementById("vaGallery");
  const dotsWrap = document.getElementById("vaGalleryDots");
  if (!gallery || !dotsWrap) return;

  const slides = Array.from(gallery.querySelectorAll(".g-slide"));
  const prevBtn = gallery.querySelector(".g-arrow-left");
  const nextBtn = gallery.querySelector(".g-arrow-right");

  let idx = slides.findIndex(s => s.classList.contains("is-active"));
  if (idx < 0) idx = 0;

  // Crear dots
  dotsWrap.innerHTML = "";
  slides.forEach((_, i) => {
    const b = document.createElement("button");
    b.className = "g-dot" + (i === idx ? " active" : "");
    b.type = "button";
    b.setAttribute("aria-label", `Ir a imagen ${i+1}`);
    b.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(b);
  });

  const dots = Array.from(dotsWrap.querySelectorAll(".g-dot"));

  function goTo(i){
    slides[idx].classList.remove("is-active");
    dots[idx].classList.remove("active");

    idx = (i + slides.length) % slides.length;

    slides[idx].classList.add("is-active");
    dots[idx].classList.add("active");
  }

  function next(){ goTo(idx + 1); }
  function prev(){ goTo(idx - 1); }

  nextBtn?.addEventListener("click", next);
  prevBtn?.addEventListener("click", prev);

  // Teclas
  window.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") next();
    if (e.key === "ArrowLeft") prev();
  });

  // Auto (opcional): descomentá si querés autoplay
  setInterval(next, 6000);
})();
// VISOR 360°
document.addEventListener("DOMContentLoaded", () => {

  const pano = document.getElementById("vaPano");

  if(pano){

    pannellum.viewer('vaPano', {
      type: 'equirectangular',
      panorama: 'assets/img/va-360.webp',
      autoLoad: true,
      showControls: true
    });

  }

});