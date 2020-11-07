"use strict";

(function () {
  const map = document.querySelector(".map");
  const form = document.querySelector(".ad-form");
  const formInputs = form.querySelectorAll(".ad-form__element input");
  const formSelects = form.querySelectorAll(".ad-form__element select");
  const formTextAreas = form.querySelectorAll(".ad-form__element textarea");
  const announcementItems = window.announcements.createAnnouncements(8);
  const mainPin = document.querySelector(".map__pin--main");
  const ENTER_KEYCODE = 13;
  const LEFT_CLICK = 1;
  const inputTitle = form.querySelector("#title");
  const inputDescription = form.querySelector("#description");
  const inputType = form.querySelector("#type");
  const inputPrice = form.querySelector("#price");
  const inputTimeIn = form.querySelector("#timein");
  const inputTimeOut = form.querySelector("#timeout");
  const inputRoomNumber = form.querySelector("#room_number");
  const inputCapacity = form.querySelector("#capacity");
  const inputFeatures = form.querySelectorAll(".ad-form__element--wide input");
  const buttonSubmit = form.querySelector(".ad-form__submit");

  window.activation = {
    makeActive: function () {
      const pinElements = window.pin.createPins(announcementItems);

      map.classList.remove("map--faded");
      form.classList.remove("ad-form--disabled");
      window.pin.renderPins(pinElements);

      window.form.makeEnableDisable(formInputs);
      window.form.makeEnableDisable(formSelects);
      window.form.makeEnableDisable(formTextAreas);
      window.form.makeEnableDisableButton(buttonSubmit);
    },
    makeInactive: function () {
      map.classList.add("map--faded");
      form.classList.add("ad-form--disabled");
      window.form.makeCleanInput(inputTitle);
      window.form.makeCleanInput(inputDescription);
      window.form.makeInputSelected(inputType);
      window.form.makeInputPlaceholder(inputPrice);
      window.form.makeInputSelected(inputTimeIn);
      window.form.makeInputSelected(inputTimeOut);
      window.form.makeInputSelected(inputRoomNumber);
      window.form.makeInputSelected(inputCapacity);
      window.form.makeCleanFeatures(inputFeatures);


      window.form.makeEnableDisable(formInputs);
      window.form.makeEnableDisable(formSelects);
      window.form.makeEnableDisable(formTextAreas);
    }
  };

  // активация страницы
  mainPin.addEventListener("mousedown", function (evt) {
    if (evt.which === LEFT_CLICK) {
      window.activation.makeActive();
    }
  }, {once: true});

  mainPin.addEventListener("keydown", function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.activation.makeActive();
      mainPin.removeEventListener("keydown");
    }
  }, {once: true});

  mainPin.addEventListener("mousemove", function (evt) {
    if (evt.which === LEFT_CLICK) {
      window.form.getAddress();
    }
  });
})();
