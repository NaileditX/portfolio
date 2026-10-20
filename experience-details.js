// Les logos restent visibles sans JavaScript ou avec réduction des mouvements.
(() => {
  const logos = document.querySelector('.partner-logos');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  if (!logos || reducedMotion.matches || !('IntersectionObserver' in window)) return;

  const reveal = () => {
    logos.classList.remove('is-pending');
    observer.disconnect();
  };
  const observer = new IntersectionObserver(entries => {
    if (entries.some(entry => entry.isIntersecting)) reveal();
  }, { threshold: .15 });

  logos.classList.add('is-pending');
  observer.observe(logos);
  reducedMotion.addEventListener('change', event => {
    if (event.matches) reveal();
  });
})();
