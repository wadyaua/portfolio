"use strict"

window.addEventListener("load", windowLoad);

function windowLoad() {
	// HTML
	const htmlBlock = document.documentElement;

	// Отримуємо збережену тему
	const saveUserTheme = localStorage.getItem('user-theme');

	// Робота з системними налаштуваннями
	let userTheme;
	if (window.matchMedia) {
		userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
	}
	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
		!saveUserTheme ? changeTheme() : null;
	});

	// Зміна теми по кліку
	const themeButton = document.querySelector('.page-theme__button');
	const resetButton = document.querySelector('.page-theme__reset');
	if (themeButton) {
		themeButton.addEventListener("click", function (e) {
			resetButton.classList.add('active');
			changeTheme(true);
		});
	}
	if (resetButton) {
		resetButton.addEventListener("click", function (e) {
			resetButton.classList.remove('active');
			localStorage.setItem('user-theme', '');
		});
	}

	// Функція додавання класу теми
	function setThemeClass() {
		if (saveUserTheme) {
			htmlBlock.classList.add(saveUserTheme);
			resetButton.classList.add('active');
		} else {
			htmlBlock.classList.add(userTheme);
		}
	}

	// Додаємо клас теми
	setThemeClass();

	// Функція зміни теми
	function changeTheme(saveTheme = false) {
		let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
		let newTheme;

		if (currentTheme === 'light') {
			newTheme = 'dark';
		} else if (currentTheme === 'dark') {
			newTheme = 'light';
		}

		htmlBlock.classList.remove(currentTheme);
		htmlBlock.classList.add(newTheme);
		saveTheme ? localStorage.setItem('user-theme', newTheme) : null;
	}
}

// - - плавна поява header при скролі - - - - - - -
document.addEventListener('scroll', () => {
	const header = document.querySelector('header');

	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled')
	}
})

// - - скрол до відповідного блоку в меню - - - - - - -
const menuLinks = document.querySelectorAll('.menu__link[data-goto], .menu-footer__link[data-goto]');
if (menuLinks.length > 0) {
	menuLinks.forEach(menuLink => {
		menuLink.addEventListener("click", onMenuLinkClick);
	});

	function onMenuLinkClick(e) {
		const menuLink = e.target;
		if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
			const gotoBlock = document.querySelector(menuLink.dataset.goto);
			// Отримуємо scroll-margin-top з CSS стилів блоку
			const scrollMarginTop = parseFloat(getComputedStyle(gotoBlock).scrollMarginTop) || 0;
			// Враховуємо висоту хедера та scroll-margin-top
			const gotoBlockValue = gotoBlock.getBoundingClientRect().top + window.scrollY - document.querySelector('header').offsetHeight - scrollMarginTop;

			window.scrollTo({
				top: gotoBlockValue,
				behavior: "smooth"
			});
			e.preventDefault();
		}
	}
}

// - - Меню бургер - - - - - - -
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

// - - - - - - - Додаємо обробник події на клік по логотипу - - - - - - -
document.getElementById('idchefmate').addEventListener('click', function (event) {
	// Запобігаємо стандартній поведінці посилання
	event.preventDefault();

	// Прокручуємо сторінку до верху плавно
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// - - - - - - - swiper for section testimonial - - - - - - -
const testimonialSwiper = new Swiper('.testimonials__swiper', {
	slidesPerView: "auto",

	spaceBetween: 20,
	grabCursor: true,
	loop: true,
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