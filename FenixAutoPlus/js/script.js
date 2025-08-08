

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


// скрол
document.addEventListener("DOMContentLoaded", () => {
	const menuLinks = document.querySelectorAll('.menu__link[data-goto]');

	// Відступи для різних пристроїв
	const desktopOffset = 24; // Відступ для комп'ютерів
	const mobileOffset = 50;  // Відступ для мобільних пристроїв (збільшимо відступ)

	// Функція для визначення, чи пристрій є мобільним
	function isMobileDevice() {
		return window.matchMedia("(max-width: 767px)").matches;
	}

	if (menuLinks.length > 0) {
		menuLinks.forEach(link => {
			link.addEventListener('click', function (e) {
				const targetBlockClass = this.dataset.goto;
				const targetBlock = document.querySelector(targetBlockClass);

				if (targetBlock) {
					const offsetTop = isMobileDevice() ? mobileOffset : desktopOffset;
					const blockOffset = targetBlock.getBoundingClientRect().top + window.scrollY - offsetTop;
					window.scrollTo({
						top: blockOffset,
						behavior: 'smooth'
					});
				}

				e.preventDefault(); // Запобігаємо переходу за посиланням
			});
		});
	}
});




// Додаємо обробник події на клік по логотипу
document.getElementById('fenix-logo').addEventListener('click', function (event) {
	// Запобігаємо стандартній поведінці посилання
	event.preventDefault();

	// Прокручуємо сторінку до верху плавно
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});

// Додаємо обробник події на клік по логотипу в футері
document.getElementById('fenix_logo_footer').addEventListener('click', function (event) {
	event.preventDefault(); // Запобігаємо стандартному переходу по посиланню

	// Прокручуємо сторінку до верху плавно
	window.scrollTo({
		top: 0,
		behavior: 'smooth'
	});
});




// скрол кнопка
const hero_to_form_btn = document.querySelector('#hero_to_form_btn');
hero_to_form_btn.addEventListener('click', onButtonClick);
function onButtonClick(e) {
	if (document.querySelector('#form-id')) {
		const gotoBlock = document.querySelector('#form-id');
		const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
		window.scrollTo({
			top: gotoBlockValue,
			behavior: "smooth"
		});
		e.preventDefault();
	}
}
const parts_to_form_btn = document.querySelector('#parts_to_form_btn');
parts_to_form_btn.addEventListener('click', onButtonClick);
function onButtonClick(e) {
	if (document.querySelector('#form-id')) {
		const gotoBlock = document.querySelector('#form-id');
		const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

		window.scrollTo({
			top: gotoBlockValue,
			behavior: "smooth"
		});
		e.preventDefault();
	}
}
// форма відправлення
document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form-send');
	form.addEventListener('submit', formSend);
	async function formSend(e) {
		e.preventDefault();
		const error = formValidate(form);
		if (error === 0) {
			form.classList.add('_sending');
			try {
				const response = await sendMail();
				if (response.text === "OK") {
					alert("Повідомлення відправлено!");
					form.reset();
					form.classList.remove('_sending');
				} else {
					alert("Помилка!")
					form.classList.remove('_sending');
				}
			} catch (error) {
				alert("Помилка!")
				form.classList.remove('_sending');
			}
		} else {
			alert("Заповніть обов'язкові поля");
		}
	}
	async function sendMail() {
		let parms = {
			name: document.getElementById("name").value,
			phone: document.getElementById("phone").value,
			email: document.getElementById("e-mail").value,
			message: document.getElementById("msg").value,
		}
		return emailjs.send("service_ujg1f57", "template_rzqf33d", parms, "CKiioVghQ9SlX13Pq")
	}
	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('.-req');
		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('-email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			} else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error');
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
	}
})
