'use strict';

(function () {
  const START_COORDINATE_X = `570px`;
  const START_COORDINATE_Y = `375px`;
  const ESC_KEYCODE = 27;
  const LEFT_CLICK = 1;
  const filters = document.querySelectorAll(`.map__filters select`);
  const form = document.querySelector(`.ad-form`);
  const mainPin = document.querySelector(`.map__pin--main`);

  window.messages = {
    successMessage: function () {
      const successTemplate = document.querySelector(`#success`).content;
      const success = successTemplate.querySelector(`.success`).cloneNode(true);
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

      function onEscButtonPress(e) {
        if (e.keyCode === ESC_KEYCODE) {
          onCloseButtonClick();
        }
      }

      document.addEventListener('keydown', onEscButtonPress);
      window.activation.makeInactive();
      window.pins.removePin();
    },
    errorMessage: function () {
      const errorTemplate = document.querySelector(`#error`).content;
      const error = errorTemplate.querySelector(`.error`).cloneNode(true);
      document.body.insertAdjacentElement(`afterbegin`, error);
      error.style.zIndex = 100;

      document.addEventListener(`click`, function (evt) {
        if (evt.which === LEFT_CLICK) {
          error.remove();
        }
      });
      const buttonError = document.querySelector(`.error__button`);
      buttonError.addEventListener(`click`, function () {
        error.remove();
      });

      function onCloseButtonClick() {
        error.remove();
      }

      function onEscButtonPress(e) {
        if (e.keyCode === ESC_KEYCODE) {
          onCloseButtonClick();
        }
      }
      document.addEventListener('keydown', onEscButtonPress);
    },
    submitHandler: function () {
      const houseFeaturesInput = document.querySelector(`#housing-features`);
      const houseFeaturesChecked = houseFeaturesInput.querySelectorAll(`input:checked`);
      window.messages.successMessage();
      window.form.makeCleanFeaturesFilters(houseFeaturesChecked);
      window.form.makeCleanFilters(filters);
      mainPin.style.top = START_COORDINATE_Y;
      mainPin.style.left = START_COORDINATE_X;
      window.form.getAddress();
    },
    submitError: function () {
      window.messages.errorMessage();
    }
  };

  form.addEventListener(`submit`, function (evt) {
    evt.preventDefault();
    // отправка формы
    const dataForm = new FormData(form);
    window.upload(dataForm, window.messages.submitHandler, window.messages.submitError);
  });
})();
