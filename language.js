// Keep the current section when explicitly switching language. No automatic redirect.
document.querySelectorAll('[data-language-link]').forEach(link => {
  const update = () => {
    const url = new URL(link.getAttribute('href'), location.href);
    url.hash = location.hash;
    link.href = url.href;
  };
  update();
  window.addEventListener('hashchange', update);
});
