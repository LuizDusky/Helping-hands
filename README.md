# Helping Hands

Open `html/index.html` to view the website. The root `index.html` redirects to that entry point.

- `html/`: Home, projects, and registration page markup.
- `css/`: Shared styles in `style.css`.
- `images/`: Volunteer photographs in JPEG and WebP formats.
- `js/`: SPA initialization in `app.js`, routing in `navegacao.js`, and local templates in `templates.js`.

HTML references styles, images, and scripts through relative paths. JavaScript stays outside the markup. Hash routes (`#/home`, `#/projects`, `#/registration`) update the `#app` container without reloading the document. Browser Back/Forward is supported. Validated registration fields are saved locally in `helpingHands.registration` and restored when the registration view is rendered. Storage access errors do not interrupt navigation.

## Date library

Day.js 1.11.13 (MIT) is vendored in `js/vendor/dayjs/` with its license and CustomParseFormat plugin. Deferred scripts load the library, plugin, and `datas.js` adapter before application scripts. Strict YYYY-MM-DD parsing rejects impossible birth dates; day comparison rejects future birth dates. Validation runs on input and submit.
