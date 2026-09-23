(() => {
  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const welcome = document.querySelector('#welcome-dialog');
  const replay = document.querySelector('.replay-welcome');
  const skip = welcome?.querySelector('.welcome-skip');
  let autoClose;
  let exitTimer;
  let previousFocus;
  let previousOverflow;

  const closeWelcome = (immediate = false) => {
    if (!welcome?.open) return;
    clearTimeout(autoClose);
    clearTimeout(exitTimer);
    if (immediate || motion.matches) welcome.close();
    else {
      welcome.classList.add('is-leaving');
      exitTimer = setTimeout(() => welcome.close(), 320);
    }
  };

  const showWelcome = (automatic) => {
    if (!welcome || welcome.open || typeof welcome.showModal !== 'function') return;
    previousFocus = document.activeElement;
    previousOverflow = document.body.style.overflow;
    welcome.classList.remove('is-leaving');
    welcome.showModal();
    document.body.style.overflow = 'hidden';
    if (automatic) autoClose = setTimeout(() => closeWelcome(), 4200);
  };

  if (welcome && typeof welcome.showModal === 'function') {
    replay.hidden = false;
    skip.addEventListener('click', () => closeWelcome());
    replay.addEventListener('click', () => showWelcome(false));
    welcome.addEventListener('close', () => {
      clearTimeout(autoClose);
      clearTimeout(exitTimer);
      document.body.style.overflow = previousOverflow || '';
      welcome.classList.remove('is-leaving');
      if (previousFocus instanceof HTMLElement && previousFocus !== document.body) previousFocus.focus({preventScroll:true});
      else {
        const heading = document.querySelector('#intro-title');
        heading.setAttribute('tabindex','-1');
        heading.focus({preventScroll:true});
        heading.addEventListener('blur', () => heading.removeAttribute('tabindex'), {once:true});
      }
    });
    // Show on every page load, independent of prior visits or browser storage.
    showWelcome(true);
  }

})();
