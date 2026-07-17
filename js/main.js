AOS.init({
    duration: 800,
    once: true
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
