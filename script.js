document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = Array.from(document.querySelectorAll('.main-menu a'));
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');

  function smoothScrollTo(target) {
    const startY = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
    const targetY = target.getBoundingClientRect().top + startY - 82;
    const distance = targetY - startY;
    const duration = 720;
    const start = performance.now();

    function animate(now) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);

      window.scrollTo(0, startY + distance * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    }

    requestAnimationFrame(animate);
  }

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainMenu.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', function (event) {
      event.preventDefault();

      const targetId = link.getAttribute('href');
      const target = targetId ? document.querySelector(targetId) : null;

      if (target) {
        smoothScrollTo(target);
      }

      menuLinks.forEach((item) => item.classList.toggle('active', item === link));

      if (mainMenu && mainMenu.classList.contains('open')) {
        mainMenu.classList.remove('open');
      }

      if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  serviceCards.forEach((card, index) => {
    card.style.animation = 'riseIn 700ms ease ' + (index * 80) + 'ms both';
  });
});
