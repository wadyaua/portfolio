"use strict"


//# кастомні JavaScript-функції (модулі), які дозволяють робити плавне відкриття/закриття елемента
//% _slideDown() — плавно показує блок
//% _slideUp() — плавно ховає блок
//% _slideToggle() — перемикає між показом і схованим станом 

function _slideUp(target, duration = 300) {
	return new Promise(resolve => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = target.offsetHeight + 'px';
			target.offsetHeight;
			target.style.overflow = 'hidden';
			target.style.height = '0px';
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;

			setTimeout(() => {
				target.hidden = true;
				target.style.removeProperty('height');
				target.style.removeProperty('padding-top');
				target.style.removeProperty('padding-bottom');
				target.style.removeProperty('margin-top');
				target.style.removeProperty('margin-bottom');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				resolve();
			}, duration);
		}
	});
}

function _slideDown(target, duration = 300) {
	return new Promise(resolve => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.hidden = false;

			let height = target.offsetHeight;

			target.style.overflow = 'hidden';
			target.style.height = '0px';
			target.style.paddingTop = 0;
			target.style.paddingBottom = 0;
			target.style.marginTop = 0;
			target.style.marginBottom = 0;
			target.offsetHeight;

			target.style.transitionProperty = 'height, margin, padding';
			target.style.transitionDuration = duration + 'ms';
			target.style.height = height + 'px';

			target.style.removeProperty('padding-top');
			target.style.removeProperty('padding-bottom');
			target.style.removeProperty('margin-top');
			target.style.removeProperty('margin-bottom');

			setTimeout(() => {
				target.style.removeProperty('height');
				target.style.removeProperty('overflow');
				target.style.removeProperty('transition-duration');
				target.style.removeProperty('transition-property');
				target.classList.remove('_slide');
				resolve();
			}, duration);
		}
	});
}

function _slideToggle(target, duration = 300) {
	if (target.hidden) {
		return _slideDown(target, duration);
	} else {
		return _slideUp(target, duration);
	}
}

//@ - - перемикання теми - - - - - - -
// window.addEventListener("load", windowLoad);

// function windowLoad() {
// 	// HTML
// 	const htmlBlock = document.documentElement;

// 	// Отримуємо збережену тему
// 	const saveUserTheme = localStorage.getItem('user-theme');

// 	// Кнопки
// 	const themeButton = document.querySelector('.page-theme__button');
// 	const resetButton = document.querySelector('.page-theme__reset');

// 	// Робота з системними налаштуваннями
// 	let userTheme;
// 	if (window.matchMedia) {
// 		userTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
// 	}
// 	window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
// 		!saveUserTheme ? changeTheme() : null;
// 	});

// 	// Зміна теми по кліку
// 	if (themeButton) {
// 		themeButton.addEventListener("click", function () {
// 			resetButton.classList.add('active');
// 			changeTheme(true);
// 		});
// 	}

// 	if (resetButton) {
// 		resetButton.addEventListener("click", function () {
// 			resetButton.classList.remove('active');
// 			localStorage.setItem('user-theme', '');
// 		});
// 	}

// 	// Функція додавання класу теми
// 	function setThemeClass() {
// 		if (saveUserTheme) {
// 			htmlBlock.classList.add(saveUserTheme);
// 			resetButton.classList.add('active');
// 		} else {
// 			htmlBlock.classList.add(userTheme);
// 		}
// 		// Оновлюємо aria-label кнопки після ініціалізації
// 		updateThemeButtonAria();
// 	}

// 	// Додаємо клас теми
// 	setThemeClass();

// 	// Функція зміни теми
// 	function changeTheme(saveTheme = false) {
// 		let currentTheme = htmlBlock.classList.contains('light') ? 'light' : 'dark';
// 		let newTheme = currentTheme === 'light' ? 'dark' : 'light';

// 		htmlBlock.classList.remove(currentTheme);
// 		htmlBlock.classList.add(newTheme);

// 		// Оновлюємо aria-label кнопки після зміни теми
// 		updateThemeButtonAria();

// 		if (saveTheme) {
// 			localStorage.setItem('user-theme', newTheme);
// 		}
// 	}

// 	// Функція оновлення aria-label для themeButton
// 	function updateThemeButtonAria() {
// 		if (!themeButton) return;

// 		if (htmlBlock.classList.contains('dark')) {
// 			themeButton.setAttribute('aria-label', 'Switch to light theme');
// 		} else {
// 			themeButton.setAttribute('aria-label', 'Switch to dark theme');
// 		}
// 	}
// }

//@ - - плавна поява header при скролі - - - - - - -
document.addEventListener('scroll', () => {
	const header = document.querySelector('header');

	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled')
	}
})


