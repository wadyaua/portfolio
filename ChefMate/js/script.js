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



// - - - - - - - swiper for section testimonial - - - - - - -
const testimonialSwiper = new Swiper('.testimonials__swiper', {
	slidesPerView: "auto",

	spaceBetween: 20,
	grabCursor: true,
	loop: false,
	speed: 600,
	initialSlide: 1,

	pagination: {
		el: ".testimonials__pagination",
		type: "fraction",
		formatFractionCurrent: function (number) {
			return number < 10 ? '0' + number : number;
		},
		formatFractionTotal: function (number) {
			return number < 10 ? '0' + number : number;
		},
	},

	autoplay: {
		delay: 14000, // 3 секунди на кожен слайд
		disableOnInteraction: false, // Продовжує прокрутку після взаємодії
	},
	


});