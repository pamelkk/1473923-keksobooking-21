"use strict";

const form = document.querySelector(".ad-form");
const formInputs = form.querySelectorAll(".ad-form__element input");
const formSelects = form.querySelectorAll(".ad-form__element select");
const formTextAreas = form.querySelectorAll(".ad-form__element textarea");
const filters = document.querySelector(".map__filters");
const mainPin = document.querySelector(".map__pin--main");
const pinTemplate = document.querySelector("#pin").content;
const newPin = pinTemplate.querySelector(".map__pin");
const capacity = document.querySelector("#capacity");
const roomNumber = document.querySelector("#room_number");
const ENTER_KEYCODE = 13;
const LEFT_CLICK = 1;

// активация страницы
mainPin.addEventListener("mousedown", function (evt) {
  if (evt.which === LEFT_CLICK) {
    window.activation.makeActive();
  }
});

mainPin.addEventListener("keydown", function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    window.activation.makeActive();
  }
});

mainPin.addEventListener("mousemove", function (evt) {
  if (evt.which === LEFT_CLICK) {
    window.form.getAddress();
  }
});


newPin.addEventListener("click", function () {
  window.card.createCard(window.counting.getRandomElement(announcementItems));
});

const announcementItems = window.announcements.createAnnouncements(8);

// подсчет комнат и гостей

capacity.addEventListener("change", function (evt) {
  for (let i = 0; i < capacity.options.length; i++) {
    if (roomNumber.options[i].value === 100) {
      capacity.options[i].value = 0;
    } else {
      if (capacity.options[i].value <= evt.target.value) {
        capacity.setCustomValidity("");
      } else {
        capacity.setCustomValidity("Количество гостей должно быть равно или меньше количества комнат");
      }
    }
  }
});

// делаю поля недоступными для редактирования
window.form.makeEnableDisable(formInputs);
window.form.makeEnableDisable(formSelects);
window.form.makeEnableDisable(formTextAreas);

// подсчет комнат и гостей

capacity.addEventListener("change", function (evt) {
  for (let i = 0; i < capacity.options.length; i++) {
    if (roomNumber.options[i].value === 100) {
      capacity.options[i].value = 0;
    } else {
      if (capacity.options[i].value <= evt.target.value) {
        capacity.setCustomValidity("");
      } else {
        capacity.setCustomValidity("Количество гостей должно быть равно или меньше количества комнат");
      }
    }
  }
});

// Время заезда/выезда
form.addEventListener("change", function (e) {
  const timein = document.querySelector("#timein");
  const timeout = document.querySelector("#timeout");
  timein.value = e.target.value;
  timeout.value = e.target.value;
});

// передвижение главной метки

mainPin.addEventListener("mousedown", function (evt) {
  evt.preventDefault();

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + "px";
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + "px";
  };
  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

// установка значения поля ввода адреса
window.form.getAddress();