//@ - - Меню бургер - - - - - - -
let documentActions = (e) => {
	const targetElement = e.target;
	const menuButton = document.querySelector('.menu-icon__button');

	// Відкриття/закриття меню при натисканні на кнопку
	if (targetElement.closest('.menu-icon__button')) {
		document.documentElement.classList.toggle('menu-open');

		// Заборона прокрутки
		if (document.documentElement.classList.contains('menu-open')) {
			document.body.style.overflow = 'hidden';
			// Меню відкрите → оновлюємо aria-label
			menuButton.setAttribute('aria-label', 'Close navigation menu');
		} else {
			document.body.style.overflow = '';
			// Меню закрите → оновлюємо aria-label
			menuButton.setAttribute('aria-label', 'Open navigation menu');
		}
	}

};

//  Додаємо обробник подій
document.addEventListener('click', documentActions);






//@ - - - - - - - спойлери - - - - - - -
document.addEventListener("DOMContentLoaded", () => {
	const spoilers = document.querySelectorAll(".spoiler__details");

	spoilers.forEach(spoiler => {
		const summary = spoiler.querySelector(".spoiler__summary");
		const body = spoiler.querySelector(".spoiler__text");
		const wrapper = spoiler.closest(".spoiler");

		let isAnimating = false; // 🔒 захист від подвійного кліку

		// Початковий стан
		if (!spoiler.hasAttribute("open")) {
			body.hidden = true;
		} else {
			wrapper.classList.add("spoiler--active");
		}

		summary.addEventListener("click", async (e) => {
			e.preventDefault();

			if (isAnimating) return; // 🔒 блокуємо подвійний клік
			isAnimating = true;

			const duration = Number(spoiler.dataset.spoiler) || 300;
			const parentAccordion = spoiler.closest("[data-spoiler-accordion]");

			// АКОРДЕОН — закриваємо інші
			if (parentAccordion) {
				const otherSpoilers = parentAccordion.querySelectorAll(".spoiler__details");

				for (let other of otherSpoilers) {
					if (other !== spoiler && other.hasAttribute("open")) {
						const otherBody = other.querySelector(".spoiler__text");
						const otherWrapper = other.closest(".spoiler");

						otherWrapper.classList.remove("spoiler--active");
						await _slideUp(otherBody, Number(other.dataset.spoiler) || 300);
						other.removeAttribute("open");
					}
				}
			}

			// ВІДКРИТТЯ
			if (!spoiler.open) {
				wrapper.classList.add("spoiler--active");
				spoiler.setAttribute("open", "");
				await _slideDown(body, duration);
			}
			// ЗАКРИТТЯ
			else {
				wrapper.classList.remove("spoiler--active");
				await _slideUp(body, duration);
				spoiler.removeAttribute("open");
			}

			setTimeout(() => (isAnimating = false), 10); // повертаємо можливість кліку після завершення
		});
	});
});






//@ - - - - - - - base swiper options - - - - - - -

const baseOptions = {
	slidesPerView: "auto",
	spaceBetween: 12,
	speed: 400,

	breakpoints: {
		767: {
			spaceBetween: 22,
		},
	}
};


//@ - - - - - - - init all swipers - - - - - - -

document.querySelectorAll('.js-swiper').forEach(swiperEl => {

	const section = swiperEl.closest('section');

	const options = {
		...baseOptions,

		navigation: {
			prevEl: section.querySelector('.js-prev') || null,
			nextEl: section.querySelector('.js-next') || null,
		},

		pagination: {
			el: section.querySelector('.js-pagination') || null,
			clickable: true,
		},

		scrollbar: {
			el: swiperEl.querySelector('.js-scrollbar') || null,
			draggable: true,
		}
	};


	//@ - - - special settings for hero slider - - -

	if (swiperEl.classList.contains('inner-hero__swiper')) {
		options.slidesPerView = 1;
		options.grabCursor = true;

		options.autoplay = {
			delay: 8000,
		};

		// options.watchOverflow = true;
		// options.preloadImages = false;
		// options.lazy = true;
	}


	new Swiper(swiperEl, options);

});

//@ - - - - - - - swiper for inner hero - - - - - - -


// const innerHeroSlider = new Swiper('.inner-hero__swiper', {
// 	slidesPerView: "1",

// 	spaceBetween: 12,
// 	grabCursor: true,
// 	speed: 400,
// 	initialSlide: 0,

// 	autoplay: {
// 		delay: 8000,
// 	},

// 	navigation: {
// 		prevEl: '.navigation-inner-hero__button--prev',
// 		nextEl: '.navigation-inner-hero__button--next',
// 	},

// 	pagination: {
// 		el: ".bullets--navigation-inner-hero",
// 		clickable: true,
// 	},

