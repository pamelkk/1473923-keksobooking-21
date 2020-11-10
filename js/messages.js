"use strict";

(function () {
  const ESC_KEYCODE = 27;
  const LEFT_CLICK = 1;

  window.messages = {
    successMessage: function () {
      const successTemplate = document.querySelector("#success").content;
      const success = successTemplate.querySelector(".success").cloneNode(true);
      document.body.insertAdjacentElement("afterbegin", success);
      success.style.zIndex = 100;

      document.addEventListener("click", function (evt) {
        if (evt.which === LEFT_CLICK) {
          success.remove();
        }
      });

      document.addEventListener("keydown", function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          success.remove();
        }
      });
      window.activation.makeInactive();
    },
    errorMessage: function () {
      const errorTemplate = document.querySelector("#error").content;
      const error = errorTemplate.querySelector(".error").cloneNode(true);
      document.body.insertAdjacentElement("afterbegin", errorTemplate);
      error.style.zIndex = 100;

      document.addEventListener("click", function (evt) {
        if (evt.which === LEFT_CLICK) {
          error.remove();
        }
      });
      const buttonError = document.querySelector(".error__button");
      buttonError.addEventListener("click", function () {
        error.remove();
      });

      document.addEventListener("keydown", function (evt) {
        if (evt.keyCode === ESC_KEYCODE) {
          error.remove();
        }
      });
    }
  };
})();

