# Hugo Heroicons

Hugo Heroicons wraps Tailwind's [Heroicons](https://www.heroicons.com) SVG images in [Hugo](https://gohugo.io) partials.

## Installation

### Install using Hugo (Recommended)

To install using Hugo, you need to make sure you have already initialized the Hugo modules for your project.
See https://gohugo.io/hugo-modules/use-modules/ for more details.

Add the theme to your `config.toml` file

```toml
[module]
[[module.imports]]
    path = "github.com/fawkssc/hugo-heroicons/v2"
```

### Install using `git`

Using `git` add the submodule under the `themes` folder.

```bash
git submodule add https://github.com/fawkssc/hugo-heroicons themes/hugo-heroicons
```

## Configure the theme

Add to your theme configurations `config.toml`. See https://gohugo.io/hugo-modules/theme-components/ for more details.

```toml
theme = ['hugo-heroicons', 'my-theme']
```

## Using an icon


```html
{{ partial "font-awesome.html" (dict "Page" . "Icon" "[Name]" [...Options]) }}
```

Options:
- **Page** — *Required* The current context
- **Icon** — *Required* The name of the icon to use
- **Size** — *[16|20|24]* The size of the icon; defaults to `24`
- **Style** — *[solid|outline]* The style of the icon; defaults to `solid`.
- **Class** — The classnames to use with the SVG
- **Fill** — The fill color to use; defaults to `currentColor`
- **Style** — The css styles
- **Width** — Set the width of the SVG
- **Height** — Set the height of the SVG
