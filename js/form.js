'use strict';

(function () {
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;
  const mainPinElement = document.querySelector(`.map__pin--main`);
  const formElement = document.querySelector(`.ad-form`);
  const guestsElements = document.querySelector(`#capacity`);
  const roomNumberElement = document.querySelector(`#room_number`);
  const formInputsElements = formElement.querySelectorAll(`.ad-form__element input`);
  const resetElement = formElement.querySelector(`.ad-form__reset`);
  const formSelectsElements = formElement.querySelectorAll(`.ad-form__element select`);
  const formTextAreasElements = formElement.querySelectorAll(`.ad-form__element textarea`);
  const filtersElements = document.querySelectorAll(`.map__filters select`);
  const houseFeaturesInputElement = document.querySelector(`#housing-features`);
  const filterFeaturesElements = houseFeaturesInputElement.querySelectorAll(`input`);
  const inputTypeElement = formElement.querySelector(`#type`);
  const inputPriceElement = formElement.querySelector(`#price`);
  const buttonSubmitElement = formElement.querySelector(`.ad-form__submit`);
  const inputTimeInElement = formElement.querySelector(`#timein`);
  const inputTimeOutElement = formElement.querySelector(`#timeout`);

  window.form = {
    // перевод полей в неактивное/активное состояние
    makeDisable(elements) {
      elements.forEach(function (element) {
        element.disabled = true;
      });
    },
    // перевод кнопки в неактивное/активное состояние
    makeDisableButton(element) {
      element.disabled = true;
    },
    makeEnable(elements) {
      elements.forEach(function (element) {
        element.disabled = false;
      });
    },
    // перевод кнопки в активное состояние
    makeEnableButton(element) {
      element.disabled = false;
    },
    // перевод филтров в неактивное состояние
    makeCleanFilters(elements) {
      elements.forEach(function (element) {
        element.value = `any`;
      });
    },
    // перевод филтров в неактивное состояние
    makeCleanFeaturesFilters(elements) {
      elements.forEach(function (element) {
        element.checked = false;
      });
    },
    // очистка поля с placeholder после успешной отправки формы
    makeInputPlaceholder(input) {
      input.placeholder = `5000`;
    },
    // установка значения поля ввода адреса
    getAddress() {
      const addressInputElement = document.querySelector(`#address`);
      let coordinateX = parseInt(mainPinElement.style.left, 10) + (PIN_WIDTH / 2);
      let coordinateY = parseInt(mainPinElement.style.top, 10) + PIN_HEIGHT;

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
      addressInputElement.value = coordinateX + `,` + coordinateY;
    }
  };

  // делаю поля недоступными для редактирования
  window.form.makeDisableButton(buttonSubmitElement);
  window.form.makeDisable(formInputsElements);
  window.form.makeDisable(formSelectsElements);
  window.form.makeDisable(formTextAreasElements);
  window.form.makeDisable(filtersElements);
  window.form.makeDisable(filterFeaturesElements);

  // подсчет комнат и гостей

  const onInputNumbersCheck = function (evt) {
    for (let i = 0; i < guestsElements.options.length; i++) {
      if (roomNumberElement.value === `100`) {
        const notForGuestsElement = guestsElements.options[3];
        guestsElements.value = `0`;
        guestsElements.options[i].disabled = true;
        notForGuestsElement.disabled = false;
      } else {
        const oneGuestElement = guestsElements.options[2];
        const twoGuestsElement = guestsElements.options[1];
        const threeGuestsElement = guestsElements.options[0];
        if (guestsElements.value <= evt.target.value) {
          roomNumberElement.setCustomValidity(``);
        }
        if (guestsElements.value > evt.target.value && guestsElements.value > roomNumberElement.value) {
          roomNumberElement.setCustomValidity(`Количество гостей должно быть равно или меньше количества комнат`);
        }
        if (roomNumberElement.value === `1`) {
          guestsElements.options[i].disabled = true;
          oneGuestElement.disabled = false;
        }
        if (roomNumberElement.value === `2`) {
          guestsElements.options[i].disabled = true;
          oneGuestElement.disabled = false;
          twoGuestsElement.disabled = false;
        }
        if (roomNumberElement.value === `3`) {
          guestsElements.options[i].disabled = true;
          threeGuestsElement.disabled = false;
          oneGuestElement.disabled = false;
          twoGuestsElement.disabled = false;
        }
      }
    }
  };
  buttonSubmitElement.addEventListener(`click`, onInputNumbersCheck);
  roomNumberElement.addEventListener(`change`, onInputNumbersCheck);
  roomNumberElement.addEventListener(`click`, onInputNumbersCheck);
  guestsElements.addEventListener(`change`, onInputNumbersCheck);
  guestsElements.addEventListener(`click`, onInputNumbersCheck);

  // Время заезда/выезда
  inputTimeInElement.addEventListener(`change`, function (e) {
    const timeinElement = document.querySelector(`#timein`);
    const timeoutElement = document.querySelector(`#timeout`);
    timeinElement.value = e.target.value;
    timeoutElement.value = e.target.value;
  });

  inputTimeOutElement.addEventListener(`change`, function (e) {
    const timeinElement = document.querySelector(`#timein`);
    const timeoutElement = document.querySelector(`#timeout`);
    timeinElement.value = e.target.value;
    timeoutElement.value = e.target.value;
  });

  // соответствие цена/тип жилья

  inputTypeElement.addEventListener(`change`, function (e) {
    const appartmentTypePrice = {
      flat: `1000`,
      bungalow: `0`,
      house: `5000`,
      palace: `10000`
    };
    inputPriceElement.min = appartmentTypePrice[e.target.value];
    inputPriceElement.placeholder = appartmentTypePrice[e.target.value];
  });

  // установка значения поля ввода адреса
  window.form.getAddress();

  // очистка полей при клике на очистить
  resetElement.addEventListener(`click`, function (evt) {
    const cardElement = document.querySelector(`.map__card`);
    if (cardElement) {
      cardElement.remove();
    }
    evt.preventDefault();
    window.pins.removePin();
  });
})();
