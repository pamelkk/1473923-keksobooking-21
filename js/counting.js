'use strict';

(function () {
  window.counting = {
    // Рандомное число
    getRandomElement(elements) {
      const randomElement = elements[Math.floor(Math.random() * elements.length)];
      return randomElement;
    },
    // Рандомное между макс и мин
    randomInteger(min, max) {
      const randElement = min + Math.random() * (max + 1 - min);
      return Math.floor(randElement);
    }
  };
})();
