"use strict";

(function () {
  const map = document.querySelector(".map");
  const form = document.querySelector(".ad-form");
  const formInputs = form.querySelectorAll(".ad-form__element input");
  const formSelects = form.querySelectorAll(".ad-form__element select");
  const formTextAreas = form.querySelectorAll(".ad-form__element textarea");

  window.activation = {
    makeEnable: function (elements) {
      for (let element of elements) {
        element.disabled = false;
      }
    },
    makeActive: function () {
      map.classList.remove("map--faded");
      form.classList.remove("ad-form--disabled");
      window.pin.renderPins(window.pin.pinElements);

      window.activation.makeEnable(formInputs);
      window.activation.makeEnable(formSelects);
      window.activation.makeEnable(formTextAreas);
    }
  };
})();
