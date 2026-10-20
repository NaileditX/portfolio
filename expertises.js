(() => {
  const english = document.documentElement.lang === 'en';
  const zone = document.querySelector('#expertises');
  if (!zone) return;
  const layout = zone.querySelector('.expertise-layout');
  const buttons = [...zone.querySelectorAll('[data-expertise]')];
  const panels = [...zone.querySelectorAll('.expertise-detail')];
  const status = zone.querySelector('.expertise-status');
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  const instruction = zone.querySelector('.expertise-instruction');
  let active = null, panelTimer;

  const synchronize = () => {
    buttons.forEach(button => {
      const selected = button === active;
      button.setAttribute('aria-expanded', String(selected));
      zone.querySelector(`[data-branch="${button.dataset.expertise}"]`)?.classList.toggle('is-selected', selected);
    });
  };
  const reveal = button => {
    clearTimeout(panelTimer);
    active = button;
    const panel = document.getElementById(button.getAttribute('aria-controls'));
    panels.forEach(other => { other.open = other === panel; });
    layout.classList.add('has-active');
    synchronize();
    status.textContent = `${panel.querySelector('summary').textContent}: ${english ? 'details displayed.' : 'détails affichés.'}`;
    if (matchMedia('(max-width: 900px)').matches) {
      requestAnimationFrame(() => {
        if (active !== button) return;
        const bounds = panel.getBoundingClientRect();
        if (bounds.top > innerHeight - 140) window.scrollBy({ top: Math.min(bounds.top - innerHeight + 220, 220), behavior: reduced.matches ? 'instant' : 'smooth' });
      });
    }
  };
  const collapse = () => {
    clearTimeout(panelTimer);
    active = null;
    layout.classList.remove('has-active');
    synchronize();
    status.textContent = english ? 'Details hidden, map centred.' : 'Détails masqués, graphique recentré.';
    // Garder le contenu pendant le fondu, puis fermer les rubriques.
    panelTimer = setTimeout(() => {
      if (!active) panels.forEach(panel => { panel.open = false; });
    }, reduced.matches ? 0 : 230);
  };

  buttons.forEach(button => {
    // Le clic natif couvre aussi Entrée, Espace et le toucher.
    button.addEventListener('click', () => {
      if (active === button) collapse();
      else reveal(button);
    });
  });
  panels.forEach(panel => panel.addEventListener('toggle', () => {
    if (active?.getAttribute('aria-controls') === panel.id && !panel.open) collapse();
  }));
  document.addEventListener('keydown', event => {
    if (event.key !== 'Escape' || !active) return;
    const button = active;
    collapse();
    button.focus({ preventScroll:true });
  });
  instruction.textContent = english ? 'Click a topic to explore it.' : 'Cliquez sur un domaine pour afficher ses détails.';
  const initialButton = buttons.find(button => button.dataset.expertise === 'ihm');
  if (initialButton) reveal(initialButton);
  else synchronize();
})();
