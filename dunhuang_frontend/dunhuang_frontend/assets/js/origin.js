const icons = {
  edit: '<svg viewBox="0 0 24 24"><path d="M4 20h4L19 9l-4-4L4 16v4Z"/><path d="M13 7l4 4"/></svg>',
  ticket: '<svg viewBox="0 0 24 24"><path d="M4 7a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v3a2 2 0 0 0 0 4v3a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-3a2 2 0 0 0 0-4V7Z"/><path d="M9 9h6M9 15h6"/></svg>',
  calendar: '<svg viewBox="0 0 24 24"><path d="M5 5h14v15H5z"/><path d="M8 3v4M16 3v4M5 10h14"/></svg>',
  folder: '<svg viewBox="0 0 24 24"><path d="M3 7h7l2 3h9v9H3z"/></svg>',
  chat: '<svg viewBox="0 0 24 24"><path d="M5 6h14v10H9l-4 4V6Z"/><path d="M8 10h.01M12 10h.01M16 10h.01"/></svg>'
};
document.querySelectorAll('[data-icon]').forEach(el => { el.innerHTML = icons[el.dataset.icon] || ''; });

document.querySelectorAll('.quick-item,.card button,.nav a').forEach(el=>{
  el.addEventListener('mouseenter',()=>el.classList.add('is-hover'));
  el.addEventListener('mouseleave',()=>el.classList.remove('is-hover'));
});

const feed = document.querySelector('.feed-card ul');
if(feed){
  setInterval(()=>{
    const first = feed.firstElementChild;
    feed.appendChild(first.cloneNode(true));
    first.remove();
  }, 2500);
}
