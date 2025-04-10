
// - - - - - - - плавна поява header при скролі - - - - - - -
window.addEventListener('scroll', function name() {
	scrollY > 0 ? document.querySelector('.header').classList.add('scroll') : document.querySelector('.header').classList.remove('scroll')
});


// - - - - - - - Меню бургер - - - - - - -
let documentActions = (e) => {
	const targetElement = e.target;

	// Відкриття/закриття меню при натисканні на кнопку
	if (targetElement.closest('.menu-icon__button')) {
		document.documentElement.classList.toggle('open-menu');

		// Заборона прокрутки
		if (document.documentElement.classList.contains('open-menu')) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}

	// Закриття меню при натисканні на пункт меню
	if (targetElement.closest('.menu__item')) {
		document.documentElement.classList.remove('open-menu');
		document.body.style.overflow = '';
	}
};
//  Додаємо обробник подій
document.addEventListener('click', documentActions);


// - - - - - - - скрол до відповідного блоку в меню - - - - - - -
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}

// - - - - - - - Додаємо обробник події на клік по логотипу - - - - - - -
document.getElementById('rise-creative-logo').addEventListener('click', function (event) {
	// Запобігаємо стандартній поведінці посилання
	event.preventDefault();

	// Прокручуємо сторінку до верху плавно
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// - - - - - - - Анамація лічильника - - - - - - -
window.addEventListener("load", () => {
	const counters = document.querySelectorAll("[data-digits-counter]");
	counters.forEach(counter => {
		animateCounter(counter);
	});

	function animateCounter(counter) {
		let duration = parseInt(counter.dataset.digitsCounter) || 1000;
		let targetValue = parseInt(counter.textContent);
		let start = 0;
		let startTime = null;

		function update(currentTime) {
			if (!startTime) startTime = currentTime;
			let progress = Math.min((currentTime - startTime) / duration, 1);
			counter.textContent = Math.floor(progress * targetValue);
			if (progress < 1) {
				requestAnimationFrame(update);
			}
		}

		requestAnimationFrame(update);
	}
});


// - - - - - - - swiper for section ready to use - - - - - - -
const gallarySwiper = new Swiper('.gallary__swiper', {
	slidesPerView: "auto",
	spaceBetween: 24,
	grabCursor: true,
	loop: false,

	// Navigation arrows
	navigation: {
		prevEl: '.gallary__button--left',
		nextEl: '.gallary__button--right',
	},

	autoplay: {
		delay: 14000, // 3 секунди на кожен слайд
		disableOnInteraction: false, // Продовжує прокрутку після взаємодії
	},

	breakpoints: {
		596: { spaceBetween: 30 },
	},

});


// - - - - - - - swiper for section testimonial - - - - - - -
const testimonialSwiper = new Swiper('.testimonial__swiper', {

	centeredSlides: true,
	slidesPerView: "auto",

	spaceBetween: 24,
	grabCursor: true,
	loop: false,
	speed: 600,
	initialSlide: 1,

	pagination: {
		el: ".testimonial__pagination-swiper",
		clickable: true,
	},

	breakpoints: {
		717: { spaceBetween: 60 },
	},

});