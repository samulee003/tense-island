/* 時態小島 · 介面層。題庫與判定在 tense-game.js（勿在此改答案邏輯）。 */
(function () {
  const G = window.TenseGame;
  const STORE = "abigail-tense-island-v1";

  // 每座島的吉祥物 emoji、色系與「這關的重點」小抄
  const META = {
    review: {
      emoji: "🧩", tone: "pink",
      cheat: ["先分：一個人？還是很多人？", "☀️ every day ＝ 習慣", "🏃 now ＝ 正在做", "🕰️ yesterday ＝ 以前"]
    },
    present: {
      emoji: "☀️", tone: "green",
      cheat: ["👤 一個人 → 動詞 + s / es", "👥 很多人 → 原形", "doesn't / don't 後面 → 原形"]
    },
    continuous: {
      emoji: "🏃", tone: "blue",
      cheat: ["I → am", "👤 一個人 → is", "👥 很多人 → are", "後面動詞 → + ing"]
    },
    past: {
      emoji: "🕰️", tone: "orange",
      cheat: ["I / he / she / 一個人 → was", "you / we / they / 很多人 → were", "否定 → wasn't / weren't"]
    },
    mix: {
      emoji: "🎲", tone: "purple",
      cheat: ["☀️ every day ＝ 習慣", "🏃 now ＝ 正在做", "🕰️ yesterday ＝ 以前"]
    }
  };
  const RANK_EMOJI = { 小苗: "🌱", 小花: "🌼", 小樹: "🌳", 大樹: "🌴" };
  const KEYS = ["A", "B", "C"];
  const CHEERS = [
    { emoji: "🎉", text: "答對了！" },
    { emoji: "⭐", text: "好棒！" },
    { emoji: "🌟", text: "厲害！" },
    { emoji: "🎈", text: "漂亮！" }
  ];

  function load() {
    try {
      return JSON.parse(localStorage.getItem(STORE) || "");
    } catch (err) {
      return null;
    }
  }

  const state = load() || { stars: 0, byTag: {}, last: null };
  if (!state.byTag) state.byTag = {};

  function save() {
    localStorage.setItem(STORE, JSON.stringify({ stars: state.stars, byTag: state.byTag, last: state.last }));
  }

  function island(id) {
    return G.ISLANDS.find(function (item) { return item.id === id; });
  }

  function markTag(tag, ok) {
    if (!state.byTag[tag]) state.byTag[tag] = { hit: 0, miss: 0 };
    if (ok) state.byTag[tag].hit += 1;
    else state.byTag[tag].miss += 1;
  }

  function speak(text) {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "en-GB";
    utter.rate = 0.86;
    window.speechSynthesis.speak(utter);
  }

  function el(html) {
    const wrap = document.createElement("div");
    wrap.innerHTML = html.trim();
    return wrap.firstElementChild;
  }

  function escapeHtml(text) {
    return String(text)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  // 把 stem 的 ____ 畫成虛線空格、(verb) 畫成黃色螢光筆
  function renderStem(stem) {
    const parts = String(stem).split("____");
    const html = parts.map(escapeHtml).join('<span class="blank"></span>');
    return html.replace(/\(([^()]*)\)/g, '(<span class="vword">$1</span>)');
  }

  function cheatHtml(meta) {
    return '<div class="cheat"><div class="cheat-title">📌 這關的重點</div><div class="tiprow">' +
      meta.cheat.map(function (line) {
        return '<span class="tip tone-' + meta.tone + '">' + line + "</span>";
      }).join("") +
      "</div></div>";
  }

  function renderHome() {
    const app = document.getElementById("app");
    const rank = G.titleFor(state.stars);
    app.innerHTML = "";
    app.appendChild(el(
      '<div class="top">' +
        '<div class="brand"><span class="mascot">🦜</span>' +
        '<div><div class="kicker">Abigail · P3</div>' +
        '<h1 class="title">時態小島</h1>' +
        '<p class="sub">現在式 · 現在進行式 · was / were</p></div></div>' +
        '<div class="stars candy-soft"><b>⭐ ' + state.stars + '</b><span>' + RANK_EMOJI[rank] + " " + rank + '</span></div>' +
      "</div>"
    ));
    const map = el('<div class="map"></div>');
    G.ISLANDS.forEach(function (item) {
      const meta = META[item.id];
      const btn = el(
        '<button class="island tone-' + meta.tone + '" type="button">' +
          '<span class="stamp">' + meta.emoji + '</span>' +
          '<div><div class="kicker">' + item.kicker + '</div>' +
          '<h2>' + item.title + '</h2>' +
          '<div class="en">' + item.english + '</div>' +
          "<p>" + item.blurb + "</p></div>" +
          '<span class="go">開始 ▶</span>' +
        "</button>"
      );
      btn.addEventListener("click", function () { renderLesson(item.id); });
      map.appendChild(btn);
    });
    app.appendChild(map);
    app.appendChild(el(
      '<div class="tips candy-soft"><b>🔍 小偵探口訣：先找時間詞！</b>' +
        '<div class="tiprow">' +
          '<span class="tip tone-green">☀️ every day ＝ 習慣</span>' +
          '<span class="tip tone-blue">🏃 now ＝ 正在做</span>' +
          '<span class="tip tone-orange">🕰️ yesterday ＝ 以前</span>' +
        "</div>" +
      "</div>"
    ));
  }

  function renderLesson(kind) {
    const item = island(kind);
    const meta = META[kind];
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(el(
      '<div class="play-top"><button class="back" type="button" id="home">🗺️ 地圖</button>' +
      '<span class="badge tone-' + meta.tone + '">' + meta.emoji + " " + item.english + "</span></div>"
    ));
    app.querySelector("#home").addEventListener("click", renderHome);
    app.appendChild(el(
      '<div class="banner tone-' + meta.tone + '"><span class="big">' + meta.emoji + '</span>' +
      "<div><b>" + item.title + "</b><span>" + item.ribbon + "</span></div></div>"
    ));
    item.lessons.forEach(function (lesson) {
      app.appendChild(el(
        '<div class="lesson candy-soft"><b>' + escapeHtml(lesson.big) + "</b><p>" + lesson.line + "</p></div>"
      ));
    });
    app.insertAdjacentHTML("beforeend", cheatHtml(meta));
    const start = el('<button class="start" type="button">🚀 開始 8 題</button>');
    start.addEventListener("click", function () { startRound(kind); });
    app.appendChild(start);
  }

  function startRound(kind) {
    const round = {
      kind: kind,
      items: G.makeRound(kind, state),
      index: 0,
      stars: 0,
      answers: [],
      pending: null
    };
    renderPlay(round);
  }

  function dotsHtml(round) {
    let out = "";
    round.items.forEach(function (_, i) {
      out += '<i class="' + (i < round.index ? "done" : i === round.index ? "now" : "") + '"></i>';
    });
    return '<div class="dots">' + out + "</div>";
  }

  function renderPlay(round) {
    const item = round.items[round.index];
    const app = document.getElementById("app");
    const place = island(round.kind);
    const meta = META[round.kind];
    app.innerHTML = "";
    app.appendChild(el(
      '<div class="play-top">' +
        '<button class="back" type="button" id="home">🗺️ 地圖</button>' +
        dotsHtml(round) +
        '<span class="scorechip">⭐ ' + round.stars + " · " + (round.index + 1) + " / " + round.items.length + "</span>" +
      "</div>"
    ));
    app.querySelector("#home").addEventListener("click", renderHome);
    const card = el('<div class="card"></div>');
    card.classList.add("tone-" + meta.tone);
    card.appendChild(el(
      '<div class="q-top"><span class="badge">' + meta.emoji + " " + place.title + '</span>' +
      '<span class="qno">第 ' + (round.index + 1) + " / " + round.items.length + " 題</span></div>"
    ));
    card.appendChild(el('<div class="bubble"><span class="parrot">🦜</span><p>' + item.zh + "</p></div>"));
    if (item.type === "build") renderBuild(card, round, item);
    else {
      card.appendChild(el('<p class="stem">' + renderStem(item.stem) + "</p>"));
      renderChoice(card, round, item);
    }
    card.appendChild(el('<p class="hint">🔍 ' + item.hint + "</p>"));
    card.insertAdjacentHTML("beforeend", cheatHtml(meta));
    app.appendChild(card);
  }

  function renderChoice(card, round, item) {
    const box = el('<div class="choices"></div>');
    item.choices.forEach(function (choice, i) {
      const btn = el(
        '<button class="choice" type="button" data-v="' + escapeHtml(choice) + '">' +
          '<span class="key">' + KEYS[i] + '</span><span class="txt">' + escapeHtml(choice) + "</span>" +
        "</button>"
      );
      btn.addEventListener("click", function () {
        if (round.pending) return;
        lockChoices(box, choice, item.answer);
        settle(round, item, choice, card);
      });
      box.appendChild(btn);
    });
    card.appendChild(box);
  }

  function lockChoices(box, picked, answer) {
    Array.prototype.forEach.call(box.querySelectorAll(".choice"), function (btn) {
      const value = btn.getAttribute("data-v");
      if (value === answer) btn.classList.add("ok");
      else if (value === picked) btn.classList.add("bad");
    });
  }

  function renderBuild(card, round, item) {
    const picks = item.slots.map(function () { return ""; });
    const sentence = el('<p class="build"></p>');
    function drawSentence() {
      sentence.innerHTML = "";
      item.chunks.forEach(function (chunk) {
        if (chunk.text != null) {
          sentence.appendChild(document.createTextNode(chunk.text));
        } else {
          const slot = el('<span class="slot">' + (picks[chunk.gap] || "　") + "</span>");
          sentence.appendChild(slot);
        }
      });
    }
    drawSentence();
    card.appendChild(sentence);
    item.slots.forEach(function (slot, index) {
      const row = el('<div class="chiprow"></div>');
      slot.choices.forEach(function (choice) {
        const chip = el('<button class="chip" type="button">' + escapeHtml(choice) + "</button>");
        chip.addEventListener("click", function () {
          if (round.pending) return;
          picks[index] = choice;
          Array.prototype.forEach.call(row.querySelectorAll(".chip"), function (node) {
            node.classList.toggle("picked", node.textContent === choice);
          });
          drawSentence();
          if (picks.every(Boolean)) {
            const rows = card.querySelectorAll(".chiprow");
            item.slots.forEach(function (one, slotIndex) {
              Array.prototype.forEach.call(rows[slotIndex].querySelectorAll(".chip"), function (node) {
                if (node.textContent === one.answer) node.classList.add("ok");
                if (picks[slotIndex] === node.textContent && picks[slotIndex] !== one.answer) node.classList.add("bad");
              });
            });
            settle(round, item, picks, card);
          }
        });
        row.appendChild(chip);
      });
      card.appendChild(row);
    });
  }

  function settle(round, item, raw, card, knownOk) {
    const result = knownOk == null ? G.grade(item, raw) : { ok: knownOk, kind: knownOk ? "correct" : "grammar" };
    round.pending = true;
    markTag(item.tag, result.ok);
    const gained = result.ok ? 3 : 1;
    round.stars += gained;
    state.stars += gained;
    round.answers.push({ item: item, ok: result.ok, raw: raw });
    save();
    const cheer = CHEERS[Math.floor(Math.random() * CHEERS.length)];
    const box = el(
      '<div class="feedback ' + (result.ok ? "ok" : "bad") + '">' +
        '<div class="fb-head"><span class="fb-emoji">' + (result.ok ? cheer.emoji : "💡") + "</span>" +
        "<b>" + (result.ok ? cheer.text + " +" + gained + "⭐" : "再看一次 +" + gained + "⭐") + "</b></div>" +
        "<p>" + (result.kind === "spelling" ? "差一個字母。正確是 " + escapeHtml(item.answer) + "。" : item.explain) + "</p>" +
        (result.ok ? "" : '<p class="fb-tip">💡 ' + G.TAG_TIPS[item.tag] + "</p>") +
        '<button class="say" type="button">🔊 再聽一次</button>' +
      "</div>"
    );
    box.querySelector(".say").addEventListener("click", function () { speak(G.fullSentence(item)); });
    const last = round.index === round.items.length - 1;
    const next = el('<button class="next" type="button">' + (last ? "🌟 看這關星星" : "下一題 ▶") + "</button>");
    next.addEventListener("click", function () {
      round.pending = null;
      round.index += 1;
      if (round.index >= round.items.length) renderResult(round);
      else renderPlay(round);
    });
    card.appendChild(box);
    card.appendChild(next);
    speak(G.fullSentence(item));
  }

  function renderResult(round) {
    state.last = { kind: round.kind, stars: round.stars };
    save();
    const misses = round.answers.filter(function (row) { return !row.ok; });
    const rank = G.titleFor(state.stars);
    const lit = Math.max(1, Math.round(round.stars / 6));
    const starHtml = [0, 1, 2, 3].map(function (i) {
      return '<span class="rstar' + (i < lit ? " on" : "") + '">⭐</span>';
    }).join("");
    const app = document.getElementById("app");
    app.innerHTML = "";
    app.appendChild(el(
      '<div class="card result">' +
        '<div class="result-emoji">' + (misses.length ? "🌟" : "🏆") + "</div>" +
        '<h1 class="title">' + (misses.length ? "這關 " + round.stars + " 星" : "全對！好厲害！") + "</h1>" +
        '<p class="stars-big">' + starHtml + "</p>" +
        '<p class="rankline">目前共 ' + state.stars + " ⭐ · " + RANK_EMOJI[rank] + " " + rank + "</p>" +
        (misses.length
          ? '<div class="miss candy-soft"><b>📖 下次先看時間詞：</b><ul>' +
            misses.map(function (row) {
              return "<li><b>" + escapeHtml(G.fullSentence(row.item)) + "</b><br><span>" + G.TAG_TIPS[row.item.tag] + "</span></li>";
            }).join("") + "</ul></div>"
          : '<p class="allok">每一題都對了，給自己拍拍手！👏</p>') +
        '<div class="row">' +
          '<button type="button" id="again">🔁 再玩一關</button>' +
          '<button class="primary" type="button" id="map">🗺️ 回地圖</button>' +
        "</div>" +
      "</div>"
    ));
    app.querySelector("#again").addEventListener("click", function () { startRound(round.kind); });
    app.querySelector("#map").addEventListener("click", renderHome);
    if (!misses.length) speak("Great job!");
  }

  renderHome();
})();
