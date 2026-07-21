"use strict";
// ============================================================
//  SLIDE HELPERS
//  _slideUp / _slideDown / _slideToggle
// ============================================================
function _slideUp(target, duration = 300) {
	return new Promise(resolve => {
		if (target.classList.contains('_slide')) { resolve(); return; }

		target.classList.add('_slide');
		target.style.transitionProperty = 'height, margin, padding, opacity';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = target.offsetHeight + 'px';
		target.offsetHeight; // force reflow
		target.style.overflow = 'hidden';
		target.style.height = '0px';
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;

		setTimeout(() => {
			target.hidden = true;
			['height', 'padding-top', 'padding-bottom', 'margin-top',
				'margin-bottom', 'overflow', 'transition-duration', 'transition-property']
				.forEach(p => target.style.removeProperty(p));
			target.classList.remove('_slide');
			resolve();
		}, duration);
	});
}

function _slideDown(target, duration = 300) {
	return new Promise(resolve => {
		if (target.classList.contains('_slide')) { resolve(); return; }

		target.classList.add('_slide');
		target.hidden = false;

		// ✅ FIX: measure height AFTER unhiding, before collapsing
		const height = target.scrollHeight;

		target.style.overflow = 'hidden';
		target.style.height = '0px';
		target.style.paddingTop = 0;
		target.style.paddingBottom = 0;
		target.style.marginTop = 0;
		target.style.marginBottom = 0;
		target.offsetHeight; // force reflow

		target.style.transitionProperty = 'height, margin, padding, opacity';
		target.style.transitionDuration = duration + 'ms';
		target.style.height = height + 'px';

		['padding-top', 'padding-bottom', 'margin-top', 'margin-bottom']
			.forEach(p => target.style.removeProperty(p));

		setTimeout(() => {
			['height', 'overflow', 'transition-duration', 'transition-property']
				.forEach(p => target.style.removeProperty(p));
			target.classList.remove('_slide');
			resolve();
		}, duration);
	});
}

function _slideToggle(target, duration = 300) {
	return target.hidden ? _slideDown(target, duration) : _slideUp(target, duration);
}
// ============================================================
//  SCROLL LOCK MANAGER
// ============================================================
const ScrollLock = {
	_locks: new Set(),

	lock(id) {
		this._locks.add(id);
		document.body.style.overflow = 'hidden';
	},

	unlock(id) {
		this._locks.delete(id);
		if (this._locks.size === 0) document.body.style.overflow = '';
	},

	forceUnlock() {
		this._locks.clear();
		document.body.style.overflow = '';
	}
};

// ============================================================
//  HEADER SCROLL
// ============================================================
document.addEventListener('scroll', () => {
	const header = document.querySelector('header');
	if (!header) return;
	header.classList.toggle('scrolled', window.scrollY > 0);
}, { passive: true });

// ============================================================
//  BURGER MENU
// ============================================================
function openBurgerMenu() {
	document.documentElement.classList.add('menu-open');
	ScrollLock.lock('burger');
	const btn = document.querySelector('.menu-icon__button');
	if (btn) btn.setAttribute('aria-label', 'Close navigation menu');
}

function closeBurgerMenu() {
	document.documentElement.classList.remove('menu-open');
	ScrollLock.unlock('burger');
	const btn = document.querySelector('.menu-icon__button');
	if (btn) btn.setAttribute('aria-label', 'Open navigation menu');
}

// ============================================================
//  SPOILERS
// ============================================================
function initSpoilers() {
	const spoilers = document.querySelectorAll('.js-spoiler-details');
	if (!spoilers.length) return;

	spoilers.forEach(spoiler => {
		const summary = spoiler.querySelector('.js-spoiler-summary');
		const body = spoiler.querySelector('.js-spoiler-body');
		const wrapper = spoiler.closest('.js-spoiler');

		if (!summary || !body || !wrapper) return;

		let isAnimating = false;

		if (!spoiler.hasAttribute('open')) {
			body.hidden = true;
		} else {
			wrapper.classList.add('js-spoiler--active');
		}

		summary.addEventListener('click', async (e) => {
			e.preventDefault();
			if (isAnimating) return;
			isAnimating = true;

			const duration = Number(spoiler.dataset.spoiler) || 300;
			const parentAccordion = spoiler.closest('[data-spoiler-accordion]');

			if (parentAccordion) {
				const others = parentAccordion.querySelectorAll('.js-spoiler-details');
				for (const other of others) {
					if (other !== spoiler && other.hasAttribute('open')) {
						const otherBody = other.querySelector('.js-spoiler-body');
						const otherWrapper = other.closest('.js-spoiler');
						otherWrapper.classList.remove('js-spoiler--active');
						await _slideUp(otherBody, Number(other.dataset.spoiler) || 300);
						other.removeAttribute('open');
					}
				}
			}

			if (!spoiler.open) {
				wrapper.classList.add('js-spoiler--active');
				spoiler.setAttribute('open', '');
				await _slideDown(body, duration);
			} else {
				wrapper.classList.remove('js-spoiler--active');
				await _slideUp(body, duration);
				spoiler.removeAttribute('open');
			}
			
			isAnimating = false;
		});
	});
}

