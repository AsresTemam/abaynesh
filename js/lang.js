/**
 * lang.js — Clean Custom Language Switcher for Abaynesh Dairy Farm
 * Handles: data-i18n (text), data-i18n-html (innerHTML), data-i18n-placeholder (placeholder)
 * Languages: English (en) | Amharic (am)
 */

const FLAG_MAP = { en: '🇬🇧', am: '🇪🇹' };
const LABEL_MAP = { en: 'EN', am: 'አማ' };
const SUPPORTED_LANGUAGES = ['en', 'am'];

function getSavedLanguage() {
    try {
        var saved = localStorage.getItem('siteLang');
        return SUPPORTED_LANGUAGES.indexOf(saved) !== -1 ? saved : 'en';
    } catch (error) {
        return 'en';
    }
}

let currentLang = getSavedLanguage();

// Helper to remove any residual Google Translate cookies/frames that cause dark banners
function cleanupGoogleTranslate() {
    // Clear Google Translate cookies
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=" + window.location.hostname;
    
    // Remove Google Translate injected banner elements if present in DOM
    const elementsToRemove = document.querySelectorAll('.goog-te-banner-frame, iframe.skiptranslate, #goog-gt-tt, .goog-te-spinner-pos');
    elementsToRemove.forEach(el => el.remove());

    // Reset body styling that Google Translate may have altered
    document.body.style.top = '0px';
    document.body.classList.remove('translated-ltr', 'translated-rtl');
}

// -------------------------------------------------------
// Core translator — runs on every page load & language change
// -------------------------------------------------------
function applyTranslations(lang) {
    if (SUPPORTED_LANGUAGES.indexOf(lang) === -1) lang = 'en';

    cleanupGoogleTranslate();
    if (typeof translations === 'undefined') return;

    document.documentElement.lang = lang;
    document.documentElement.dir = 'ltr';

    // 1. Translate [data-i18n] elements (text content)
    document.querySelectorAll('[data-i18n]').forEach(function(el) {
        var key = el.getAttribute('data-i18n');
        if (translations[key] && translations[key][lang] !== undefined) {
            el.textContent = translations[key][lang];
        }
    });

    // 2. Translate [data-i18n-html] elements (innerHTML — for rich content)
    document.querySelectorAll('[data-i18n-html]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-html');
        if (translations[key] && translations[key][lang] !== undefined) {
            el.innerHTML = translations[key][lang];
        }
    });

    // 3. Translate [data-i18n-placeholder] elements (input/textarea placeholders)
    document.querySelectorAll('[data-i18n-placeholder]').forEach(function(el) {
        var key = el.getAttribute('data-i18n-placeholder');
        if (translations[key] && translations[key][lang] !== undefined) {
            el.placeholder = translations[key][lang];
        }
    });

    // 4. Update the flag button display
    var flagEl  = document.getElementById('currentFlag');
    var labelEl = document.getElementById('currentLangLabel');
    if (flagEl)  flagEl.textContent  = FLAG_MAP[lang]  || '🌐';
    if (labelEl) labelEl.textContent = LABEL_MAP[lang] || lang.toUpperCase();

    // 5. Expose selection state to assistive technology
    document.querySelectorAll('.lang-dropdown-menu [data-lang]').forEach(function(option) {
        var isActive = option.getAttribute('data-lang') === lang;
        option.classList.toggle('active', isActive);
        option.setAttribute('aria-current', isActive ? 'true' : 'false');
    });
}

// -------------------------------------------------------
// Public function called by the dropdown onclick
// -------------------------------------------------------
function switchLanguage(lang) {
    if (SUPPORTED_LANGUAGES.indexOf(lang) === -1) return;

    currentLang = lang;
    try {
        localStorage.setItem('siteLang', lang);
    } catch (error) {
        // Translation still works when storage is unavailable (for example, in privacy mode).
    }
    applyTranslations(lang);
}

// -------------------------------------------------------
// On page load — restore saved language automatically
// -------------------------------------------------------
document.addEventListener('DOMContentLoaded', function() {
    // This menu opens on hover only. Remove Bootstrap's delegated click trigger
    // and prevent the placeholder link from jumping the page to the top.
    document.querySelectorAll('.lang-switcher').forEach(function(switcher) {
        var trigger = switcher.querySelector('#langSwitcherBtn');
        if (trigger) {
            trigger.removeAttribute('data-bs-toggle');
            trigger.setAttribute('aria-haspopup', 'true');
            trigger.addEventListener('click', function(event) {
                event.preventDefault();
                event.stopPropagation();
            });
        }

        switcher.querySelectorAll('.lang-dropdown-menu .dropdown-item').forEach(function(option) {
            var handler = option.getAttribute('onclick');
            var match = handler && handler.match(/switchLanguage\('([^']+)'\)/);
            if (match) option.setAttribute('data-lang', match[1]);
        });
    });

    var saved = getSavedLanguage();
    currentLang = saved;
    applyTranslations(saved);
});
