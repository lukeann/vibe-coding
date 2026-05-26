const graphData = {
  nodes: [
    { id: '敦煌', x: 430, y: 285, r: 56, color: '#e67816', type: 'center', badge: '核心节点', desc: '敦煌文化知识图谱的核心枢纽，连接洞窟、壁画、佛教、文献、人物、路线与保护数据。', tags: ['核心节点', '文化枢纽', '多源数据'], age: '多时期', year: '公元4世纪以后', m1: '128,756', m2: '86,215', m3: '358,942' },
    { id: '莫高窟', x: 430, y: 126, r: 36, color: '#159a8c', badge: '第285窟', desc: '莫高窟是敦煌石窟群中最重要的文化遗产之一，包含壁画、彩塑、佛教故事与大量历史题记。', tags: ['石窟群', '壁画', '彩塑', '佛教艺术'], age: '盛唐', year: '705年', m1: '12,456', m2: '3,876', m3: '4,215' },
    { id: '飞天', x: 235, y: 188, r: 39, color: '#f28a35', badge: '艺术形象', desc: '飞天是敦煌壁画中最具代表性的艺术形象之一，承载音乐、舞蹈、宗教信仰和审美表达。', tags: ['乐舞', '壁画', '艺术形象'], age: '北魏至元', year: '多时期', m1: '18,456', m2: '1,856', m3: '2,115' },
    { id: '壁画', x: 236, y: 355, r: 34, color: '#16a085', badge: '图像资源', desc: '壁画节点汇聚经变、供养人、图案纹样、色彩和题材数据，是图谱中的重要图像资源节点。', tags: ['经变画', '题材', '色彩', '图像叙事'], age: '多时期', year: '4-14世纪', m1: '118,742', m2: '21,356', m3: '84,732' },
    { id: '彩塑', x: 195, y: 450, r: 30, color: '#ff9f3d', badge: '造像艺术', desc: '彩塑节点展示佛、菩萨、弟子、天王等造像形态，关联洞窟空间与时代风格。', tags: ['佛像', '菩萨', '弟子', '造像'], age: '隋唐', year: '6-10世纪', m1: '8,976', m2: '1,245', m3: '2,652' },
    { id: '文献与经卷', x: 430, y: 474, r: 32, color: '#2f8db8', badge: '文献实体', desc: '文献与经卷节点整合藏经洞文书、题记、研究论文和专题资料，是研究检索的重要入口。', tags: ['藏经洞', '经卷', '题记', '论文'], age: '唐宋', year: '9-11世纪', m1: '86,215', m2: '12,345', m3: '5,432' },
    { id: '数字保护', x: 555, y: 492, r: 30, color: '#3b82c4', badge: '保护技术', desc: '数字保护节点记录三维重建、病害监测、图像增强和数字归档等保护技术路径。', tags: ['三维重建', '数字采集', '修复记录'], age: '当代', year: '2000年至今', m1: '735', m2: '1,286', m3: '3,376' },
    { id: '丝绸之路', x: 632, y: 335, r: 36, color: '#1f9f90', badge: '文化线路', desc: '丝绸之路节点呈现敦煌与西域、中亚、长安等地区的文化交流网络。', tags: ['西域', '中亚', '长安', '文化交流'], age: '汉唐', year: '多时期', m1: '32,664', m2: '6,215', m3: '7,432' },
    { id: '佛教', x: 625, y: 184, r: 38, color: '#e3a51d', badge: '宗教主题', desc: '佛教节点关联菩萨、佛、经变画、传译路线以及佛教信仰在敦煌的传播过程。', tags: ['菩萨', '佛', '经变画', '宗教传播'], age: '十六国至元', year: '多时期', m1: '38,765', m2: '9,876', m3: '12,452' },
    { id: '供养人', x: 575, y: 455, r: 30, color: '#d96f50', badge: '人物群体', desc: '供养人节点呈现家族、官员、商人、女性供养人的身份、图像与题记关系。', tags: ['人物', '题记', '社会史', '家族'], age: '唐宋', year: '多时期', m1: '18,456', m2: '2,134', m3: '3,421' },
    { id: '张议潮', x: 160, y: 90, r: 24, color: '#f5eadc', small: true },
    { id: '第285窟', x: 355, y: 48, r: 25, color: '#dfeee8', small: true },
    { id: '第61窟', x: 524, y: 50, r: 25, color: '#dfeee8', small: true },
    { id: '法华经变', x: 125, y: 295, r: 23, color: '#dfeee8', small: true },
    { id: '经变图案', x: 135, y: 385, r: 23, color: '#dfeee8', small: true },
    { id: '反弹琵琶', x: 118, y: 142, r: 23, color: '#faeddc', small: true },
    { id: '西域', x: 730, y: 300, r: 23, color: '#dfeee8', small: true },
    { id: '长安', x: 746, y: 382, r: 23, color: '#dfeee8', small: true },
    { id: '菩萨', x: 735, y: 112, r: 25, color: '#faeddc', small: true },
    { id: '僧人', x: 710, y: 188, r: 23, color: '#faeddc', small: true },
    { id: '高僧传', x: 492, y: 540, r: 22, color: '#e3f1f4', small: true },
    { id: '数字平台', x: 620, y: 545, r: 23, color: '#e3f1f4', small: true },
    { id: '商人', x: 640, y: 514, r: 21, color: '#faeddc', small: true },
    { id: '女性供养人', x: 670, y: 475, r: 21, color: '#faeddc', small: true },
    { id: '九色鹿', x: 336, y: 520, r: 22, color: '#e3f1f4', small: true },
    { id: '本生故事', x: 276, y: 450, r: 22, color: '#dfeee8', small: true },
    { id: '矿物颜料', x: 120, y: 490, r: 22, color: '#faeddc', small: true },
  ],
  links: [
    ['敦煌','莫高窟','依托','green'],['敦煌','飞天','表现','orange'],['敦煌','壁画','表现内容','green'],['敦煌','彩塑','塑造','orange'],['敦煌','文献与经卷','文献来源','blue'],['敦煌','佛教','宗教传播','orange'],['敦煌','丝绸之路','社会支持','green'],['敦煌','供养人','赞助','orange'],['文献与经卷','数字保护','保护技术','blue'],['丝绸之路','西域','沟通','green'],['丝绸之路','长安','连接','green'],['佛教','菩萨','信仰','orange'],['佛教','僧人','传译','orange'],['飞天','张议潮','关联','orange'],['飞天','反弹琵琶','艺术形象','orange'],['壁画','法华经变','题材','green'],['壁画','经变图案','装饰','green'],['彩塑','矿物颜料','材质','orange'],['彩塑','本生故事','题材','green'],['文献与经卷','高僧传','文献','blue'],['数字保护','数字平台','归档','blue'],['供养人','商人','身份','orange'],['供养人','女性供养人','群体','orange'],['莫高窟','第285窟','包含','green'],['莫高窟','第61窟','包含','green'],['文献与经卷','九色鹿','故事','blue'],['莫高窟','佛教','宗教脉络','orange'],['飞天','佛教','艺术中心','orange'],['壁画','莫高窟','所在','green']
  ]
};

