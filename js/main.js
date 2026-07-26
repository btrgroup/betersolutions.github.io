// Scroll-in animations (replaces AOS library)
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

// Close mobile nav when a link is clicked
document.querySelectorAll('#mainNav .nav-link').forEach(function(link) {
    link.addEventListener('click', function() {
        var nav = document.getElementById('mainNav');
        if (nav.classList.contains('show')) {
            bootstrap.Collapse.getInstance(nav).hide();
        }
    });
});
