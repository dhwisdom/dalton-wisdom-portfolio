# Dalton Wisdom — AI-assisted portfolio

[View the live portfolio](https://dalton-wisdom-portfolio.thetruedaltino.chatgpt.site/) · [Design process](https://dalton-wisdom-portfolio.thetruedaltino.chatgpt.site/process/) · [Quick links](https://dalton-wisdom-portfolio.thetruedaltino.chatgpt.site/links/)

A portfolio connecting my work in biochemistry, food technology, information systems, and IT workflows. I used AI-assisted development and revised the design through feedback, comparison, and mobile testing.

## What's here

`dist/index.html` is the September 22 portfolio page. `dist/links/index.html` is the quick-links page. CSS and JavaScript in `dist/` implement the visual design, scrolling, navigation, and project detail dialogs.

This is a **curated public code copy**. The full export and backup remain private. Media, résumé, assignment evidence, and process files are not copied into this repository. Some assets in the HTML load from the published site, so a local preview needs an internet connection. The hosted site remains the canonical version.

## Preview locally

```sh
cd dist
python3 -m http.server 8000
```

Open http://localhost:8000. The project uses plain HTML, CSS, and JavaScript. No database credentials or build step are needed for this public code copy.

## Design notes

The portfolio groups earlier science work with Arkansas Tech and current information systems work with the University of Arkansas. Project cards reveal details in native dialogs, with a readable fallback when JavaScript is unavailable. The design process page on the live site describes the initial version, comparison with Claude, feedback, and later revisions.

© 2026 Dalton Wisdom. No license is granted for reuse of the text, images, or code.
