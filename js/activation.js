'use strict';

(function () {
  const ENTER_KEYCODE = 13;
  const LEFT_CLICK = 1;
  const mapElement = document.querySelector(`.map`);
  const formElement = document.querySelector(`.ad-form`);
  const formInputsElements = formElement.querySelectorAll(`.ad-form__element input`);
  const formSelectsElements = formElement.querySelectorAll(`.ad-form__element select`);
  const formTextAreasElements = formElement.querySelectorAll(`.ad-form__element textarea`);
  const mainPinElement = document.querySelector(`.map__pin--main`);
  const inputPriceElement = formElement.querySelector(`#price`);
  const buttonSubmitElement = formElement.querySelector(`.ad-form__submit`);
  const fields = [formInputsElements, formSelectsElements, formTextAreasElements];
  const resetElement = formElement.querySelector(`.ad-form__reset`);

  window.activation = {
    getDisableFields: function (elements) {
      for (const element of elements) {
        window.form.makeDisable(element);
      }
    },
    getEnableFields: function (elements) {
      for (const element of elements) {
        window.form.makeEnable(element);
      }
    },
    makeActive: function () {
      mapElement.classList.remove(`map--faded`);
      formElement.classList.remove(`ad-form--disabled`);
      window.form.makeEnableButton(buttonSubmitElement);
      window.activation.getEnableFields(fields);
      window.load.startLoading(window.load.onSuccessLoad, window.load.onErrorNotLoad);
    },
    makeInactive: function () {
      mapElement.classList.add(`map--faded`);
      formElement.classList.add(`ad-form--disabled`);
      formElement.reset();
      window.form.makeDisableButton(buttonSubmitElement);
      window.form.makeInputPlaceholder(inputPriceElement);
      window.activation.getDisableFields(fields);
    }
  };

  // очистка полей при клике на очистить
  resetElement.addEventListener(`click`, function () {
    window.activation.makeInactive();
  });

  // активация страницы
  mainPinElement.addEventListener(`mousedown`, function (evt) {
    if (evt.which === LEFT_CLICK) {
      window.activation.makeActive();
    }
  });

  mainPinElement.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.activation.makeActive();
    }
  });

  mainPinElement.addEventListener(`mousemove`, function (evt) {
    if (evt.which === LEFT_CLICK) {
      window.form.getAddress();
    }
  });
})();
