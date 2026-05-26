(function () {
  function getAssetUrl(path) {
    const script = document.currentScript || document.querySelector('script[src$="ai-assistant.js"]');
    const base = script ? script.src : window.location.href;
    return new URL(path, base).href;
  }

  function ensureAiAssistantMarkup() {
    if (document.getElementById("aiBtn") && document.getElementById("aiPanel")) return;

    const imageUrl = getAssetUrl("../images/welcome/AI.png");
    const wrapper = document.createElement("div");

    wrapper.innerHTML = `
      <button class="ai-float" id="aiBtn" aria-label="打开敦煌 AI 助手">
        <img src="${imageUrl}" alt="" />
      </button>
      <section class="ai-panel" id="aiPanel" aria-label="飞天灵犀问答面板">
        <div class="ai-head">
          <strong>飞天灵犀</strong>
          <button id="aiClose" type="button" aria-label="关闭 AI 助手">×</button>
        </div>
        <div class="chat-row bot">你好呀，我是飞天灵犀。跟着我，一起听洞窟低语、寻壁画故事、解锁属于你的敦煌游线吧！</div>
        <div class="quick-questions">
          <button type="button">从哪一境开始游览最合适？</button>
          <button type="button">带我认识一幅经典敦煌壁画</button>
          <button type="button">莫高窟壁画为什么需要数字化保护？</button>
        </div>
        <form class="ai-freeform" id="aiFreeform">
          <label for="aiQuestion">自由提问</label>
          <div>
            <input id="aiQuestion" type="text" placeholder="问问飞天灵犀..." autocomplete="off" />
            <button type="submit">问</button>
          </div>
        </form>
      </section>
    `;

    document.body.append(...wrapper.children);
  }

  function initAiAssistant() {
    ensureAiAssistantMarkup();

    const aiBtn = document.getElementById("aiBtn");
    const aiPanel = document.getElementById("aiPanel");
    const aiClose = document.getElementById("aiClose");
    const aiImage = document.querySelector(".ai-float img");
    const aiFreeform = document.getElementById("aiFreeform");
    const aiQuestion = document.getElementById("aiQuestion");

    if (!aiBtn || !aiPanel) return;

    function closeAiPanel() {
      aiPanel.classList.remove("show");
      aiBtn.classList.remove("tilt");
    }

    function cutoutAiImage() {
      if (!aiImage) return;

      const source = aiImage.getAttribute("src");
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;

        const ctx = canvas.getContext("2d", { willReadFrequently: true });
        ctx.drawImage(img, 0, 0);

        const frame = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const pixels = frame.data;

        for (let i = 0; i < pixels.length; i += 4) {
          const r = pixels[i];
          const g = pixels[i + 1];
          const b = pixels[i + 2];
          const max = Math.max(r, g, b);
          const min = Math.min(r, g, b);
          const avg = (r + g + b) / 3;

          if (avg > 214 && max - min < 24) {
            pixels[i + 3] = 0;
          }
        }

        ctx.putImageData(frame, 0, 0);
        aiImage.src = canvas.toDataURL("image/png");
      };

      img.src = source;
    }

    window.closeLingxiAiPanel = closeAiPanel;

    aiBtn.addEventListener("click", () => {
      aiPanel.classList.toggle("show");
      aiBtn.classList.toggle("tilt", aiPanel.classList.contains("show"));
    });

    if (aiClose) {
      aiClose.addEventListener("click", closeAiPanel);
    }

    aiPanel.querySelectorAll(".quick-questions button").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!aiQuestion) return;
        aiQuestion.value = btn.textContent.trim();
        aiQuestion.focus();
      });
    });

    if (aiFreeform) {
      aiFreeform.addEventListener("submit", (event) => {
        event.preventDefault();
      });
    }

    cutoutAiImage();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initAiAssistant);
  } else {
    initAiAssistant();
  }
})();
