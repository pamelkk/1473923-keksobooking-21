"use strict";

const mainPin = document.querySelector(".map__pin--main");
const form = document.querySelector(".ad-form");
const map = document.querySelector(".map");

// передвижение главной метки

mainPin.addEventListener("mousedown", function (evt) {
  evt.preventDefault();

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
  };
  let onMouseUp = function (upEvt) {
    upEvt.preventDefault();

    document.removeEventListener("mousemove", onMouseMove);
    document.removeEventListener("mouseup", onMouseUp);
  };

  document.addEventListener("mousemove", onMouseMove);
  document.addEventListener("mouseup", onMouseUp);
});

form.addEventListener("submit", function (evt) {
  window.upload(new FormData(form), function () {
    window.activation.makeInactive();
  });
  evt.preventDefault();
});

// ограничение главной метки по перемещению
//* ограничения, за которые нельзя вытащить mainPin
const limits = {
  top: map.offsetTop,
  right: map.offsetWidth - mainPin.offsetWidth,
  bottom: map.offsetHeight + map.offsetTop - mainPin.offsetHeight,
  left: map.offsetLeft
};

//* вкл/выкл режим перетаскивания
mainPin.onmousedown = function () {
  mainPin.draggable = true;
};
document.onmouseup = function () {
  mainPin.draggable = false;
};
document.onmousemove = function (e) {
  if (mainPin.draggable) {
    move(e);
  }
};

//* вычисление координат
function move(e) {
  const newLocation = {
    x: limits.left,
    y: limits.top
  };
  if (e.pageX > limits.right) {
    newLocation.x = limits.right;
  } else if (e.pageX > limits.left) {
    newLocation.x = e.pageX;
  }
  if (e.pageY > limits.bottom) {
    newLocation.y = limits.bottom;
  } else if (e.pageY > limits.top) {
    newLocation.y = e.pageY;
  }
  relocate(newLocation);
}

//* размещение mainPin
function relocate(newLocation) {
  mainPin.style.left = newLocation.x + "px";
  mainPin.style.top = newLocation.y + "px";
}
