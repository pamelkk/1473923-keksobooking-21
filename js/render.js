"use strict";

(function () {
  const filters = document.querySelector(".map__filters");
  const houseTypeInput = filters.querySelector("#housing-type");

  const HOUSE_TYPES = [
    "flat",
    "bungalow",
    "house",
    "palace"
  ];
  let houseType = "any";
  let announcements = [];

  const updateHouseTypes = function () {
    const sameHousingTypes = announcements.filter(function (announcement) {
      return announcement.type === houseType;
    });
    const filteredHouseTypes = sameHousingTypes.concat(announcements);
    const uniqueHouseTypes = filteredHouseTypes.filter(function (announcement, index) {
      return filteredHouseTypes.indexOf(announcement) === index;
    });
    window.pin.renderPins(uniqueHouseTypes);
  };

  houseTypeInput.addEventListener('change', function () {
    const newType = window.counting.getRandomElement(HOUSE_TYPES);
    houseTypeInput.value = newType;
    houseType = newType;
    updateHouseTypes();
  });


  const successHandler = function (data) {
    announcements = data;
    updateHouseTypes();
  };

  const errorHandler = function (errorMessage) {
    const error = document.createElement("div");
    error.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red; font-weight: bold;";
    error.style.position = "absolute";
    error.style.left = 0;
    error.style.right = 0;
    error.style.fontSize = "30px";
    error.textContent = errorMessage;
    document.body.insertAdjacentElement("afterbegin", error);
  };

  window.load(successHandler, errorHandler);
})();
