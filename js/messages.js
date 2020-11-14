'use strict';

(function () {
  const ESC_KEYCODE = 27;
  const LEFT_CLICK = 1;
  const filters = document.querySelectorAll(`.map__filters select`);
  const form = document.querySelector(`.ad-form`);

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

      document.addEventListener(`keydown`, function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          success.remove();
        }
      });
      window.activation.makeInactive();
      window.pin.removePin();
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

      document.addEventListener(`keydown`, function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          error.remove();
        }
      });
    },
    submitHandler: function () {
      const houseFeaturesInput = document.querySelector(`#housing-features`);
      const houseFeaturesChecked = houseFeaturesInput.querySelectorAll(`input:checked`);
      window.messages.successMessage();
      window.form.makeCleanFeaturesFilters(houseFeaturesChecked);
      window.form.makeCleanFilters(filters);
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
