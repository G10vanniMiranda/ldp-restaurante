document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    const mobileBtn = document.getElementById('mobileBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileNavLinks = mobileMenu?.querySelectorAll('a');
    const sections = document.querySelectorAll('main section');
    const desktopNavItems = document.querySelectorAll('#navList .nav-item');

    // Mobile menu toggle with ARIA
    mobileBtn?.addEventListener('click', () => {
        const expanded = mobileBtn.getAttribute('aria-expanded') === 'true';
        mobileBtn.setAttribute('aria-expanded', String(!expanded));
        mobileMenu?.classList.toggle('active');
        const icon = mobileBtn.querySelector('i');
        icon?.classList.toggle('fa-x');
    });

    // Close mobile menu when a link is clicked
    mobileNavLinks?.forEach((link) => {
        link.addEventListener('click', () => {
            mobileMenu?.classList.remove('active');
            mobileBtn?.setAttribute('aria-expanded', 'false');
            const icon = mobileBtn?.querySelector('i');
            icon?.classList.remove('fa-x');
        });
    });

    // Header shadow on scroll
    const onScroll = () => {
        if (!header) return;
        if (window.scrollY <= 0) {
            header.classList.remove('scrolled');
        } else {
            header.classList.add('scrolled');
        }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initialize state

    // Active nav item based on section in view
    const navMap = new Map();
    desktopNavItems.forEach((li) => {
        const a = li.querySelector('a');
        if (a && a.getAttribute('href')?.startsWith('#')) {
            navMap.set(a.getAttribute('href'), li);
        }
    });

    const setActiveNav = (id) => {
        desktopNavItems.forEach((li) => li.classList.remove('active'));
        const li = navMap.get('#' + id);
        if (li) {
            li.classList.add('active');
        }
        // Manage aria-current on links
        desktopNavItems.forEach((liItem) => {
            const link = liItem.querySelector('a');
            if (!link) return;
            if (liItem === li) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveNav(entry.target.id);
                }
            });
        },
        { threshold: 0.6 }
    );
    sections.forEach((section) => observer.observe(section));

    // ScrollReveal animations
    if (typeof ScrollReveal !== 'undefined') {
        ScrollReveal().reveal('#cta', {
            origin: 'left',
            duration: 2000,
            distance: '20%'
        });

        ScrollReveal().reveal('.dish', {
            origin: 'left',
            duration: 2000,
            distance: '20%'
        });

        ScrollReveal().reveal('#testimonialChef', {
            origin: 'left',
            duration: 1000,
            distance: '20%'
        });

        ScrollReveal().reveal('.feedback', {
            origin: 'right',
            duration: 2000,
            distance: '20%'
        });
    }
});