# Helping Hands

## Project overview

Helping Hands is an educational front-end SPA for a nonprofit organization. Visitors can explore social projects and complete a volunteer registration form. Hash routing updates the main content without reloading the document.

## Technologies and features

- HTML5 and CSS3: semantic markup, responsive layouts, navigation, and feedback styles.
- Vanilla JavaScript: DOM updates, reusable template literals, delegated events, and hash routing with Back/Forward support.
- localStorage and JSON: persist the latest validated registration in this browser.
- Day.js 1.11.13 and CustomParseFormat: strict birth-date validation and future-date rejection. The MIT-licensed files are included locally in `js/vendor/dayjs/`.
- Playwright: development-only browser regression tests in headless Chromium.
- Git and GitHub: branch history, annotated tags, issues, milestones, and pull requests.

## Directory structure

```text
html/       Home, projects, and registration markup
css/        Shared styling in style.css
images/     JPEG and WebP photographs
js/         Application scripts and local third-party library
tests/     Browser regression and navigation scripts
```

`app.js` initializes the application; `templates.js` generates content; `navegacao.js` routes views; `eventos.js` handles interactions and validation; `armazenamento.js` manages persistence; `datas.js` adapts Day.js. Deferred scripts load in dependency order. The root `index.html` redirects to `html/index.html`.

## Prerequisites

A modern browser and Python 3 are sufficient to serve the application. Git is required to clone the repository. Automated tests additionally require Node.js/npm compatible with the pinned Playwright dependency and its Chromium installation. Initial dependency and browser downloads require internet access; the application has no runtime CDN dependency.

## Local installation and execution

Clone the repository, then check out the branch containing the test setup. While PR #3 remains open, use its feature branch:

```sh
git clone https://github.com/LuizDusky/Helping-hands.git
cd Helping-hands
git switch feature/reproducible-browser-tests
npm ci
npx playwright install chromium
python3 -m http.server 8765 --bind 127.0.0.1
```

The repository is private, so cloning requires an authorized GitHub account. Keep the server terminal open and visit `http://127.0.0.1:8765/html/index.html`. After the PR is merged, use `develop` for integrated development. Node.js dependencies are only needed for tests.

## Build and deployment

This project consists of static HTML, CSS, JavaScript, and images. There is no compilation or bundling step and no `npm run build` command. Serve the root `index.html` together with `html/`, `css/`, `images/`, and `js/`, preserving relative paths. Do not deploy `node_modules/`, `.git/`, or browser test artifacts. No backend or remote registration service is configured.

## Browser tests

With the local server running, open another terminal in the project root:

```sh
npm test
npm run test:navigation
```

`npm test` runs assertions for empty fields, malformed email, future birth dates, correction, localStorage restoration after reload, malformed JSON, blocked storage, offline routing, cards, and Back/Forward. It exits unsuccessfully if a check fails. The navigation script prints diagnostics for repeated clicks, whitespace-only input, and unknown routes.

If the server is not running, tests fail with a connection-refused error. If Chromium is missing, run `npx playwright install chromium`. Stop the server with Ctrl+C after use.

## Version control and collaboration

GitFlow separates released snapshots in `main`, integration in `develop`, focused work in `feature/`, release preparation in `release/`, and future urgent corrections in `hotfix/`. See [GITFLOW.md](GITFLOW.md).

Use Conventional Commit messages such as `docs: describe local setup`, `test: configure browser tests`, `feat: add functionality`, and `fix: correct behavior`. Versions follow MAJOR.MINOR.PATCH: breaking changes, compatible features, and compatible fixes respectively. The annotated tag `v1.0.0` identifies the first versioned delivery; see [CHANGELOG.md](CHANGELOG.md). Git history starts with the already implemented SPA baseline.

[Issue #1](https://github.com/LuizDusky/Helping-hands/issues/1) tracks reproducible tests; [issue #2](https://github.com/LuizDusky/Helping-hands/issues/2) tracks offline documentation. Both belong to [milestone #1](https://github.com/LuizDusky/Helping-hands/milestone/1). [PR #3](https://github.com/LuizDusky/Helping-hands/pull/3) proposes their changes from the feature branch into `develop`; it was opened for review before merging.

## Persistence and offline limits

Validated registration fields are saved under `helpingHands.registration` and restored whenever the registration view is newly rendered. Records stay in this browser and origin; there is no server synchronization. Storage access errors and malformed JSON are handled without interrupting navigation.

After initial loading, route changes use local templates. Uncached images can fail offline. No service worker is installed, so fresh offline loads or reloads are not guaranteed. Browser regression coverage currently includes Chromium; Safari and Firefox have not been verified.

## Color accessibility

CSS uses shared theme tokens and `prefers-color-scheme: dark` to follow the operating system theme. Text, links, input surfaces, and feedback receive theme-specific colors. Focus outlines remain visible, while errors also use text messages. `forced-colors` respects the operating system palette. Selected text/background pairs are checked for 4.5:1 contrast; this is not a complete WCAG audit.
