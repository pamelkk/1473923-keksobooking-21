"use strict";

const offerType = ["palace", "flat", "house", "bungalow"];
const offerCheckIn = ["12:00", "13:00", "14:00"];
const offerCheckOut = ["12:00", "13:00", "14:00"];
const offerRooms = ["1", "2", "3"];
const offerGuests = ["1", "2", "3"];
const offerFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const offerPrice = ["1000", "2000", "3000", "4000"];
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const COORDINATE_X_MIN = 0;
const COORDINATE_X_MAX = 1200;
const COORDINATE_Y_MIN = 130;
const COORDINATE_Y_MAX = 630;
const IMG_CARD_WIDTH = 45 + "px";
const IMG_CARD_HEIGHT = 40 + "px";
const map = document.querySelector(".map");
const form = document.querySelector(".ad-form");
const formInputs = form.querySelectorAll(".ad-form__element input");
const formSelects = form.querySelectorAll(".ad-form__element select");
const formTextAreas = form.querySelectorAll(".ad-form__element textarea");
const filters = document.querySelector(".map__filters");
const mainPin = document.querySelector(".map__pin--main");
const pinTemplate = document.querySelector("#pin").content;
const newPin = pinTemplate.querySelector(".map__pin");
const pinList = document.querySelector(".map__pins");
const PIN_OFFSET_X = 32;
const PIN_OFFSET_Y = 87;
const PIN_WIDTH = 50;
const PIN_HEIGHT = 70;
const cardTemplate = document.querySelector("#card").content;
const photosClass = cardTemplate.querySelector(".popup__photos");
const capacity = document.querySelector("#capacity");
const roomNumber = document.querySelector("#room_number");
const cardList = document.querySelector(".card-wrapper");
const submitButton = document.querySelector(".ad-form__submit");


// Рандомное число

const getRandomElement = function (elements) {
  const randomElement = elements[Math.floor(Math.random() * elements.length)];
  return randomElement;
};

// Рандомные координаты

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

// Выбор рандомного фитчера и фото

const getRandomPhotoFeatures = function (items) {
  let i = 0;
  let begin = randomInteger(i, items.length);
  let end = randomInteger(i, items.length);
  while (begin >= end) {
    begin = randomInteger(i, items.length);
    end = randomInteger(i, items.length);
  }
  return items.slice(begin, end);
};

const createAnnouncements = function (amount) {
  const announcements = [];
  for (let i = 0; i < amount; i++) {
    const announcement = {
      author: {
        avatar: "img/avatars/user" + "0" + randomInteger(1, amount) + ".png"
      },
      offer: {
        title: "Уютная квартира",
        address: [randomInteger(COORDINATE_X_MIN, COORDINATE_X_MAX), randomInteger(COORDINATE_Y_MIN, COORDINATE_Y_MAX)],
        price: getRandomElement(offerPrice),
        type: getRandomElement(offerType),
        rooms: getRandomElement(offerRooms),
        guests: getRandomElement(offerGuests),
        checkin: getRandomElement(offerCheckIn),
        checkout: getRandomElement(offerCheckOut),
        features: getRandomPhotoFeatures(offerFeatures),
        description: "Ну очень уютная квартира",
        photos: getRandomPhotoFeatures(photos)
      },
      location: {
        x: randomInteger(COORDINATE_X_MIN, COORDINATE_X_MAX),
        y: randomInteger(COORDINATE_Y_MIN, COORDINATE_Y_MAX)
      }
    };
    announcements.push(announcement);
  }
  return announcements;
};

const announcementItems = createAnnouncements(8);

const createPins = function (items) {
  const pinItems = [];
  for (let i = 0; i < items.length; i++) {
    const pinElements = pinTemplate.cloneNode(true);
    newPin.style.top = items[i].location.y - PIN_OFFSET_Y + "px";
    newPin.style.left = items[i].location.x - PIN_OFFSET_X + "px";
    newPin.querySelector("img").src = items[i].author.avatar;
    newPin.querySelector("img").alt = items[i].offer.title;
    pinItems.push(pinElements);
  }
  return pinItems;
};

const pinElements = createPins(announcementItems);

const appartmentType = {
  flat: "Квартира",
  bungalow: "Бунгало",
  house: "Дом",
  palace: "Дворец"
};

// Рисую элементы меток

const fragment = document.createDocumentFragment();

const renderPins = function (elements) {
  for (let i = 0; i < pinElements.length; i++) {
    fragment.appendChild(elements[i]);
    pinList.appendChild(fragment);
  }
};


