/* =============================================
   P Techs Technologies – Main JavaScript
   ============================================= */

/* ---- ACCORDION ---- */
function initAccordions() {
    document.querySelectorAll('.accordion-header').forEach(btn => {
        btn.addEventListener('click', function () {
            const body = this.nextElementSibling;
            const isOpen = body.classList.contains('open');

            // Close all
            document.querySelectorAll('.accordion-body').forEach(b => b.classList.remove('open'));
            document.querySelectorAll('.accordion-header').forEach(b => b.classList.remove('active'));

            if (!isOpen) {
                body.classList.add('open');
                this.classList.add('active');
            }
        });
    });
}

/* ---- TABS ---- */
function initTabs() {
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', function () {
            const target = this.dataset.tab;
            const wrapper = this.closest('.tabs-wrapper');

            wrapper.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            wrapper.querySelectorAll('.tab-panel').forEach(p => p.classList.remove('active'));

            this.classList.add('active');
            wrapper.querySelector(`#${target}`).classList.add('active');
        });
    });
}

/* ---- LIGHTBOX ---- */
function initLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (!lightbox) return;

    const lbImg = lightbox.querySelector('img');
    const lbCaption = lightbox.querySelector('.lightbox-caption');

    document.querySelectorAll('.gallery-item').forEach(item => {
        item.addEventListener('click', function () {
            const src = this.querySelector('img').src;
            const caption = this.dataset.caption || '';
            lbImg.src = src;
            lbCaption.textContent = caption;
            lightbox.classList.add('open');
            document.body.style.overflow = 'hidden';
        });
    });

    lightbox.addEventListener('click', function (e) {
        if (e.target === lightbox || e.target.classList.contains('lightbox-close')) {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            lightbox.classList.remove('open');
            document.body.style.overflow = '';
        }
    });
}

/* ---- SEARCH & FILTER ---- */
function initSearch(inputId, filterId, itemSelector, textSelector) {
    const input = document.getElementById(inputId);
    if (!input) return;

    input.addEventListener('input', function () {
        const q = this.value.toLowerCase().trim();
        document.querySelectorAll(itemSelector).forEach(item => {
            const text = item.querySelector(textSelector)?.textContent.toLowerCase() || '';
            item.style.display = text.includes(q) ? '' : 'none';
        });
    });

    if (!filterId) return;
    document.querySelectorAll(`[data-filter]`).forEach(btn => {
        btn.addEventListener('click', function () {
            document.querySelectorAll('[data-filter]').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;

            document.querySelectorAll(itemSelector).forEach(item => {
                const cat = item.dataset.category || '';
                item.style.display = (filter === 'all' || cat === filter) ? '' : 'none';
            });
        });
    });
}

/* ---- FORM VALIDATION (shared helpers) ---- */
function showError(fieldId, msg) {
    const field = document.getElementById(fieldId);
    const errEl = document.getElementById(fieldId + '-error');
    if (field) field.classList.add('error');
    if (errEl) { errEl.textContent = msg; errEl.classList.add('visible'); }
}

function clearError(fieldId) {
    const field = document.getElementById(fieldId);
    const errEl = document.getElementById(fieldId + '-error');
    if (field) field.classList.remove('error');
    if (errEl) errEl.classList.remove('visible');
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function validatePhone(phone) {
    return /^[0-9]{10}$/.test(phone.replace(/\s/g, ''));
}

/* ---- SCROLL ANIMATIONS ---- */
function initScrollAnimations() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    document.querySelectorAll('.card, .section-title, .accordion').forEach(el => {
        observer.observe(el);
    });
}

/* ---- INIT ALL ---- */
document.addEventListener('DOMContentLoaded', function () {
    initAccordions();
    initTabs();
    initLightbox();
    initScrollAnimations();
});