"use strict";

(function () {
  const mainPin = document.querySelector(".map__pin--main");
  const PIN_WIDTH = 50;
  const PIN_HEIGHT = 70;

  window.form = {
    // перевод полей в неактивное состояние
    makeDisable: function (elements) {
      for (let element of elements) {
        element.disabled = true;
      }
    },
    // установка значения поля ввода адреса
    getAddress: function () {
      const addressInput = document.querySelector("#address");
      const coordinateX = parseInt(mainPin.style.left, 10) + (PIN_WIDTH / 2);
      const coordinateY = parseInt(mainPin.style.top, 10) + PIN_HEIGHT;

      if (coordinateX > 1200) {
        coordinateX = 1200;
      }
      if (coordinateX < 0) {
        coordinateX = 0;
      }
      if (coordinateY > 633) {
        coordinateY = 633;
      }
      if (coordinateY < 130) {
        coordinateY = 130;
      }
      addressInput.value = coordinateX + "," + coordinateY;
    }
  };
})();
