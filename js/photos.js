'use strict';

(function () {
  const IMG_CARD_WIDTH = 45 + `px`;
  const IMG_CARD_HEIGHT = 40 + `px`;

  window.photos = {
    // Выбор рандомного фитчера и фото
    getRandomPhotoFeatures: function (items) {
      let element = 0;
      let begin = window.counting.randomInteger(element, items.length);
      let end = window.counting.randomInteger(element, items.length);
      while (begin >= end) {
        begin = window.counting.randomInteger(element, items.length);
        end = window.counting.randomInteger(element, items.length);
      }
      return items.slice(begin, end);
    },
    // добавляю фото
    getPhotoItems: function (items) {
      const photoItems = [];
      for (const item of items) {
        const photoItemElement = document.createElement(`img`);
        photoItemElement.classList.add(`popup__photo`);
        photoItemElement.src = item;
        photoItemElement.style.width = IMG_CARD_WIDTH;
        photoItemElement.style.height = IMG_CARD_HEIGHT;
        photoItemElement.alt = `Фотография жилья`;
        photoItems.push(photoItemElement);
      }
      return photoItems;
    },
    renderPhotos: function (elements) {
      const fragmentPhotoElement = document.createDocumentFragment();
      for (const element of elements) {
        fragmentPhotoElement.appendChild(element);
      }
      return fragmentPhotoElement;
    }
  };
})();
