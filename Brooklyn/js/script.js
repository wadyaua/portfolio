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

// Додаємо обробник подій 
document.addEventListener('click', documentActions);



const blogSwiper = new Swiper('.blog__swiper', {
	slidesPerView: "auto",
	spaceBetween: 12,

	loop: false,
	initialSlide: 0,

	pagination: {
		el: ".blog__pagination-swiper",
		clickable: true,
	},

	autoplay: {
		delay: 15000, // 3 секунди на кожен слайд
		disableOnInteraction: false, // Продовжує прокрутку після взаємодії
	},

	breakpoints: {
		596: { spaceBetween: 24,},
	},
});

const testimonialSwiper = new Swiper('.testimonials__swiper', {
	slidesPerView: 1,
	spaceBetween: 12,

	loop: false,
	centeredSlides: true,
	grabCursor: true,

	pagination: {
		el: ".testimonials__pagination-swiper",
		clickable: true,
	},
});