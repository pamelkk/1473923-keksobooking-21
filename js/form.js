'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const mainPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const guests = document.querySelector(`#capacity`);
  const roomNumber = document.querySelector(`#room_number`);
  const formInputs = form.querySelectorAll(`.ad-form__element input`);
  const reset = form.querySelector(`.ad-form__reset`);
  const formSelects = form.querySelectorAll(`.ad-form__element select`);
  const formTextAreas = form.querySelectorAll(`.ad-form__element textarea`);
  const filters = document.querySelectorAll(`.map__filters select`);
  const inputType = form.querySelector(`#type`);
  const inputPrice = form.querySelector(`#price`);
  const buttonSubmit = form.querySelector(`.ad-form__submit`);
  const inputTimeIn = form.querySelector(`#timein`);
  const inputTimeOut = form.querySelector(`#timeout`);

  window.form = {
    // перевод полей в неактивное/активное состояние
    makeDisable: function (elements) {
      for (const element of elements) {
        element.disabled = true;
      }
    },
    // перевод кнопки в неактивное/активное состояние
    makeDisableButton: function (element) {
      element.disabled = true;
    },
    makeEnable: function (elements) {
      for (const element of elements) {
        element.disabled = false;
      }
    },
    // перевод кнопки в активное состояние
    makeEnableButton: function (element) {
      element.disabled = false;
    },
    // перевод филтров в неактивное состояние
    makeCleanFilters: function (elements) {
      for (const element of elements) {
        element.value = `any`;
      }
    },
    // перевод филтров в неактивное состояние
    makeCleanFeaturesFilters: function (elements) {
      for (const element of elements) {
        element.checked = false;
      }
    },
    // очистка поля с placeholder после успешной отправки формы
    makeInputPlaceholder: function (input) {
      input.placeholder = `5000`;
    },
    // установка значения поля ввода адреса
    getAddress: function () {
      const addressInput = document.querySelector(`#address`);
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
      addressInput.value = coordinateX + `,` + coordinateY;
    }
  };

  // делаю поля недоступными для редактирования
  window.form.makeDisableButton(buttonSubmit);
  window.form.makeDisable(formInputs);
  window.form.makeDisable(formSelects);
  window.form.makeDisable(formTextAreas);
  window.form.makeDisable(filters);

  // подсчет комнат и гостей

  const guestsNumbersCheck = function (evt) {
    for (let i = 0; i < guests.options.length; i++) {
      if (roomNumber.value === `100`) {
        const notForGuests = guests.options[3];
        guests.value = `0`;
        guests.options[i].disabled = true;
        notForGuests.disabled = false;
      } else {
        if (guests.options[i].value <= evt.target.value) {
          guests.options[i].disabled = false;
          roomNumber.setCustomValidity(``);
        }
        if (guests.options[i].value > evt.target.value && guests.options[i].value > roomNumber.value) {
          roomNumber.setCustomValidity(`Количество гостей должно быть равно или меньше количества комнат`);
          guests.options[i].disabled = true;
        }
      }
    }
  };
  buttonSubmit.addEventListener(`click`, guestsNumbersCheck);
  roomNumber.addEventListener(`change`, guestsNumbersCheck);
  roomNumber.addEventListener(`click`, guestsNumbersCheck);

  // Время заезда/выезда
  inputTimeIn.addEventListener(`change`, function (e) {
    const timein = document.querySelector(`#timein`);
    const timeout = document.querySelector(`#timeout`);
    timein.value = e.target.value;
    timeout.value = e.target.value;
  });

  inputTimeOut.addEventListener(`change`, function (e) {
    const timein = document.querySelector(`#timein`);
    const timeout = document.querySelector(`#timeout`);
    timein.value = e.target.value;
    timeout.value = e.target.value;
  });

  // соответствие цена/тип жилья

  inputType.addEventListener(`change`, function (e) {
    const appartmentTypePrice = {
      flat: `1000`,
      bungalow: `0`,
      house: `5000`,
      palace: `10000`
    };
    inputPrice.min = appartmentTypePrice[e.target.value];
    inputPrice.placeholder = appartmentTypePrice[e.target.value];
  });

  // установка значения поля ввода адреса
  window.form.getAddress();

  // очистка полей при клике на очистить
  reset.addEventListener(`click`, function (evt) {
    const card = document.querySelector(`.map__card`);
    evt.preventDefault();
    window.pins.removePin();
    card.remove();
    window.form.makeDisable(filters);
    window.form.getAddress();
  });
})();
