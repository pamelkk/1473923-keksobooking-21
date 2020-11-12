"use strict";

const filters = document.querySelector(".map__filters");
const houseTypeInput = filters.querySelector("#housing-type");
const housePriceInput = filters.querySelector("#housing-price");
const houseRoomsInput = filters.querySelector("#housing-rooms");
const houseGuestsInput = filters.querySelector("#housing-guests");
const houseFeaturesInput = filters.querySelector("#housing-features");
const MIN_PRICE = "10000";
const MAX_PRICE = "50000";
const MAX_ANNOUNCEMENTS = 5;

window.load(window.pin.onSuccessLoad, window.pin.errorHandler);

filters.addEventListener("change", function () {
  const card = document.querySelector(".map__card");
  if (card) {
    card.remove();
  }
  const announcements = window.announcements;
  const filteredData = announcements.filter(
      function (item) {
        let typeRes = true;
        let priceRes = true;
        let roomsRes = true;
        let guestsRes = true;
        let featuresRes = true;
        let features = houseFeaturesInput.querySelectorAll("input:checked");

        if (houseTypeInput.value !== "any") {
          typeRes = houseTypeInput.value === item.offer.type;
        }

        if (housePriceInput.value !== "any") {
          switch (housePriceInput.value) {
            case "low":
              priceRes = item.offer.price < MIN_PRICE;
              break;
            case "middle":
              priceRes = item.offer.price > MIN_PRICE && item.offer.price < MAX_PRICE;
              break;
            case "high":
              priceRes = item.offer.price > MAX_PRICE;
              break;
          }
        }

        if (houseRoomsInput.value !== "any") {
          roomsRes = parseInt(houseRoomsInput.value, 10) === item.offer.rooms;
        }

        if (houseGuestsInput.value !== "any") {
          guestsRes = parseInt(houseGuestsInput.value, 10) === item.offer.guests;
        }

        features.forEach(function (feature) {
          if (item.offer.features.indexOf(feature.value) === -1) {
            featuresRes = false;
            return;
          }
        });

        return typeRes && priceRes && roomsRes && guestsRes && featuresRes;
      }
  );
  window.pin.removePin();
  window.pin.renderPins(filteredData.slice(0, MAX_ANNOUNCEMENTS));
  window.creating.createPins(filteredData.slice(0, MAX_ANNOUNCEMENTS));
});
