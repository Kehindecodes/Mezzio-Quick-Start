/* Mezzio Quick-Start — site behaviour (plain JS, no build step) */
(function () {
  "use strict";

  /* ---------- Syntax highlighting ---------- */
  if (window.hljs) {
    document.querySelectorAll("pre code").forEach(function (block) {
      window.hljs.highlightElement(block);
    });
  }

  /* ---------- Mermaid ---------- */
  if (window.mermaid) {
    window.mermaid.initialize({
      startOnLoad: true,
      securityLevel: "loose",
      theme: "base",
      themeVariables: {
        fontFamily: '"Source Sans 3", "Segoe UI", sans-serif',
        fontSize: "14px",
        primaryColor: "#e6f2f3",
        primaryTextColor: "#17282c",
        primaryBorderColor: "#0e7c8a",
        secondaryColor: "#faf1e8",
        secondaryBorderColor: "#b45a1e",
        tertiaryColor: "#f2f5f4",
        lineColor: "#58676c",
        textColor: "#17282c",
        actorBkg: "#0a3a42",
        actorTextColor: "#ffffff",
        actorBorder: "#072b31",
        actorLineColor: "#8a979b",
        signalColor: "#17282c",
        signalTextColor: "#17282c",
        activationBkgColor: "#e6f2f3",
        activationBorderColor: "#0e7c8a",
        noteBkgColor: "#faf1e8",
        noteBorderColor: "#b45a1e",
        noteTextColor: "#4c3a2b",
        labelBoxBkgColor: "#f2f5f4",
        labelBoxBorderColor: "#cfd9d8",
        clusterBkg: "#f7faf9",
        clusterBorder: "#cfd9d8",
        edgeLabelBackground: "#fcfcfa"
      }
    });
  }

  /* ---------- Copy-to-clipboard on every code block ---------- */
  document.querySelectorAll(".codeblock").forEach(function (block) {
    var pre = block.querySelector("pre");
    if (!pre) return;

    var btn = document.createElement("button");
    btn.type = "button";
    btn.className = "copy-btn";
    btn.textContent = "copy";
    btn.setAttribute("aria-label", "Copy code to clipboard");

    var head = block.querySelector(".cb-head");
    if (head) {
      head.appendChild(btn);
    } else {
      block.insertBefore(btn, block.firstChild);
    }

    btn.addEventListener("click", function () {
      var text = pre.innerText.replace(/\n$/, "");
      var done = function () {
        btn.textContent = "copied ✓";
        btn.classList.add("copied");
        setTimeout(function () {
          btn.textContent = "copy";
          btn.classList.remove("copied");
        }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done);
      } else {
        // file:// fallback
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); done(); } catch (e) { /* noop */ }
        document.body.removeChild(ta);
      }
    });
  });

  /* ---------- Tabs ---------- */
  document.querySelectorAll(".tabs").forEach(function (tabs) {
    var buttons = tabs.querySelectorAll(".tab-btn");
    var panels = tabs.querySelectorAll(".tab-panel");

    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        buttons.forEach(function (b) { b.setAttribute("aria-selected", "false"); });
        panels.forEach(function (p) { p.classList.remove("active"); });
        btn.setAttribute("aria-selected", "true");
        if (panels[i]) panels[i].classList.add("active");
      });
    });
  });

  /* ---------- Mobile sidebar ---------- */
  var sidebar = document.getElementById("sidebar");
  var toggle = document.getElementById("nav-toggle");
  var scrim = document.getElementById("scrim");

  function closeNav() {
    sidebar.classList.remove("open");
    scrim.classList.remove("show");
    toggle.setAttribute("aria-expanded", "false");
  }

  if (toggle && sidebar && scrim) {
    toggle.addEventListener("click", function () {
      var open = sidebar.classList.toggle("open");
      scrim.classList.toggle("show", open);
      toggle.setAttribute("aria-expanded", String(open));
    });
    scrim.addEventListener("click", closeNav);
    sidebar.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeNav();
    });
  }

  /* ---------- Scroll-spy: light up the pipeline node you've reached ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".sidebar a[href^='#']")
  );
  var linkFor = {};
  navLinks.forEach(function (a) {
    linkFor[a.getAttribute("href").slice(1)] = a;
  });

  var sections = Array.prototype.slice.call(
    document.querySelectorAll("section.doc[id]")
  );

  function setActive(id) {
    navLinks.forEach(function (a) { a.classList.remove("active"); });
    var link = linkFor[id];
    if (link) {
      link.classList.add("active");
      // keep the active node visible in a long sidebar
      var r = link.getBoundingClientRect();
      var s = sidebar.getBoundingClientRect();
      if (r.top < s.top + 40 || r.bottom > s.bottom - 40) {
        link.scrollIntoView({ block: "center", behavior: "instant" in Element.prototype ? "instant" : "auto" });
      }
    }
  }

  function currentSection() {
    var probe = window.scrollY + window.innerHeight * 0.25;
    var current = sections.length ? sections[0].id : null;
    sections.forEach(function (sec) {
      if (sec.offsetTop <= probe) current = sec.id;
    });
    return current;
  }

  var ticking = false;
  window.addEventListener("scroll", function () {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      var id = currentSection();
      if (id) setActive(id);
      ticking = false;
    });
  }, { passive: true });

  var initial = currentSection();
  if (initial) setActive(initial);
})();
