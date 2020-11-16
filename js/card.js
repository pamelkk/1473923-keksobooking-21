'use strict';

(function () {
  const cardList = document.querySelector(`.card-wrapper`);
  const cardTemplate = document.querySelector(`#card`).content;
  const ESC_KEYCODE = 27;

  const appartmentType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  window.card = {
    onCloseButtonClick: function () {
      const cardItem = document.querySelector('.map__card');
      const pinElement = document.querySelector('.map__pin--active');
      pinElement.classList.remove('map__pin--active');
      cardItem.remove();
      document.removeEventListener('keydown', window.card.onEscButtonPress);
    },
    onEscButtonPress: function (e) {
      if (e.keyCode === ESC_KEYCODE) {
        window.card.onCloseButtonClick();
      }
    },
    createCard: function (item, pin) {
      const cardElement = cardTemplate.querySelector(`.map__card`).cloneNode(true);

      cardElement.querySelector(`.popup__title`).textContent = item.offer.title;
      cardElement.querySelector(`.popup__text--address`).textContent = item.offer.address;
      cardElement.querySelector(`.popup__text--price`).textContent = item.offer.price + `₽/ночь`;
      cardElement.querySelector(`.popup__type`).textContent = appartmentType[item.offer.type];
      cardElement.querySelector(`.popup__text--capacity`).textContent = item.offer.rooms + ` ` + `комнаты для ` + item.offer.guests + ` гостей`;
      cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + item.offer.checkin + `, выезд до ` + item.offer.checkout;
      cardElement.querySelector(`.popup__description`).textContent = item.offer.description;
      cardElement.querySelector(`.popup__avatar`).src = item.author.avatar;

      const cardPhotos = window.photos.renderPhotos(window.photos.getPhotoItems(item.offer.photos));
      cardElement.querySelector(`.popup__photos`).appendChild(cardPhotos);

      const featureElements = cardElement.querySelectorAll(`.popup__feature`);
      for (const featureElement of featureElements) {
        for (let i = 0; i < item.offer.features.length; i++) {
          if (featureElement.className.includes(item.offer.features[i])) {
            featureElement.classList.remove(`visually-hidden`);
          }
          featureElement.classList.add(`visually-hidden`);
        }
      }
      pin.classList.add(`map__pin--active`);

      // закрытие карточки
      cardElement.querySelector(`.popup__close`).addEventListener(`click`, function () {
        const activePin = document.querySelector(`.map__pin--active`);
        cardElement.remove();
        activePin.classList.remove(`map__pin--active`);
      });

      document.addEventListener('keydown', window.card.onEscButtonPress);
      cardList.appendChild(cardElement);
    }
  };
})();
