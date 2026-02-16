(function () {
  'use strict';

  function addCopyButton(container, codeEl) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', function () {
      var text = codeEl.textContent || '';
      navigator.clipboard.writeText(text).then(function () {
        btn.textContent = 'Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.textContent = 'Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
    container.insertBefore(btn, container.firstChild);
  }

  document.addEventListener('DOMContentLoaded', function () {
    // Hugo syntax-highlighted blocks: div.highlight > pre.chroma > code
    var highlights = document.querySelectorAll('div.highlight');
    highlights.forEach(function (el) {
      var code = el.querySelector('pre code');
      if (code) {
        addCopyButton(el, code);
      }
    });

    // Plain pre > code blocks (not inside .highlight)
    var pres = document.querySelectorAll('pre:not(.chroma)');
    pres.forEach(function (pre) {
      if (pre.closest('.highlight')) return;
      var code = pre.querySelector('code') || pre;
      var wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';
      pre.parentNode.insertBefore(wrapper, pre);
      wrapper.appendChild(pre);
      addCopyButton(wrapper, code);
    });
  });
})();
