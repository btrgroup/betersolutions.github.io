// Scroll-in animations
document.querySelectorAll('[data-aos-delay]').forEach(function(el) {
    el.style.setProperty('--aos-delay', el.getAttribute('data-aos-delay'));
});

var aosObserver = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('aos-in');
            aosObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll('[data-aos]').forEach(function(el) {
    aosObserver.observe(el);
});

// Smooth-scroll nav links to their target ourselves, offset for the fixed navbar.
// Bootstrap's own data-bs-smooth-scroll ignores the navbar height and lands sections
// partly behind it, and has no offset option to correct that.
document.querySelectorAll('#mainNavList .nav-link').forEach(function (link) {
    link.addEventListener('click', function (e) {
        var targetId = link.getAttribute('href');
        if (!targetId || targetId.charAt(0) !== '#') return;
        var target = document.querySelector(targetId);
        if (!target) return;
        e.preventDefault();
        var top = target.getBoundingClientRect().top + window.scrollY - 100;
        window.scrollTo({ top: top, behavior: 'smooth' });
    });
});

// Contact is too short to ever trigger scrollspy's intersection band on its own,
// so highlight it manually once the page is scrolled to the very bottom.
var contactNavLink = document.querySelector('.navbar-nav .nav-link[href="#contact"]');
if (contactNavLink) {
    window.addEventListener('scroll', function () {
        var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
        if (atBottom) {
            document.querySelectorAll('.navbar-nav .nav-link.active').forEach(function (el) {
                el.classList.remove('active');
            });
            contactNavLink.classList.add('active');
        } else {
            contactNavLink.classList.remove('active');
        }
    });
}

