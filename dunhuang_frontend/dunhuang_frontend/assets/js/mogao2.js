const caves = [
  {no:'第 45 窟',img:'cave45.png',era:'唐',title:'维摩诘经变',heat:118.6,zone:'北区',time:'28分钟',level:'适中',tags:['经变画','佛教本生','问疾玄思','壁画','经变故事','佛教造像'],desc:'《维摩诘经变》画面宏大，人物众多，展现盛唐社会生活与佛教艺术的融合。',detail:'画面以维摩诘问疾为核心，人物衣纹、建筑陈设与故事叙事交织，适合作为经变画入门重点观看。'},
  {no:'第 57 窟',img:'cave57.png',era:'唐',title:'美人菩萨',heat:106.3,zone:'北区',time:'32分钟',level:'轻松',tags:['菩萨像','供养人','美人菩萨','壁画','佛教造像'],desc:'美人菩萨衣褶飘逸，姿态优雅，是唐代壁画艺术交融的典范。',detail:'菩萨面容温婉，线条舒展，色彩层次柔和，适合细看唐代人物造型与审美气韵。'},
  {no:'第 61 窟',img:'cave61.png',era:'隋',title:'五台山图',heat:95.2,zone:'北区',time:'40分钟',level:'进阶',tags:['山水经变','佛教故事','五台山图','壁画','经变故事'],desc:'五台山图结构恢宏，构图严谨，反映唐代对佛教圣地的想象。',detail:'整幅图以山水、寺院、人物路线共同组织空间，是理解敦煌大型叙事壁画的好样本。'},
  {no:'第 96 窟',img:'cave96.png',era:'五代',title:'飞天',heat:128.7,zone:'北区',time:'25分钟',level:'轻松',tags:['乐舞','飞天','佛教本生','飞天伎乐','壁画'],desc:'飞天乐舞奔赴天际，色彩绚丽，姿态舒展生动。',detail:'飞天形象轻盈灵动，乐舞姿态富有节奏，是页面中热度最高的沉浸导览入口。'},
  {no:'第 130 窟',img:'cave130.png',era:'隋',title:'供养人',heat:86.7,zone:'中区',time:'30分钟',level:'适中',tags:['供养人','礼佛图','经变人物','供养人像','彩塑'],desc:'彩塑与壁画相得益彰，题材多样，反映时代礼仪与信仰。',detail:'供养人图像记录礼佛场景与服饰细节，可以从人物队列、姿态和仪式关系入手观看。'},
  {no:'第 158 窟',img:'cave158.png',era:'唐',title:'法华经变',heat:92.4,zone:'中区',time:'36分钟',level:'适中',tags:['建筑绘色','经变画','佛教故事','壁画','经变故事'],desc:'法华经变章节丰富，构图严谨，人物生动，传达众生观。',detail:'经变故事层层展开，适合跟随导览从建筑、人物和叙事段落逐步阅读。'},
  {no:'第 257 窟',img:'cave257.png',era:'北魏',title:'千手千眼观音',heat:82.9,zone:'南区',time:'42分钟',level:'进阶',tags:['千手千眼','菩萨','佛教造像','壁画'],desc:'千手千眼壁画构图宏大，造型庄严，体现北魏时期艺术风格之美。',detail:'造像庄重，构图强调神圣秩序，适合对比早期壁画的线条、比例和宗教表达。'},
  {no:'第 285 窟',img:'cave285.png',era:'元',title:'涅槃佛图',heat:78.5,zone:'南区',time:'34分钟',level:'适中',tags:['壁画局部','佛教故事','元代风格','壁画'],desc:'元代壁画色彩沉稳，线条流畅，装饰性图案丰富。',detail:'画面色彩更沉静，纹样装饰感强，可以作为晚期风格对照观看。'}
];

const wrap = document.querySelector('#cards');
const searchInput = document.querySelector('.search input');
const searchButton = document.querySelector('.search span');
const selectedPanel = document.querySelector('.selected');
const sortSelect = document.querySelector('.toolbar select');
const viewButtons = document.querySelectorAll('.view');

let visibleCaves = [...caves];
let refreshRound = 0;

function cardMeta(cave){
  const focus = cave.tags[0] || '洞窟精读';
  const note = cave.heat >= 100 ? `热度 ${cave.heat}w` : cave.level;
  return `${focus} · ${cave.time} · ${note}`;
}

