'use strict';

(function () {
  const MAX_ANNOUNCEMENTS = 5;
  const filtersElements = document.querySelectorAll(`.map__filters select`);
  const houseFeaturesInputElement = document.querySelector(`#housing-features`);
  const filterFeaturesElements = houseFeaturesInputElement.querySelectorAll(`input`);

  window.load = {
    uncheckFilters(items) {
      items.forEach(function (item) {
        item.disabled = false;
      });
    },
    onErrorNotLoad(errorMessage) {
      const error = document.createElement(`div`);
      error.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; font-weight: bold;`;
      error.style.position = `absolute`;
      error.style.left = 0;
      error.style.right = 0;
      error.style.fontSize = `30px`;
      error.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, error);
    },
    onSuccessLoad(announcements) {
      window.announcements = announcements;
      window.load.uncheckFilters(filtersElements);
      window.load.uncheckFilters(filterFeaturesElements);
      window.pins.renderPins(window.pins.createPins(window.announcements.slice(0, MAX_ANNOUNCEMENTS)));
    }
  };
})();