// добавляю фото

const getPhotoItems = function (items) {
  const photoItems = [];
  for (const item of items) {
    const photoItem = document.createElement("img");
    photoItem.classList.add("popup__photo");
    photoItem.src = item;
    photoItem.style.width = IMG_CARD_WIDTH;
    photoItem.style.height = IMG_CARD_HEIGHT;
    photoItem.alt = "Фотография жилья";
    photosClass.appendChild(photoItem);
    photoItems.push(photoItem);
  }
  return photoItems;
};

const fragmentPhoto = document.createDocumentFragment();

const renderPhotos = function (elements) {
  for (const element of elements) {
    fragmentPhoto.appendChild(element);
  }
  return fragmentPhoto;
};

// создаю карточку

const createCard = function (item) {
  const cardElement = cardTemplate.cloneNode(true);

  cardElement.querySelector(".popup__title").textContent = item.offer.title;
  cardElement.querySelector(".popup__text--address").textContent = item.offer.address;
  cardElement.querySelector(".popup__text--price").textContent = item.offer.price + "₽/ночь";
  cardElement.querySelector(".popup__type").textContent = appartmentType[item.offer.type];
  cardElement.querySelector(".popup__text--capacity").textContent = item.offer.rooms + " " + "комнаты для " + item.offer.guests + " гостей";
  cardElement.querySelector(".popup__text--time").textContent = "Заезд после " + item.offer.checkin + ", выезд до " + item.offer.checkout;
  cardElement.querySelector(".popup__description").textContent = item.offer.description;
  cardElement.querySelector(".popup__avatar").src = item.author.avatar;

  renderPhotos(getPhotoItems(item.offer.photos));
  cardElement.querySelector(".popup__photos").appendChild(fragmentPhoto);

  const featureElements = cardElement.querySelectorAll(".popup__feature");
  for (const featureElement of featureElements) {
    for (const feature of item.offer.features) {
    // показываются только те, что есть в массиве
      if (featureElement.className.includes(feature)) {
        featureElement.classList.add("visually-hidden");
      }
    }
  }
  cardList.appendChild(cardElement);
};


newPin.addEventListener("click", function () {
  createCard(getRandomElement(announcementItems));
});

// подсчет комнат и гостей

capacity.addEventListener("change", function (evt) {
  for (let i = 0; i < capacity.options.length; i++) {
    if (roomNumber.options[i].value === 100) {
      capacity.options[i].value = 0;
    } else {
      if (capacity.options[i].value <= evt.target.value) {
        capacity.setCustomValidity("");
      } else {
        capacity.setCustomValidity("Количество гостей должно быть равно или меньше количества комнат");
      }
    }
  }
});

// Время заезда/выезда
form.onchange = function (e) {
  const timein = document.querySelector("#timein");
  const timeout = document.querySelector("#timeout");
  timein.value = e.target.value;
  timeout.value = e.target.value;
};

// перевод страницы в активное состояние

const makeDisable = function (elements) {
  for (let element of elements) {
    element.disabled = true;
  }
};

const makeEnable = function (elements) {
  for (let element of elements) {
    element.disabled = false;
  }
};

makeDisable(formInputs);
makeDisable(formSelects);
makeDisable(formTextAreas);

const makeActive = function () {
  map.classList.remove("map--faded");
  form.classList.remove("ad-form--disabled");
  renderPins(pinElements);

  makeEnable(formInputs);
  makeEnable(formSelects);
  makeEnable(formTextAreas);
};

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

// установка значения поля ввода адреса

const getAddress = function () {
  const addressInput = document.querySelector("#address");
  const coordinateX = parseInt(mainPin.style.left, 10) + (PIN_WIDTH / 2);
  const coordinateY = parseInt(mainPin.style.top, 10) + PIN_HEIGHT;
  if (coordinateX > 1200) {
    coordinateX = 1200;
  }
  if (coordinateX < 0) {
    coordinateX = 0;
  }
  if (coordinateY > 633) {
    coordinateY = 633;
  }
  if (coordinateY < 130) {
    coordinateY = 130;
  }
  addressInput.value = coordinateX + "," + coordinateY;
};
getAddress();

mainPin.addEventListener("mousedown", function (evt) {
  if (evt.which === 1) {
    makeActive();
  }
});

mainPin.addEventListener("keydown", function (evt) {
  if (evt.keyCode === 13) {
    makeActive();
  }
});

mainPin.addEventListener("mousemove", function (evt) {
  if (evt.which === 1) {
    getAddress();
  }
});