// });


//@ - - - - - - - swiper for section cardSlider - - - - - - -

// const cardSliderCategoriesSmall = new Swiper('.cards-slider__swiper--home-page', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	grabCursor: true,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--categories-small-next',
// 		prevEl: '.navigation-header__button--categories-small-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--categories-small",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.scrollbar--categories-small',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });

//@ - - - - - - - catalog-page - - - - - - -
//@ - - - - - - - swiper for section genres__swiper--movie - - - - - - -
// const cardSliderGenresMovie = new Swiper('.genres__swiper--movie', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--genres-movie-next',
// 		prevEl: '.navigation-header__button--genres-movie-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--genres-movie",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.genres__scrollbar--movie',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });
//@ - - - - - - - swiper for section genres__swiper--shows - - - - - - -
// const cardSliderGenresShows = new Swiper('.genres__swiper--shows', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--genres-shows-next',
// 		prevEl: '.navigation-header__button--genres-shows-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--genres-shows",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.genres__scrollbar--shows',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });


//@ - - - - - - - swiper for section popular__swiper--movie - - - - - - -
// const cardSliderPopularMovie = new Swiper('.popular__swiper--movie', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--popular-movie-next',
// 		prevEl: '.navigation-header__button--popular-movie-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--popular-movie",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.popular__scrollbar--movie',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });
//@ - - - - - - - swiper for section popular__swiper--shows - - - - - - -
// const cardSliderPopularShows = new Swiper('.popular__swiper--shows', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--popular-shows-next',
// 		prevEl: '.navigation-header__button--popular-shows-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--popular-shows",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.popular__scrollbar--shows',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });


//@ - - - - - - - swiper for section trending__swiper--movie - - - - - - -
// const cardSliderTrendingMovie = new Swiper('.trending__swiper--movie', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--trending-movie-next',
// 		prevEl: '.navigation-header__button--trending-movie-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--trending-movie",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.trending__scrollbar--movie',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });
//@ - - - - - - - swiper for section trending__swiper--shows - - - - - - -
// const cardSliderTrendingShows = new Swiper('.trending__swiper--shows', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--trending-shows-next',
// 		prevEl: '.navigation-header__button--trending-shows-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--trending-shows",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.trending__scrollbar--shows',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });


//@ - - - - - - - swiper for section recommended__swiper--movie - - - - - - -
// const cardSliderRecommendedMovie = new Swiper('.recommended__swiper--movie', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--recommended-movie-next',
// 		prevEl: '.navigation-header__button--recommended-movie-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--recommended-movie",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.recommended__scrollbar--movie',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });
//@ - - - - - - - swiper for section recommended__swiper--shows - - - - - - -
// const cardSliderRecommendedShows = new Swiper('.recommended__swiper--shows', {
// 	slidesPerView: "auto",

// 	spaceBetween: 12,
// 	speed: 400,
// 	initialSlide: 0,

// 	navigation: {
// 		nextEl: '.navigation-header__button--recommended-shows-next',
// 		prevEl: '.navigation-header__button--recommended-shows-prev',
// 	},

// 	pagination: {
// 		el: ".bullets--recommended-shows",
// 		clickable: true,
// 	},
// 	scrollbar: {
// 		el: '.recommended__scrollbar--shows',
// 		draggable: true,
// 		dragSize: 30,
// 	},

// 	breakpoints: {
// 		767: {
// 			spaceBetween: 22,
// 		},
// 	},

// });




//@ - - - - - - - price-swicher + mobile-table INIT SYSTEM - - - - - - -

const html = document.documentElement;
const MOBILE_ANIMATION_TIME = 250;

//=============================
// ANIMATIONS
//=============================

function animatePrice(block) {
	block.classList.add('price--animate');

	setTimeout(() => {
		block.classList.remove('price--animate');
	}, 250);
}

function animateText(wrapper) {
	wrapper.classList.add('mobile-table__text--animate');

	setTimeout(() => {
		wrapper.classList.remove('mobile-table__text--animate');
	}, MOBILE_ANIMATION_TIME);
}

//=============================
// PAYMENT SWITCHER
//=============================

async function initPriceSwitcher() {

	const response = await fetch('../json/plan.json');
	if (!response.ok) {
		console.error('plan.json loading error');
		return;
	}

	const data = await response.json();
	const prices = data.price;

	document.addEventListener('click', (e) => {

		const btn = e.target.closest('.plan-switcher__button');
		if (!btn) return;

		const active = document.querySelector('.plan-switcher__button--active');
		if (active === btn) return;

		active.classList.remove('plan-switcher__button--active');
		btn.classList.add('plan-switcher__button--active');

		const type = btn.dataset.type;
		const priceBlocks = document.querySelectorAll('.plan-item__price');

		priceBlocks.forEach((block, i) => {

			const valueEl = block.querySelector('.plan-item__price-value');
			const periodEl = block.querySelector('.plan-item__price-period');

			animatePrice(block);

			setTimeout(() => {
				valueEl.textContent = prices[i][type];
				periodEl.textContent = type === 'm' ? '/month' : '/year';
			}, 250);
		});
	});
}

