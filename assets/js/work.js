(() => {
  const site = document.querySelector(".work-site");
  if (!site || !("IntersectionObserver" in window)) return;

  const projects = Array.from(site.querySelectorAll(".work-project"));
  const links = Array.from(site.querySelectorAll(".work-index a"));
  if (!projects.length || !links.length) return;

  if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    site.classList.add("has-scroll-motion");

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: "0px 0px -8% 0px" });

    projects.forEach((project) => revealObserver.observe(project));
  }

  const updateCurrentLink = () => {
    const marker = window.innerHeight * 0.4;
    const activeProject = projects.find((project) => {
      const bounds = project.getBoundingClientRect();
      return bounds.top <= marker && bounds.bottom > marker;
    }) || projects.find((project) => project.getBoundingClientRect().top > marker) || projects[projects.length - 1];

    links.forEach((link) => {
      if (link.hash === `#${activeProject.id}`) {
        link.setAttribute("aria-current", "location");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  };

  const navigationObserver = new IntersectionObserver(updateCurrentLink, {
    rootMargin: "-35% 0px -55% 0px"
  });

  projects.forEach((project) => navigationObserver.observe(project));
  updateCurrentLink();
})();
