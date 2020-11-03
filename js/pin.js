"use strict";

(function () {
  const pinTemplate = document.querySelector("#pin").content;
  const newPin = pinTemplate.querySelector(".map__pin");
  const pinList = document.querySelector(".map__pins");
  const PIN_OFFSET_X = 32;
  const PIN_OFFSET_Y = 87;
  const announcementItems = window.announcements.createAnnouncements(8);

  window.pin = {
    createPins: function (items) {
      const pinItems = [];
      for (let i = 0; i < items.length; i++) {
        const pinElements = pinTemplate.cloneNode(true);
        newPin.style.top = items[i].location.y - PIN_OFFSET_Y + "px";
        newPin.style.left = items[i].location.x - PIN_OFFSET_X + "px";
        newPin.querySelector("img").src = items[i].author.avatar;
        newPin.querySelector("img").alt = items[i].offer.title;
        pinItems.push(pinElements);
      }
      return pinItems;
    },
    // Рисую элементы меток
    renderPins: function (elements) {
      const pinElements = window.pin.createPins(announcementItems);
      const fragment = document.createDocumentFragment();

      for (let i = 0; i < pinElements.length; i++) {
        fragment.appendChild(elements[i]);
        pinList.appendChild(fragment);
      }
    }
  };
})();
