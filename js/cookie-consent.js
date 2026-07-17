function loadAnalytics() {
    var ga = document.createElement('script');
    ga.async = true;
    ga.src = 'https://www.googletagmanager.com/gtag/js?id=G-TS2NTV4GYH';
    document.head.appendChild(ga);
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    window.gtag = gtag;
    gtag('js', new Date());
    gtag('config', 'G-TS2NTV4GYH');

    var hs = document.createElement('script');
    hs.async = true;
    hs.defer = true;
    hs.id = 'hs-script-loader';
    hs.src = '//js-na1.hs-scripts.com/48140960.js';
    document.head.appendChild(hs);
}

function setCookieConsent(accepted) {
    localStorage.setItem('cookie_consent', accepted ? 'accepted' : 'declined');
    document.getElementById('cookie-banner').style.display = 'none';
    if (accepted) loadAnalytics();
}

(function() {
    var consent = localStorage.getItem('cookie_consent');
    if (consent === 'accepted') {
        loadAnalytics();
    } else if (consent === 'declined') {
        // do nothing
    } else {
        document.getElementById('cookie-banner').style.display = 'block';
    }
})();