//=============================
// MOBILE PLAN TABLE
//=============================

async function initMobilePlanTable() {

	const response = await fetch('../json/plans_features.json');
	if (!response.ok) {
		console.error('plans_features.json loading error');
		return;
	}

	const data = await response.json();

	function render(planType) {

		const items = document.querySelectorAll('.mobile-table__grid-item');

		items.forEach((item) => {

			const key = item.dataset.key;
			const textWrapper = item.querySelector('.mobile-table__text');
			const p = textWrapper.querySelector('p');

			animateText(textWrapper);

			setTimeout(() => {
				p.textContent = data[planType][key] ?? '';
			}, MOBILE_ANIMATION_TIME);
		});
	}

	document.addEventListener('click', (e) => {

		const btn = e.target.closest('.plan-tabs__button');
		if (!btn) return;

		const active = document.querySelector('.plan-tabs__button--active');
		if (active === btn) return;

		active.classList.remove('plan-tabs__button--active');
		btn.classList.add('plan-tabs__button--active');

		render(btn.dataset.plan);
	});

	// --- initial render (Standard) ---
	const activeBtn = document.querySelector('.plan-tabs__button--active');
	if (activeBtn) {
		render(activeBtn.dataset.plan);
	}
}


//=============================
// MOBILE Collection Switcher
//=============================

function initCollectionSwitcher() {

	const DESKTOP = window.matchMedia('(min-width: 567.98px)');
	const switcher = document.querySelector('.collection-switcher');
	const track = document.querySelector('.collection__content');
	const items = document.querySelectorAll('.collection__item');

	if (!switcher || !track || !items.length) return;

	function move(type) {

		// 🖥 DESKTOP — повертаємо все в нормальний стан
		if (DESKTOP.matches) {
			track.style.transform = '';

			items.forEach(item => {
				item.classList.remove('collection__item--active');
			});

			return;
		}

		// 📱 MOBILE — рухаємо слайд
		track.style.transform =
			type === 'shows'
				? 'translateX(-100%)'
				: 'translateX(0)';

		// 🔥 ОНОВЛЮЄМО OPACITY
		items.forEach(item => {
			item.classList.remove('collection__item--active');
		});

		const activeItem = document.querySelector(
			`.collection__item--${type}`
		);

		if (activeItem) {
			activeItem.classList.add('collection__item--active');
		}
	}

	switcher.addEventListener('click', (e) => {

		if (DESKTOP.matches) return;

		const btn = e.target.closest('[data-collection]');
		if (!btn) return;

		const activeBtn = switcher.querySelector('.collection-switcher__button--active');
		if (activeBtn === btn) return;

		activeBtn.classList.remove('collection-switcher__button--active');
		btn.classList.add('collection-switcher__button--active');

		move(btn.dataset.collection);
	});

	DESKTOP.addEventListener('change', () => {
		const activeBtn = switcher.querySelector('.collection-switcher__button--active');
		if (activeBtn) move(activeBtn.dataset.collection);
	});

	// initial state
	const activeBtn = switcher.querySelector('.collection-switcher__button--active');
	if (activeBtn) move(activeBtn.dataset.collection);
}


//=============================
// RATING
//=============================
// Основная функция
function initRatings() {

	const ratings = document.querySelectorAll('.rating');
	if (!ratings.length) return;

	let ratingActive, ratingValue;

	ratings.forEach(rating => {
		initRating(rating);
	});

	function initRating(rating) {
		initRatingVars(rating);
		setRatingActiveWidth();
	}

	function initRatingVars(rating) {
		ratingActive = rating.querySelector('.rating__active');
		ratingValue = rating.querySelector('.rating__value');
	}

	function setRatingActiveWidth(index = ratingValue.innerHTML) {
		const ratingActiveWidth = index / 0.05;
		ratingActive.style.width = `${ratingActiveWidth}%`;
	}
}

//=============================
// PAGE LOAD INIT
//=============================

function startPageAnimation() {
	requestAnimationFrame(() => {
		html.classList.add('loaded');
	});
}

async function onPageLoad() {
	startPageAnimation();
	await initPriceSwitcher();
	await initMobilePlanTable();
	initCollectionSwitcher();
	initRatings();
}

if (document.readyState === 'complete') {
	onPageLoad();
} else {
	window.addEventListener('load', onPageLoad);
}