const svg = document.querySelector('.knowledge-svg');
const linkGroup = svg.querySelector('.links');
const labelGroup = svg.querySelector('.labels');
const nodeGroup = svg.querySelector('.nodes');
const byId = Object.fromEntries(graphData.nodes.map(n => [n.id, n]));
let graphScale = 1;

function linePath(a,b){
  const dx=b.x-a.x, dy=b.y-a.y;
  const dr=Math.sqrt(dx*dx+dy*dy)*0.08;
  const mx=(a.x+b.x)/2 + (dy>0?-dr:dr);
  const my=(a.y+b.y)/2 + (dx>0?dr:-dr);
  return `M${a.x},${a.y} Q${mx},${my} ${b.x},${b.y}`;
}
function drawGraph(){
  graphData.links.forEach(([s,t,label,color])=>{
    const a=byId[s], b=byId[t];
    const p=document.createElementNS('http://www.w3.org/2000/svg','path');
    p.setAttribute('d',linePath(a,b));
    p.setAttribute('class',`link ${color}`);
    p.dataset.source=s;
    p.dataset.target=t;
    linkGroup.appendChild(p);
    const text=document.createElementNS('http://www.w3.org/2000/svg','text');
    text.textContent=label;
    text.setAttribute('class','rel-label');
    text.setAttribute('x',(a.x+b.x)/2);
    text.setAttribute('y',(a.y+b.y)/2-4);
    text.setAttribute('text-anchor','middle');
    text.dataset.source=s;
    text.dataset.target=t;
    labelGroup.appendChild(text);
  });
  graphData.nodes.forEach(n=>{
    const g=document.createElementNS('http://www.w3.org/2000/svg','g');
    g.setAttribute('class',`node ${n.small?'small':''} ${n.type==='center'?'center':''}`);
    g.setAttribute('transform',`translate(${n.x},${n.y})`);
    g.setAttribute('tabindex','0');
    g.setAttribute('role','button');
    g.setAttribute('aria-label',`${n.id}，点击查看详情`);
    g.dataset.id=n.id;
    const halo=document.createElementNS('http://www.w3.org/2000/svg','circle');
    halo.setAttribute('class','node-halo');
    halo.setAttribute('r',n.r+8);
    g.appendChild(halo);
    const c=document.createElementNS('http://www.w3.org/2000/svg','circle');
    c.setAttribute('r',n.r);
    c.setAttribute('fill',n.color);
    g.appendChild(c);
    const txt=document.createElementNS('http://www.w3.org/2000/svg','text');
    txt.textContent=n.id;
    g.appendChild(txt);
    g.addEventListener('click',()=>selectNode(n.id));
    g.addEventListener('keydown',e=>{
      if(e.key==='Enter'||e.key===' '){
        e.preventDefault();
        selectNode(n.id);
      }
    });
    g.addEventListener('mouseenter',()=>highlightNode(n.id));
    g.addEventListener('mouseleave',()=>highlightNode(document.querySelector('.node.active')?.dataset.id));
    nodeGroup.appendChild(g);
  });
}

