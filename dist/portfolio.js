(() => {
  const dialog = document.querySelector('#project-dialog');
  if (!dialog || typeof dialog.showModal !== 'function') return;
  const title = dialog.querySelector('#dialog-title');
  const content = dialog.querySelector('#dialog-content');
  const close = dialog.querySelector('.dialog-close');
  let opener = null;
  let backdropDown = false;
  let priorOverflow = '';

  for (const card of document.querySelectorAll('.project, .job, .academic-project')) {
    const details = card.querySelector('.case-fallback');
    const trigger = card.querySelector('.expand-trigger');
    if (!details || !trigger) continue;
    trigger.addEventListener('click', () => {
      if (dialog.open) return;
      title.textContent = trigger.dataset.title || trigger.dataset.project;
      dialog.querySelector('.eyebrow').textContent = trigger.dataset.category || 'Behind the project';
      dialog.querySelector('.dialog-inner').setAttribute('aria-label', trigger.dataset.category ? 'Role details' : 'Project story');
      content.replaceChildren();
      const visual = Array.from(card.querySelectorAll('.workflow-visual, .screen-visual')).find(node => !details.contains(node));
      if (visual) content.append(visual.cloneNode(true));
      const story = details.querySelector('.case');
      if (story) content.append(story.cloneNode(true));
      const actions = card.querySelector('.actions');
      if (actions) content.append(actions.cloneNode(true));
      opener = trigger;
      priorOverflow = document.body.style.overflow;
      dialog.showModal();
      document.body.style.overflow = 'hidden';
      dialog.querySelector('.dialog-inner').scrollTop = 0;
      close.focus({ preventScroll: true });
    });
    trigger.hidden = false;
    details.hidden = true;
  }
  close.addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => {
    document.body.style.overflow = priorOverflow;
    backdropDown = false;
    if (opener && opener.isConnected) opener.focus({ preventScroll: true });
  });
  const outside = (event) => {
    const rect = dialog.getBoundingClientRect();
    return event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom;
  };
  dialog.addEventListener('pointerdown', (event) => {
    backdropDown = event.target === dialog && outside(event);
  });
  dialog.addEventListener('click', (event) => {
    if (backdropDown && event.target === dialog && outside(event)) dialog.close();
    backdropDown = false;
  });
})();
