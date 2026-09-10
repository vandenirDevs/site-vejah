document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = Array.from(document.querySelectorAll('.main-menu a'));
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');

  if (menuToggle && mainMenu) {
    menuToggle.addEventListener('click', function () {
      const isOpen = mainMenu.classList.toggle('open');
      menuToggle.classList.toggle('active', isOpen);
      menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
  }

  menuLinks.forEach((link) => {
    link.addEventListener('click', function () {
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
