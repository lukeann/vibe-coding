const img = (name) => `assets/images/${name}`;
const mural = [
  ['flyer.webp','飞天'],['deer.webp','九色鹿'],['pipa_dance.webp','反弹琵琶'],['zhangqian.webp','张骞出使西域'],
  ['luer.webp','鹿王本生'],['dance_map.webp','乐舞图'],['donor.webp','供养人画像'],['featured_pipa.webp','维摩诘经变']
];
const sculpture = [
  ['buddha.webp','佛像'],['bodhisattva.webp','菩萨像'],['serene_buddha_in_ornate_temple_setting.webp','弟子像'],['cat_sculpture.webp','天王力士像'],
  ['lying_buddha.webp','卧佛'],['featured_buddha.webp','中心塔柱造像'],['serene_buddha_in_illuminated_shrine_setting.webp','供养人像'],['buddha.webp','罗汉像']
];
const pattern = [
  ['lotus.webp','莲花纹'],['baoxiang.webp','忍冬纹'],['cloud_pattern.webp','云气纹'],['flame.webp','火焰纹'],
  ['baoxiang.webp','宝相花'],['ribbon.webp','飞天飘带'],['edge_pattern.webp','边饰图案'],['cat_pattern.webp','几何纹样']
];
function renderMini(id, data){
  const el=document.getElementById(id);
  el.innerHTML=data.map(([im,t])=>`<article class="mini-card" role="button" tabindex="0" aria-label="查看${t}"><img src="${img(im)}" onerror="this.src='${img('cat_pattern.webp')}'"><p>${t}</p></article>`).join('');
}
renderMini('muralGrid', mural); renderMini('sculptureGrid', sculpture); renderMini('patternGrid', pattern);
const audio = [
  ['cat_audio.webp','反弹琵琶乐段','02:48','assets/audio/反弹琵琶.mp3'],['floating_harmony_in_a_dreamscape.webp','箜篌音色','03:12','assets/audio/箜篌.mp3'],['cat_audio.webp','笙乐片段','02:36','assets/audio/笙音.mp3'],['featured_audio.webp','鼓乐片段','02:15','assets/audio/鼓乐.mp3']
];
document.getElementById('audioGrid').innerHTML = audio.map(([im,t,time,src])=>`<div class="audio-card" role="button" tabindex="0" aria-label="播放${t}" data-src="${src}"><img src="${img(im)}" onerror="this.src='${img('cat_audio.webp')}'"><div><h4>${t}</h4><div class="wave"></div><small>唐代 · 古乐复原</small></div><button class="play" type="button" aria-label="播放${t}">▶</button></div>`).join('');
const video=[['cat_video.webp','反弹琵琶舞姿','02:18'],['featured_pipa.webp','飞天舞姿','01:56'],['graceful_dance_among_ancient_temples.webp','敦煌舞动作展示','03:24'],['pipa_dance.webp','壁画动作复原','02:47']];
document.getElementById('videoGrid').innerHTML = video.map(([im,t,time])=>`<div class="video-card" role="button" tabindex="0" aria-label="预览${t}"><img src="${img(im)}" onerror="this.src='${img('cat_video.webp')}'"><b>${t}</b><small>${time}</small></div>`).join('');
const featured=[
  ['featured_deer.webp','莫高窟第217窟《九色鹿经变》','表现九色鹿救人渡河的故事场景，画面精美，色彩清雅。'],
  ['featured_pipa.webp','莫高窟第149窟《反弹琵琶》','乐舞题材代表作，人物姿态优美，线条流畅飘逸。'],
  ['featured_buddha.webp','莫高窟第61窟 佛陀座像','面容慈祥，衣纹自然，具有早期彩塑风格特征。'],
  ['featured_pattern.webp','忍冬纹样（唐代）','常见装饰纹样，寓意生生不息，纹样优美流畅。'],
  ['featured_audio.webp','敦煌古乐复原：反弹琵琶','根据壁画与文献复原的古乐演奏片段，音色清雅。']
];
document.getElementById('featuredGrid').innerHTML = featured.map(([im,t,d],i)=>`<article class="feature-card" role="button" tabindex="0" aria-label="查看${t}"><img src="${img(im)}"><div><h4>${t}</h4><p>${d}</p><div class="stats"><span>◉ ${(12.5-i*2.1).toFixed(1)}k</span><span>♡ ${1200-i*140}</span><span>☆</span></div></div></article>`).join('');

