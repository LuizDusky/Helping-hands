window.HelpingHandsNavigation = (() => {
    const pages = { 'index.html': 'home', 'projects.html': 'projects', 'registration.html': 'registration' };

    let renderedRoute;

    function render() {
        const [route, anchor] = location.hash.slice(2).split('/');
        const activeRoute = Object.hasOwn(HelpingHandsTemplates, route) ? route : 'home';
        const page = HelpingHandsTemplates[activeRoute];
        const app = document.getElementById('app');
        if (renderedRoute !== activeRoute) {
            app.innerHTML = page.render ? page.render() : page.html;
            HelpingHandsStorage.restore(document.getElementById('registration-form'));
            renderedRoute = activeRoute;
        }
        document.title = page.title;
        document.querySelectorAll('.main-nav a').forEach((link) => {
            link.removeAttribute('aria-current');
            if (link.hash === `#/${activeRoute}`) {
                link.setAttribute('aria-current', 'page');
            }
        });
        document.getElementById('menu-toggle').checked = false;
        document.querySelector('.menu-icon').setAttribute('aria-expanded', 'false');
        const target = anchor && document.getElementById(anchor);
        if (target) target.scrollIntoView();
        else { window.scrollTo(0, 0); app.focus({ preventScroll: true }); }
    }

    function start() {
        document.addEventListener('click', (event) => {
            const link = event.target.closest('a');
            if (!link || event.defaultPrevented || event.button !== 0 ||
                event.ctrlKey || event.metaKey || event.shiftKey || event.altKey ||
                link.hasAttribute('download') || (link.target && link.target !== '_self')) return;
            if (!link.getAttribute('href')?.startsWith('#/')) return;
            event.preventDefault();
            if (location.hash === link.hash) render();
            else location.hash = link.hash;
        });
        window.addEventListener('hashchange', render);
        if (!location.hash.startsWith('#/')) {
            const initial = pages[location.pathname.split('/').pop()] || 'home';
            const anchor = location.hash.slice(1);
            history.replaceState(null, '', `#/${initial}${anchor ? '/' + anchor : ''}`);
        }
        render();
    }

    return { start, render };
})();
