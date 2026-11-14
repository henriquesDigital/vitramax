// Vitra Max - Interações do Site (Menu Mobile, Slider de Avaliações, Seletor WhatsApp)
document.addEventListener('DOMContentLoaded', function () {
  
  // 1. Menu Mobile Toggle
  var menuToggle = document.querySelector('.menu-toggle');
  var mainNav = document.querySelector('.main-nav');

  if (menuToggle && mainNav) {
    menuToggle.addEventListener('click', function () {
      var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
      menuToggle.setAttribute('aria-expanded', !isExpanded);
      mainNav.classList.toggle('open');
      menuToggle.textContent = mainNav.classList.contains('open') ? '✕' : '☰';
    });

    var navLinks = mainNav.querySelectorAll('a');
    navLinks.forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = '☰';
      });
    });
  }

  // 2. Header com sombra suave no scroll
  var header = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // 3. Slider de Avaliações (Carrossel Interativo com Setas e Dots)
  var track = document.querySelector('.reviews-track');
  var prevBtn = document.querySelector('.slider-btn.prev');
  var nextBtn = document.querySelector('.slider-btn.next');
  var dotsContainer = document.querySelector('.slider-dots');

  if (track && prevBtn && nextBtn) {
    var cards = track.querySelectorAll('.review-card');
    var currentIndex = 0;

    function getVisibleCards() {
      if (window.innerWidth <= 860) return 1;
      if (window.innerWidth <= 1100) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - getVisibleCards());
    }

    function updateSlider() {
      var visible = getVisibleCards();
      var cardWidth = cards[0].offsetWidth + 24; // largura + gap
      track.style.transform = 'translateX(-' + (currentIndex * cardWidth) + 'px)';

      // Atualiza dots
      if (dotsContainer) {
        var dots = dotsContainer.querySelectorAll('.slider-dot');
        dots.forEach(function (dot, i) {
          dot.classList.toggle('active', i === currentIndex);
        });
      }
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      var max = getMaxIndex();
      for (var i = 0; i <= max; i++) {
        var dot = document.createElement('div');
        dot.className = 'slider-dot' + (i === 0 ? ' active' : '');
        (function (index) {
          dot.addEventListener('click', function () {
            currentIndex = index;
            updateSlider();
          });
        })(i);
        dotsContainer.appendChild(dot);
      }
    }

    nextBtn.addEventListener('click', function () {
      if (currentIndex < getMaxIndex()) {
        currentIndex++;
      } else {
        currentIndex = 0;
      }
      updateSlider();
    });

    prevBtn.addEventListener('click', function () {
      if (currentIndex > 0) {
        currentIndex--;
      } else {
        currentIndex = getMaxIndex();
      }
      updateSlider();
    });

    window.addEventListener('resize', function () {
      if (currentIndex > getMaxIndex()) currentIndex = getMaxIndex();
      buildDots();
      updateSlider();
    });

    buildDots();
    updateSlider();
  }

  // 4. Seletor Interativo de Orçamento (WhatsApp Generator)
  var quoteForm = document.getElementById('quick-quote-form');
  if (quoteForm) {
    quoteForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var service = document.getElementById('calc-service').value;
      var propType = document.getElementById('calc-property').value;
      var city = document.getElementById('calc-city').value;

      var text = 'Olá! Vim pelo site da Vitra Max e gostaria de um orçamento.' +
                 '\n- Serviço de interesse: ' + service +
                 '\n- Tipo de imóvel: ' + propType +
                 '\n- Minha cidade: ' + city;

      var encoded = encodeURIComponent(text);
      var waUrl = 'https://wa.me/5547989081777?text=' + encoded;
      window.open(waUrl, '_blank');
    });
  }
});
