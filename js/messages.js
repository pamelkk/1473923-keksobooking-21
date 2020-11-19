'use strict';

(function () {
  const START_COORDINATE_X = `570px`;
  const START_COORDINATE_Y = `375px`;
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const ESC_KEYCODE = 27;
  const LEFT_CLICK = 1;
  const filtersElements = document.querySelectorAll(`.map__filters select`);
  const formElement = document.querySelector(`.ad-form`);
  const mainPinElement = document.querySelector(`.map__pin--main`);

  window.messages = {
    successMessage() {
      const successTemplateElement = document.querySelector(`#success`).content;
      const success = successTemplateElement.querySelector(`.success`).cloneNode(true);
      document.body.insertAdjacentElement(`afterbegin`, success);
      success.style.zIndex = 100;

      document.addEventListener(`click`, function (evt) {
        if (evt.which === LEFT_CLICK) {
          success.remove();
        }
      });

      function onCloseButtonClick() {
        success.remove();
      }

      function onCloseButtonPress(e) {
        if (e.keyCode === ESC_KEYCODE) {
          onCloseButtonClick();
        }
      }

      document.addEventListener(`keydown`, onCloseButtonPress);
      window.activation.makeInactive();
      window.pins.removePin();
    },
    errorMessage() {
      const errorTemplateElement = document.querySelector(`#error`).content;
      const error = errorTemplateElement.querySelector(`.error`).cloneNode(true);
      document.body.insertAdjacentElement(`afterbegin`, error);
      error.style.zIndex = 100;

      document.addEventListener(`click`, function (evt) {
        if (evt.which === LEFT_CLICK) {
          error.remove();
        }
      });
      const buttonErrorElement = document.querySelector(`.error__button`);
      buttonErrorElement.addEventListener(`click`, function () {
        error.remove();
      });

      function onCloseButtonClick() {
        error.remove();
      }

      function onCloseButtonPress(e) {
        if (e.keyCode === ESC_KEYCODE) {
          onCloseButtonClick();
        }
      }
      document.addEventListener(`keydown`, onCloseButtonPress);
    },
    onSubmitSuccess() {
      const houseFeaturesInputElement = document.querySelector(`#housing-features`);
      const houseFeaturesCheckedElement = houseFeaturesInputElement.querySelectorAll(`input:checked`);
      const cardElement = document.querySelector(`.map__card`);
      window.messages.successMessage();
      window.form.makeCleanFeaturesFilters(houseFeaturesCheckedElement);
      window.form.makeCleanFilters(filtersElements);
      mainPinElement.style.top = START_COORDINATE_Y;
      mainPinElement.style.left = START_COORDINATE_X;
      window.form.getAddress();
      if (cardElement) {
        cardElement.remove();
      }
    },
    onSubmitError() {
      window.messages.errorMessage();
    }
  };

  formElement.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    window.announcements = null;
    // отправка формы
    const dataForm = new FormData(formElement);
    window.sendXhr(URL, window.messages.onSubmitSuccess, window.messages.onSubmitError, dataForm);
  });
})();
