document.addEventListener("DOMContentLoaded", () => {
  animateNumbers();
  initTreasureSlider();
  initSkinSelect();
  initWallGallery();
  initHeroCalligraphy();
  initCuratorSwitch();
  initMemoryRibbon();
  initRevealMotion();
  initCardHover();
  initProfileInteractions();
});

const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

function animateNumbers() {
  const numbers = document.querySelectorAll("[data-count]");

  numbers.forEach((el) => {
    const target = Number(el.dataset.count);

    if (prefersReducedMotion) {
      el.textContent = target;
      return;
    }

    const duration = 1200;
    const startTime = performance.now();

    function update(now) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(target * eased);

      if (progress < 1) {
        requestAnimationFrame(update);
      } else {
        el.textContent = target;
      }
    }

    requestAnimationFrame(update);
  });
}

function initTreasureSlider() {
  const list = document.querySelector("#treasureList");
  const prev = document.querySelector(".prev");
  const next = document.querySelector(".next");

  if (!list || !prev || !next) return;

  const getStep = () => {
    const card = list.querySelector(".treasure-card");
    if (!card) return list.clientWidth * 0.8;

    const styles = window.getComputedStyle(list);
    const gap = Number.parseFloat(styles.columnGap || styles.gap) || 0;
    return (card.getBoundingClientRect().width + gap) * 2;
  };

  const updateButtons = () => {
    const maxScroll = list.scrollWidth - list.clientWidth - 4;
    prev.disabled = list.scrollLeft <= 4;
    next.disabled = list.scrollLeft >= maxScroll;
  };

  prev.addEventListener("click", () => {
    list.scrollBy({ left: -getStep(), behavior: "smooth" });
  });

  next.addEventListener("click", () => {
    list.scrollBy({ left: getStep(), behavior: "smooth" });
  });

  list.addEventListener("scroll", updateButtons, { passive: true });
  window.addEventListener("resize", updateButtons);
  updateButtons();
}

function initSkinSelect() {
  const skins = document.querySelectorAll(".skin");

  skins.forEach((skin) => {
    skin.addEventListener("click", () => {
      skins.forEach((item) => {
        item.classList.remove("active");
        const tag = item.querySelector("span");
        if (tag) tag.remove();
      });

      skin.classList.add("active");

      const span = document.createElement("span");
      span.textContent = "使用中";
      skin.appendChild(span);
    });
  });
}

