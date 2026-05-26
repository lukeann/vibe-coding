const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

const interactiveSelector = [
  '.module-card',
  '.quick-item',
  '.step',
  '.small-banner',
  '.badges span',
  '.record-list li',
  'button'
].join(', ');

function pressFeedback(el) {
  if (prefersReducedMotion.matches) return;

  el.animate([
    { transform: 'scale(1)' },
    { transform: 'scale(.97)' },
    { transform: 'scale(1)' }
  ], { duration: 180, easing: 'ease-out' });
}

function addRipple(el, event) {
  return;
}

document.querySelectorAll(interactiveSelector).forEach(el => {
  el.classList.add('fx-focus', 'fx-clickable');

  if (!el.matches('button')) {
    el.tabIndex = 0;
    el.setAttribute('role', 'button');
  }

  el.addEventListener('mouseenter', () => el.classList.add('is-hover'));
  el.addEventListener('mouseleave', () => el.classList.remove('is-hover'));

  el.addEventListener('click', event => {
    if (!el.matches('button') && event.target.closest('button')) return;

    pressFeedback(el);
    addRipple(el, event);
  });

  el.addEventListener('keydown', event => {
    if (event.key !== 'Enter' && event.key !== ' ') return;

    event.preventDefault();
    pressFeedback(el);
    addRipple(el);
  });
});
