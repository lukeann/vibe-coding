document.addEventListener("DOMContentLoaded", () => {
  const opening = document.querySelector("#communityOpening");

  const bg = document.querySelector(".opening-bg");

  const cloudLeft = document.querySelector(".cloud-left");
  const cloudTop = document.querySelector(".cloud-top");
  const cloudRight = document.querySelector(".cloud-right");

  const mountainLeft = document.querySelector(".mountain-left");
  const mountainCenter = document.querySelector(".mountain-center");
  const mountainRight = document.querySelector(".mountain-right");

  const title = document.querySelector(".opening-title");

  function clamp(value, min = 0, max = 1) {
    return Math.min(Math.max(value, min), max);
  }

  function easeInOutProgress(value) {
    return value < 0.5
      ? 2 * value * value
      : 1 - Math.pow(-2 * value + 2, 2) / 2;
  }

  function getOpeningProgress() {
    if (!opening) return 0;

    const rect = opening.getBoundingClientRect();
    const sectionHeight = opening.offsetHeight;
    const viewportHeight = window.innerHeight;

    let distance = sectionHeight - viewportHeight;

    if (distance <= 0) {
      distance = viewportHeight;
    }

    const current = -rect.top;

    return clamp(current / distance, 0, 1);
  }

  function updateOpening() {
    const p = getOpeningProgress();
    const eased = easeInOutProgress(p);
    const time = performance.now() * 0.001;

    const floatLeftX = Math.sin(time * 0.45) * 14;
    const floatLeftY = Math.cos(time * 0.55) * 8;

    const floatTopX = Math.sin(time * 0.38 + 1.2) * 18;
    const floatTopY = Math.cos(time * 0.42 + 0.8) * 9;

    const floatRightX = Math.sin(time * 0.42 + 2.1) * 16;
    const floatRightY = Math.cos(time * 0.5 + 1.5) * 8;

    if (bg) {
      const bgScale = 1 + p * 0.055;
      const bgY = p * 18;

      bg.style.transform = `
        translate3d(0, ${bgY}px, 0)
        scale(${bgScale})
      `;
    }

    if (cloudLeft) {
      cloudLeft.style.transform = `
        translate3d(${floatLeftX + p * 90}px, ${floatLeftY + p * 18}px, 0)
        scale(${1 + p * 0.025})
      `;
    }

    if (cloudTop) {
      cloudTop.style.transform = `
        translate3d(${floatTopX - p * 48}px, ${floatTopY + p * 24}px, 0)
        scale(${1 + p * 0.015})
      `;
    }

    if (cloudRight) {
      cloudRight.style.transform = `
        translate3d(${floatRightX - p * 96}px, ${floatRightY + p * 22}px, 0)
        scale(${1 + p * 0.02})
      `;
    }

    if (mountainCenter) {
      mountainCenter.style.transform = `
        translate3d(0, ${eased * 78}px, 0)
        scale(${1 + eased * 0.02})
      `;
    }

    if (mountainLeft) {
      mountainLeft.style.transform = `
        translate3d(${-eased * 110}px, ${eased * 240}px, 0)
        scale(${1 + eased * 0.05})
      `;
    }

    if (mountainRight) {
      mountainRight.style.transform = `
        translate3d(${eased * 110}px, ${eased * 260}px, 0)
        scale(${1 + eased * 0.055})
      `;
    }

    if (title) {
      title.style.opacity = String(clamp(1 - eased * 1.15, 0, 1));

      title.style.transform = `
        translate(-50%, calc(-50% - ${eased * 52}px))
        scale(${1 - eased * 0.045})
      `;
    }

    requestAnimationFrame(updateOpening);
  }

  requestAnimationFrame(updateOpening);


  const revealEls = document.querySelectorAll(".reveal");

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -60px 0px",
      }
    );

    revealEls.forEach((el) => revealObserver.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  const artTabs = document.querySelectorAll(".art-tab");

  artTabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      artTabs.forEach((item) => item.classList.remove("active"));
      tab.classList.add("active");
    });
  });

  const hoverCards = document.querySelectorAll(
    ".overview-hero-block, .overview-scroll, .art-focus, .culture-panel, .silk-panel, .repair-visual, .modern-scroll"
  );

  hoverCards.forEach((card) => {
    card.addEventListener("mousemove", (event) => {
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      const rotateX = ((y / rect.height) - 0.5) * -2.4;
      const rotateY = ((x / rect.width) - 0.5) * 2.4;

      card.style.transform = `
        perspective(1200px)
        rotateX(${rotateX}deg)
        rotateY(${rotateY}deg)
        translateY(-2px)
      `;
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "";
    });
  });

});
