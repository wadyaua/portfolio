"use strict"


//# кастомні JavaScript-функції (модулі), які дозволяють робити плавне відкриття/закриття елемента
//% _slideDown() — плавно показує блок
//% _slideUp() — плавно ховає блок
//% _slideToggle() — перемикає між показом і схованим станом 

function _slideUp(target, duration = 300) {
	return new Promise(resolve => {
		if (!target.classList.contains('_slide')) {
			target.classList.add('_slide');
			target.style.transitionProperty = 'height, margin, padding, opacity';
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

			target.style.transitionProperty = 'height, margin, padding, opacity';
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

//=============================
// HEADER SCROLL
//=============================

document.addEventListener('scroll', () => {
	const header = document.querySelector('header');

	if (window.scrollY > 0) {
		header.classList.add('scrolled');
	} else {
		header.classList.remove('scrolled')
	}
})

//=============================
// MENU BURGER
//=============================

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


//=============================
// SPOILERS
//=============================

document.addEventListener("DOMContentLoaded", () => {
	const spoilers = document.querySelectorAll(".js-spoiler-details");

	spoilers.forEach(spoiler => {
		const summary = spoiler.querySelector(".js-spoiler-summary");
		const body = spoiler.querySelector(".js-spoiler-body");
		const wrapper = spoiler.closest(".js-spoiler");

		let isAnimating = false; // 🔒 захист від подвійного кліку

		// Початковий стан
		if (!spoiler.hasAttribute("open")) {
			body.hidden = true;
		} else {
			wrapper.classList.add("js-spoiler--active");
		}

		summary.addEventListener("click", async (e) => {
			e.preventDefault();

			if (isAnimating) return; // 🔒 блокуємо подвійний клік
			isAnimating = true;

			const duration = Number(spoiler.dataset.spoiler) || 300;
			const parentAccordion = spoiler.closest("[data-spoiler-accordion]");

			// АКОРДЕОН — закриваємо інші
			if (parentAccordion) {
				const otherSpoilers = parentAccordion.querySelectorAll(".js-spoiler-details");

				for (let other of otherSpoilers) {
					if (other !== spoiler && other.hasAttribute("open")) {
						const otherBody = other.querySelector(".js-spoiler-body");
						const otherWrapper = other.closest(".js-spoiler");

						otherWrapper.classList.remove("js-spoiler--active");
						await _slideUp(otherBody, Number(other.dataset.spoiler) || 300);
						other.removeAttribute("open");
					}
				}
			}

			// ВІДКРИТТЯ
			if (!spoiler.open) {
				wrapper.classList.add("js-spoiler--active");
				spoiler.setAttribute("open", "");
				await _slideDown(body, duration);
			}
			// ЗАКРИТТЯ
			else {
				wrapper.classList.remove("js-spoiler--active");
				await _slideUp(body, duration);
				spoiler.removeAttribute("open");
			}

			setTimeout(() => (isAnimating = false), 10); // повертаємо можливість кліку після завершення
		});
	});
});


//=============================
// SWIPER OPTIONS
//=============================

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

//* - init all swipers - - - - - - -

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
	}
	new Swiper(swiperEl, options);
});


//=============================
// PAYMENT SWITCHER / MOBILE PLAN ANIMATION
//=============================

const html = document.documentElement;
const MOBILE_ANIMATION_TIME = 250;

// ANIMATIONS
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

	const response = await fetch('/streamVibe/json/plan.json');
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
// MOBILE PLAN TABLE SWITCHER
//=============================

async function initMobilePlanTable() {

	const response = await fetch('/streamVibe/json/plans_features.json');
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
// MOBILE COLLECTION SWITCHER
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
// READ MORE
//=============================

function initReadMore() {
	const blocks = document.querySelectorAll('.read-more');
	if (!blocks.length) return;

	blocks.forEach((block) => {
		const btn = block.querySelector('.read-more__button');
		const text = block.querySelector('.read-more__content');

		if (!btn || !text) return;

		const collapsedHeight = getComputedStyle(text).maxHeight;

		btn.addEventListener('click', () => {
			const isOpen = block.classList.contains('is-open');

			if (isOpen) {
				block.classList.remove('is-open');
				btn.textContent = 'Read More';
				text.style.maxHeight = collapsedHeight;
				btn.setAttribute('aria-expanded', 'false');
			} else {
				block.classList.add('is-open');
				btn.textContent = 'Read Less';
				text.style.maxHeight = text.scrollHeight + 'px';
				btn.setAttribute('aria-expanded', 'true');
			}
		});
	});
}

//=============================
// SCROLL ANIMATION
//=============================


// function initScrollAnimations() {

// 	const elements = document.querySelectorAll('[data-anim]');
// 	if (!elements.length) return;

// 	const observersCache = {};

// 	const animCallback = (entries, observer) => {
// 		entries.forEach(entry => {
// 			const el = entry.target;

// 			if (entry.isIntersecting) {
// 				el.classList.add('animate');

// 				if (!el.hasAttribute('data-anim-repeat')) {
// 					observer.unobserve(el);
// 				}
// 			} else {
// 				if (el.hasAttribute('data-anim-repeat')) {
// 					el.classList.remove('animate');
// 				}
// 			}
// 		});
// 	};

// 	elements.forEach(el => {

// 		const threshold = el.dataset.threshold
// 			? parseFloat(el.dataset.threshold)
// 			: 0.1;

// 		const margin = el.dataset.margin || "-20%";

// 		const key = `${threshold}_${margin}`;

// 		if (!observersCache[key]) {
// 			observersCache[key] = new IntersectionObserver(animCallback, {
// 				root: null,
// 				rootMargin: `0px 0px ${margin} 0px`,
// 				threshold: threshold,
// 			});
// 		}

// 		observersCache[key].observe(el);
// 	});
// }

function initScrollAnimations() {
	const elements = document.querySelectorAll('[data-anim]');
	if (!elements.length) return;

	// Створюємо "лазерну лінію" на 15% вище нижнього краю екрану
	// Змініть -15% на -100px або інше значення, щоб опустити чи підняти межу
	const observerOptions = {
		root: null,
		rootMargin: '0px 0px -25% 0px',
		threshold: 0 // Спрацювати миттєво при перетині лінії
	};

	const animCallback = (entries, observer) => {
		entries.forEach(entry => {
			const el = entry.target;

			if (entry.isIntersecting) {
				el.classList.add('animate');

				// Якщо немає атрибута повторення - припиняємо стежити
				if (!el.hasAttribute('data-anim-repeat')) {
					observer.unobserve(el);
				}
			} else {
				// Забираємо клас, якщо об'єкт виходить з екрану і має повторюватись
				if (el.hasAttribute('data-anim-repeat')) {
					el.classList.remove('animate');
				}
			}
		});
	};

	// Ініціалізуємо один загальний обзервер
	const globalObserver = new IntersectionObserver(animCallback, observerOptions);

	// Вішаємо його на всі елементи
	elements.forEach(el => globalObserver.observe(el));
}

//=============================
// INIT DROPDOWN
//=============================

function initDropdowns() {
   // Допоміжна функція для закриття всіх активних меню
   function closeAllDropdowns() {
      document.querySelectorAll("[data-dropdown].active").forEach(el => {
         el.classList.remove("active");
         const btn = el.querySelector("[data-dropdown-button]");
         if (btn) btn.setAttribute("aria-expanded", "false");
      });
   }

   document.addEventListener("click", (e) => {
      const button = e.target.closest("[data-dropdown-button]");
      const dropdown = e.target.closest("[data-dropdown]");

      // Якщо клік поза кнопкою і поза контентом — закриваємо все
      if (!button && !dropdown) {
         closeAllDropdowns();
         return;
      }

      // Якщо клік по кнопці
      if (button) {
         const currentDropdown = button.closest("[data-dropdown]");
         const wasActive = currentDropdown.classList.contains("active");

         // Спочатку закриваємо всі інші (якщо вони були відкриті)
         closeAllDropdowns();

         // Якщо меню не було відкрите — відкриваємо його
         if (!wasActive) {
            currentDropdown.classList.add("active");
            button.setAttribute("aria-expanded", "true");
         }
      }
   });

   // Закриття по Escape
   document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
         closeAllDropdowns();
      }
   });
}


