"use strict";

const mainPin = document.querySelector(".map__pin--main");
const COORDINATE_MIN_Y = 130;
const COORDINATE_MAX_Y = 630;
const COORDINATE_MIN_X = 0;
const COORDINATE_MAX_X = 1200;
const PIN_TIP_HEIGHT = 22;

// передвижение главной метки

mainPin.addEventListener("mousedown", function (evt) {
  evt.preventDefault();
  mainPin.style.zIndex = 50;

  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  let onMouseMove = function (moveEvt) {
    moveEvt.preventDefault();

    let shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    mainPin.style.top = (mainPin.offsetTop - shift.y) + "px";
    mainPin.style.left = (mainPin.offsetLeft - shift.x) + "px";

    // X limit
    if (mainPin.offsetLeft > COORDINATE_MAX_X - mainPin.offsetWidth / 2) {
      mainPin.style.left = COORDINATE_MAX_X - mainPin.offsetWidth / 2 + "px";
    } else if (mainPin.offsetLeft < COORDINATE_MIN_X - mainPin.offsetWidth / 2) {
      mainPin.style.left = COORDINATE_MIN_X - mainPin.offsetWidth / 2 + "px";
    }

    // Y limit
    if (mainPin.offsetTop > COORDINATE_MAX_Y - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
      mainPin.style.top = COORDINATE_MAX_Y - mainPin.offsetHeight - PIN_TIP_HEIGHT + "px";
    } else if (mainPin.offsetTop < COORDINATE_MIN_Y - mainPin.offsetHeight - PIN_TIP_HEIGHT) {
      mainPin.style.top = COORDINATE_MIN_Y - mainPin.offsetHeight - PIN_TIP_HEIGHT + "px";
    }
  };
  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});
