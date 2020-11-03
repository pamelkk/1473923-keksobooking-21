"use strict";

(function () {
  const map = document.querySelector(".map");
  const form = document.querySelector(".ad-form");
  const formInputs = form.querySelectorAll(".ad-form__element input");
  const formSelects = form.querySelectorAll(".ad-form__element select");
  const formTextAreas = form.querySelectorAll(".ad-form__element textarea");
  const announcementItems = window.announcements.createAnnouncements(8);
  const pinElements = window.pin.createPins(announcementItems);

  window.activation = {
    makeActive: function () {
      map.classList.remove("map--faded");
      form.classList.remove("ad-form--disabled");
      window.pin.renderPins(pinElements);

      window.form.makeEnableDisable(formInputs);
      window.form.makeEnableDisable(formSelects);
      window.form.makeEnableDisable(formTextAreas);
    }
  };
})();
