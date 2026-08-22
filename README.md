# Astroway Natal Chart Widget

[![npm](https://img.shields.io/npm/v/@astroway/widget)](https://www.npmjs.com/package/@astroway/widget)
[![license](https://img.shields.io/npm/l/@astroway/widget)](LICENSE)

Embeddable natal chart calculator for any website. One `<div>`, one `<script>`, no build step and no API key.

Positions come from [Swiss Ephemeris](https://www.astro.com/swisseph/) compiled to WebAssembly and are computed **in the visitor's browser**. Birth data is never sent to a server.

**Live demo and configurator:** https://app.astroway.info/widget

## Install

```html
<div data-astroway-widget="natal" data-lang="en" data-theme="dark"></div>
<script src="https://app.astroway.info/widget.js" async></script>
```

That is the whole integration. The script finds every `[data-astroway-widget]` on the page, mounts an iframe into it and resizes it as the chart is drawn.

Or from npm, if you prefer to self-host the loader:

```bash
npm install @astroway/widget
```

```js
import '@astroway/widget'
```

### Pinning a version

The hosted `widget.js` updates in place, so a Subresource Integrity hash on the `<script>` tag would break the embed on the next release. If your security policy requires SRI, install the npm package instead, serve `widget.js` from your own origin and pin the hash there.

## Options

| Attribute | Values | Default | Meaning |
|---|---|---|---|
| `data-astroway-widget` | `natal` | `natal` | Which widget to mount |
| `data-lang` | `uk` `en` `de` `pl` `es` `pt` `fr` `it` `hi` `ko` | `en` | Interface language |
| `data-theme` | `dark` `light` `auto` | `dark` | Colour scheme; `auto` follows the visitor's system setting |

Several widgets can live on one page, each with its own language and theme:

```html
<div data-astroway-widget="natal" data-lang="de" data-theme="light"></div>
<div data-astroway-widget="natal" data-lang="pl" data-theme="dark"></div>
<script src="https://app.astroway.info/widget.js" async></script>
```

## Attribution

The widget renders a "Powered by AstroWay" line inside the iframe, but that link lives on our domain, not on yours, so search engines do not read it as a link from your site. If you want to credit the project in a way that counts, add a plain link next to the widget:

```html
<p>Chart engine by <a href="https://app.astroway.info" rel="noopener">Astroway</a>.</p>
```

This is optional. The widget works the same either way.

## What the visitor gets

Planet positions to the arcsecond, house cusps to the arcminute, aspects with configurable orbs, and a rendered chart wheel. House systems include Placidus, Koch, Regiomontanus, Campanus, Whole Sign and Equal.

The full application behind the widget covers synastry, transits, progressions, directions, solar and lunar returns, Human Design and around forty other techniques: https://app.astroway.info/features

## Accuracy

The engine is the same one that powers [app.astroway.info](https://app.astroway.info) and the [Astroway Calculation API](https://api.astroway.info). Planet longitudes are checked against Swiss Ephemeris reference output to within one arcsecond, house cusps to within one arcminute.

Ephemeris coverage follows the DE431 model: roughly 13000 BCE to 17000 CE.

## Privacy

The iframe runs on `app.astroway.info` and loads the WASM ephemeris on demand. Date, time and place entered by the visitor stay in the browser: the chart is computed locally and no birth data is transmitted. The loader adds no cookies and no tracking of its own.

## Legacy integration

Pages that already use the global-variable form keep working:

```html
<div id="astroway-widget"></div>
<script>
  var astrowayWidget = "natal";
  var astrowayLang   = "en";
  var astrowayTheme  = "dark";
</script>
<script src="https://app.astroway.info/widget.js"></script>
```

This form supports a single widget per page. New integrations should use the data-attribute form above.

## Examples

- [`examples/plain.html`](examples/plain.html): static HTML
- [`examples/react.jsx`](examples/react.jsx): React component
- [`examples/vue.vue`](examples/vue.vue): Vue 3 single file component
- [`examples/wordpress.php`](examples/wordpress.php): WordPress shortcode

## Related

- [Astroway app](https://app.astroway.info): the full application
- [Calculation API](https://api.astroway.info): REST access to the same engine, 760 endpoints
- [`@astroway/mcp`](https://www.npmjs.com/package/@astroway/mcp): MCP server for AI assistants

## Licence

MIT. See [LICENSE](LICENSE).
