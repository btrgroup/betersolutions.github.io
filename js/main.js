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

// Smooth-scroll nav links to their target, offset for the fixed navbar
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

// Highlight the nav-link whose section covers a fixed reference line
var navSections = Array.prototype.slice.call(document.querySelectorAll('#mainNavList .nav-link'))
    .map(function (link) {
        return { link: link, section: document.querySelector(link.getAttribute('href')) };
    })
    .filter(function (item) { return item.section; });

function updateActiveNavLink() {
    var referenceY = 110; // px from viewport top, clears the fixed navbar
    var atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
    var current = atBottom ? navSections[navSections.length - 1] : null;

    if (!current) {
        navSections.forEach(function (item) {
            var rect = item.section.getBoundingClientRect();
            if (rect.top <= referenceY && rect.bottom > referenceY) {
                current = item;
            }
        });
    }

    navSections.forEach(function (item) {
        item.link.classList.toggle('active', item === current);
    });
}

window.addEventListener('scroll', updateActiveNavLink);
window.addEventListener('resize', updateActiveNavLink);
updateActiveNavLink();

