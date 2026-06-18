/* ===========================================================
   FADAA — main.js
   =========================================================== */
(function () {
  "use strict";

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const isTouch = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  /* ---------- Preloader ---------- */
  const preloader = document.getElementById("preloader");
  window.addEventListener("load", () => {
    setTimeout(() => preloader && preloader.classList.add("is-done"), 700);
  });
  // failsafe
  setTimeout(() => preloader && preloader.classList.add("is-done"), 3500);

  /* ---------- Year ---------- */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------- Build product grid ---------- */
  const grid = document.getElementById("productGrid");
  const products = window.FADAA_PRODUCTS || [];
  if (grid) {
    grid.innerHTML = products.map((p) => {
      const media = p.image
        ? `<div class="card__media"><div class="ph"><img src="${p.image}" alt="${p.name}" loading="lazy" style="position:absolute;inset:0;width:100%;height:100%;object-fit:cover" /></div></div>`
        : `<div class="card__media"><div class="ph" data-shade="${p.shade}" data-tilt><span class="ph__label">${p.name}</span></div></div>`;
      const tag = p.tag ? `<span class="card__tag">${p.tag}</span>` : "";
      return `
        <article class="card" data-category="${p.category}">
          ${tag}
          <button class="card__fav" aria-label="Save ${p.name}">♡</button>
          ${media}
          <div class="card__body">
            <div>
              <h3 class="card__name">${p.name}</h3>
              <p class="card__type">${p.type}</p>
            </div>
            <span class="card__price">${p.price}</span>
          </div>
        </article>`;
    }).join("");
  }

  /* ---------- Favourite toggle ---------- */
  document.addEventListener("click", (e) => {
    const fav = e.target.closest(".card__fav");
    if (!fav) return;
    e.stopPropagation();
    fav.classList.toggle("is-fav");
    fav.textContent = fav.classList.contains("is-fav") ? "♥" : "♡";
  });

  /* ---------- Filters ---------- */
  const filterWrap = document.getElementById("filters");
  if (filterWrap && grid) {
    filterWrap.addEventListener("click", (e) => {
      const btn = e.target.closest(".filter");
      if (!btn) return;
      filterWrap.querySelectorAll(".filter").forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      grid.querySelectorAll(".card").forEach((card) => {
        const match = f === "all" || card.dataset.category === f;
        card.classList.add("fade-out");
        setTimeout(() => {
          card.classList.toggle("is-hidden", !match);
          if (match) requestAnimationFrame(() => card.classList.remove("fade-out"));
        }, 220);
      });
    });
  }

  /* ---------- Scroll reveal ---------- */
  const revealEls = document.querySelectorAll(".reveal, .card");
  if ("IntersectionObserver" in window && !prefersReduced) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.classList.contains("card")
            ? (Array.prototype.indexOf.call(el.parentNode.children, el) % 4) * 80
            : 0;
          setTimeout(() => el.classList.add("is-in"), delay);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -8% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-in"));
  }

  /* ---------- Nav scroll state + progress + active link ---------- */
  const nav = document.getElementById("nav");
  const progress = document.getElementById("scrollProgress");
  const sections = Array.from(document.querySelectorAll("main section[id]"));
  const navAnchors = Array.from(document.querySelectorAll('.nav__links a[data-link]'));

  function onScroll() {
    const y = window.scrollY;
    if (nav) nav.classList.toggle("is-scrolled", y > 40);
    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
    // active link
    let current = "";
    for (const s of sections) {
      if (s.offsetTop - 140 <= y) current = s.id;
    }
    navAnchors.forEach((a) => {
      a.classList.toggle("is-current", a.getAttribute("href") === "#" + current);
    });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const navLinks = document.getElementById("navLinks");
  if (burger && navLinks) {
    const toggle = (open) => {
      const willOpen = open ?? !navLinks.classList.contains("is-open");
      navLinks.classList.toggle("is-open", willOpen);
      burger.classList.toggle("is-open", willOpen);
      burger.setAttribute("aria-expanded", String(willOpen));
      document.body.style.overflow = willOpen ? "hidden" : "";
    };
    burger.addEventListener("click", () => toggle());
    navLinks.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => toggle(false)));
  }

  /* ---------- Animated count-up ---------- */
  const counters = document.querySelectorAll("[data-count]");
  if ("IntersectionObserver" in window) {
    const cio = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const target = parseInt(el.dataset.count, 10) || 0;
        if (prefersReduced) { el.textContent = target + "+"; cio.unobserve(el); return; }
        let n = 0;
        const step = Math.max(1, Math.round(target / 40));
        const tick = () => {
          n += step;
          if (n >= target) { el.textContent = target + "+"; }
          else { el.textContent = n; requestAnimationFrame(tick); }
        };
        tick();
        cio.unobserve(el);
      });
    }, { threshold: 0.6 });
    counters.forEach((c) => cio.observe(c));
  }

  /* ---------- Word swap in "Worn by everyone" ---------- */
  const swap = document.getElementById("swapWord");
  if (swap && !prefersReduced) {
    const words = ["everyone", "him", "her", "you", "all"];
    let i = 0;
    setInterval(() => {
      i = (i + 1) % words.length;
      swap.style.opacity = "0";
      swap.style.transition = "opacity .25s ease";
      setTimeout(() => { swap.textContent = words[i]; swap.style.opacity = "1"; }, 260);
    }, 2200);
  }

  /* ---------- Newsletter form ---------- */
  const form = document.getElementById("signupForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = form.querySelector('input[type="email"]');
      const val = (input.value || "").trim();
      const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
      if (!ok) { note.textContent = "Please enter a valid email."; note.style.color = "#f0b27a"; return; }
      note.textContent = "Thank you — welcome to the FADAA circle ✦";
      note.style.color = "";
      form.reset();
    });
  }

  /* ---------- Custom cursor ---------- */
  if (!isTouch && !prefersReduced) {
    const cursor = document.getElementById("cursor");
    const dot = document.getElementById("cursorDot");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let cx = mx, cy = my;
    window.addEventListener("mousemove", (e) => {
      mx = e.clientX; my = e.clientY;
      if (dot) { dot.style.left = mx + "px"; dot.style.top = my + "px"; }
    });
    (function loop() {
      cx += (mx - cx) * 0.18; cy += (my - cy) * 0.18;
      if (cursor) { cursor.style.left = cx + "px"; cursor.style.top = cy + "px"; }
      requestAnimationFrame(loop);
    })();
    const hoverables = 'a, button, .card, [data-tilt], .filter, input';
    document.addEventListener("mouseover", (e) => {
      if (e.target.closest(hoverables)) cursor && cursor.classList.add("is-hover");
    });
    document.addEventListener("mouseout", (e) => {
      if (e.target.closest(hoverables)) cursor && cursor.classList.remove("is-hover");
    });
  }

  /* ---------- Magnetic buttons ---------- */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll("[data-magnetic]").forEach((el) => {
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- 3D tilt ---------- */
  if (!isTouch && !prefersReduced) {
    document.querySelectorAll("[data-tilt]").forEach((el) => {
      el.style.transformStyle = "preserve-3d";
      el.style.transition = "transform .25s var(--ease)";
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        el.style.transform = `perspective(900px) rotateY(${px * 9}deg) rotateX(${-py * 9}deg)`;
      });
      el.addEventListener("mouseleave", () => { el.style.transform = ""; });
    });
  }

  /* ---------- Hero parallax on bg text ---------- */
  const bgText = document.querySelector(".hero__bg-text");
  if (bgText && !prefersReduced) {
    window.addEventListener("scroll", () => {
      const y = window.scrollY;
      bgText.style.transform = `translateX(-50%) translateY(${y * 0.18}px)`;
    }, { passive: true });
  }
})();
