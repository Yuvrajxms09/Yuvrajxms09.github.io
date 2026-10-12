(() => {
  const site = document.querySelector(".work-site");
  if (!site) return;

  const projects = Array.from(site.querySelectorAll(".work-project"));
  const links = Array.from(site.querySelectorAll(".work-index a"));
  const currentLabel = site.querySelector("[data-work-index-current]");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  if (!projects.length || !links.length) return;

  const revealTargets = Array.from(site.querySelectorAll(".work-project-heading, .model-heading, .work-media, .inference-overview"));
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

  const setCurrentProject = (activeProject) => {
    const activeIndex = projects.indexOf(activeProject);
    links.forEach((link) => {
      const active = link.hash === `#${activeProject.id}`;
      if (active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });

    if (currentLabel) currentLabel.textContent = String(activeIndex + 1).padStart(2, "0");
  };

  setCurrentProject(projects[0]);
  if ("IntersectionObserver" in window) {
    const activeProjectObserver = new IntersectionObserver((entries) => {
      const activeEntry = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => Math.abs(a.boundingClientRect.top - window.innerHeight * 0.47) - Math.abs(b.boundingClientRect.top - window.innerHeight * 0.47))[0];
      if (activeEntry) setCurrentProject(activeEntry.target);
    }, { rootMargin: "-42% 0px -48% 0px", threshold: 0 });

    projects.forEach((project) => activeProjectObserver.observe(project));
  }
})();
