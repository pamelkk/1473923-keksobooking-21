'use strict';

(function () {
  const PIN_OFFSET_X = 32;
  const PIN_OFFSET_Y = 87;
  const pinTemplateElement = document.querySelector(`#pin`).content;
  const pinListElement = document.querySelector(`.map__pins`);

  window.pins = {
    createPins(announcements) {
      const pinItems = [];
      for (const announcement of announcements) {
        const pinCloneElement = pinTemplateElement.querySelector(`.map__pin`).cloneNode(true);
        pinCloneElement.style.top = announcement.location.y - PIN_OFFSET_Y + `px`;
        pinCloneElement.style.left = announcement.location.x - PIN_OFFSET_X + `px`;
        pinCloneElement.querySelector(`img`).src = announcement.author.avatar;
        pinCloneElement.querySelector(`img`).alt = announcement.offer.title;
        pinItems.push(pinCloneElement);

        pinCloneElement.addEventListener(`click`, function (evt) {
          const cardElement = document.querySelector(`.map__card`);
          const activePinElement = document.querySelector(`.map__pin--active`);
          if (cardElement) {
            cardElement.remove();
            activePinElement.classList.remove(`map__pin--active`);
          }
          window.card.createCard(announcement, evt.currentTarget);
        });
      }
      return pinItems;
    },
    renderPins(items) {
      const fragment = document.createDocumentFragment();
      items.forEach(function (item) {
        fragment.appendChild(item);
        pinListElement.appendChild(fragment);
      });
    },
    removePin() {
      const mapElement = document.querySelector(`.map`);
      const pinsElements = mapElement.querySelectorAll(`.map__pin:not(.map__pin--main)`);

      pinsElements.forEach(function (pin) {
        pin.remove();
      });
    }
  };
})();
