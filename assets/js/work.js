(() => {
  const site = document.querySelector(".work-site");
  if (!site) return;

  const projects = Array.from(site.querySelectorAll(".work-project"));
  const links = Array.from(site.querySelectorAll(".work-index a"));
  const currentLabel = site.querySelector("[data-work-index-current]");
  const intro = site.querySelector(".work-intro");
  const reel = site.querySelector("[data-work-reel]");
  const track = site.querySelector("[data-work-reel-track]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!projects.length || !links.length) return;

  const revealTargets = Array.from(site.querySelectorAll(".work-project-heading, .model-heading, .work-media"));
  if (!reduceMotion.matches && "IntersectionObserver" in window) {
    site.classList.add("has-motion");

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.06, rootMargin: "0px 0px -7% 0px" });

    revealTargets.forEach((target) => revealObserver.observe(target));
  }

  const updateCurrentLink = () => {
    const marker = window.innerHeight * 0.4;
    const activeProject = projects.find((project) => {
      const bounds = project.getBoundingClientRect();
      return bounds.top <= marker && bounds.bottom > marker;
    }) || projects.find((project) => project.getBoundingClientRect().top > marker) || projects[projects.length - 1];
    const activeIndex = projects.indexOf(activeProject);

    links.forEach((link) => {
      const active = link.hash === `#${activeProject.id}`;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    if (currentLabel) currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  const updateReel = () => {
    if (!intro || !reel || !track || reduceMotion.matches || window.innerWidth <= 620) return;

    const bounds = intro.getBoundingClientRect();
    const travel = Math.max(1, intro.offsetHeight - window.innerHeight);
    const progress = Math.max(0, Math.min(1, -bounds.top / travel));
    const overflow = Math.max(0, track.scrollWidth - reel.clientWidth);
    const shift = Math.min(overflow, Math.min(window.innerWidth * 0.34, 460)) * progress;
    track.style.setProperty("--work-reel-shift", `${(-shift).toFixed(2)}px`);
  };

  let framePending = false;
  const scheduleScrollUpdate = () => {
    if (framePending) return;
    framePending = true;
    window.requestAnimationFrame(() => {
      updateCurrentLink();
      updateReel();
      framePending = false;
    });
  };

  window.addEventListener("scroll", scheduleScrollUpdate, { passive: true });
  window.addEventListener("resize", scheduleScrollUpdate, { passive: true });
  reduceMotion.addEventListener?.("change", () => {
    if (reduceMotion.matches && track) track.style.removeProperty("--work-reel-shift");
    scheduleScrollUpdate();
  });

  updateCurrentLink();
  updateReel();
})();
