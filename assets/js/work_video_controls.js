(() => {
  const canFullscreen = (video) => Boolean(video.requestFullscreen || video.webkitEnterFullscreen);

  document.querySelectorAll(".work-media").forEach((media) => {
    const video = media.querySelector("video");
    const button = media.querySelector("[data-video-fullscreen]");
    if (video && button && canFullscreen(video)) button.hidden = false;
  });

  document.addEventListener("click", (event) => {
    const button = event.target instanceof Element ? event.target.closest("[data-video-fullscreen]") : null;
    if (!button) return;

    const video = button.closest(".work-media")?.querySelector("video");
    if (!video) return;

    if (video.requestFullscreen) {
      Promise.resolve(video.requestFullscreen()).catch(() => {});
    } else if (video.webkitEnterFullscreen) {
      video.webkitEnterFullscreen();
    }
  });
})();
