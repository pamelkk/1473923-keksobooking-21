'use strict';

(function () {
  const ENTER_KEYCODE = 13;
  const LEFT_CLICK = 1;
  const START_COORDINATE_X = `570px`;
  const START_COORDINATE_Y = `375px`;
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const mapElement = document.querySelector(`.map`);
  const formElement = document.querySelector(`.ad-form`);
  const formInputsElements = formElement.querySelectorAll(`.ad-form__element input`);
  const formSelectsElements = formElement.querySelectorAll(`.ad-form__element select`);
  const formTextAreasElements = formElement.querySelectorAll(`.ad-form__element textarea`);
  const mainPinElement = document.querySelector(`.map__pin--main`);
  const inputPriceElement = formElement.querySelector(`#price`);
  const buttonSubmitElement = formElement.querySelector(`.ad-form__submit`);
  const formFields = [formInputsElements, formSelectsElements, formTextAreasElements];
  const resetElement = formElement.querySelector(`.ad-form__reset`);
  const filtersElements = document.querySelectorAll(`.map__filters select`);
  const houseFeaturesInputElement = document.querySelector(`#housing-features`);
  const filterFeaturesElements = houseFeaturesInputElement.querySelectorAll(`input`);

  window.activation = {
    getDisableFields(elements) {
      elements.forEach(function (element) {
        window.form.makeDisable(element);
      });
    },
    getEnableFields(elements) {
      elements.forEach(function (element) {
        window.form.makeEnable(element);
      });
    },
    makeActive() {
      mapElement.classList.remove(`map--faded`);
      formElement.classList.remove(`ad-form--disabled`);
      window.form.makeEnableButton(buttonSubmitElement);
      window.activation.getEnableFields(formFields);
      window.form.makeEnable(filtersElements);
      window.form.makeEnable(filterFeaturesElements);
      if (!window.announcements) {
        window.sendXhr(URL, window.load.onSuccessLoad, window.load.onErrorNotLoad);
      }
    },
    makeInactive() {
      const houseFeaturesCheckedElement = houseFeaturesInputElement.querySelectorAll(`input:checked`);
      mapElement.classList.add(`map--faded`);
      formElement.classList.add(`ad-form--disabled`);
      formElement.reset();
      window.form.makeDisableButton(buttonSubmitElement);
      window.form.makeInputPlaceholder(inputPriceElement);
      window.activation.getDisableFields(formFields);
      window.form.makeDisable(filtersElements);
      window.form.makeDisable(filterFeaturesElements);
      window.form.makeCleanFeaturesFilters(houseFeaturesCheckedElement);
      mainPinElement.style.top = START_COORDINATE_Y;
      mainPinElement.style.left = START_COORDINATE_X;
      window.form.getAddress();
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
