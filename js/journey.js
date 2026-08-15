document.addEventListener('DOMContentLoaded', function () {
    var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    var reveals = document.querySelectorAll('.journey-reveal');

    if ('IntersectionObserver' in window && !reducedMotion) {
        var observer = new IntersectionObserver(function (entries) {
            entries.forEach(function (entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.16 });
        reveals.forEach(function (element) { observer.observe(element); });
    } else {
        reveals.forEach(function (element) { element.classList.add('is-visible'); });
    }

    var timeline = document.querySelector('.journey-timeline');
    var line = document.querySelector('.journey-line-fill');
    var ticking = false;

    function updateTimeline() {
        if (!timeline || !line) return;
        var rect = timeline.getBoundingClientRect();
        var viewportPoint = window.innerHeight * 0.62;
        var progress = Math.min(1, Math.max(0, (viewportPoint - rect.top) / rect.height));
        line.style.height = (progress * 100) + '%';
        ticking = false;
    }

    window.addEventListener('scroll', function () {
        if (!ticking) {
            window.requestAnimationFrame(updateTimeline);
            ticking = true;
        }
    }, { passive: true });
    updateTimeline();

    document.querySelectorAll('.journey-compare').forEach(function (comparison) {
        var slider = comparison.querySelector('input[type="range"]');
        if (!slider) return;
        slider.addEventListener('input', function () {
            comparison.style.setProperty('--compare-position', slider.value + '%');
        });
    });
});
