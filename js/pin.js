"use strict";

(function () {
  const pinTemplate = document.querySelector("#pin").content;
  const pinList = document.querySelector(".map__pins");
  const PIN_OFFSET_X = 32;
  const PIN_OFFSET_Y = 87;
  const ENTER_KEYCODE = 13;
  const LEFT_CLICK = 1;
  const fragment = document.createDocumentFragment();

  window.pin = {
    createPins: function (items) {
      const pinItems = [];
      for (let i = 0; i < items.length; i++) {
        const pinClone = pinTemplate.cloneNode(true);
        pinClone.querySelector(".map__pin").style.top = items[i].location.y - PIN_OFFSET_Y + "px";
        pinClone.querySelector(".map__pin").style.left = items[i].location.x - PIN_OFFSET_X + "px";
        pinClone.querySelector(".map__pin").querySelector("img").src = items[i].author.avatar;
        pinClone.querySelector(".map__pin").querySelector("img").alt = items[i].offer.title;
        pinItems.push(pinClone);

        pinClone.querySelector(".map__pin").addEventListener("click", function (evt) {
          if (evt.which === LEFT_CLICK) {
            const card = document.querySelector(".map__card");
            if (card) {
              card.remove();
            }
            window.card.createCard(items[i]);
          }
        });

        pinClone.querySelector(".map__pin").addEventListener("keydown", function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            window.card.createCard(items[i]);
          }
        });
      }
      return pinItems;
    },
    // Рисую элементы меток
    renderPins: function (elements) {
      for (const element of elements) {
        fragment.appendChild(element);
        pinList.appendChild(fragment);
      }
    }
  };
})();
