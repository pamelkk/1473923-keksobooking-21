"use strict";

(function () {
  const successMessage = function () {
    const successTemplate = document.querySelector("#success").content;
    const success = successTemplate.querySelector(".success").cloneNode(true);
    document.body.insertAdjacentElement("afterbegin", success);
  };
  const errorMessage = function () {
    const errorTemplate = document.querySelector("#error").content;
    const error = errorTemplate.querySelector(".error").cloneNode(true);

    error.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
    error.style.position = "absolute";
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = "30px";
    document.body.insertAdjacentElement("afterbegin", errorTemplate);
  };
})();

