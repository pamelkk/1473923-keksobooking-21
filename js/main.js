"use strict";

(function () {
  const pinTemplate = document.querySelector("#pin").content;
  const pinList = document.querySelector(".map__pins");
  const PIN_OFFSET_X = 32;
  const PIN_OFFSET_Y = 87;
  const ENTER_KEYCODE = 13;
  const LEFT_CLICK = 1;
  const MAX_SIMILAR_ANNOUNCEMENT_COUNT = 8;
  const mainPin = document.querySelector(".map__pin--main");

  window.pin = {
    successHandler: function (announcements) {
      const pinItems = [];
      for (let i = 0; i < MAX_SIMILAR_ANNOUNCEMENT_COUNT; i++) {
        const pinClone = pinTemplate.cloneNode(true);
        pinClone.querySelector(".map__pin").style.top = announcements[i].location.y - PIN_OFFSET_Y + "px";
        pinClone.querySelector(".map__pin").style.left = announcements[i].location.x - PIN_OFFSET_X + "px";
        pinClone.querySelector(".map__pin").querySelector("img").src = announcements[i].author.avatar;
        pinClone.querySelector(".map__pin").querySelector("img").alt = announcements[i].offer.title;
        pinItems.push(pinClone);

        pinClone.querySelector(".map__pin").addEventListener("click", function (evt) {
          if (evt.which === LEFT_CLICK) {
            const card = document.querySelector(".map__card");
            if (card) {
              card.remove();
            }
            window.card.createCard(announcements[i]);
          }
        });

        pinClone.querySelector(".map__pin").addEventListener("keydown", function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            window.card.createCard(announcements[i]);
          }
        });

        // Рисую элементы меток
        mainPin.addEventListener("mousedown", function (evt) {
          if (evt.which === LEFT_CLICK) {
            const fragment = document.createDocumentFragment();
            for (const pinItem of pinItems) {
              fragment.appendChild(pinItem);
              pinList.appendChild(fragment);
            }
          }
        });
      }
      return pinItems;
    },
    errorHandler: function (errorMessage) {
      const error = document.createElement("div");
      error.style = "z-index: 100; margin: 0 auto; text-align: center; background-color: red;";
      error.style.position = "absolute";
      error.style.left = 0;
      error.style.right = 0;
      error.style.fontSize = "30px";
      error.textContent = errorMessage;
      document.body.insertAdjacentElement("afterbegin", error);
    }
  };
  window.load(window.pin.successHandler);
})();

const mainPin = document.querySelector(".map__pin--main");
const form = document.querySelector(".ad-form");
const COORDINATE_MIN_Y = 130;
const COORDINATE_MAX_Y = 630;
const COORDINATE_MIN_X = 0;
const COORDINATE_MAX_X = 1200;
const PIN_TIP_HEIGHT = 22;

// передвижение главной метки

mainPin.addEventListener("mousedown", function (evt) {
  evt.preventDefault();
  mainPin.style.zIndex = 100;

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

const submitHandler = function (evt) {
  window.upload(new FormData(form), function () {
    window.activation.makeInactive();
  });
  evt.preventDefault();
};
form.addEventListener("submit", submitHandler);