function renderCards(items = visibleCaves){
  wrap.classList.toggle('is-empty', items.length === 0);
  if(items.length === 0){
    wrap.innerHTML = '<div class="empty-state"><b>没有匹配的洞窟</b><span>换一个关键词或清空筛选条件再试试。</span></div>';
    return;
  }
  wrap.innerHTML = items.map((c,index)=>`
    <article class="card" data-no="${c.no}" tabindex="0" style="--delay:${index * 36}ms">
      <div class="card-img">
        <img src="../assets/images/mogao2/${c.img}" alt="${c.no}">
        <span class="badge">${c.no}</span>
        <span class="era-badge">${c.era}</span>
      </div>
      <div class="card-body" data-meta="${cardMeta(c)}">
        <div class="tags"><span class="blue">${c.tags[0]}</span><span>${c.tags[1]}</span><span>${c.tags[2]}</span></div>
        <h4>${c.title}</h4>
        <p>${c.desc}</p>
        <div class="card-meta">${cardMeta(c)}</div>
        <div class="actions">
          <button type="button" data-action="detail">查看详情</button>
          <button type="button" class="primary" data-action="enter">进入洞窟</button>
          <button type="button" data-action="guide">导览</button>
        </div>
      </div>
    </article>
  `).join('');
}

function getChosenFilters(){
  return [...document.querySelectorAll('.filter-row')].flatMap(row =>
    [...row.querySelectorAll('button.chosen')]
      .map(btn => btn.textContent.trim())
      .filter(text => text && text !== '全部')
  );
}

function caveMatches(cave, filters, keyword){
  const haystack = [cave.no,cave.title,cave.era,cave.zone,cave.level,cave.desc,...cave.tags].join(' ');
  const searchOk = !keyword || haystack.includes(keyword);
  const filtersOk = filters.every(filter => {
    if(['热门推荐','高分洞窟','收藏最多'].includes(filter)) return cave.heat >= 90;
    if(filter.includes('分钟')) return timeMatches(cave.time, filter);
    if(filter.includes('区')) return filter.includes(cave.zone);
    return haystack.includes(filter.replace('NEW ',''));
  });
  return searchOk && filtersOk;
}

function timeMatches(time, filter){
  const minutes = Number.parseInt(time, 10);
  if(filter === '15分钟以内') return minutes <= 15;
  if(filter === '15-30分钟') return minutes >= 15 && minutes <= 30;
  if(filter === '30-60分钟') return minutes >= 30 && minutes <= 60;
  if(filter === '1小时以上') return minutes > 60;
  return true;
}

function sortItems(items){
  const type = sortSelect.value;
  const sorted = [...items];
  if(type === '浏览热度') sorted.sort((a,b) => b.heat - a.heat);
  if(type === '年代顺序') sorted.sort((a,b) => Number(a.no.match(/\d+/)[0]) - Number(b.no.match(/\d+/)[0]));
  return sorted;
}

function updateSelected(filters){
  const chips = filters.length ? filters.map(filter => `<span>${filter} ×</span>`).join('') : '<span>全部洞窟</span>';
  selectedPanel.innerHTML = `<strong>已选条件：</strong>${chips}<a>清空全部</a>`;
}

function applyFilters(){
  const filters = getChosenFilters();
  const keyword = searchInput.value.trim();
  visibleCaves = sortItems(caves.filter(cave => caveMatches(cave, filters, keyword)));
  updateSelected(filters);
  renderCards(visibleCaves);
}

function findCave(noOrText){
  return caves.find(cave => noOrText.includes(cave.no) || noOrText.includes(cave.no.replace(/\s/g,'')) || noOrText.includes(cave.title));
}

function showToast(message){
  let toast = document.querySelector('.toast');
  if(!toast){
    toast = document.createElement('div');
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => toast.classList.remove('show'), 1800);
}

function openCave(cave, mode = 'detail'){
  if(!cave) return;
  const title = mode === 'guide' ? `${cave.no} 导览` : `${cave.no} ${cave.title}`;
  let modal = document.querySelector('.cave-modal');
  if(!modal){
    modal = document.createElement('div');
    modal.className = 'cave-modal';
    modal.innerHTML = '<div class="modal-backdrop" data-close="true"></div><section class="modal-panel" role="dialog" aria-modal="true"><button class="modal-close" type="button" data-close="true">×</button><div class="modal-media"></div><div class="modal-copy"></div></section>';
    document.body.appendChild(modal);
  }
  modal.querySelector('.modal-media').innerHTML = `<img src="../assets/images/mogao2/${cave.img}" alt="${cave.no}">`;
  modal.querySelector('.modal-copy').innerHTML = `
    <span class="modal-kicker">${cave.era} · ${cave.zone} · 热度 ${cave.heat}w</span>
    <h2>${title}</h2>
    <p>${mode === 'guide' ? `推荐时长 ${cave.time}，难度 ${cave.level}。建议先看整体构图，再进入人物、纹样和故事段落。` : cave.detail}</p>
    <div class="modal-tags">${cave.tags.slice(0,5).map(tag => `<span>${tag}</span>`).join('')}</div>
    <button type="button" class="modal-primary">开始沉浸导览</button>
  `;
  modal.classList.add('open');
  document.body.classList.add('modal-open');
}

function closeModal(){
  document.querySelector('.cave-modal')?.classList.remove('open');
  document.body.classList.remove('modal-open');
}

