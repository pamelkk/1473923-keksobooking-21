'use strict';

(function () {
  const IMG_CARD_WIDTH = 45 + `px`;
  const IMG_CARD_HEIGHT = 40 + `px`;

  window.photos = {
    // Выбор рандомного фитчера и фото
    getRandomPhotoFeatures: function (items) {
      let i = 0;
      let begin = window.counting.randomInteger(i, items.length);
      let end = window.counting.randomInteger(i, items.length);
      while (begin >= end) {
        begin = window.counting.randomInteger(i, items.length);
        end = window.counting.randomInteger(i, items.length);
      }
      return items.slice(begin, end);
    },
    // добавляю фото
    getPhotoItems: function (items) {
      const photoItems = [];
      for (const item of items) {
        const photoItem = document.createElement(`img`);
        photoItem.classList.add(`popup__photo`);
        photoItem.src = item;
        photoItem.style.width = IMG_CARD_WIDTH;
        photoItem.style.height = IMG_CARD_HEIGHT;
        photoItem.alt = `Фотография жилья`;
        photoItems.push(photoItem);
      }
      return photoItems;
    },
    renderPhotos: function (elements) {
      const fragmentPhoto = document.createDocumentFragment();
      for (const element of elements) {
        fragmentPhoto.appendChild(element);
      }
      return fragmentPhoto;
    }
  };
})();
