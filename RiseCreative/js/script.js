let documentActions = (e) => {
	const targetElement = e.target;

	if (targetElement.closest('.menu-icon__button')) {
		document.documentElement.classList.toggle('open-menu');

		// Заборона прокрутки
		if (document.documentElement.classList.contains('open-menu')) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
	}
};

document.addEventListener('click', documentActions);


// swiper
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
		delay: 3000, // 3 секунди на кожен слайд
		disableOnInteraction: false, // Продовжує прокрутку після взаємодії
	},

	breakpoints: {
		596: { spaceBetween: 30 },
	},

});


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