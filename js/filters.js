'use strict';

(function () {
  const MIN_PRICE = `10000`;
  const MAX_PRICE = `50000`;
  const MAX_ANNOUNCEMENTS = 5;
  const filtersElements = document.querySelector(`.map__filters`);
  const houseTypeInputElement = filtersElements.querySelector(`#housing-type`);
  const housePriceInputElement = filtersElements.querySelector(`#housing-price`);
  const houseRoomsInputElement = filtersElements.querySelector(`#housing-rooms`);
  const houseGuestsInputElement = filtersElements.querySelector(`#housing-guests`);
  const houseFeaturesInputElement = filtersElements.querySelector(`#housing-features`);

  const onFormChange = window.debounce(function () {
    const cardElement = document.querySelector(`.map__card`);
    const activePinElement = document.querySelector(`.map__pin--active`);
    if (cardElement) {
      cardElement.remove();
      activePinElement.classList.remove(`map__pin--active`);
    }
    const announcements = window.announcements;
    const filteredData = announcements.filter(
        function (item) {
          let typeRes = true;
          let priceRes = true;
          let roomsRes = true;
          let guestsRes = true;
          let featuresRes = true;
          let features = houseFeaturesInputElement.querySelectorAll(`input:checked`);

          if (houseTypeInputElement.value !== `any`) {
            typeRes = houseTypeInputElement.value === item.offer.type;
          }

          if (housePriceInputElement.value !== `any`) {
            switch (housePriceInputElement.value) {
              case `low`:
                priceRes = item.offer.price < MIN_PRICE;
                break;
              case `middle`:
                priceRes = item.offer.price > MIN_PRICE && item.offer.price < MAX_PRICE;
                break;
              case `high`:
                priceRes = item.offer.price > MAX_PRICE;
                break;
            }
          }

          if (houseRoomsInputElement.value !== `any`) {
            roomsRes = parseInt(houseRoomsInputElement.value, 10) === item.offer.rooms;
          }

          if (houseGuestsInputElement.value !== `any`) {
            guestsRes = parseInt(houseGuestsInputElement.value, 10) === item.offer.guests;
          }

          const getFeatures = function (elements) {
            for (let i = 0; i < elements.length; i++) {
              if (item.offer.features.indexOf(elements[i].value) === -1) {
                featuresRes = false;
                break;
              }
            }
          };
          getFeatures(features);

          return typeRes && priceRes && roomsRes && guestsRes && featuresRes;
        }
    );
    window.pins.removePin();
    const createdPinsElements = window.pins.createPins(filteredData.slice(0, MAX_ANNOUNCEMENTS));
    window.pins.renderPins(createdPinsElements);
  });
  filtersElements.addEventListener(`change`, onFormChange);
})();
