document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = Array.from(document.querySelectorAll('.main-menu a'));
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));

  menuLinks.forEach((link) => {
    link.addEventListener('click', function () {
      menuLinks.forEach((item) => item.classList.toggle('active', item === link));
    });
  });

  serviceCards.forEach((card, index) => {
    card.style.animation = 'riseIn 700ms ease ' + (index * 80) + 'ms both';
  });
});
