(() => {
  const journey = document.querySelector('.education-journey');
  if (!journey) return;
  const track = journey.querySelector('.journey-track');
  const studies = [...journey.querySelectorAll('.study')];
  const markers = studies.map(study => study.querySelector('.study-marker'));
  const reduced = matchMedia('(prefers-reduced-motion: reduce)');
  let top = 0, height = 1, stops = [], scheduled = false;
  const measure = () => {
    const bounds = journey.getBoundingClientRect();
    const first = markers[0].getBoundingClientRect();
    const last = markers.at(-1).getBoundingClientRect();
    top = first.top + first.height/2 - bounds.top;
    height = Math.max(1, last.top + last.height/2 - bounds.top - top);
    const axis = first.left + first.width/2 - bounds.left;
    stops = markers.map(marker => {
      const point = marker.getBoundingClientRect();
      return point.top + point.height/2 - bounds.top - top;
    });
    journey.style.setProperty('--journey-axis', `${axis}px`);
    journey.style.setProperty('--journey-top', `${top}px`);
    journey.style.setProperty('--journey-height', `${height}px`);
  };
  const update = () => {
    scheduled = false;
    const bounds = track.getBoundingClientRect();
    const progress = Math.max(0, Math.min(height, innerHeight * .53 - bounds.top));
    journey.style.setProperty('--journey-progress', `${progress.toFixed(2)}px`);
    journey.dataset.progress = (progress / height).toFixed(3);
    let current = 0;
    stops.forEach((stop, index) => { if (progress >= stop - 2) current = index; });
    studies.forEach((study, index) => {
      if (progress >= stops[index] - 85 || reduced.matches) study.classList.add('is-revealed');
      study.classList.toggle('is-reached', progress >= stops[index] - 2);
      study.classList.toggle('is-current', index === current);
    });
  };
  const schedule = () => {
    if (!scheduled) { scheduled = true; requestAnimationFrame(update); }
  };
  const refresh = () => { measure(); schedule(); };
  journey.classList.add('is-enhanced');
  window.addEventListener('scroll', schedule, { passive:true });
  window.addEventListener('resize', refresh, { passive:true });
  window.addEventListener('load', refresh);
  window.addEventListener('pageshow', refresh);
  reduced.addEventListener('change', schedule);
  new ResizeObserver(refresh).observe(journey);
  refresh();
})();
