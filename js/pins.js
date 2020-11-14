'use strict';

(function () {
  const pinTemplate = document.querySelector(`#pin`).content;
  const pinList = document.querySelector(`.map__pins`);
  const PIN_OFFSET_X = 32;
  const PIN_OFFSET_Y = 87;

  window.pin = {
    createPins: function (announcements) {
      const pinItems = [];
      for (let i = 0; i < announcements.length; i++) {
        const pinClone = pinTemplate.querySelector(`.map__pin`).cloneNode(true);
        pinClone.style.top = announcements[i].location.y - PIN_OFFSET_Y + `px`;
        pinClone.style.left = announcements[i].location.x - PIN_OFFSET_X + `px`;
        pinClone.querySelector(`img`).src = announcements[i].author.avatar;
        pinClone.querySelector(`img`).alt = announcements[i].offer.title;
        pinItems.push(pinClone);

        pinClone.addEventListener(`click`, function (evt) {
          const card = document.querySelector(`.map__card`);
          if (card) {
            card.remove();
          }
          window.card.createCard(announcements[i], evt.currentTarget);
        });
      }
      return pinItems;
    },
    renderPins: function (items) {
      const fragment = document.createDocumentFragment();
      for (const item of items) {
        fragment.appendChild(item);
        pinList.appendChild(fragment);
      }
    },
    removePin: function () {
      const map = document.querySelector(`.map`);
      const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      pins.forEach(function (pin) {
        pin.remove();
      });
    }
  };
})();
