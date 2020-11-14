'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const form = document.querySelector(`.ad-form`);
  const formInputs = form.querySelectorAll(`.ad-form__element input`);
  const formSelects = form.querySelectorAll(`.ad-form__element select`);
  const formTextAreas = form.querySelectorAll(`.ad-form__element textarea`);
  const mainPin = document.querySelector(`.map__pin--main`);
  const ENTER_KEYCODE = 13;
  const LEFT_CLICK = 1;
  const inputPrice = form.querySelector(`#price`);
  const buttonSubmit = form.querySelector(`.ad-form__submit`);
  const fields = [formInputs, formSelects, formTextAreas];
  const reset = form.querySelector(`.ad-form__reset`);

  window.activation = {
    getEnableDisableFields: function (elements) {
      for (const element of elements) {
        window.form.makeEnableDisable(element);
      }
    },
    makeActive: function () {
      window.load.successLoadHanlder();
      map.classList.remove(`map--faded`);
      form.classList.remove(`ad-form--disabled`);
      window.form.makeEnableDisableButton(buttonSubmit);
      window.activation.getEnableDisableFields(fields);
      window.load.startLoading(window.load.successLoadHanlder, window.load.errorLoadHandler);
    },
    makeInactive: function () {
      map.classList.add(`map--faded`);
      form.classList.add(`ad-form--disabled`);
      form.reset();
      window.form.makeInputPlaceholder(inputPrice);
      window.activation.getEnableDisableFields(fields);
    }
  };

  // очистка полей при клике на очистить
  reset.addEventListener(`click`, function () {
    window.activation.makeInactive();
  });

  // активация страницы
  mainPin.addEventListener(`mousedown`, function (evt) {
    if (evt.which === LEFT_CLICK) {
      window.activation.makeActive();
    }
  });

  mainPin.addEventListener(`keydown`, function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.activation.makeActive();
    }
  });

  mainPin.addEventListener(`mousemove`, function (evt) {
    if (evt.which === LEFT_CLICK) {
      window.form.getAddress();
    }
  });
})();
