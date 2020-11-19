'use strict';

(function () {
  const ESC_KEYCODE = 27;
  const cardListElement = document.querySelector(`.card-wrapper`);
  const cardTemplateElement = document.querySelector(`#card`).content;

  const appartmentType = {
    flat: `Квартира`,
    bungalow: `Бунгало`,
    house: `Дом`,
    palace: `Дворец`
  };

  window.card = {
    onCloseButtonClick() {
      const cardItemElement = document.querySelector(`.map__card`);
      const pinElement = document.querySelector(`.map__pin--active`);
      if (pinElement.classList.contains(`map__pin--active`)) {
        pinElement.classList.remove(`map__pin--active`);
      }
      if (cardItemElement) {
        cardItemElement.remove();
      }
      document.removeEventListener(`keydown`, window.card.onEscButtonPress);
    },
    onEscButtonPress(e) {
      if (e.keyCode === ESC_KEYCODE) {
        window.card.onCloseButtonClick();
      }
    },
    createCard(item, pin) {
      const cardElement = cardTemplateElement.querySelector(`.map__card`).cloneNode(true);

      cardElement.querySelector(`.popup__title`).textContent = item.offer.title;
      cardElement.querySelector(`.popup__text--address`).textContent = item.offer.address;
      cardElement.querySelector(`.popup__text--price`).textContent = item.offer.price + `₽/ночь`;
      cardElement.querySelector(`.popup__type`).textContent = appartmentType[item.offer.type];
      cardElement.querySelector(`.popup__text--capacity`).textContent = item.offer.rooms + ` ` + `комнаты для ` + item.offer.guests + ` гостей`;
      cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ` + item.offer.checkin + `, выезд до ` + item.offer.checkout;
      cardElement.querySelector(`.popup__description`).textContent = item.offer.description;
      cardElement.querySelector(`.popup__avatar`).src = item.author.avatar;

      const cardPhotosElements = window.photos.renderPhotos(window.photos.getPhotoItems(item.offer.photos));
      cardElement.querySelector(`.popup__photos`).appendChild(cardPhotosElements);

      const featureElements = cardElement.querySelectorAll(`.popup__feature`);
      for (const featureElement of featureElements) {
        const newClassName = featureElement.className.replace(`popup__feature popup__feature--`, ``);
        const isMatchedWithFeatures = item.offer.features.some(function (feature) {
          return feature === newClassName;
        });
        if (!isMatchedWithFeatures) {
          featureElement.classList.add(`visually-hidden`);
        }
      }
      pin.classList.add(`map__pin--active`);

      // закрытие карточки
      cardElement.querySelector(`.popup__close`).addEventListener(`click`, function () {
        const activePinElement = document.querySelector(`.map__pin--active`);
        cardElement.remove();
        activePinElement.classList.remove(`map__pin--active`);
      });

      document.addEventListener(`keydown`, window.card.onEscButtonPress);
      cardListElement.appendChild(cardElement);
    }
  };
})();
