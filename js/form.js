"use strict";

(function () {
  const mainPin = document.querySelector(".map__pin--main");
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const form = document.querySelector(".ad-form");
  const capacity = document.querySelector("#capacity");
  const roomNumber = document.querySelector("#room_number");
  const formInputs = form.querySelectorAll(".ad-form__element input");
  const reset = form.querySelector(".ad-form__reset");
  const formSelects = form.querySelectorAll(".ad-form__element select");
  const formTextAreas = form.querySelectorAll(".ad-form__element textarea");
  const formTyme = form.querySelectorAll(".ad-form__element--time");
  const inputType = form.querySelector("#type");
  const inputTitle = form.querySelector("#title");
  const inputDescription = form.querySelector("#description");
  const inputPrice = form.querySelector("#price");
  const buttonSubmit = form.querySelector(".ad-form__submit");
  const inputTimeIn = form.querySelector("#timein");
  const inputTimeOut = form.querySelector("#timeout");
  const inputRoomNumber = form.querySelector("#room_number");
  const inputCapacity = form.querySelector("#capacity");
  const inputFeatures = form.querySelectorAll(".ad-form__element--wide input");

  window.form = {
    // перевод полей в неактивное/активное состояние
    makeEnableDisable: function (elements) {
      for (const element of elements) {
        element.disabled = !element.disabled;
      }
    },
    // перевод кнопки в неактивное/активное состояние
    makeEnableDisableButton: function (element) {
      element.disabled = !element.disabled;
    },
    // очистка полей после успешной отправки формы
    makeCleanInput: function (input) {
      input.value = "";
    },
    // очистка полей после успешной отправки формы
    makeCleanFeatures: function (inputs) {
      for (const input of inputs) {
        input.checked = false;
      }
    },
    // очистка поля с placeholder после успешной отправки формы
    makeInputPlaceholder: function (input) {
      input.value = input.placeholder;
    },
    // очистка полей select до selected после успешной отправки формы
    makeInputSelected: function (input) {
      input.querySelector("option").value = input.querySelector("option").selected;
    },
    // установка значения поля ввода адреса
    getAddress: function () {
      let addressInput = document.querySelector("#address");
      let coordinateX = parseInt(mainPin.style.left, 10) + (PIN_WIDTH / 2);
      let coordinateY = parseInt(mainPin.style.top, 10) + PIN_HEIGHT;

      if (coordinateX > 1200) {
        coordinateX = 1200;
      }
      if (coordinateX < 0) {
        coordinateX = 0;
      }
      if (coordinateY > 633) {
        coordinateY = 633;
      }
      if (coordinateY < 130) {
        coordinateY = 130;
      }
      addressInput.value = coordinateX + "," + coordinateY;
    }
  };

  // делаю поля недоступными для редактирования
  window.form.makeEnableDisableButton(buttonSubmit);
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
  inputTimeIn.addEventListener("change", function (e) {
    const timein = document.querySelector("#timein");
    const timeout = document.querySelector("#timeout");
    timein.value = e.target.value;
    timeout.value = e.target.value;
  });

  inputTimeOut.addEventListener("change", function (e) {
    const timein = document.querySelector("#timein");
    const timeout = document.querySelector("#timeout");
    timein.value = e.target.value;
    timeout.value = e.target.value;
  });

  // соответствие цена/тип жилья

  inputType.addEventListener("change", function (e) {
    const appartmentTypePrice = {
      flat: "1000",
      bungalow: "0",
      house: "5000",
      palace: "10000"
    };
    inputPrice.min = appartmentTypePrice[e.target.value];
    inputPrice.placeholder = appartmentTypePrice[e.target.value];
  });

  // установка значения поля ввода адреса
  window.form.getAddress();

  // очистка полей при клике на "очистить"
  reset.addEventListener("click", function (evt) {
    evt.preventDefault();
    window.form.makeCleanInput(inputTitle);
    window.form.makeCleanInput(inputDescription);
    window.form.makeInputSelected(inputType);
    window.form.makeInputPlaceholder(inputPrice);
    window.form.makeInputSelected(inputTimeIn);
    window.form.makeInputSelected(inputTimeOut);
    window.form.makeInputSelected(inputRoomNumber);
    window.form.makeInputSelected(inputCapacity);
    window.form.makeCleanFeatures(inputFeatures);
  });
})();
