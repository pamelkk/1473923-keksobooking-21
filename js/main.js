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
const map = document.querySelector(".map");
const form = document.querySelector(".ad-form");
const filters = document.querySelector(".map__filters");
const mainPin = document.querySelector(".map__pin--main");
const pinTemplate = document.querySelector("#pin").content;
const newPin = pinTemplate.querySelector(".map__pin");
const pinList = document.querySelector(".map__pins");
const PIN_OFFSET_X = 32;
const PIN_OFFSET_Y = 87;
const cardTemplate = document.querySelector("#card").content;
const photosClass = cardTemplate.querySelector(".popup__photos");
const firstChildOfPhotos = cardTemplate.querySelector(".popup__photo");
const capacity = document.querySelector("#capacity");
const roomNumber = document.querySelector("#room_number");
const cardList = document.querySelector(".card-wrapper");

map.classList.remove(".map--faded");

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

const getRandomPhotoFeature = function (items) {
  let i = 0;
  let begin = randomInteger(i, items.length);
  let end = randomInteger(i, items.length);
  while (items[begin] >= items[end]) {
    begin = randomInteger(i, items.length);
    end = randomInteger(i, items.length);
  }
  return items.slice(items[begin], items[end]);
};

const createAnnouncements = function (amount) {
  let announcements = [];
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
        features: getRandomPhotoFeature(offerFeatures),
        description: "Ну очень уютная квартира",
        photos: getRandomPhotoFeature(photos)
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
  let pinItems = [];
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
    elements = pinElements;
    fragment.appendChild(elements[i]);
    pinList.appendChild(fragment);
  }
};
renderPins(pinElements);

// добавляю фото

const getPhotoItem = function (items) {
  let photoItems = [];
  for (let i = 0; i < items.length - 1; i++) {
    firstChildOfPhotos.src = items[randomInteger(i, items.length - 1)];
    const photoItem = document.createElement("img");
    photoItem.classList.add("popup__photo");
    photoItem.src = items[randomInteger(i, items.length - 1)];
    photoItem.style.width = 45 + "px";
    photoItem.style.height = 40 + "px";
    photoItem.alt = "Фотография жилья";
    photosClass.insertBefore(photoItem, firstChildOfPhotos);
    photoItems.push(photoItem);
  }
  return photoItems;
};
getPhotoItem(getRandomElement(announcementItems).offer.photos);

// фитчи

let getFeatures = function (classListItems) {
  let featureElements = cardTemplate.querySelectorAll(".popup__feature");
  for (let featureElement of featureElements) {
    for (let i = 0; i < classListItems.length; i++) {
      if (!featureElement.className.includes(classListItems[i])) {
        featureElement.classList.add("visually-hidden");
      }
    }
    return featureElement;
  }
  return featureElements;
};
let resultB = getFeatures(getRandomElement(announcementItems).offer.features);

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

  cardList.appendChild(cardElement);
};

createCard(getRandomElement(announcementItems));

// подсчет комнат и гостей

roomNumber.addEventListener("change", function () {
  if (roomNumber.value === 1) {
    capacity.value = 1;
  }
});
