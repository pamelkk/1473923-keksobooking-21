'use strict';

(function () {
  const COORDINATE_MIN_Y = 130;
  const COORDINATE_MAX_Y = 630;
  const COORDINATE_MIN_X = 0;
  const COORDINATE_MAX_X = 1200;
  const PIN_TIP_HEIGHT = 22;
  const LEFT_CLICK = 1;
  const mainPinElement = document.querySelector(`.map__pin--main`);

  // передвижение главной метки

  mainPinElement.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    mainPinElement.style.zIndex = 50;
    window.form.getAddress();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = function (moveEvt) {
      if (evt.which === LEFT_CLICK) {

        moveEvt.preventDefault();
        window.form.getAddress();

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        mainPinElement.style.top = (mainPinElement.offsetTop - shift.y) + `px`;
        mainPinElement.style.left = (mainPinElement.offsetLeft - shift.x) + `px`;

        // X limit
        if (mainPinElement.offsetLeft > COORDINATE_MAX_X - mainPinElement.offsetWidth / 2) {
          mainPinElement.style.left = COORDINATE_MAX_X - mainPinElement.offsetWidth / 2 + `px`;
        } else if (mainPinElement.offsetLeft < COORDINATE_MIN_X - mainPinElement.offsetWidth / 2) {
          mainPinElement.style.left = COORDINATE_MIN_X - mainPinElement.offsetWidth / 2 + `px`;
        }

        // Y limit
        if (mainPinElement.offsetTop > COORDINATE_MAX_Y - mainPinElement.offsetHeight - PIN_TIP_HEIGHT) {
          mainPinElement.style.top = COORDINATE_MAX_Y - mainPinElement.offsetHeight - PIN_TIP_HEIGHT + `px`;
        } else if (mainPinElement.offsetTop < COORDINATE_MIN_Y - mainPinElement.offsetHeight - PIN_TIP_HEIGHT) {
          mainPinElement.style.top = COORDINATE_MIN_Y - mainPinElement.offsetHeight - PIN_TIP_HEIGHT + `px`;
        }
      }
    };
    let onMouseUp = function (upEvt) {
      upEvt.preventDefault();
      window.form.getAddress();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });
})();
