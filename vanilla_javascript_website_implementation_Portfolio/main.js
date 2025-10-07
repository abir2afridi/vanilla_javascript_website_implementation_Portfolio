import './style.css'

document.addEventListener('DOMContentLoaded', () => {
  // Ensure the app content is rendered (This line is redundant but kept for context)
  // document.querySelector('#app').innerHTML = document.querySelector('#app').innerHTML;

  // --- Theme Toggle Logic ---
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

  function getInitialTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme;
    }
    // Default to system preference if no theme is saved
    return prefersDark.matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    if (theme === 'dark') {
      body.classList.add('dark-mode');
      themeToggle.setAttribute('aria-label', 'Switch to light mode');
    } else {
      body.classList.remove('dark-mode');
      themeToggle.setAttribute('aria-label', 'Switch to dark mode');
    }
    localStorage.setItem('theme', theme);
  }

  // Apply initial theme on load
  applyTheme(getInitialTheme());

  // Handle toggle click
  themeToggle.addEventListener('click', () => {
    const currentTheme = body.classList.contains('dark-mode') ? 'dark' : 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    applyTheme(newTheme);
  });

  // Listen for system preference changes (if no explicit preference is saved)
  prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
      applyTheme(e.matches ? 'dark' : 'light');
    }
  });

  // --- Smooth Scrolling for Table of Contents ---
  const tocItems = document.querySelectorAll('.toc-list dt');

  tocItems.forEach(item => {
    item.addEventListener('click', (e) => {
      const targetId = e.target.getAttribute('data-target');
      if (targetId) {
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          // Scroll smoothly to the target element. CSS scroll-padding-top handles the offset.
          const offsetTop = targetElement.offsetTop;

          window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
          });
        }
      }
    });
  });
});