function initWallGallery() {
  const section = document.querySelector("#profileWall");
  const stage = document.querySelector("#wallStage");
  let slides = Array.from(document.querySelectorAll(".wall-slide"));
  let thumbs = Array.from(document.querySelectorAll(".wall-thumb"));
  const prev = document.querySelector(".wall-prev");
  const next = document.querySelector(".wall-next");
  const progress = document.querySelector(".wall-progress i");
  const indexText = document.querySelector(".wall-index");
  const totalText = document.querySelector(".wall-total");
  const totalCount = document.querySelector("#wallTotalCount");
  const thumbList = document.querySelector(".wall-thumbs");
  const shuffle = document.querySelector("#shuffleWall");
  const upload = document.querySelector("#mockUpload");
  const uploadInput = document.querySelector("#wallUploadInput");

  if (!section || !stage || slides.length === 0) return;

  let index = 0;
  let timer = null;
  let paused = false;
  const rotationTime = 2700;

  const formatIndex = (value) => String(value + 1).padStart(2, "0");

  const updateTotal = () => {
    const total = String(slides.length).padStart(2, "0");
    if (totalText) totalText.textContent = total;
    if (totalCount) totalCount.textContent = slides.length;
  };

  const restartProgress = () => {
    if (!progress || prefersReducedMotion) return;
    progress.style.animation = "none";
    progress.offsetHeight;
    progress.style.animation = `wallProgress ${rotationTime}ms linear forwards`;
  };

  const showSlide = (nextIndex) => {
    index = (nextIndex + slides.length) % slides.length;

    slides.forEach((slide, slideIndex) => {
      slide.classList.toggle("active", slideIndex === index);
    });

    thumbs.forEach((thumb, thumbIndex) => {
      thumb.classList.toggle("active", thumbIndex === index);
    });

    if (indexText) {
      indexText.textContent = formatIndex(index);
    }

    restartProgress();
    updateTotal();
  };

  const goNext = () => showSlide(index + 1);
  const goPrev = () => showSlide(index - 1);

  const start = () => {
    if (prefersReducedMotion) return;
    stop();
    timer = window.setInterval(() => {
      if (!paused) goNext();
    }, rotationTime);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  prev?.addEventListener("click", () => {
    goPrev();
    start();
  });

  next?.addEventListener("click", () => {
    goNext();
    start();
  });

  const bindThumb = (thumb, thumbIndex) => {
    thumb.addEventListener("click", () => {
      showSlide(thumbIndex);
      start();
    });
  };

  thumbs.forEach(bindThumb);

  shuffle?.addEventListener("click", () => {
    const jump = Math.max(1, Math.floor(Math.random() * slides.length));
    showSlide(index + jump);
    start();
  });

  upload?.addEventListener("click", () => {
    uploadInput?.click();
  });

  uploadInput?.addEventListener("change", () => {
    const files = Array.from(uploadInput.files || []).filter((file) => file.type.startsWith("image/"));
    if (files.length === 0) return;

    const firstNewIndex = slides.length;
    const originalText = upload?.textContent || "上传影像";
    section.classList.add("is-uploading");
    if (upload) upload.textContent = `已加入 ${files.length} 张`;

    files.forEach((file, fileIndex) => {
      const imageUrl = URL.createObjectURL(file);
      const slideNumber = String(firstNewIndex + fileIndex + 1).padStart(2, "0");
      const cleanName = file.name.replace(/\.[^.]+$/, "") || "我的影像";
      const uploadNote = "来自本地上传的私人影像，已临时加入我的藏库影壁。";

      const slide = document.createElement("article");
      slide.className = "wall-slide";
      slide.dataset.title = cleanName;
      slide.dataset.note = uploadNote;

      const image = document.createElement("img");
      image.src = imageUrl;
      image.alt = cleanName;

      const caption = document.createElement("div");
      caption.className = "wall-caption";

      const meta = document.createElement("span");
      meta.textContent = `${slideNumber} / 本地上传`;

      const title = document.createElement("h3");
      title.textContent = cleanName;

      const note = document.createElement("p");
      note.textContent = uploadNote;

      caption.append(meta, title, note);
      slide.append(image, caption);

      stage.insertBefore(slide, prev || null);
      slides.push(slide);

      const thumb = document.createElement("button");
      thumb.className = "wall-thumb";
      thumb.type = "button";
      thumb.setAttribute("aria-label", `查看${cleanName}`);
      const thumbImage = document.createElement("img");
      thumbImage.src = imageUrl;
      thumbImage.alt = "";
      thumb.appendChild(thumbImage);
      thumbList?.appendChild(thumb);
      thumbs.push(thumb);
      bindThumb(thumb, thumbs.length - 1);
    });

    showSlide(firstNewIndex);
    start();
    uploadInput.value = "";

    window.setTimeout(() => {
      section.classList.remove("is-uploading");
      if (upload) upload.textContent = originalText;
    }, 1200);
  });

  stage.addEventListener("mouseenter", () => {
    paused = true;
  });

  stage.addEventListener("mouseleave", () => {
    paused = false;
    stage.style.transform = "";
  });

  if (!prefersReducedMotion && window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    stage.addEventListener("mousemove", (event) => {
      const rect = stage.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      stage.style.transform = `perspective(1200px) rotateX(${y * -1.2}deg) rotateY(${x * 1.6}deg)`;
    });
  }

  showSlide(0);
  updateTotal();
  start();
}

function initHeroCalligraphy() {
  const targets = Array.from(document.querySelectorAll(".calligraphy-line"));
  if (targets.length === 0) return;

  const sleep = (time) => new Promise((resolve) => window.setTimeout(resolve, time));

  const renderLine = (target, line) => {
    target.textContent = "";
    return Array.from(line).map((char) => {
      const span = document.createElement("span");
      span.className = "char";
      span.textContent = char === " " ? "\u00A0" : char;
      target.appendChild(span);
      return span;
    });
  };

  const play = async (target, offset = 0) => {
    const lines = (target.dataset.calligraphyLines || target.textContent)
      .split("|")
      .filter(Boolean);
    let lineIndex = 0;
    await sleep(offset);

    while (true) {
      const chars = renderLine(target, lines[lineIndex]);

      const targetIndex = targets.indexOf(target);
      const groupSize = targetIndex % 3 === 0 ? 1 : targetIndex % 3 === 1 ? 2 : 3;
      const enterDelay = 80 + (targetIndex % 4) * 18;
      const leaveDelay = 58 + (targetIndex % 5) * 12;

      for (let i = 0; i < chars.length; i += groupSize) {
        chars.slice(i, i + groupSize).forEach((char) => char.classList.add("show"));
        await sleep(enterDelay / 2);
      }

      await sleep(575 + (targetIndex % 4) * 90);

      const leaveOrder = targetIndex % 2 === 0
        ? [...chars].reverse()
        : chars;

      for (let i = 0; i < leaveOrder.length; i += groupSize) {
        leaveOrder.slice(i, i + groupSize).forEach((char) => {
          char.classList.remove("show");
          char.classList.add("hide");
        });
        await sleep(leaveDelay / 2);
      }

      await sleep(180);
      lineIndex = (lineIndex + 1) % lines.length;
    }
  };

  if (prefersReducedMotion) {
    targets.forEach((target) => {
      target.textContent = (target.dataset.calligraphyLines || target.textContent).split("|")[0];
    });
    return;
  }

  targets.forEach((target, targetIndex) => play(target, targetIndex * 130));
}

function initCuratorSwitch() {
  const section = document.querySelector(".curator-section");
  if (!section) return;

  const stage = section.querySelector(".curator-stage");
  const composer = section.querySelector("#noteComposer");
  const titleInput = section.querySelector("#noteTitleInput");
  const bodyInput = section.querySelector("#noteBodyInput");
  const typeInput = section.querySelector("#noteTypeInput");
  const imageInput = section.querySelector("#noteImageInput");
  const imageName = section.querySelector("#noteImageName");
  let backgrounds = Array.from(section.querySelectorAll(".curator-bg"));
  let copies = Array.from(section.querySelectorAll(".curator-copy"));
  let index = 0;
  let timer = null;

  const noteBackgrounds = [
    "../assets/images/mogao2/cave45.png",
    "../assets/images/profile/treasure-03.png",
    "../assets/images/community/overview/silkroad-map.png",
    "../assets/images/mogao1/thumb-217.png",
  ];

  const show = (nextIndex) => {
    if (copies.length === 0) return;
    index = (nextIndex + copies.length) % copies.length;

    backgrounds.forEach((item, itemIndex) => {
      item.classList.toggle("active", itemIndex === index);
    });

    copies.forEach((item, itemIndex) => {
      item.classList.toggle("active", itemIndex === index);
      item.classList.toggle("prev", itemIndex === (index - 1 + copies.length) % copies.length);
      item.classList.toggle("next", itemIndex === (index + 1) % copies.length);
      item.classList.toggle(
        "buried",
        itemIndex !== index &&
          itemIndex !== (index - 1 + copies.length) % copies.length &&
          itemIndex !== (index + 1) % copies.length
      );
    });
  };

  const refreshCollections = () => {
    backgrounds = Array.from(section.querySelectorAll(".curator-bg"));
    copies = Array.from(section.querySelectorAll(".curator-copy"));
  };

  const addNoteSlide = (note) => {
    if (!stage) return;

    const bg = document.createElement("img");
    bg.className = "curator-bg note-added-bg";
    bg.src = note.image;
    bg.alt = note.title;
    stage.insertBefore(bg, stage.querySelector(".curator-palette"));

    const copy = document.createElement("div");
    copy.className = "curator-copy note-added-copy is-dropping";

    const label = document.createElement("span");
    label.textContent = "MY NOTE";

    const title = document.createElement("h3");
    title.textContent = note.title;

    const body = document.createElement("p");
    body.textContent = note.body;

    const meta = document.createElement("div");
    meta.className = "note-meta";
    [note.type, "我的笔记", "最新生成"].forEach((tag) => {
      const chip = document.createElement("b");
      chip.textContent = `#${tag}`;
      meta.appendChild(chip);
    });

    copy.append(label, title, body, meta);
    stage.insertBefore(copy, stage.querySelector(".curator-palette"));
    refreshCollections();
    show(copies.indexOf(copy));
    start();

    window.setTimeout(() => {
      copy.classList.remove("is-dropping");
    }, 380);
  };

  const start = () => {
    if (prefersReducedMotion) return;
    stop();
    timer = window.setInterval(() => {
      show(index >= copies.length - 1 ? 0 : index + 1);
    }, 2600);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  imageInput?.addEventListener("change", () => {
    const file = imageInput.files?.[0];
    if (imageName) {
      imageName.textContent = file ? file.name : "未选择图片时，将使用敦煌背景";
    }
  });

  composer?.addEventListener("submit", (event) => {
    event.preventDefault();

    const title = titleInput?.value.trim() || "无题敦煌笔记";
    const body = bodyInput?.value.trim();
    if (!body) {
      bodyInput?.focus();
      return;
    }

    const file = imageInput?.files?.[0];
    const note = {
      title,
      body,
      type: typeInput?.value || "洞窟速记",
      image: file ? URL.createObjectURL(file) : noteBackgrounds[Math.floor(Math.random() * noteBackgrounds.length)],
      createdAt: Date.now(),
    };

    addNoteSlide(note);
    composer.classList.add("is-saved");

    window.setTimeout(() => {
      composer.classList.remove("is-saved");
    }, 1000);

    if (titleInput) titleInput.value = "";
    if (bodyInput) bodyInput.value = "";
    if (imageInput) imageInput.value = "";
    if (imageName) imageName.textContent = "未选择图片时，将使用敦煌背景";
  });

  show(0);
  start();
}

function initMemoryRibbon() {
  const section = document.querySelector(".memory-section");
  if (!section) return;

  const images = Array.from(section.querySelectorAll(".memory-visual img"));
  const nodes = Array.from(section.querySelectorAll(".memory-node"));
  const captionKicker = section.querySelector(".journey-caption span");
  const captionTitle = section.querySelector(".journey-caption h3");
  const captionStory = section.querySelector(".journey-caption p");
  let index = 0;
  let timer = null;

  const show = (nextIndex) => {
    index = (nextIndex + images.length) % images.length;

    images.forEach((image, imageIndex) => {
      image.classList.toggle("active", imageIndex === index);
    });

    nodes.forEach((node, nodeIndex) => {
      node.classList.toggle("active", nodeIndex === index);
    });

    const activeNode = nodes[index];
    if (activeNode) {
      if (captionKicker) captionKicker.textContent = activeNode.dataset.kicker || "正在回放";
      if (captionTitle) captionTitle.textContent = activeNode.dataset.title || activeNode.querySelector("strong")?.textContent || "";
      if (captionStory) captionStory.textContent = activeNode.dataset.story || activeNode.querySelector("span")?.textContent || "";
    }
  };

  const start = () => {
    if (prefersReducedMotion) return;
    stop();
    timer = window.setInterval(() => show(index + 1), 2150);
  };

  const stop = () => {
    if (timer) {
      window.clearInterval(timer);
      timer = null;
    }
  };

  nodes.forEach((node) => {
    node.addEventListener("click", () => {
      show(Number(node.dataset.memoryTarget));
      start();
    });
  });

  section.addEventListener("mouseenter", stop);
  section.addEventListener("mouseleave", start);

  show(0);
  start();
}

function initRevealMotion() {
  const targets = document.querySelectorAll(
    ".stats-panel, .content > section, .study-grid > *, .study-studio-grid > *, .honor-community-grid > *, .badge-card, .post, .curator-mini, .memory-node, .journey-summary > div"
  );

  targets.forEach((target) => target.classList.add("motion-reveal"));

  if (!("IntersectionObserver" in window) || prefersReducedMotion) {
    targets.forEach((target) => target.classList.add("in-view"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("in-view");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.16,
      rootMargin: "0px 0px -8% 0px",
    }
  );

  targets.forEach((target) => observer.observe(target));
}

function initCardHover() {
  if (prefersReducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    return;
  }

  const cards = document.querySelectorAll(
    ".treasure-card, .recent-study, .study-hero-card, .mission-board, .knowledge-board, .featured-honor, .badge-card, .post, .report-card, .skin-panel, .curator-mini, .memory-node"
  );

  cards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const rotateX = (y / rect.height - 0.5) * -2;
      const rotateY = (x / rect.width - 0.5) * 2;

      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-2px)`;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });
}

function initProfileInteractions() {
  const clickableItems = document.querySelectorAll(
    ".treasure-card, .journey-summary div, .study-hero-card, .knowledge-tags b, .badge-card, .post, .path-step"
  );

  clickableItems.forEach((item) => {
    item.setAttribute("tabindex", "0");
    item.addEventListener("click", () => {
      item.classList.add("profile-clicked");
      window.setTimeout(() => item.classList.remove("profile-clicked"), 700);
    });
  });

  document.querySelectorAll(".mission-board input").forEach((input) => {
    input.addEventListener("change", () => {
      const label = input.closest("label");
      label?.classList.add("profile-clicked");
      window.setTimeout(() => label?.classList.remove("profile-clicked"), 700);
    });
  });

  document.querySelectorAll(".skin").forEach((skin) => {
    skin.addEventListener("click", () => {
      skin.classList.add("profile-clicked");
      window.setTimeout(() => skin.classList.remove("profile-clicked"), 700);
    });
  });
}
