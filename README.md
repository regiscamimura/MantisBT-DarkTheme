# MantisBT Dark Theme

A light / dark switch for MantisBT 2.28+. A sun/moon button appears in the top bar;
the choice is remembered per browser, and the first visit follows the OS setting.

```
navbar:  [☾]  [Report Issue] [Invite Users]  All Projects ▾  user ▾
click →  html[data-theme="dark"], saved as localStorage "mantis-theme" = "dark"
```

The theme is applied from `<head>` before the page paints, so dark pages don't flash white.

## Install

```sh
cd /path/to/mantis/plugins
git clone https://github.com/regiscamimura/MantisBT-DarkTheme.git DarkTheme
```

Then **Manage → Manage Plugins → Dark Theme → Install**. The folder must be named
`DarkTheme`.

## Other plugins

Plugins can follow the theme by keying their styles on the root attribute:

```css
html[data-theme="dark"] .my-plugin-panel { background: #1a1e24; color: #d5dae1; }
```

[Taskodrome 2.2+](https://github.com/regiscamimura/Taskodrome) does this to draw a dark board.

## License

GPL-2.0, same as MantisBT.