function getNeighbors(id){
  return new Set(graphData.links.flatMap(([s,t])=>s===id?[t]:t===id?[s]:[]));
}

function highlightNode(id){
  const neighbors=id?getNeighbors(id):new Set();
  document.querySelectorAll('.node').forEach(g=>{
    const related=id && (g.dataset.id===id || neighbors.has(g.dataset.id));
    g.classList.toggle('related',!!related && g.dataset.id!==id);
    g.classList.toggle('dimmed',!!id && !related);
  });
  document.querySelectorAll('.link,.rel-label').forEach(el=>{
    const related=id && (el.dataset.source===id || el.dataset.target===id);
    el.classList.toggle('active',!!related);
    el.classList.toggle('dimmed',!!id && !related);
  });
}

function selectNode(id){
  document.querySelectorAll('.node').forEach(n=>n.classList.toggle('active',n.dataset.id===id));
  highlightNode(id);
  const n=byId[id];
  if(!n) return;
  document.getElementById('detailTitle').textContent=n.id;
  document.getElementById('detailBadge').textContent=n.badge||'关联实体';
  document.getElementById('detailDesc').textContent=n.desc||`${n.id} 是敦煌文化知识图谱中的关联节点，支持在人物、洞窟、文献、图像等维度继续扩展。`;
  document.getElementById('infoAge').textContent=n.age||'多时期';
  document.getElementById('infoYear').textContent=n.year||'待补充';
  document.getElementById('m1').textContent=n.m1||'1,256';
  document.getElementById('m2').textContent=n.m2||'2,847';
  document.getElementById('m3').textContent=n.m3||'1,856';
  const tags=n.tags||['关联节点','重要实体','知识图谱'];
  document.getElementById('detailTags').innerHTML=tags.map(t=>`<span>${t}</span>`).join('');
}
drawGraph();
selectNode('莫高窟');

document.getElementById('nodeSearch').addEventListener('input', e=>{
  const kw=e.target.value.trim();
  document.querySelectorAll('.node').forEach(g=>{
    const hit=!kw || g.dataset.id.includes(kw);
    g.style.opacity=hit?1:.32;
    g.classList.toggle('search-hit',!!kw && hit);
  });
  document.querySelectorAll('.link,.rel-label').forEach(el=>el.classList.toggle('dimmed',!!kw));
});

document.querySelectorAll('.zoom-tools button').forEach((button,index)=>{
  button.addEventListener('click',()=>{
    if(index===0) graphScale=Math.min(1.22,graphScale+.08);
    if(index===1) graphScale=Math.max(.86,graphScale-.08);
    if(index===2) graphScale=1;
    if(index===3) selectNode('敦煌');
    svg.style.transform=`scale(${graphScale})`;
    svg.style.transformOrigin='center';
    button.classList.add('pressed');
    setTimeout(()=>button.classList.remove('pressed'),180);
  });
});

document.querySelectorAll('.filter-item').forEach(item=>{
  item.setAttribute('tabindex','0');
  item.setAttribute('role','button');
  const toggle=()=>{
    item.classList.toggle('selected');
    item.querySelector('em').textContent=item.classList.contains('selected')?'已选':'全部';
  };
  item.addEventListener('click',toggle);
  item.addEventListener('keydown',e=>{
    if(e.key==='Enter'||e.key===' '){
      e.preventDefault();
      toggle();
    }
  });
});

