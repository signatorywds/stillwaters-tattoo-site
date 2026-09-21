window.site = {
    initHeaderScroll: function () {
        const header = document.querySelector('.site-header');
        if (!header || header.dataset.boundScroll) return;
        header.dataset.boundScroll = '1';
        const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 8);
        onScroll();
        window.addEventListener('scroll', onScroll, { passive: true });
    },

    initReveal: function () {
        const targets = document.querySelectorAll('.reveal:not([data-observed])');
        if (!targets.length) return;
        if (!('IntersectionObserver' in window)) {
            targets.forEach(el => el.classList.add('is-visible'));
            return;
        }
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
        targets.forEach(el => {
            el.dataset.observed = '1';
            observer.observe(el);
        });
    }
};
