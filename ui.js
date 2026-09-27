// ui.js：操作面板与视图（原生 DOM，无弹窗）
import { render } from "./app.js";

export function mount(spec, parts) {
  parts.log.textContent = "词 " + (spec.words || []).length + " 个，点按钮数元音。";

  function draw() {
    let view = null;
    try {
      view = render(spec);
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
      parts.log.textContent = "跑不动：" + String(error && error.message ? error.message : error);
      return;
    }
    parts.out.textContent = JSON.stringify(view, null, 1);
    parts.stage.textContent = "";
    (spec.words || []).forEach(function (word, spot) {
      const row = document.createElement("div");
      row.className = "row";
      const head = document.createElement("span");
      head.textContent = word;
      row.appendChild(head);
      const bar = document.createElement("span");
      bar.className = "bar";
      const fill = document.createElement("i");
      fill.style.width = Math.min(100, view.counts[spot] * 25) + "%";
      bar.appendChild(fill);
      row.appendChild(bar);
      const mark = document.createElement("span");
      mark.className = "chip" + (view.mosts.indexOf(spot) !== -1 ? " ok" : "");
      mark.textContent = view.counts[spot] + " 个元音";
      row.appendChild(mark);
      parts.stage.appendChild(row);
    });
    parts.legend.textContent = "元音合计 " + view.total + "，最多 " + view.biggest + " 个";
    parts.log.textContent = "词数 " + view.count;
  }

  const runButton = document.createElement("button");
  runButton.className = "primary";
  runButton.textContent = "数元音";
  runButton.addEventListener("click", draw);
  parts.controls.appendChild(runButton);

  const addButton = document.createElement("button");
  addButton.textContent = "追加一个词";
  addButton.addEventListener("click", function () {
    spec.words = (spec.words || []).concat(["aeiou"]);
    draw();
  });
  parts.controls.appendChild(addButton);

  const dropButton = document.createElement("button");
  dropButton.textContent = "去掉最后一个";
  dropButton.addEventListener("click", function () {
    spec.words = (spec.words || []).slice(0, -1);
    draw();
  });
  parts.controls.appendChild(dropButton);

  const label = document.createElement("label");
  label.textContent = "试一个词";
  parts.controls.appendChild(label);

  const box = document.createElement("input");
  box.type = "text";
  box.value = "queue";
  box.addEventListener("input", function () {
    try {
      const view = render(Object.assign({}, spec, { words: (spec.words || []).concat([box.value]) }));
      parts.out.textContent = box.value + " 有 " + view.counts[view.counts.length - 1] + " 个元音";
    } catch (error) {
      parts.out.textContent = String(error && error.code ? error.code : error);
    }
  });
  parts.controls.appendChild(box);

  const readButton = document.createElement("button");
  readButton.textContent = "只看元音合计";
  readButton.addEventListener("click", function () {
    const view = render(spec);
    parts.out.textContent = "元音合计 " + view.total + "，最多 " + view.biggest;
  });
  parts.controls.appendChild(readButton);

  draw();
}
