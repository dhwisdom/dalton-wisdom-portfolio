/* Scroll-linked opacity. No once-only observers or dependency on the welcome. */
(() => {
  const items = Array.from(document.querySelectorAll(
    '.section-head, .job, .education-item, .project, .other-projects article, .strengths, .contact'
  ));
  if (!items.length || typeof window.requestAnimationFrame !== 'function') return;

  let scheduled = false;
  const lastValues = new WeakMap();
  const viewportHeight = () => window.visualViewport?.height || document.documentElement.clientHeight || window.innerHeight;
  const draw = () => {
    scheduled = false;
    const height = viewportHeight();
    if (!height) return;
    // Read all bounds before writing styles. Full opacity well before reading position.
    const values = items.map(item => {
      const top = item.getBoundingClientRect().top;
      if (item.contains(document.activeElement)) return 1;
      return Math.max(0, Math.min(1, (height * .98 - top) / (height * .26)));
    });
    items.forEach((item, index) => {
      const value = values[index].toFixed(3);
      if (lastValues.get(item) === value) return;
      item.style.setProperty('--scroll-opacity', value);
      item.classList.add('scroll-reveal');
      lastValues.set(item, value);
    });
  };
  const schedule = () => {
    if (scheduled) return;
    scheduled = true;
    window.requestAnimationFrame(draw);
  };

  // Capture also catches scrolling within an embedding or nested scroll container.
  document.addEventListener('scroll', schedule, {passive:true, capture:true});
  window.addEventListener('scroll', schedule, {passive:true});
  window.addEventListener('resize', schedule, {passive:true});
  window.addEventListener('pageshow', schedule);
  window.addEventListener('load', schedule);
  window.visualViewport?.addEventListener('resize', schedule, {passive:true});
  document.addEventListener('focusin', schedule);
  document.addEventListener('focusout', schedule);
  document.querySelector('#welcome-dialog')?.addEventListener('close', schedule);
  // Covers image/font reflow and the expanded no-JavaScript detail fallbacks.
  if ('ResizeObserver' in window) {
    const resize = new ResizeObserver(schedule);
    resize.observe(document.body);
  }
  document.fonts?.ready.then(schedule);
  schedule();
})();
