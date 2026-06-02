/* =============================================
   BLOGR LANDING PAGE - JAVASCRIPT
   ============================================= */

'use strict';

// ---- Mobile Hamburger Menu ----
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('active', isOpen);
  hamburger.setAttribute('aria-expanded', String(isOpen));
});

// Close mobile menu when clicking outside
document.addEventListener('click', (e) => {
  if (!hamburger.contains(e.target) && !mobileMenu.contains(e.target)) {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ---- Dropdown Menus ----
const navToggles = document.querySelectorAll('.nav-toggle');

navToggles.forEach((toggle) => {
  toggle.addEventListener('click', () => {
    const dropdown = toggle.nextElementSibling;
    const isExpanded = toggle.getAttribute('aria-expanded') === 'true';

    // Close all other dropdowns first
    navToggles.forEach((otherToggle) => {
      if (otherToggle !== toggle) {
        otherToggle.setAttribute('aria-expanded', 'false');
        otherToggle.nextElementSibling?.classList.remove('open');
      }
    });

    // Toggle current dropdown
    toggle.setAttribute('aria-expanded', String(!isExpanded));
    dropdown?.classList.toggle('open', !isExpanded);
  });
});

// Close dropdowns when pressing Escape
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    navToggles.forEach((toggle) => {
      toggle.setAttribute('aria-expanded', 'false');
      toggle.nextElementSibling?.classList.remove('open');
    });
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
  }
});

// ---- Scroll Reveal Animation ----
const revealElements = document.querySelectorAll(
  '.feature-block, .future-illustration, .state-illustration, .free-illustration, .section-title'
);

revealElements.forEach((el) => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Only animate once
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ---- Stagger Reveal for feature blocks ----
document.querySelectorAll('.feature-block').forEach((block, i) => {
  block.style.transitionDelay = `${i * 0.1}s`;
});
