/**
 * Astroway Widget Loader v1.1
 *
 * Embeds the Astroway natal chart calculator into any page. Calculations run
 * in the visitor's browser via Swiss Ephemeris (WASM); birth data never leaves
 * the browser.
 *
 * Recommended usage (works with several widgets on one page):
 *   <div data-astroway-widget="natal" data-lang="en" data-theme="dark"></div>
 *   <script src="https://app.astroway.info/widget.js" async></script>
 *
 * Legacy usage (single widget per page) is still supported:
 *   <div id="astroway-widget"></div>
 *   <script>
 *     var astrowayWidget = "natal";
 *     var astrowayLang   = "en";
 *     var astrowayTheme  = "dark";
 *   </script>
 *   <script src="https://app.astroway.info/widget.js"></script>
 *
 * lang:  uk | en | de | pl | es | pt | fr | it | hi | ko
 * theme: dark | light | auto
 *
 * Docs: https://app.astroway.info/widget
 * MIT licensed.
 */
;(function () {
  var ORIGIN = 'https://app.astroway.info'
  var LANGS = ['uk', 'en', 'de', 'pl', 'es', 'pt', 'fr', 'it', 'hi', 'ko']
  var THEMES = ['dark', 'light', 'auto']

  /* Origin беремо з адреси самого скрипта, а не зі сторінки: раніше будь-який
     сайт на localhost вважався нашим дев-хостом і отримував iframe на власний
     домен, тобто битий віджет при локальній перевірці інтеграції. */
  var origin = ORIGIN
  var self = document.currentScript
  if (!self) {
    var all = document.getElementsByTagName('script')
    for (var i = all.length - 1; i >= 0; i--) {
      if (all[i].src && all[i].src.indexOf('/widget.js') !== -1) { self = all[i]; break }
    }
  }
  if (self && self.src) {
    try { origin = new URL(self.src, window.location.href).origin } catch (e) { origin = ORIGIN }
  }

  function pick(value, allowed, fallback) {
    return allowed.indexOf(String(value)) !== -1 ? String(value) : fallback
  }

  function buildUrl(opts) {
    return origin + '/widget/' + encodeURIComponent(opts.widget)
      + '?lang=' + encodeURIComponent(opts.lang)
      + '&theme=' + encodeURIComponent(opts.theme)
  }

  function mount(container, opts) {
    if (container.getAttribute('data-astroway-mounted') === '1') return
    container.setAttribute('data-astroway-mounted', '1')

    while (container.firstChild) container.removeChild(container.firstChild)

    var iframe = document.createElement('iframe')
    iframe.src = buildUrl(opts)
    iframe.style.width = '100%'
    iframe.style.border = 'none'
    iframe.style.minHeight = '400px'
    iframe.style.display = 'block'
    iframe.style.overflow = 'hidden'
    iframe.style.borderRadius = '12px'
    iframe.style.colorScheme = 'normal'
    iframe.setAttribute('allowtransparency', 'true')
    iframe.setAttribute('loading', 'lazy')
    iframe.setAttribute('title', 'Astroway natal chart calculator')
    container.appendChild(iframe)

    /* Высоту знает только сам виджет: содержимое растёт после расчёта карты.
       Слушателей вешаем по одному на iframe, иначе два виджета на странице
       тянули бы высоту друг друга. */
    window.addEventListener('message', function (e) {
      if (e.origin !== origin) return
      if (e.source !== iframe.contentWindow) return
      if (e.data && e.data.type === 'astroway-resize' && e.data.height) {
        iframe.style.height = e.data.height + 'px'
      }
    })
  }

  function mountAll() {
    var nodes = document.querySelectorAll('[data-astroway-widget]')
    for (var i = 0; i < nodes.length; i++) {
      var el = nodes[i]
      mount(el, {
        widget: el.getAttribute('data-astroway-widget') || 'natal',
        lang: pick(el.getAttribute('data-lang'), LANGS, 'en'),
        theme: pick(el.getAttribute('data-theme'), THEMES, 'dark'),
      })
    }

    /* Старый способ через глобальные переменные: страницы, где он уже стоит,
       не должны сломаться при обновлении лоадера. */
    if (nodes.length === 0) {
      var containerId = window.astrowayContainer || 'astroway-widget'
      var container = document.getElementById(containerId)
      if (!container) {
        var scripts = document.getElementsByTagName('script')
        var current = scripts[scripts.length - 1]
        if (!current || !current.parentNode) return
        container = document.createElement('div')
        container.id = containerId
        current.parentNode.insertBefore(container, current.nextSibling)
      }
      mount(container, {
        widget: window.astrowayWidget || 'natal',
        lang: pick(window.astrowayLang, LANGS, 'uk'),
        theme: pick(window.astrowayTheme, THEMES, 'dark'),
      })
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mountAll)
  } else {
    mountAll()
  }
})()
