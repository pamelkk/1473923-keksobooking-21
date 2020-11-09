"use strict";

(function () {
  const pinTemplate = document.querySelector("#pin").content;
  const pinList = document.querySelector(".map__pins");
  const PIN_OFFSET_X = 32;
  const PIN_OFFSET_Y = 87;
  const ENTER_KEYCODE = 13;
  const LEFT_CLICK = 1;
  const MAX_SIMILAR_ANNOUNCEMENT_COUNT = 8;
  const mainPin = document.querySelector(".map__pin--main");

  window.pin = {
    successHandler: function (announcements) {
      const pinItems = [];
      for (let i = 0; i < MAX_SIMILAR_ANNOUNCEMENT_COUNT; i++) {
        const pinClone = pinTemplate.cloneNode(true);
        pinClone.querySelector(".map__pin").style.top = announcements[i].location.y - PIN_OFFSET_Y + "px";
        pinClone.querySelector(".map__pin").style.left = announcements[i].location.x - PIN_OFFSET_X + "px";
        pinClone.querySelector(".map__pin").querySelector("img").src = announcements[i].author.avatar;
        pinClone.querySelector(".map__pin").querySelector("img").alt = announcements[i].offer.title;
        pinItems.push(pinClone);

        pinClone.querySelector(".map__pin").addEventListener("click", function (evt) {
          if (evt.which === LEFT_CLICK) {
            const card = document.querySelector(".map__card");
            if (card) {
              card.remove();
            }
            window.card.createCard(announcements[i]);
          }
        });

        pinClone.querySelector(".map__pin").addEventListener("keydown", function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            window.card.createCard(announcements[i]);
          }
        });

        // Рисую элементы меток
        mainPin.addEventListener("mousedown", function (evt) {
          if (evt.which === LEFT_CLICK) {
            const fragment = document.createDocumentFragment();
            for (const pinItem of pinItems) {
              fragment.appendChild(pinItem);
              pinList.appendChild(fragment);
            }
          }
        });
      }
      return pinItems;
    },
    errorHandler: function (errorMessage) {
      const error = document.createElement("div");
      error.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
      error.style.position = "absolute";
      error.style.left = 0;
      error.style.right = 0;
      error.style.fontSize = "30px";
      error.textContent = errorMessage;
      document.body.insertAdjacentElement("afterbegin", error);
    }
  };
  window.load(window.pin.successHandler);
})();
