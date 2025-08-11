
// хедер
document.addEventListener('scroll', () => {
  const header = document.querySelector('header');

  if (window.scrollY > 0) {
    header.classList.add('scrolled');
  } else {
    header.classList.remove('scrolled')
  }
})
// меню бургер
const iconBurger = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.header__menu');
if (iconBurger) {
  iconBurger.addEventListener("click", function (e) {
    document.body.classList.toggle('_lock');
    iconBurger.classList.toggle('_active');
    menuBody.classList.toggle('_active');
  })
}
// скрол
const menuLinks = document.querySelectorAll('.menu__link[data-goto]');
if (menuLinks.length > 0) {
  menuLinks.forEach(menuLink => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
  function onMenuLinkClick(e) {
    const menuLink = e.target;
    if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto);
      const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;

      if (iconBurger.classList.contains('_active')) {
        document.body.classList.remove('_lock');
        iconBurger.classList.remove('_active');
        menuBody.classList.remove('_active');
      }
      window.scrollTo({
        top: gotoBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  }
}
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
// лічільник
window.addEventListener("load", windowLoad);
function windowLoad() {
  function digitsCountersInit(digitsCountersItems) {
    let digitsCounters = digitsCountersItems ? digitsCountersItems : document.querySelectorAll("[data-digits-counter]");
    if (digitsCounters) {
      digitsCounters.forEach(digitsCounter => {
        digitsCountersAnimate(digitsCounter);
      });
    }
  }
  function digitsCountersAnimate(digitsCounter) {
    let startTimestamp = null;
    const duration = parseInt(digitsCounter.dataset.digitsCounter) ? parseInt(digitsCounter.dataset.digitsCounter) : 1000;
    const startValue = parseInt(digitsCounter.innerHTML);
    const startPosition = 0;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      digitsCounter.innerHTML = Math.floor(progress * (startPosition + startValue));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  }
  let options = {
    threshold: 0.4
  }
  let observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const targetElement = entry.target;
        const digitsCountersItems = targetElement.querySelectorAll("[data-digits-counter]");
        if (digitsCountersItems.length) {
          digitsCountersInit(digitsCountersItems);
        }
        observer.unobserve(targetElement);
      }
    });
  }, options);
  let sections = document.querySelectorAll('.timer');
  if (sections.length) {
    sections.forEach(section => {
      observer.observe(section);
    });
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
