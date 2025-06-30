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


// Swiper для текстового блоку
const howItWorksTextSwiper = new Swiper('.text-swiper', {
	slidesPerView: 1,
	effect: 'fade',
	grabCursor: false,
	allowTouchMove: false,
	simulateTouch: false,
	loop: false,
	speed: 600,
	initialSlide: 0,
	pagination: {
		el: ".text-swiper__pagination",
		type: "fraction",
		formatFractionCurrent: number => number < 10 ? '0' + number : number,
		formatFractionTotal: number => number < 10 ? '0' + number : number,
	},
	navigation: {
		nextEl: '.text-swiper__button--right',
		prevEl: '.text-swiper__button--left',
	},
});





// Swiper для зображень
const howItWorksImgSwiper = new Swiper('.img-swiper', {

	slidesPerView: "auto",
	grabCursor: true,
	loop: false,
	speed: 600,
	initialSlide: 0,

	effect: "cards",
	cardsEffect: {
		perSlideOffset: 24,
		// perSlideRotate: 4,
	},

	breakpoints: {
		896: {
			cardsEffect: {
				perSlideOffset: 30,
			}
		}
	},

});

// 🔗 Синхронізація
howItWorksTextSwiper.controller.control = howItWorksImgSwiper;
howItWorksImgSwiper.controller.control = howItWorksTextSwiper;