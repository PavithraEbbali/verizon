/* =============================================================================
   Signal Wireless — interaction & motion layer
   Vanilla JS. Progressive enhancement: every feature degrades gracefully and
   honors prefers-reduced-motion. GSAP is optional (enhances if present).
   Motion set: scroll reveal, scroll progress, mouse parallax, 3D tilt,
   magnetic buttons, spotlight cards, custom cursor, count-up, split-text.
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const finePointer = window.matchMedia("(pointer: fine)").matches;
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => Array.from(c.querySelectorAll(s));
  const clamp = (v, min, max) => Math.min(Math.max(v, min), max);
  const lerp = (a, b, t) => a + (b - a) * t;

  /* ---------------------------------------------------------------------------
     Footer year
     ------------------------------------------------------------------------ */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---------------------------------------------------------------------------
     Sticky header state + scroll progress
     ------------------------------------------------------------------------ */
  const header = document.getElementById("siteHeader");
  const progress = document.querySelector(".scroll-progress");
  let ticking = false;

  function onScroll() {
    const y = window.scrollY || 0;
    if (header) header.classList.toggle("is-stuck", y > 8);

    if (progress) {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      progress.style.transform = "scaleX(" + (h > 0 ? clamp(y / h, 0, 1) : 0) + ")";
    }

    const toTop = document.getElementById("toTop");
    if (toTop) toTop.classList.toggle("is-visible", y > 700);

    ticking = false;
  }
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        window.requestAnimationFrame(onScroll);
        ticking = true;
      }
    },
    { passive: true }
  );
  onScroll();

  /* ---------------------------------------------------------------------------
     Back to top
     ------------------------------------------------------------------------ */
  const toTop = document.getElementById("toTop");
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: reduceMotion ? "auto" : "smooth" });
    });
  }

  /* ---------------------------------------------------------------------------
     Mobile navigation
     ------------------------------------------------------------------------ */
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  if (navToggle && navLinks) {
    const setOpen = (open) => {
      navToggle.setAttribute("aria-expanded", String(open));
      navToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      navLinks.classList.toggle("is-open", open);
    };
    navToggle.addEventListener("click", () =>
      setOpen(navToggle.getAttribute("aria-expanded") !== "true")
    );
    navLinks.addEventListener("click", (e) => {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---------------------------------------------------------------------------
     Scroll reveal (Intersection Observer)
     ------------------------------------------------------------------------ */
  const revealEls = $$("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------------------------
     Split-text reveal for the hero headline (typographic animation)
     ------------------------------------------------------------------------ */
  const splitHost = document.querySelector(".split-text");
  if (splitHost && !reduceMotion) {
    // wrap each line break-delimited chunk; keep inline markup intact
    const lines = splitHost.innerHTML.split(/<br\s*\/?>/i);
    splitHost.innerHTML = lines
      .map(
        (ln, i) =>
          '<span class="split-line" style="--line-delay:' +
          i * 110 +
          'ms"><span>' +
          ln.trim() +
          "</span></span>"
      )
      .join("");
    const lineEls = $$(".split-line", splitHost);
    if ("IntersectionObserver" in window) {
      const io2 = new IntersectionObserver(
        (entries) =>
          entries.forEach((e) => {
            if (e.isIntersecting) lineEls.forEach((l) => l.classList.add("is-visible"));
          }),
        { threshold: 0.3 }
      );
      io2.observe(splitHost);
    } else {
      lineEls.forEach((l) => l.classList.add("is-visible"));
    }
  } else if (splitHost) {
    $$(".split-line", splitHost).forEach((l) => l.classList.add("is-visible"));
  }

  /* ---------------------------------------------------------------------------
     Count-up numbers
     ------------------------------------------------------------------------ */
  const counters = $$(".count");
  const runCount = (el) => {
    const target = parseFloat(el.dataset.count || "0");
    const decimals = parseInt(el.dataset.decimals || "0", 10);
    if (reduceMotion) {
      el.textContent = target.toFixed(decimals);
      return;
    }
    const dur = 1500;
    let start = null;
    const step = (ts) => {
      if (start === null) start = ts;
      const p = clamp((ts - start) / dur, 0, 1);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      el.textContent = (target * eased).toFixed(decimals);
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = target.toFixed(decimals);
    };
    requestAnimationFrame(step);
  };
  if ("IntersectionObserver" in window) {
    const io3 = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            runCount(e.target);
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.6 }
    );
    counters.forEach((c) => io3.observe(c));
  } else {
    counters.forEach(runCount);
  }

  /* ---------------------------------------------------------------------------
     Mouse-move parallax (ambient blobs / decorative layers)
     ------------------------------------------------------------------------ */
  const parallaxEls = $$("[data-parallax]");
  if (parallaxEls.length && finePointer && !reduceMotion) {
    let mx = 0, my = 0, cx = 0, cy = 0, rafP = null;
    const loop = () => {
      cx = lerp(cx, mx, 0.08);
      cy = lerp(cy, my, 0.08);
      parallaxEls.forEach((el) => {
        const depth = parseFloat(el.dataset.parallax || "0.05");
        el.style.transform =
          "translate3d(" + cx * depth * 100 + "px," + cy * depth * 100 + "px,0)";
      });
      rafP = requestAnimationFrame(loop);
    };
    window.addEventListener(
      "mousemove",
      (e) => {
        mx = (e.clientX / window.innerWidth - 0.5) * 2;
        my = (e.clientY / window.innerHeight - 0.5) * 2;
      },
      { passive: true }
    );
    loop();
  }

  /* ---------------------------------------------------------------------------
     3D tilt (data-tilt) — perspective transform toward cursor
     ------------------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    $$("[data-tilt]").forEach((el) => {
      const max = parseFloat(el.dataset.tiltMax || "12");
      const layers = $$("[data-tilt-layer]", el);
      let raf = null;

      const move = (e) => {
        const r = el.getBoundingClientRect();
        const px = (e.clientX - r.left) / r.width - 0.5;
        const py = (e.clientY - r.top) / r.height - 0.5;
        if (raf) cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          el.style.transform =
            "perspective(1000px) rotateY(" +
            px * max +
            "deg) rotateX(" +
            -py * max +
            "deg)";
          layers.forEach((l) => {
            const d = parseFloat(l.dataset.tiltLayer || "30");
            l.style.transform =
              "translate3d(" + px * d + "px," + py * d + "px," + d + "px)";
          });
        });
      };
      const reset = () => {
        if (raf) cancelAnimationFrame(raf);
        el.style.transform = "";
        el.style.transition = "transform .5s cubic-bezier(.22,1,.36,1)";
        layers.forEach((l) => (l.style.transform = "translateZ(" + (l.dataset.tiltLayer || 40) + "px)"));
        setTimeout(() => (el.style.transition = ""), 500);
      };
      el.addEventListener("mousemove", move);
      el.addEventListener("mouseleave", reset);
    });
  }

  /* ---------------------------------------------------------------------------
     Spotlight cards (data-spotlight) — track cursor for radial highlight
     ------------------------------------------------------------------------ */
  if (finePointer) {
    $$("[data-spotlight]").forEach((el) => {
      el.addEventListener(
        "mousemove",
        (e) => {
          const r = el.getBoundingClientRect();
          el.style.setProperty("--mx", ((e.clientX - r.left) / r.width) * 100 + "%");
          el.style.setProperty("--my", ((e.clientY - r.top) / r.height) * 100 + "%");
        },
        { passive: true }
      );
    });
  }

  /* ---------------------------------------------------------------------------
     Magnetic buttons (data-magnetic)
     ------------------------------------------------------------------------ */
  if (finePointer && !reduceMotion) {
    $$("[data-magnetic]").forEach((el) => {
      const strength = 0.35;
      el.addEventListener("mousemove", (e) => {
        const r = el.getBoundingClientRect();
        const x = e.clientX - r.left - r.width / 2;
        const y = e.clientY - r.top - r.height / 2;
        el.style.transform = "translate(" + x * strength + "px," + y * strength + "px)";
      });
      el.addEventListener("mouseleave", () => {
        el.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------------------------
     Custom cursor (fine pointers only)
     ------------------------------------------------------------------------ */
  const dot = document.querySelector(".cursor-dot");
  const ring = document.querySelector(".cursor-ring");
  if (dot && ring && finePointer && !reduceMotion) {
    let rx = 0, ry = 0, dx = 0, dy = 0;
    window.addEventListener(
      "mousemove",
      (e) => {
        dx = e.clientX;
        dy = e.clientY;
        dot.style.transform = "translate(" + dx + "px," + dy + "px)";
      },
      { passive: true }
    );
    const ringLoop = () => {
      rx = lerp(rx, dx, 0.18);
      ry = lerp(ry, dy, 0.18);
      ring.style.transform = "translate(" + rx + "px," + ry + "px)";
      requestAnimationFrame(ringLoop);
    };
    ringLoop();
    $$("a, button, [data-magnetic], .card, .plan, input, select").forEach((el) => {
      el.addEventListener("mouseenter", () => ring.classList.add("is-hover"));
      el.addEventListener("mouseleave", () => ring.classList.remove("is-hover"));
    });
  } else {
    if (dot) dot.style.display = "none";
    if (ring) ring.style.display = "none";
  }

  /* ---------------------------------------------------------------------------
     FAQ — allow only one open at a time (nice-to-have)
     ------------------------------------------------------------------------ */
  const faqItems = $$(".faq__item");
  faqItems.forEach((item) => {
    item.addEventListener("toggle", () => {
      if (item.open) faqItems.forEach((o) => o !== item && (o.open = false));
    });
  });

  /* ---------------------------------------------------------------------------
     Lead form (client-side validation + friendly confirmation)
     NOTE: wire the submit to your CRM / email endpoint before launch.
     ------------------------------------------------------------------------ */
  const form = document.getElementById("leadForm");
  const note = document.getElementById("formNote");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      const name = (form.querySelector("#lf-name") || {}).value || "there";
      if (note) {
        note.style.color = "#7CFFB2";
        note.textContent =
          "Thanks, " + name.split(" ")[0] + "! Your request is in — a local expert will reach out shortly.";
      }
      form.reset();
    });
  }

  /* ---------------------------------------------------------------------------
     Hero scene — pointer-reactive 3D rotation + choreographed intro + scroll.
     All transforms compose from CSS vars (--rx/--ry/--sc) so nothing fights the
     continuous CSS float/spin animations.
     ------------------------------------------------------------------------ */
  /* ---------------------------------------------------------------------------
     Hero background — interactive constellation canvas. Drifting nodes linked by
     lines that react to the cursor. Desktop + motion-safe only; pauses off-screen.
     ------------------------------------------------------------------------ */
  /* ---------------------------------------------------------------------------
     Varied scroll-in animations [data-anim] (up/left/right/zoom/flip/clip/wipe…)
     ------------------------------------------------------------------------ */
  (function initAnim() {
    const els = $$("[data-anim]");
    if (!els.length) return;
    if (reduceMotion) { els.forEach((e) => e.classList.add("in")); return; }
    let io = null;
    if ("IntersectionObserver" in window) {
      io = new IntersectionObserver(
        (ents, obs) => {
          ents.forEach((en) => {
            if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
      );
      els.forEach((e) => io.observe(e));
    }
    // Robust fallback: reveal via a scroll-event position check. Scroll is
    // input-driven, so this fires even where the rAF/observer loop is throttled.
    const check = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      for (let i = 0; i < els.length; i++) {
        const el = els[i];
        if (el.classList.contains("in")) continue;
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) { el.classList.add("in"); if (io) io.unobserve(el); }
      }
    };
    window.addEventListener("scroll", check, { passive: true });
    window.addEventListener("resize", check);
    window.addEventListener("load", check);
    check();
  })();

  /* ---------------------------------------------------------------------------
     Hero — entrance stagger, image mouse-parallax, GSAP scroll parallax
     ------------------------------------------------------------------------ */
  (function initHero() {
    const hero = document.querySelector(".hero");
    if (!hero) return;
    const reveal = () => hero.classList.add("is-ready");
    if (document.readyState === "complete") reveal();
    else window.addEventListener("load", reveal);
    setTimeout(reveal, 550); // guaranteed reveal even if the frame loop is throttled

    // 3D tilt toward the cursor (on .hero__parallax) + image drift via
    // object-position. Both compose cleanly with ken-burns and GSAP scroll.
    const img = document.getElementById("heroBgImg");
    const par = document.getElementById("heroParallax");
    if (img && finePointer && !reduceMotion) {
      hero.addEventListener(
        "mousemove",
        (e) => {
          const r = hero.getBoundingClientRect();
          const mx = (e.clientX - r.left) / r.width - 0.5;
          const my = (e.clientY - r.top) / r.height - 0.5;
          img.style.objectPosition =
            (70 + mx * 9).toFixed(1) + "% " + (58 + my * 9).toFixed(1) + "%";
          if (par) {
            par.style.setProperty("--hry", (mx * 6).toFixed(2) + "deg");
            par.style.setProperty("--hrx", (-my * 4).toFixed(2) + "deg");
          }
        },
        { passive: true }
      );
      hero.addEventListener("mouseleave", () => {
        img.style.objectPosition = "70% 60%";
        if (par) { par.style.setProperty("--hry", "0deg"); par.style.setProperty("--hrx", "0deg"); }
      });
    }

    // scroll parallax (GSAP) — bg sinks, foreground lifts & fades
    window.addEventListener("load", () => {
      if (reduceMotion || typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
      const bg = hero.querySelector(".hero__bg");
      const st = { trigger: hero, start: "top top", end: "bottom top", scrub: 0.4 };
      if (bg) window.gsap.to(bg, { yPercent: 16, ease: "none", scrollTrigger: st });
      window.gsap.to(hero.querySelector(".hero__inner"), { yPercent: -6, opacity: 0.55, ease: "none", scrollTrigger: st });
    });
  })();

  (function initHeroCanvas() {
    const canvas = document.getElementById("heroCanvas");
    if (!canvas) return;
    const hero = canvas.closest(".hero");
    if (!hero) return;
    // skip where it would cost more than it gives: reduced-motion, touch, small screens
    if (reduceMotion || !finePointer || window.innerWidth < 768) return;

    const ctx = canvas.getContext("2d");
    const DPR = Math.min(window.devicePixelRatio || 1, 2);
    const LINK = 132;
    let W = 0, H = 0, particles = [], raf = null, visible = true;
    const mouse = { x: -9999, y: -9999 };

    function build() {
      const r = hero.getBoundingClientRect();
      W = r.width; H = r.height;
      canvas.width = Math.round(W * DPR);
      canvas.height = Math.round(H * DPR);
      canvas.style.width = W + "px";
      canvas.style.height = H + "px";
      ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
      const count = Math.max(28, Math.min(86, Math.floor((W * H) / 15000)));
      particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * W,
          y: Math.random() * H,
          vx: (Math.random() - 0.5) * 0.28,
          vy: (Math.random() - 0.5) * 0.28,
          r: Math.random() * 1.6 + 0.7,
        });
      }
    }

    function frame() {
      ctx.clearRect(0, 0, W, H);
      const n = particles.length;
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        const dx = p.x - mouse.x, dy = p.y - mouse.y, d2 = dx * dx + dy * dy;
        if (d2 < 12000) {
          const d = Math.sqrt(d2) || 1, f = (1 - d / 110) * 1.1;
          p.x += (dx / d) * f; p.y += (dy / d) * f;
        }
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 6.2832);
        ctx.fillStyle = "rgba(255,120,120,0.6)";
        ctx.fill();
      }
      for (let i = 0; i < n; i++) {
        const a = particles[i];
        for (let j = i + 1; j < n; j++) {
          const b = particles[j];
          const dx = a.x - b.x, dy = a.y - b.y, d = Math.sqrt(dx * dx + dy * dy);
          if (d < LINK) {
            ctx.strokeStyle = "rgba(255,110,110," + ((1 - d / LINK) * 0.45).toFixed(3) + ")";
            ctx.lineWidth = 1;
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
        const mdx = a.x - mouse.x, mdy = a.y - mouse.y, md = Math.sqrt(mdx * mdx + mdy * mdy);
        if (md < 170) {
          ctx.strokeStyle = "rgba(255,110,110," + ((1 - md / 170) * 0.6).toFixed(3) + ")";
          ctx.lineWidth = 1;
          ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(mouse.x, mouse.y); ctx.stroke();
        }
      }
      raf = requestAnimationFrame(frame);
    }

    const start = () => { if (!raf && visible) raf = requestAnimationFrame(frame); };
    const stop = () => { if (raf) { cancelAnimationFrame(raf); raf = null; } };

    hero.addEventListener("mousemove", (e) => {
      const r = hero.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    }, { passive: true });
    hero.addEventListener("mouseleave", () => { mouse.x = -9999; mouse.y = -9999; });

    if ("IntersectionObserver" in window) {
      new IntersectionObserver((es) => {
        visible = es[0].isIntersecting;
        visible ? start() : stop();
      }).observe(hero);
    }

    let rz;
    window.addEventListener("resize", () => { clearTimeout(rz); rz = setTimeout(build, 180); });

    build();
    frame(); // draw one frame synchronously so a static field shows even if rAF is throttled
  })();

  (function initHeroScene() {
    const scene = document.getElementById("heroScene");
    if (!scene) return;
    const visual = scene.closest(".hero__visual");
    const host = scene.closest(".hero") || visual;

    // Entrance/reveal is pure CSS (see styles.css) so it never depends on JS or
    // the frame loop. The logic here is pointer + scroll enhancement only.

    // pointer-reactive rotation with spring smoothing
    if (finePointer && !reduceMotion && host) {
      let tx = 0, ty = 0, cx = 0, cy = 0, raf = null;
      const loop = () => {
        cx = lerp(cx, tx, 0.09);
        cy = lerp(cy, ty, 0.09);
        scene.style.setProperty("--ry", (cx * 16).toFixed(2) + "deg");
        scene.style.setProperty("--rx", (-cy * 12).toFixed(2) + "deg");
        raf =
          Math.abs(cx - tx) > 0.0005 || Math.abs(cy - ty) > 0.0005
            ? requestAnimationFrame(loop)
            : null;
      };
      const kick = () => { if (!raf) raf = requestAnimationFrame(loop); };
      host.addEventListener(
        "mousemove",
        (e) => {
          const r = host.getBoundingClientRect();
          tx = (e.clientX - r.left) / r.width - 0.5;
          ty = (e.clientY - r.top) / r.height - 0.5;
          kick();
        },
        { passive: true }
      );
      host.addEventListener("mouseleave", () => { tx = 0; ty = 0; kick(); });
    }

    // gentle scroll parallax on the whole visual (GSAP if present)
    window.addEventListener("load", () => {
      if (reduceMotion || typeof window.gsap === "undefined" || !window.ScrollTrigger) return;
      window.gsap.to(visual, {
        yPercent: -6,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 0.5 },
      });
    });
  })();

  /* ---------------------------------------------------------------------------
     GSAP enhancement layer (optional). Adds a subtle scroll-scrub parallax to
     section media if GSAP + ScrollTrigger loaded. Pure progressive enhancement.
     ------------------------------------------------------------------------ */
  function initGsap() {
    if (reduceMotion || typeof window.gsap === "undefined") return;
    const gsap = window.gsap;
    if (window.ScrollTrigger) gsap.registerPlugin(window.ScrollTrigger);

    // gentle float on section media as it scrolls through the viewport
    $$(".split__media").forEach((media) => {
      gsap.fromTo(
        media,
        { y: 40 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: { trigger: media, start: "top bottom", end: "bottom top", scrub: 0.6 },
        }
      );
    });

    // headline subtle settle
    const h1 = document.querySelector(".hero h1");
    if (h1) gsap.from(h1, { filter: "blur(6px)", duration: 0.9, ease: "power2.out" });
  }
  // GSAP is deferred; run after load
  if (document.readyState === "complete") initGsap();
  else window.addEventListener("load", initGsap);
})();
