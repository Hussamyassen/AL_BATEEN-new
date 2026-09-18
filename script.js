const toggle = document.getElementById("langToggle");

const meta = {
  ar: {
    lang: "ar",
    dir: "rtl",
    toggle: "EN",
    title: document.body.dataset.titleAr || "محطة البطين لخدمات السيارات | مغسلة سيارات في العين",
    description: document.body.dataset.descAr || "محطة البطين لخدمات السيارات في العين — غسيل يدوي للسيارات وخدمات سيارات متكاملة. يومياً من 9 صباحاً حتى 11 مساءً."
  },
  en: {
    lang: "en",
    dir: "ltr",
    toggle: "AR",
    title: document.body.dataset.titleEn || "AL BATEEN Auto Services Station | Car Wash in Al Ain",
    description: document.body.dataset.descEn || "AL BATEEN Auto Services Station in Al Ain — hand car wash and automotive services. Open daily from 9:00 AM to 11:00 PM."
  }
};

function setLanguage(lang){
  const m = meta[lang];
  document.documentElement.lang = m.lang;
  document.documentElement.dir = m.dir;
  document.title = m.title;
  document.querySelector('meta[name="description"]').setAttribute("content", m.description);
  document.querySelectorAll("[data-ar][data-en]").forEach(el => {
    el.textContent = el.dataset[lang];
  });
  document.querySelectorAll("[data-alt-ar][data-alt-en]").forEach(el => {
    el.alt = lang === "ar" ? el.dataset.altAr : el.dataset.altEn;
  });
  toggle.textContent = m.toggle;
  try { localStorage.setItem("albateen-lang", lang); } catch (e) {}
}

toggle.addEventListener("click", () => {
  setLanguage(document.documentElement.lang === "ar" ? "en" : "ar");
});

// Arabic remains the default. Only restore English if the visitor explicitly chose it before.
try { if(localStorage.getItem("albateen-lang") === "en") setLanguage("en"); } catch (e) {}


// Subtle reveal motion for visual polish. Kept intentionally restrained.
if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
  document.body.classList.add("motion-ready");
  const revealTargets = document.querySelectorAll(
    ".section-head, .cw-section-head, .stage-card, .service-intro, .service-item, .auto-card, .auto-service-card, .visit-gallery, .visit-copy, .why-item, .wash-connection-inner, .contact-card, .contact-gallery, .contact-map-panel, .guide-card, .related-card"
  );
  revealTargets.forEach(el => el.classList.add("reveal-item"));

  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });

    revealTargets.forEach(el => observer.observe(el));
  } else {
    revealTargets.forEach(el => el.classList.add("is-visible"));
  }
}

// FINAL MOBILE NAV BEHAVIOR
document.querySelectorAll(".mobile-page-nav").forEach(nav => {
  nav.querySelectorAll("a").forEach(link => {
    link.addEventListener("click", () => nav.removeAttribute("open"));
  });
});

document.addEventListener("click", event => {
  document.querySelectorAll(".mobile-page-nav[open]").forEach(nav => {
    if (!nav.contains(event.target)) nav.removeAttribute("open");
  });
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 900) {
    document.querySelectorAll(".mobile-page-nav[open]").forEach(nav => nav.removeAttribute("open"));
  }
});