document.querySelectorAll('.filter-row button').forEach(btn=>{
  btn.addEventListener('click',()=>{
    const row = btn.parentElement;
    if(btn.textContent.includes('更多')){
      showToast('更多筛选项已展开预留');
      return;
    }
    row.querySelectorAll('button').forEach(b=>b.classList.remove('chosen'));
    btn.classList.add('chosen');
    applyFilters();
    showToast(`已筛选：${btn.textContent.trim()}`);
  });
});

wrap.addEventListener('click',event=>{
  const card = event.target.closest('.card');
  if(!card) return;
  const cave = findCave(card.dataset.no);
  const action = event.target.dataset.action;
  if(action === 'enter') showToast(`已进入 ${cave.no} 数字洞窟`);
  openCave(cave, action === 'guide' ? 'guide' : 'detail');
});

wrap.addEventListener('keydown',event=>{
  if(event.key !== 'Enter') return;
  const card = event.target.closest('.card');
  if(card) openCave(findCave(card.dataset.no));
});

searchInput.addEventListener('input', applyFilters);
searchButton.addEventListener('click',()=>{
  applyFilters();
  showToast(searchInput.value.trim() ? `搜索：${searchInput.value.trim()}` : '已显示全部洞窟');
});

sortSelect.addEventListener('change',()=>{
  applyFilters();
  showToast(`排序方式：${sortSelect.value}`);
});

viewButtons.forEach(btn=>{
  btn.addEventListener('click',()=>{
    viewButtons.forEach(item => item.classList.remove('active'));
    btn.classList.add('active');
    wrap.classList.toggle('list-view', btn.textContent.includes('列表'));
    showToast(btn.textContent.trim());
  });
});

selectedPanel.addEventListener('click',event=>{
  if(event.target.tagName !== 'A') return;
  document.querySelectorAll('.filter-row').forEach(row => {
    row.querySelectorAll('button').forEach(btn => btn.classList.remove('chosen'));
    row.querySelector('button')?.classList.add('chosen');
  });
  searchInput.value = '';
  applyFilters();
  showToast('已清空全部条件');
});

document.querySelector('#loadMore').addEventListener('click',()=>{
  refreshRound += 1;
  const filters = getChosenFilters();
  const keyword = searchInput.value.trim();
  const hotItems = caves
    .filter(cave => caveMatches(cave, filters, keyword))
    .sort((a,b) => b.heat - a.heat);
  const offset = hotItems.length ? refreshRound % hotItems.length : 0;
  visibleCaves = [...hotItems.slice(offset), ...hotItems.slice(0, offset)];
  updateSelected(filters);
  renderCards(visibleCaves);
  document.querySelector('#loadMore').textContent = '已按热度刷新推荐';
  showToast('已刷新更多热门洞窟');
});

document.querySelectorAll('.ranking li').forEach(item=>{
  item.addEventListener('click',()=>openCave(findCave(item.textContent)));
});

document.querySelectorAll('.combo-item').forEach(item=>{
  item.addEventListener('click',event=>{
    if(event.target.tagName === 'BUTTON') event.stopPropagation();
    item.classList.toggle('applied');
    showToast(item.classList.contains('applied') ? `已应用：${item.childNodes[0].textContent.trim()}` : '已取消路线');
  });
});

document.querySelectorAll('.era-tabs span').forEach(tab=>{
  tab.addEventListener('click',()=>{
    document.querySelectorAll('.era-tabs span').forEach(item => item.classList.remove('on'));
    tab.classList.add('on');
    showToast(`已切换年代：${tab.textContent.replace(/\s+/g,' ')}`);
  });
});

document.querySelectorAll('.today-box button,.today-box img,.today-box b').forEach(item=>{
  item.addEventListener('click',()=>openCave(findCave('第 57 窟')));
});

document.querySelector('.recent h3 a')?.addEventListener('click',event=>{
  event.stopPropagation();
  document.querySelectorAll('.recent p').forEach(item => item.remove());
  showToast('最近浏览已清空');
});

document.querySelectorAll('.recent p').forEach(item=>{
  item.addEventListener('click',()=>openCave(findCave(item.textContent)));
});

document.querySelectorAll('.nav a').forEach(link=>{
  link.addEventListener('click',()=>{
    document.querySelectorAll('.nav a').forEach(item => item.classList.remove('active'));
    link.classList.add('active');
    showToast(`切换到：${link.textContent.trim()}`);
  });
});

document.querySelectorAll('.hero-tags span,.stats-card div').forEach(item=>{
  item.addEventListener('click',()=>showToast(item.textContent.trim()));
});

document.addEventListener('click',event=>{
  if(event.target.dataset.close) closeModal();
  if(event.target.classList.contains('modal-primary')) showToast('沉浸导览已启动');
});

document.addEventListener('keydown',event=>{
  if(event.key === 'Escape') closeModal();
});

applyFilters();