//=============================
// INIT MODALS
//=============================

function initModals() {
   const ANIMATION_TIME = 400; // Час анімації в мс (має збігатися з часом у CSS)

   // --- ДОПОМІЖНІ ФУНКЦІЇ ---

   function safeOpen(modal) {
      modal.showModal(); // 1. Фізично показуємо в DOM
      document.body.style.overflow = 'hidden'; 
      
      // 2. Даємо браузеру 1 кадр, щоб відмалювати opacity: 0, 
      // і одразу додаємо клас для запуску плавної анімації
      requestAnimationFrame(() => {
         modal.classList.add('is-open');
      });
   }

   function safeClose(modal) {
      if (!modal.hasAttribute('open')) return;
      
      // 1. Запускаємо анімацію зникнення (забираємо клас)
      modal.classList.remove('is-open');
      
      // 2. Чекаємо, поки модалка плавно зникне, і ТІЛЬКИ ТОДІ закриваємо нативно
      setTimeout(() => {
         modal.close();
      }, ANIMATION_TIME);
   }

   // --- ОБРОБНИКИ ПОДІЙ ---

   document.addEventListener("click", (e) => {
      const openBtn = e.target.closest('[data-modal-button="open"]');
      const closeBtn = e.target.closest('[data-modal-button="close"]');
      const modal = e.target.closest('[data-modal]');

      // ВІДКРИТТЯ
      if (openBtn) {
         const modalId = openBtn.getAttribute('data-modal-id');
         const targetModal = document.getElementById(modalId);
         if (targetModal) safeOpen(targetModal);
      }

      // ЗАКРИТТЯ ПО КНОПЦІ
      if (closeBtn && modal) {
         safeClose(modal);
      }

      // ЗАКРИТТЯ ПО BACKDROP
      if (e.target.nodeName === 'DIALOG' && e.target.hasAttribute('data-modal')) {
         const dialog = e.target;
         const rect = dialog.getBoundingClientRect();

         const isInside =
            e.clientX >= rect.left && e.clientX <= rect.right &&
            e.clientY >= rect.top && e.clientY <= rect.bottom;

         if (!isInside) {
            safeClose(dialog);
         }
      }
   });

   // ПЕРЕХОПЛЕННЯ КЛАВІШІ ESCAPE (щоб закривалося плавно)
   document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
         const openModal = document.querySelector('dialog[open]');
         if (openModal) {
            e.preventDefault(); // Блокуємо миттєве закриття від браузера
            safeClose(openModal); // Запускаємо наше плавне
         }
      }
   });

   // ПОВЕРНЕННЯ СКРОЛУ ТА ОЧИЩЕННЯ
   document.addEventListener('close', (e) => {
      if (e.target.nodeName === 'DIALOG' && e.target.hasAttribute('data-modal')) {
         document.body.style.overflow = '';
         e.target.classList.remove('is-open'); // Страховка
      }
   }, true);
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
	initReadMore();
	initScrollAnimations();
	initDropdowns();
	initModals();
}

if (document.readyState === 'complete') {
	onPageLoad();
} else {
	window.addEventListener('load', onPageLoad);
}