const toast = document.createElement('div');
toast.className = 'toast';
toast.setAttribute('role', 'status');
toast.setAttribute('aria-live', 'polite');
document.body.appendChild(toast);
let toastTimer;
function showToast(text){
  window.clearTimeout(toastTimer);
  toast.textContent = text;
  toast.classList.add('show');
  toastTimer = window.setTimeout(() => toast.classList.remove('show'), 1500);
}

document.querySelectorAll('.category-card,.support-grid div,.quick div,.block-head a,.section-title a').forEach((el) => {
  el.setAttribute('role', 'button');
  el.tabIndex = 0;
});

document.querySelectorAll('.hot-tags span').forEach((tag) => {
  tag.setAttribute('role', 'button');
  tag.tabIndex = 0;
  tag.addEventListener('click', () => {
    document.querySelectorAll('.hot-tags span').forEach((item) => item.classList.remove('is-active'));
    tag.classList.add('is-active');
    const input = document.querySelector('.search-box input');
    input.value = tag.textContent.trim();
    input.focus();
    showToast(`已填入「${input.value}」`);
  });
});

document.querySelectorAll('.filter-row').forEach((row) => {
  row.querySelectorAll('span').forEach((option) => {
    option.setAttribute('role', 'button');
    option.tabIndex = 0;
    option.addEventListener('click', () => {
      row.querySelectorAll('span').forEach((item) => item.classList.remove('on'));
      option.classList.add('on', 'tap-flash');
      window.setTimeout(() => option.classList.remove('tap-flash'), 260);
    });
  });
});

document.querySelector('.filter-title button')?.addEventListener('click', () => {
  document.querySelectorAll('.filter-row').forEach((row) => {
    row.querySelectorAll('span').forEach((item) => item.classList.remove('on'));
    row.querySelector('span')?.classList.add('on');
  });
  showToast('筛选已清空');
});

document.querySelector('.search-box button')?.addEventListener('click', () => {
  const keyword = document.querySelector('.search-box input').value.trim();
  showToast(keyword ? `正在搜索「${keyword}」` : '请输入关键词');
});

let currentAudio = null;
let audioPlayers = {};

document.querySelectorAll('.audio-card').forEach((card) => {
  const play = card.querySelector('.play');
  const audioSrc = card.getAttribute('data-src');
  const title = card.querySelector('h4').textContent;
  
  // 为每个音频卡创建音频播放器
  const audioPlayer = new Audio(audioSrc);
  audioPlayer.onended = () => {
    card.classList.remove('is-playing');
    play.textContent = '▶';
    showToast(`已播放完毕：${title}`);
  };
  audioPlayer.onerror = () => {
    showToast(`无法加载音频文件：${title}`);
  };
  audioPlayers[audioSrc] = audioPlayer;
  
  const toggle = () => {
    const isPlaying = card.classList.toggle('is-playing');
    play.textContent = isPlaying ? 'Ⅱ' : '▶';
    play.setAttribute('aria-label', isPlaying ? '暂停音频' : '播放音频');
    
    if (isPlaying) {
      // 暂停其他正在播放的音频
      if (currentAudio && currentAudio !== audioPlayer) {
        currentAudio.pause();
        document.querySelectorAll('.audio-card').forEach(c => {
          if (c.getAttribute('data-src') !== audioSrc) {
            c.classList.remove('is-playing');
            c.querySelector('.play').textContent = '▶';
          }
        });
      }
      currentAudio = audioPlayer;
      audioPlayer.play().catch(err => showToast('播放失败，请检查文件路径'));
      showToast(`正在播放：${title}`);
    } else {
      audioPlayer.pause();
      showToast('已暂停');
    }
  };
  
  play.addEventListener('click', (event) => {
    event.stopPropagation();
    toggle();
  });
  card.addEventListener('click', toggle);
});

document.querySelectorAll('.video-card').forEach((card) => {
  card.addEventListener('click', () => {
    card.classList.toggle('is-playing');
    showToast(card.classList.contains('is-playing') ? '视频预览已开启' : '视频预览已暂停');
  });
});

document.querySelectorAll('.category-card,.mini-card,.feature-card,.support-grid div,.quick div,.wide-btn,.block-head a,.section-title a').forEach((el) => {
  el.addEventListener('click', () => {
    el.classList.add('is-picked');
    window.setTimeout(() => el.classList.remove('is-picked'), 320);
  });
});

document.querySelectorAll('[role="button"]:not(button)').forEach((el) => {
  el.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      el.click();
    }
  });
});
