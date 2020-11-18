'use strict';

(function () {
  const PIN_OFFSET_X = 32;
  const PIN_OFFSET_Y = 87;
  const pinTemplateElement = document.querySelector(`#pin`).content;
  const pinListElement = document.querySelector(`.map__pins`);

  window.pins = {
    createPins: function (announcements) {
      const pinItems = [];
      for (let i = 0; i < announcements.length; i++) {
        const pinCloneElement = pinTemplateElement.querySelector(`.map__pin`).cloneNode(true);
        pinCloneElement.style.top = announcements[i].location.y - PIN_OFFSET_Y + `px`;
        pinCloneElement.style.left = announcements[i].location.x - PIN_OFFSET_X + `px`;
        pinCloneElement.querySelector(`img`).src = announcements[i].author.avatar;
        pinCloneElement.querySelector(`img`).alt = announcements[i].offer.title;
        pinItems.push(pinCloneElement);

        pinCloneElement.addEventListener(`click`, function (evt) {
          const cardElement = document.querySelector(`.map__card`);
          const activePinElement = document.querySelector(`.map__pin--active`);
          if (cardElement) {
            cardElement.remove();
            activePinElement.classList.remove(`map__pin--active`);
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
        pinListElement.appendChild(fragment);
      }
    },
    removePin: function () {
      const mapElement = document.querySelector(`.map`);
      const pinsElements = mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      pinsElements.forEach(function (pin) {
        pin.remove();
      });
    }
  };
})();
