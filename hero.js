(() => {
  const intro = document.querySelector('#site-intro');
  if (!intro) return;
  // Les liens directs vers une section et les retours dans l’historique restent immédiats.
  const navigation = performance.getEntriesByType('navigation')[0];
  if (location.hash || navigation?.type === 'back_forward') return;
  const content = [document.querySelector('.site-header'), document.querySelector('main'), document.querySelector('footer')].filter(Boolean);
  intro.hidden = false;
  document.body.classList.add('intro-active');
  content.forEach(element => { element.inert = true; });
  let finished = false;
  const finish = () => {
    if (finished) return;
    finished = true;
    intro.hidden = true;
    document.body.classList.remove('intro-active');
    content.forEach(element => { element.inert = false; });
  };
  const welcomeTimer = setTimeout(() => {
    if (finished) return;
    intro.querySelector('.intro-loading').hidden = true;
    intro.querySelector('.intro-welcome').hidden = false;
  }, 1000);
  const exitTimer = setTimeout(() => {
    intro.classList.add('is-leaving');
    setTimeout(finish, 350);
  }, 1650);
  // Échap permet de passer l’intro.
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') { clearTimeout(welcomeTimer); clearTimeout(exitTimer); finish(); }
  });
  window.addEventListener('pageshow', event => { if (event.persisted) finish(); });
  setTimeout(finish, 2600);
})();
