const isEnglish = document.documentElement.lang === 'en';
﻿document.documentElement.classList.add('navigation-ready');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.nav');
menuButton?.addEventListener('click', () => {
  const open = menuButton.getAttribute('aria-expanded') !== 'true';
  menuButton.setAttribute('aria-expanded', String(open));
  navigation.dataset.open = String(open);
  menuButton.textContent = open ? (isEnglish ? 'Close ×' : 'Fermer ×') : 'Menu +';
});
navigation?.addEventListener('click', event => {
  if (!event.target.closest('a')) return;
  navigation.dataset.open = 'false';
  menuButton?.setAttribute('aria-expanded', 'false');
  if (menuButton) menuButton.textContent = 'Menu +';
});
document.addEventListener('keydown', event => {
  if (event.key === 'Escape' && navigation?.dataset.open === 'true') {
    navigation.dataset.open = 'false';
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.textContent = 'Menu +';
    menuButton.focus();
  }
});

const sections = [...document.querySelectorAll('main > section[id]')];
if (sections.length) {
  let navigationUpdatePending = false;
  const updateActiveSection = () => {
    navigationUpdatePending = false;
    const readingLine = innerHeight * .4;
    const active = sections.find(section => {
      const bounds = section.getBoundingClientRect();
      return bounds.top <= readingLine && bounds.bottom > readingLine;
    });
    if (!active) return;
    navigation?.querySelectorAll('a[href^="#"]').forEach(link => {
      if (link.hash === `#${active.id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  };
  const scheduleNavigationUpdate = () => {
    if (!navigationUpdatePending) { navigationUpdatePending = true; requestAnimationFrame(updateActiveSection); }
  };
  window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
  window.addEventListener('resize', scheduleNavigationUpdate, { passive: true });
  window.addEventListener('hashchange', scheduleNavigationUpdate);
  window.addEventListener('load', scheduleNavigationUpdate);
  scheduleNavigationUpdate();
}

const filters = document.querySelectorAll('[data-filter-year]');
filters.forEach(button => button.addEventListener('click', () => {
  const year = button.dataset.filterYear;
  filters.forEach(filter => filter.setAttribute('aria-pressed', String(filter === button)));
  let count = 0;
  document.querySelectorAll('.publication[data-year]').forEach(publication => {
    publication.hidden = year !== 'all' && publication.dataset.year !== year;
    if (!publication.hidden) count++;
  });
  const status = document.querySelector('#publication-status');
  if (status) status.textContent = isEnglish ? `${count} publication${count === 1 ? '' : 's'} shown.` : `${count} publication${count > 1 ? 's' : ''} affichée${count > 1 ? 's' : ''}.`;
}));

// Les lecteurs tiers sont chargés uniquement après un clic explicite.
const modal = document.querySelector('#video-modal');
let videoTrigger;
document.querySelectorAll('[data-video]').forEach(button => {
  button.addEventListener('click', () => {
    if (!modal?.showModal) { window.location.href = button.dataset.videoLink; return; }
    videoTrigger = button;
    modal.querySelector('#video-title').textContent = button.dataset.videoTitle;
    const frame = document.createElement('iframe');
    frame.src = button.dataset.video;
    frame.title = button.dataset.videoTitle;
    frame.allow = 'autoplay; encrypted-media; fullscreen; picture-in-picture';
    frame.allowFullscreen = true;
    frame.referrerPolicy = 'strict-origin-when-cross-origin';
    modal.querySelector('.video-frame').replaceChildren(frame);
    modal.querySelector('.modal-fallback a').href = button.dataset.videoLink;
    modal.showModal();
  });
});
const closeVideo = () => {
  modal.querySelector('.video-frame').replaceChildren();
  modal.close();
};
modal?.querySelector('.modal-close').addEventListener('click', closeVideo);
modal?.addEventListener('click', event => { if (event.target === modal) closeVideo(); });
modal?.addEventListener('cancel', () => modal.querySelector('.video-frame').replaceChildren());
modal?.addEventListener('close', () => {
  modal.querySelector('.video-frame').replaceChildren();
  videoTrigger?.focus();
});