document.querySelector('.panel-title button')?.addEventListener('click',()=>{
  document.querySelectorAll('.filter-item.selected').forEach(item=>{
    item.classList.remove('selected');
    const badge=item.querySelector('em');
    badge.textContent=item.textContent.includes('洞窟')?'735':'全部';
  });
});

document.querySelectorAll('.view-grid button,.tabs button,.recommend-tabs button').forEach(button=>{
  button.addEventListener('click',()=>{
    const group=button.parentElement;
    group.querySelectorAll('button').forEach(item=>item.classList.remove('active'));
    button.classList.add('active');
  });
});

document.querySelectorAll('.heatmap span,.tag-block span,.recommend-boxes p,.lit-grid article,.hot-list p').forEach(item=>{
  item.setAttribute('tabindex','0');
  item.setAttribute('role','button');
  item.addEventListener('click',()=>item.classList.toggle('selected'));
});

document.querySelector('.path-controls button')?.addEventListener('click',e=>{
  const button=e.currentTarget;
  const original=button.textContent;
  button.textContent='分析中';
  button.classList.add('loading');
  document.querySelector('.path-line')?.classList.add('active');
  setTimeout(()=>{
    button.textContent=original;
    button.classList.remove('loading');
  },700);
});

document.querySelectorAll('.ranking-card li').forEach(item=>{
  item.addEventListener('click',()=>{
    const id=item.querySelector('span')?.textContent.trim();
    if(byId[id]) selectNode(id);
  });
});

const doughnut = document.querySelector('.interactive-doughnut');
const doughnutSegments = document.querySelectorAll('.doughnut-segment');
const doughnutItems = document.querySelectorAll('.doughnut-wrap li[data-index]');

function setDoughnutActive(index){
  doughnut?.classList.add('is-hovering');
  doughnutSegments.forEach(segment=>segment.classList.toggle('active',segment.dataset.index===index));
  doughnutItems.forEach(item=>item.classList.toggle('active',item.dataset.index===index));
}

function clearDoughnutActive(){
  doughnut?.classList.remove('is-hovering');
  doughnutSegments.forEach(segment=>segment.classList.remove('active'));
  doughnutItems.forEach(item=>item.classList.remove('active'));
}

doughnutSegments.forEach(segment=>{
  segment.addEventListener('mouseenter',()=>setDoughnutActive(segment.dataset.index));
  segment.addEventListener('focus',()=>setDoughnutActive(segment.dataset.index));
  segment.addEventListener('mouseleave',clearDoughnutActive);
  segment.addEventListener('blur',clearDoughnutActive);
});

doughnutItems.forEach(item=>{
  item.addEventListener('mouseenter',()=>setDoughnutActive(item.dataset.index));
  item.addEventListener('focus',()=>setDoughnutActive(item.dataset.index));
  item.addEventListener('mouseleave',clearDoughnutActive);
  item.addEventListener('blur',clearDoughnutActive);
});

const actionableSelector = [
  'button',
  '.filter-item',
  '.view-grid button',
  '.metric-boxes article',
  '.path-insights span',
  '.heatmap span',
  '.hot-list p',
  '.discovery-grid div',
  '.recommend-boxes p',
  '.history-card p',
  '.standard-panel p',
  '.lit-grid article',
  '.doughnut-wrap li[data-index]',
  '.tag-block span',
  '.bubble-row span'
].join(',');

document.querySelectorAll(actionableSelector).forEach(item=>{
  item.classList.add('is-actionable');
  if(!item.hasAttribute('tabindex') && !['BUTTON','INPUT','SELECT','A'].includes(item.tagName)){
    item.setAttribute('tabindex','0');
  }

  item.addEventListener('pointermove',event=>{
    const rect=item.getBoundingClientRect();
    item.style.setProperty('--mx',`${event.clientX-rect.left}px`);
    item.style.setProperty('--my',`${event.clientY-rect.top}px`);
  });

  item.addEventListener('pointerdown',()=>{
    item.classList.add('is-pressing','interactive-pulse');
  });

  ['pointerup','pointerleave','blur'].forEach(type=>{
    item.addEventListener(type,()=>item.classList.remove('is-pressing'));
  });

  item.addEventListener('animationend',()=>item.classList.remove('interactive-pulse'));
});
