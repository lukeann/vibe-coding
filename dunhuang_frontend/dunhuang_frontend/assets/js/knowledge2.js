const papers = [
  {
    title: "敦煌莫高窟供养人图像的题记内容与社会文化意涵",
    author: "张先生",
    source: "敦煌研究",
    year: "2023(04)",
    page: "1-18",
    tags: ["敦煌壁画", "供养人", "题记", "社会史"],
    abstract: "本文通过对莫高窟中历代供养人图像题记的系统梳理，分析内容构成、书写格式及所反映的社会阶层、信仰特征与文化心理。",
    cited: 128,
    downloads: "1,256",
    date: "2023-07-15",
    img: "../assets/images/knowledge2/paper-01.jpg"
  },
  {
    title: "敦煌壁画中的佛教经变画研究综述（1900—2022）",
    author: "李格群，王惠民",
    source: "世界宗教研究",
    year: "2022(03)",
    page: "85-102",
    tags: ["敦煌壁画", "经变画", "佛教艺术", "文献综述"],
    abstract: "文章对1900至2022年间国内外关于敦煌壁画经变画的研究成果进行系统梳理，分析研究主题、方法与趋势。",
    cited: 96,
    downloads: "987",
    date: "2022-05-30",
    img: "../assets/images/knowledge2/paper-02.jpg"
  },
  {
    title: "从供养人看晚唐五代敦煌佛教信仰的世俗化倾向",
    author: "郑炜明",
    source: "兰州大学学报",
    year: "2021(06)",
    page: "12-25",
    tags: ["供养人", "敦煌社会史", "晚唐五代", "佛教信仰"],
    abstract: "通过敦煌文献与壁画供养人资料的互证，探讨晚唐五代时期佛教信仰世俗化的表现及其社会背景。",
    cited: 87,
    downloads: "673",
    date: "2021-11-28",
    img: "../assets/images/knowledge2/paper-03.jpg"
  },
  {
    title: "敦煌写经中的佛教术语与中印文化交流",
    author: "柯哲",
    source: "宗教学研究",
    year: "2020(02)",
    page: "33-48",
    tags: ["敦煌写经", "佛教术语", "中印文化交流", "词汇研究"],
    abstract: "以敦煌写经为研究对象，梳理其中佛教术语的使用情况，分析术语音译点与中印文化交流的互动关系。",
    cited: 76,
    downloads: "542",
    date: "2020-08-01",
    img: "../assets/images/knowledge2/paper-04.jpg"
  },
  {
    title: "莫高窟第61窟经变画的图像叙事与空间布局研究",
    author: "赵声良",
    source: "美术研究",
    year: "2019(03)",
    page: "45-60",
    tags: ["第61窟", "经变画", "图像叙事", "空间布局"],
    abstract: "文章围绕莫高窟第61窟经变画的图像结构展开，分析其叙事节奏、空间层次与宗教表达方式。",
    cited: 68,
    downloads: "498",
    date: "2019-06-18",
    img: "../assets/images/knowledge2/paper-05.jpg"
  },
  {
    title: "敦煌飞天形象的艺术演变与审美特征",
    author: "王雅宁",
    source: "艺术史研究",
    year: "2023(02)",
    page: "66-78",
    tags: ["飞天", "艺术演变", "审美特征", "敦煌艺术"],
    abstract: "文章从造型、线描、色彩与动态表现等角度分析敦煌飞天形象的艺术演变，揭示其审美价值。",
    cited: 64,
    downloads: "421",
    date: "2023-03-12",
    img: "../assets/images/knowledge2/paper-06.jpg"
  },
  {
    title: "敦煌石窟建筑空间与礼佛路线关系研究",
    author: "刘明远",
    source: "建筑史论丛",
    year: "2022(04)",
    page: "91-108",
    tags: ["石窟建筑", "礼佛路线", "空间研究", "莫高窟"],
    abstract: "本文从空间组织与礼佛行为出发，分析敦煌石窟建筑结构与宗教仪式动线之间的关系。",
    cited: 58,
    downloads: "390",
    date: "2022-10-03",
    img: "../assets/images/knowledge2/paper-07.jpg"
  },
  {
    title: "敦煌文献中的女性供养人与家族记忆",
    author: "周晓薇",
    source: "历史研究",
    year: "2021(05)",
    page: "120-139",
    tags: ["女性供养人", "家族记忆", "敦煌文献", "社会史"],
    abstract: "基于题记与敦煌文献材料，探讨女性供养人在家族信仰、身份表达与社会记忆中的角色。",
    cited: 52,
    downloads: "356",
    date: "2021-09-06",
    img: "../assets/images/knowledge2/paper-08.jpg"
  },
  {
    title: "藏经洞文献整理与数字化保护路径研究",
    author: "梁振江",
    source: "文献",
    year: "2020(04)",
    page: "70-86",
    tags: ["藏经洞", "文献整理", "数字化保护", "敦煌写本"],
    abstract: "文章分析藏经洞文献整理现状，提出面向数字化保护、知识组织与开放利用的技术路径。",
    cited: 47,
    downloads: "319",
    date: "2020-04-22",
    img: "../assets/images/knowledge2/paper-09.jpg"
  },
  {
    title: "丝绸之路视域下敦煌壁画中的多元文化因素",
    author: "陈嘉仪",
    source: "民族艺术",
    year: "2018(06)",
    page: "51-67",
    tags: ["丝绸之路", "多元文化", "敦煌壁画", "文化交流"],
    abstract: "文章从丝绸之路文化交流角度，分析敦煌壁画中的服饰、图案、建筑与人物形象所体现的多元文化因素。",
    cited: 43,
    downloads: "286",
    date: "2018-12-18",
    img: "../assets/images/knowledge2/paper-10.jpg"
  }
];