// ============================================================
//  SWIPER
// ============================================================
let activeSwipers = [];

function initSwipers() {
	const swiperElements = document.querySelectorAll('.js-swiper');
	if (!swiperElements.length) return;

	const baseOptions = {
		slidesPerView: 'auto',
		spaceBetween: 12,
		speed: 400,
		breakpoints: { 767: { spaceBetween: 22 } }
	};

	swiperElements.forEach(swiperEl => {
		const section = swiperEl.closest('section');

		const options = {
			...baseOptions,
			navigation: {
				prevEl: section?.querySelector('.js-prev') || null,
				nextEl: section?.querySelector('.js-next') || null,
			},
			pagination: {
				el: section?.querySelector('.js-pagination') || null,
				clickable: true,
			},
			scrollbar: {
				el: swiperEl.querySelector('.js-scrollbar') || null,
				draggable: true,
			}
		};

		if (swiperEl.classList.contains('inner-hero__swiper')) {
			options.slidesPerView = 1;
			options.grabCursor = true;
			options.autoplay = { delay: 8000 };
		}

		activeSwipers.push(new Swiper(swiperEl, options));
	});
}

// function destroySwipers() {
// 	activeSwipers.forEach(s => { if (s && !s.destroyed) s.destroy(true, true); });
// 	activeSwipers = [];
// }
// ============================================================
//  PRICE SWITCHER
// ============================================================
const MOBILE_ANIMATION_TIME = 250;

function animatePrice(block) {
	block.classList.add('price--animate');
	setTimeout(() => block.classList.remove('price--animate'), 250);
}

