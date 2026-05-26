const modules = [
  { no: '01', title: '敦煌溯源', short: '开卷入境，启幕千年敦煌。', icon: '飞天' },
  { no: '02', title: '莫高云境', short: '云入石窟，近观壁上千年。', icon: '楼阁' },
  { no: '03', title: '万象宝库', short: '入画寻踪，探访丝路奇谭。', icon: '洞窟' },
  { no: '04', title: '丝路智网', short: '丝路成网，连缀千年文脉。', icon: '壁画' },
  { no: '05', title: '妙绘奇境', short: '入画成境，解锁敦煌互动奇遇。', icon: '驼队' },
  { no: '06', title: '九色鹿鸣', short: '鹿鸣于野，共话敦煌新声。', icon: '鹿鸣' },
  { no: '07', title: '我的藏窟', short: '藏一方所见，留一程所行。', icon: '城阙' }
];

const moduleLinks = {
  '01': 'pages/community.html',
  '03': 'pages/treasure.html',
  '05': 'pages/game.html',
  '06': 'pages/origin.html',
  '07': 'pages/profile.html'
};

const mogaoOptions = [
  { title: '云游洞窟', href: 'pages/mogao1.html' },
  { title: '洞窟筛选', href: 'pages/mogao2.html' }
];

const knowledgeOptions = [
  { title: '知识图谱', href: 'pages/knowledge1.html' },
  { title: '智能检索', href: 'pages/knowledge2.html' }
];

const moduleOptionSets = {
  '02': {
    label: '莫高云境板块',
    options: mogaoOptions
  },
  '04': {
    label: '丝路智网板块',
    options: knowledgeOptions
  }
};

modules.forEach(module => {
  module.href = moduleLinks[module.no];
});

const body = document.body;
const introScreen = document.getElementById('introScreen');
const enterBtn = document.getElementById('enterBtn');
const skipBtn = document.getElementById('skipBtn');
const moduleDock = document.getElementById('moduleDock');
const moduleGrid = document.getElementById('moduleGrid');
const centerLabel = document.getElementById('centerLabel');
const backHome = document.getElementById('backHome');
const closeDock = document.getElementById('closeDock');
let autoDockTimer = null;
const directHome = new URLSearchParams(window.location.search).get('view') === 'home';

function enterSite() {
  body.classList.add('entered');
  scheduleAutoDock();
}

function enterHomeView() {
  body.classList.add('entered');
  openDock();
}

function openDock() {
  clearAutoDock();
  moduleDock.classList.add('show');
  closeAiAssistant();
}

function closeDockPanel() {
  clearAutoDock();
  moduleDock.classList.remove('show');
}

function goBackHome() {
  clearAutoDock();
  moduleDock.classList.remove('show');
  closeAiAssistant();
  body.classList.remove('entered');
}

function scheduleAutoDock() {
  clearAutoDock();
  autoDockTimer = window.setTimeout(() => {
    if (body.classList.contains('entered')) {
      openDock();
    }
  }, 1500);
}

function clearAutoDock() {
  if (!autoDockTimer) return;
  window.clearTimeout(autoDockTimer);
  autoDockTimer = null;
}

function closeAiAssistant() {
  if (window.closeLingxiAiPanel) {
    window.closeLingxiAiPanel();
  }
}

function renderModules() {
  moduleGrid.innerHTML = modules.map(m => {
    const optionSet = moduleOptionSets[m.no];
    const tag = m.href ? 'a' : 'article';
    const href = m.href ? ` href="${m.href}"` : '';
    const optionPanel = optionSet ? `
      <div class="mogao-choice-panel" aria-label="${optionSet.label}">
        ${optionSet.options.map(option => `<a class="mogao-choice" href="${option.href}">${option.title}</a>`).join('')}
      </div>
    ` : '';

    return `
    <${tag} class="module-card${optionSet ? ' has-mogao-choices' : ''}" data-no="${m.no}" data-icon="${m.icon}"${href}${optionSet ? ' tabindex="0" role="button" aria-expanded="false"' : ''}>
      <b>${m.no}</b>
      <strong>${m.title}</strong>
      <span>${m.short}</span>
      ${optionPanel}
      <i class="module-ornament">
        <img src="assets/images/welcome/cut-${Number(m.no)}.png" alt="" />
      </i>
    </${tag}>
  `;
  }).join('');
}

function closeMogaoChoices(exceptCard = null) {
  moduleGrid.querySelectorAll('.has-mogao-choices.show-choices').forEach(card => {
    if (card === exceptCard) return;
    card.classList.remove('show-choices');
    card.setAttribute('aria-expanded', 'false');
  });
}

function toggleMogaoChoices(card) {
  const willShow = !card.classList.contains('show-choices');
  closeMogaoChoices(card);
  card.classList.toggle('show-choices', willShow);
  card.setAttribute('aria-expanded', String(willShow));
}

function createParticles() {
  const holder = document.getElementById('particles');
  const count = window.innerWidth < 760 ? 32 : 70;
  holder.innerHTML = '';

  for (let i = 0; i < count; i++) {
    const p = document.createElement('i');
    p.className = 'particle';
    p.style.left = `${Math.random() * 100}%`;
    p.style.setProperty('--dur', `${7 + Math.random() * 9}s`);
    p.style.setProperty('--move', `${-60 + Math.random() * 120}px`);
    p.style.animationDelay = `${Math.random() * 8}s`;
    holder.appendChild(p);
  }
}

enterBtn.addEventListener('click', enterSite);
skipBtn.addEventListener('click', enterSite);
introScreen.addEventListener('dblclick', enterSite);
centerLabel.addEventListener('click', openDock);
backHome.addEventListener('click', goBackHome);
closeDock.addEventListener('click', closeDockPanel);
moduleGrid.addEventListener('click', event => {
  if (event.target.closest('.mogao-choice')) return;
  const mogaoCard = event.target.closest('.has-mogao-choices');
  if (!mogaoCard) {
    closeMogaoChoices();
    return;
  }
  toggleMogaoChoices(mogaoCard);
});
moduleGrid.addEventListener('keydown', event => {
  if (event.key !== 'Enter' && event.key !== ' ') return;
  const mogaoCard = event.target.closest('.has-mogao-choices');
  if (!mogaoCard || event.target.closest('.mogao-choice')) return;
  event.preventDefault();
  toggleMogaoChoices(mogaoCard);
});

renderModules();
createParticles();
if (directHome) enterHomeView();
window.addEventListener('resize', createParticles);