const paperList = document.querySelector("#paperList");

paperList.innerHTML = papers
  .map((paper, index) => {
    const tags = paper.tags.map((tag) => `<span>${tag}</span>`).join("");

    return `
      <article class="paper-item" tabindex="0">
        <div class="paper-rank">${index + 1}</div>

        <div class="paper-main">
          <h3 class="paper-title">${paper.title}</h3>
          <p class="paper-meta">
            ${paper.author}　${paper.source}　${paper.year}：${paper.page}
          </p>
          <div class="tags">${tags}</div>
          <p class="abstract">摘要：${paper.abstract}</p>
          <div class="paper-data">
            <p>被引：<strong>${paper.cited}</strong></p>
            <p>下载：<strong>${paper.downloads}</strong></p>
            <p>发布时间：<strong>${paper.date}</strong></p>
          </div>
        </div>

        <div class="paper-cover">
          <img src="${paper.img}" alt="${paper.title}" />
          <div class="paper-actions">
            <button type="button">☆ 收藏</button>
            <button type="button">引用</button>
            <button type="button">⇩ 下载</button>
          </div>
        </div>
      </article>
    `;
  })
  .join("");

const showToast = (message) => {
  let toast = document.querySelector(".toast");

  if (!toast) {
    toast = document.createElement("div");
    toast.className = "toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(showToast.timer);
  showToast.timer = window.setTimeout(() => {
    toast.classList.remove("show");
  }, 1800);
};

document.querySelectorAll(".year-tabs button").forEach((button) => {
  button.addEventListener("click", () => {
    document.querySelectorAll(".year-tabs button").forEach((item) => item.classList.remove("active"));
    button.classList.add("active");
    showToast(`已切换到${button.textContent.trim()}范围`);
  });
});

document.querySelectorAll(".pagination button").forEach((button) => {
  button.addEventListener("click", () => {
    const page = button.textContent.trim();

    if (/^\d+$/.test(page)) {
      document.querySelectorAll(".pagination button").forEach((item) => item.classList.remove("active"));
      button.classList.add("active");
      showToast(`已切换到第 ${page} 页`);
    }
  });
});

document.querySelector(".clear-btn")?.addEventListener("click", () => {
  const input = document.querySelector(".search-box input");
  input.value = "";
  input.focus();
});

document.body.addEventListener("click", (event) => {
  const button = event.target.closest("button");

  if (!button) return;

  const text = button.textContent.trim();

  if (text.includes("收藏")) {
    button.classList.toggle("is-active");
    showToast(button.classList.contains("is-active") ? "已加入收藏" : "已取消收藏");
    return;
  }

  if (text.includes("引用")) {
    showToast("已生成引用格式");
    return;
  }

  if (text.includes("下载")) {
    showToast("下载任务已创建");
    return;
  }

  if (text.includes("检索") && !text.includes("历史")) {
    showToast("正在更新检索结果");
    return;
  }

  if (text.includes("换一换")) {
    showToast("已刷新推荐主题");
    return;
  }

  if (text.includes("更多")) {
    showToast("正在打开更多分析");
    return;
  }

  if (text.includes("筛选")) {
    showToast("筛选条件已应用");
    return;
  }

  if (text.includes("重置")) {
    document.querySelectorAll(".filter-card input[type='checkbox']").forEach((input) => {
      input.checked = false;
    });
    showToast("筛选条件已重置");
    return;
  }

  if (text.includes("AI 扩展")) {
    showToast("AI 正在扩展相关关键词");
    return;
  }

  if (text.includes("综述")) {
    showToast("已加入综述生成队列");
    return;
  }

  if (text.includes("可视化")) {
    showToast("正在聚合可视化数据");
    return;
  }

  if (text.includes("导出")) {
    showToast("已准备导出内容");
  }
});

document.querySelectorAll(".hot-tags button, .kw, .topic-label").forEach((item) => {
  item.addEventListener("click", () => {
    const input = document.querySelector(".search-box input");
    const keyword = item.textContent.trim();

    input.value = keyword;
    showToast(`已填入关键词：${keyword}`);
  });
});