function animateText(wrapper) {
	wrapper.classList.add('mobile-table__text--animate');
	setTimeout(() => wrapper.classList.remove('mobile-table__text--animate'), MOBILE_ANIMATION_TIME);
}
async function initPriceSwitcher() {
	let prices;

	try {
		const response = await fetch('../json/plan.json');
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		const data = await response.json();
		prices = data.price;
	} catch (err) {
		console.warn('[PriceSwitcher] Could not load plan.json:', err);
		return;
	}

	document.addEventListener('click', (e) => {
		const btn = e.target.closest('.plan-switcher__button');
		if (!btn) return;

		const active = document.querySelector('.plan-switcher__button--active');
		if (!active || active === btn) return;

		active.classList.remove('plan-switcher__button--active');
		btn.classList.add('plan-switcher__button--active');

		const type = btn.dataset.type;
		const priceBlocks = document.querySelectorAll('.plan-item__price');

		priceBlocks.forEach((block, i) => {
			if (!prices[i]) return;
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

// ============================================================
//  MOBILE PLAN TABLE SWITCHER
// ============================================================
async function initMobilePlanTable() {
	const tabsContainer = document.querySelector('.plan-tabs');
	const items = document.querySelectorAll('.mobile-table__grid-item');
	if (!tabsContainer || !items.length) return;

	let data;
	try {
		const response = await fetch('../json/plans_features.json');
		if (!response.ok) throw new Error(`HTTP ${response.status}`);
		data = await response.json();
	} catch (err) {
		console.warn('[MobilePlanTable] Could not load plans_features.json:', err);
		return;
	}

	function render(planType) {
		items.forEach(item => {
			const key = item.dataset.key;
			const textWrapper = item.querySelector('.mobile-table__text');
			const p = textWrapper?.querySelector('p');
			if (!p) return;

			animateText(textWrapper);
			setTimeout(() => { p.textContent = data[planType]?.[key] ?? ''; }, MOBILE_ANIMATION_TIME);
		});
	}

	tabsContainer.addEventListener('click', (e) => {
		const btn = e.target.closest('.plan-tabs__button');
		if (!btn) return;

		const active = tabsContainer.querySelector('.plan-tabs__button--active');
		if (active === btn) return;

		active?.classList.remove('plan-tabs__button--active');
		btn.classList.add('plan-tabs__button--active');
		render(btn.dataset.plan);
	});

	const activeBtn = tabsContainer.querySelector('.plan-tabs__button--active');
	if (activeBtn) render(activeBtn.dataset.plan);
}

// ============================================================
//  COLLECTION SWITCHER
// ============================================================
let collectionMqCleanup = null;

function initCollectionSwitcher() {
	if (collectionMqCleanup) { collectionMqCleanup(); collectionMqCleanup = null; }

	const DESKTOP = window.matchMedia('(min-width: 567.98px)');
	const switcher = document.querySelector('.collection-switcher');
	const track = document.querySelector('.collection__content');
	const items = document.querySelectorAll('.collection__item');

	if (!switcher || !track || !items.length) return;

	function move(type) {
		if (DESKTOP.matches) {
			track.style.transform = '';
			items.forEach(item => item.classList.remove('collection__item--active'));
			return;
		}

		track.style.transform = type === 'shows' ? 'translateX(-100%)' : 'translateX(0)';
		items.forEach(item => item.classList.remove('collection__item--active'));

		const activeItem = document.querySelector(`.collection__item--${type}`);
		if (activeItem) activeItem.classList.add('collection__item--active');
	}

	const mqHandler = () => {
		const activeBtn = switcher.querySelector('.collection-switcher__button--active');
		if (activeBtn) move(activeBtn.dataset.collection);
	};

	DESKTOP.addEventListener('change', mqHandler);

	// Store cleanup so next initCollectionSwitcher call removes old handler
	collectionMqCleanup = () => DESKTOP.removeEventListener('change', mqHandler);

	switcher.addEventListener('click', (e) => {
		if (DESKTOP.matches) return;
		const btn = e.target.closest('[data-collection]');
		if (!btn) return;

		const activeBtn = switcher.querySelector('.collection-switcher__button--active');
		if (activeBtn === btn) return;
		activeBtn?.classList.remove('collection-switcher__button--active');
		btn.classList.add('collection-switcher__button--active');
		move(btn.dataset.collection);
	});

	const activeBtn = switcher.querySelector('.collection-switcher__button--active');
	if (activeBtn) move(activeBtn.dataset.collection);
}

// ============================================================
//  RATING
// ============================================================
function initRatings() {
	const ratings = document.querySelectorAll('.rating');
	if (!ratings.length) return;

	ratings.forEach(rating => {
		const ratingActive = rating.querySelector('.rating__active');
		const ratingValue = rating.querySelector('.rating__value');
		if (!ratingActive || !ratingValue) return;

		const index = parseFloat(ratingValue.innerHTML);
		ratingActive.style.width = `${index / 0.05}%`;
	});
}

// ============================================================
//  READ MORE
// ============================================================
function initReadMore() {
	const blocks = document.querySelectorAll('.read-more');
	if (!blocks.length) return;

	blocks.forEach(block => {
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

// ============================================================
//  SCROLL ANIMATIONS
// ============================================================
let scrollObserver = null;
function initScrollAnimations() {
	// Disconnect any previous observer before creating a fresh one
	if (scrollObserver) { scrollObserver.disconnect(); scrollObserver = null; }

	const elements = document.querySelectorAll('[data-anim]');
	if (!elements.length) return;

	scrollObserver = new IntersectionObserver((entries, observer) => {
		entries.forEach(entry => {
			const el = entry.target;
			if (entry.isIntersecting) {
				el.classList.add('animate');
				if (!el.hasAttribute('data-anim-repeat')) observer.unobserve(el);
			} else if (el.hasAttribute('data-anim-repeat')) {
				el.classList.remove('animate');
			}
		});
	}, { root: null, rootMargin: '0px 0px -25% 0px', threshold: 0 });

	elements.forEach(el => scrollObserver.observe(el));
}

// ============================================================
//  DROPDOWN
// ============================================================
function initDropdowns() {
	function closeAllDropdowns() {
		document.querySelectorAll('[data-dropdown].active').forEach(el => {
			el.classList.remove('active');
			const btn = el.querySelector('[data-dropdown-button]');
			if (btn) btn.setAttribute('aria-expanded', 'false');
		});
	}

	document.addEventListener('click', (e) => {
		const button = e.target.closest('[data-dropdown-button]');
		const dropdown = e.target.closest('[data-dropdown]');

		if (!button && !dropdown) { closeAllDropdowns(); return; }

		if (button) {
			const currentDropdown = button.closest('[data-dropdown]');
			const wasActive = currentDropdown.classList.contains('active');
			closeAllDropdowns();
			if (!wasActive) {
				currentDropdown.classList.add('active');
				button.setAttribute('aria-expanded', 'true');
			}
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key === 'Escape') closeAllDropdowns();
	});
}

// ============================================================
//  MODALS
// ============================================================
function initModals() {
	const ANIMATION_TIME = 400;

	function safeOpen(modal) {
		if (modal.hasAttribute('open')) return; 
		modal.showModal();
		ScrollLock.lock(`modal-${modal.id || 'anonymous'}`);
		requestAnimationFrame(() => modal.classList.add('is-open'));
	}

	function safeClose(modal) {
		if (!modal.hasAttribute('open')) return;
		if (modal.dataset.closing) return; 
		modal.dataset.closing = '1';
		modal.classList.remove('is-open');

		setTimeout(() => {
			delete modal.dataset.closing;
			
			if (modal.hasAttribute('open')) modal.close();
		}, ANIMATION_TIME);
	}

	document.addEventListener('click', (e) => {
		const openBtn = e.target.closest('[data-modal-button="open"]');
		const closeBtn = e.target.closest('[data-modal-button="close"]');
		const modal = e.target.closest('[data-modal]');

		if (openBtn) {
			const targetModal = document.getElementById(openBtn.getAttribute('data-modal-id'));
			if (targetModal) safeOpen(targetModal);
		}

		if (closeBtn && modal) safeClose(modal);

		// Backdrop click
		if (e.target.nodeName === 'DIALOG' && e.target.hasAttribute('data-modal')) {
			const rect = e.target.getBoundingClientRect();
			const outside = e.clientX < rect.left || e.clientX > rect.right ||
				e.clientY < rect.top || e.clientY > rect.bottom;
			if (outside) safeClose(e.target);
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.key !== 'Escape') return;
		const openModal = document.querySelector('dialog[open]');
		if (openModal) {
			e.preventDefault();
			safeClose(openModal);
		}
	});

	// Single source of truth for ScrollLock release on dialog close
	document.addEventListener('close', (e) => {
		if (e.target.nodeName === 'DIALOG' && e.target.hasAttribute('data-modal')) {
			ScrollLock.unlock(`modal-${e.target.id || 'anonymous'}`);
			e.target.classList.remove('is-open');
			delete e.target.dataset.closing;
		}
	}, true);
}

// ============================================================
//  ACTIVE MENU
// ============================================================
function updateActiveMenu() {
	const currentPath = window.location.pathname;

	document.querySelectorAll('.menu__link').forEach(link => {
		link.classList.remove('menu__link--active');
		const linkPath = new URL(link.href).pathname;
		if (currentPath === linkPath || (currentPath === '/' && linkPath.endsWith('index.html'))) {
			link.classList.add('menu__link--active');
		}
	});
}

// ============================================================
//  INIT GROUPS
// ============================================================
function initGlobalListeners() {
	
	document.addEventListener('click', (e) => {
		if (!e.target.closest('.menu-icon__button')) return;
		document.documentElement.classList.contains('menu-open')
			? closeBurgerMenu()
			: openBurgerMenu();
	});

	initDropdowns();
	initModals();
	initPriceSwitcher();
}

function initPageComponents() {
	initCollectionSwitcher();
	initRatings();
	initReadMore();
	initSpoilers();
	initSwipers();
	updateActiveMenu();
	initMobilePlanTable();
}
// ============================================================
//  SWUP SETUP
// ============================================================
const swup = new Swup({
	animateHistoryBrowsing: true,
	plugins: [
		new SwupHeadPlugin({ awaitAssets: true })
	]
});

// ============================================================
//  BOOTSTRAP
// ============================================================
function bootstrap() {
	initGlobalListeners();
	initPageComponents();
	requestAnimationFrame(initScrollAnimations);
}

if (document.readyState === 'complete') {
	bootstrap();
} else {
	window.addEventListener('load', bootstrap);
}

// ============================================================
//  SWUP LIFECYCLE HOOKS
// ============================================================
swup.hooks.on('visit:start', () => {
	closeBurgerMenu();

	document.querySelectorAll('dialog[open]').forEach(dialog => {
		dialog.classList.remove('is-open');
		delete dialog.dataset.closing;
		dialog.close();
	});

	ScrollLock.forceUnlock();
});

swup.hooks.on('page:view', () => {
	initPageComponents();
});

swup.hooks.on('visit:end', () => {
	initScrollAnimations();
});