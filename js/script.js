/* Jade Acdal Portfolio — vanilla JavaScript interactions */
(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const navLinkItems = document.querySelectorAll(".nav-link");
  const year = document.getElementById("copyright-year");

  if (year) year.textContent = new Date().getFullYear();


  // Interference-ribbon-inspired canvas background for this vanilla HTML portfolio.
  // The official React Bits Pro package requires a React/shadcn project and license key.
  const ribbonCanvas = document.getElementById("hero-ribbons");
  if (ribbonCanvas && !reduceMotion) {
    const ctx = ribbonCanvas.getContext("2d", { alpha: true });
    let raf = 0;
    let width = 0;
    let height = 0;
    let time = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.6);
    const pink = [232, 93, 150];
    const violet = [122, 94, 255];

    function resizeRibbons() {
      const rect = ribbonCanvas.getBoundingClientRect();
      width = rect.width; height = rect.height;
      ribbonCanvas.width = Math.max(1, Math.floor(width * dpr));
      ribbonCanvas.height = Math.max(1, Math.floor(height * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    function mix(a, b, t) { return a + (b - a) * t; }
    function drawRibbons() {
      ctx.clearRect(0, 0, width, height);
      const count = width < 700 ? 25 : 42;
      for (let i = 0; i < count; i++) {
        const n = i / Math.max(1, count - 1);
        const baseY = height * (0.22 + n * 0.56);
        const phase = time * (0.00032 + n * 0.00012) + n * 5.8;
        const colT = (Math.sin(n * Math.PI * 2 + time * 0.00015) + 1) / 2;
        const c = pink.map((v, j) => Math.round(mix(v, violet[j], colT)));
        ctx.beginPath();
        for (let x = -20; x <= width + 20; x += 5) {
          const u = x / Math.max(1, width);
          const envelope = Math.sin(u * Math.PI);
          const y = baseY
            + Math.sin(u * 7.2 + phase) * (16 + 28 * envelope)
            + Math.sin(u * 13.5 - phase * 0.72 + n * 3) * (5 + 10 * envelope)
            + Math.cos(u * 3.5 + phase * 0.55) * 9;
          if (x <= -20) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        const alpha = 0.12 + 0.24 * (0.5 + 0.5 * Math.sin(n * 9 + time * 0.0003));
        ctx.strokeStyle = `rgba(${c[0]}, ${c[1]}, ${c[2]}, ${alpha})`;
        ctx.lineWidth = i % 7 === 0 ? 1.35 : 0.7;
        ctx.shadowBlur = i % 7 === 0 ? 10 : 4;
        ctx.shadowColor = `rgba(${c[0]}, ${c[1]}, ${c[2]}, 0.32)`;
        ctx.stroke();
      }
      ctx.shadowBlur = 0;
      time += 16;
      raf = window.requestAnimationFrame(drawRibbons);
    }
    resizeRibbons();
    drawRibbons();
    window.addEventListener("resize", resizeRibbons, { passive: true });
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) window.cancelAnimationFrame(raf);
      else if (!reduceMotion) drawRibbons();
    });
  }

  // Mobile navigation
  function closeMenu() {
    if (!menuToggle || !navLinks) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navLinks.classList.remove("is-open");
    document.body.classList.remove("menu-open");
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      menuToggle.setAttribute("aria-expanded", String(!isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
      navLinks.classList.toggle("is-open", !isOpen);
      document.body.classList.toggle("menu-open", !isOpen);
    });
    navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
    document.addEventListener("keydown", event => {
      if (event.key === "Escape") closeMenu();
    });
    window.addEventListener("resize", () => {
      if (window.innerWidth > 760) closeMenu();
    });
  }

  // Reveal sections as they enter the viewport. Fall back to visible content.
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add("is-visible"));
  }

  // Active navigation link based on the visible section.
  const sections = document.querySelectorAll("main section[id]");
  if ("IntersectionObserver" in window) {
    const sectionObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinkItems.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      });
    }, { rootMargin: "-35% 0px -55% 0px" });
    sections.forEach(section => sectionObserver.observe(section));
  }

  // Custom cursor, mouse spotlight, and portrait parallax on desktop pointers only.
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const wideScreen = window.matchMedia("(min-width: 1000px)").matches;
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  const glow = document.querySelector(".mouse-glow");
  const heroVisual = document.querySelector(".hero-visual");
  const portrait = document.getElementById("portrait");

  if (finePointer && wideScreen && !reduceMotion) {
    document.body.classList.add("custom-cursor");
    [dot, ring].forEach(el => { if (el) el.style.opacity = "1"; });
    if (glow) glow.style.opacity = ".8";

    let pointerX = window.innerWidth / 2;
    let pointerY = window.innerHeight / 2;
    let ringX = pointerX;
    let ringY = pointerY;
    let animationFrame = null;

    const renderPointer = () => {
      if (dot) dot.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
      ringX += (pointerX - ringX) * 0.17;
      ringY += (pointerY - ringY) * 0.17;
      if (ring) ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
      if (glow) glow.style.transform = `translate(${pointerX}px, ${pointerY}px) translate(-50%, -50%)`;
      animationFrame = requestAnimationFrame(renderPointer);
    };

    document.addEventListener("pointermove", event => {
      pointerX = event.clientX;
      pointerY = event.clientY;
      if (dot) dot.style.opacity = "1";
      if (ring) ring.style.opacity = "1";
      if (glow) glow.style.opacity = ".8";

      if (heroVisual && portrait) {
        const rect = heroVisual.getBoundingClientRect();
        const inside = event.clientX >= rect.left && event.clientX <= rect.right &&
          event.clientY >= rect.top && event.clientY <= rect.bottom;
        if (inside) {
          const x = (event.clientX - (rect.left + rect.width / 2)) / (rect.width / 2);
          const y = (event.clientY - (rect.top + rect.height / 2)) / (rect.height / 2);
          portrait.style.transform = `translate(${x * 7}px, ${y * 7}px) rotateX(${-y * 2}deg) rotateY(${x * 2}deg) scale(1.025)`;
        } else {
          portrait.style.transform = "";
        }
      }
      if (!animationFrame) animationFrame = requestAnimationFrame(renderPointer);
    }, { passive: true });

    document.addEventListener("pointerleave", () => {
      if (dot) dot.style.opacity = "0";
      if (ring) ring.style.opacity = "0";
      if (glow) glow.style.opacity = "0";
      if (portrait) portrait.style.transform = "";
    });

    document.querySelectorAll("a, button, input, textarea").forEach(el => {
      el.addEventListener("pointerenter", () => ring && ring.classList.add("is-hovering"));
      el.addEventListener("pointerleave", () => ring && ring.classList.remove("is-hovering"));
    });
  }

  // Contact form: client-side validation only. No backend or email service is connected.
  const contactForm = document.getElementById("contact-form");
  const feedback = document.getElementById("form-feedback");
  if (contactForm && feedback) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const formData = new FormData(contactForm);
      const name = String(formData.get("name") || "").trim();
      const email = String(formData.get("email") || "").trim();
      const subject = String(formData.get("subject") || "").trim();
      const message = String(formData.get("message") || "").trim();
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !email || !subject || !message) {
        feedback.textContent = "Please complete every field before continuing.";
        feedback.style.color = "#f4a6c1";
        return;
      }
      if (!validEmail) {
        feedback.textContent = "Please enter a valid email address.";
        feedback.style.color = "#f4a6c1";
        document.getElementById("email").focus();
        return;
      }
      feedback.textContent = "Looks good! This demo does not send messages yet. Connect a backend or form service to enable delivery.";
      feedback.style.color = "#f4a6c1";
    });
  }
})();
