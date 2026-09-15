document.addEventListener('DOMContentLoaded', function () {
  const menuLinks = Array.from(document.querySelectorAll('.main-menu a'));
  const serviceCards = Array.from(document.querySelectorAll('.service-card'));
  const menuToggle = document.querySelector('.menu-toggle');
  const mainMenu = document.querySelector('.main-menu');
  const sections = Array.from(document.querySelectorAll('main section[id]'));

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

  function setActiveLink(link) {
    menuLinks.forEach((item) => item.classList.toggle('active', item === link));
  }

  function activateFromSection(sectionId) {
    const targetLink = menuLinks.find((link) => link.getAttribute('href') === `#${sectionId}`);
    if (targetLink) {
      setActiveLink(targetLink);
    }
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

      setActiveLink(link);

      if (mainMenu && mainMenu.classList.contains('open')) {
        mainMenu.classList.remove('open');
      }

      if (menuToggle) {
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
      }
    });
  });

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver((entries) => {
      const visibleSections = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

      if (visibleSections.length > 0) {
        activateFromSection(visibleSections[0].target.id);
      }
    }, {
      root: null,
      rootMargin: '0px 0px -65% 0px',
      threshold: [0.2, 0.45, 0.7]
    });

    sections.forEach((section) => observer.observe(section));
  } else {
    const sectionTopOffsets = sections.map((section) => ({
      id: section.id,
      offset: section.offsetTop
    }));

    function updateActiveByScroll() {
      const currentScroll = window.scrollY || window.pageYOffset || document.documentElement.scrollTop;
      let currentSection = sections[0];

      sectionTopOffsets.forEach((item) => {
        if (currentScroll >= item.offset - 150) {
          currentSection = document.getElementById(item.id) || currentSection;
        }
      });

      if (currentSection) {
        activateFromSection(currentSection.id);
      }
    }

    updateActiveByScroll();
    window.addEventListener('scroll', updateActiveByScroll);
  }

  serviceCards.forEach((card, index) => {
    card.style.animation = 'riseIn 700ms ease ' + (index * 80) + 'ms both';
  });
});
