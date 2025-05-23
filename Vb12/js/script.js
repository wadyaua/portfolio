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


// const hashTagsSwiper = new Swiper('.hash-tags__swiper', {
// 	spaceBetween: 14,
// 	loop: true,
// 	speed: 8500,
// 	slidesPerView: "auto",
// 	freeMode: true,

// 	// autoplay: {
// 	// 	delay: 0,
// 	// }

// });
