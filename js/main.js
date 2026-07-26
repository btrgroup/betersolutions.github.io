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

