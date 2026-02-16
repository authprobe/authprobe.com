(function () {
  'use strict';

  function copyToClipboard(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    // Fallback for older browsers or insecure contexts
    var ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
    return Promise.resolve();
  }

  function addCopyButton(container, codeEl) {
    var btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
    btn.setAttribute('aria-label', 'Copy code to clipboard');
    btn.addEventListener('click', function () {
      var text = codeEl.textContent || '';
      copyToClipboard(text).then(function () {
        btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg> Copied!';
        btn.classList.add('copied');
        setTimeout(function () {
          btn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg> Copy';
          btn.classList.remove('copied');
        }, 2000);
      });
    });
    container.insertBefore(btn, container.firstChild);
  }

  function init() {
    // Hugo syntax-highlighted blocks: div.highlight > pre.chroma > code
    var highlights = document.querySelectorAll('div.highlight');
    for (var i = 0; i < highlights.length; i++) {
      var pre = highlights[i].querySelector('pre');
      if (pre && pre.hasAttribute('data-no-copy')) continue;
      var code = highlights[i].querySelector('pre code');
      if (code) {
        addCopyButton(highlights[i], code);
      }
    }

    // Plain pre > code blocks (not inside .highlight)
    var pres = document.querySelectorAll('pre:not(.chroma)');
    for (var j = 0; j < pres.length; j++) {
      var el = pres[j];
      if (el.hasAttribute('data-no-copy')) continue;
      if (el.closest && el.closest('.highlight')) continue;
      var codeEl = el.querySelector('code') || el;
      var wrapper = document.createElement('div');
      wrapper.className = 'code-wrapper';
      el.parentNode.insertBefore(wrapper, el);
      wrapper.appendChild(el);
      addCopyButton(wrapper, codeEl);
    }
  }

  // Run immediately since this script uses defer (DOM is already parsed)
  // Also handle the case where DOM isn't ready yet
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
