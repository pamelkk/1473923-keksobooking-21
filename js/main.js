"use strict";

const offerType = ["palace", "flat", "house", "bungalow"];
const offerCheckIn = ["12:00", "13:00", "14:00"];
const offerCheckOut = ["12:00", "13:00", "14:00"];
const offerRooms = ["1", "2", "3"];
const offerGuests = ["1", "2", "3"];
const offerFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
const offerPrice = ["1000", "2000", "3000", "4000"];
const avatars = ["1", "2", "3", "4", "5", "6", "7", "8"];
const photos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];
const COORDINATE_X_MIN = 0;
const COORDINATE_X_MAX = 1200;
const COORDINATE_Y_MIN = 130;
const COORDINATE_Y_MAX = 630;
const map = document.querySelector(".map");
const pinTemplate = document.querySelector("#pin").content;
const newPin = pinTemplate.querySelector(".map__pin");
const pinList = document.querySelector(".map__pins");
const PIN_OFFSET_X = 32;
const PIN_OFFSET_Y = 87;
const cardTemplate = document.querySelector("#card").content;
const newCard = pinTemplate.querySelector(".map__card");
const cardList = document.querySelector(".card-wrapper");

map.classList.remove(".map--faded");

// Рандомное число

const getRandomElement = function (elements) {
  const randomElement = elements[Math.floor(Math.random() * elements.length)];
  return randomElement;
};

// Выбор рандомного фитчера и фото

function shuffle(array) {
  let currentIndex = array.length, temporaryValue, randomIndex;
  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}

// Аватар

let getAvatars = function (numbers) {
  for (let i = 0; i < numbers.length; i++) {
    let avatar = "img/avatars/user" + "0" + numbers[i] + ".png";
    return avatar;
  }
  return getAvatars;
};

getAvatars(avatars);

// Рандомные координаты

function randomInteger(min, max) {
  const rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

randomInteger(COORDINATE_X_MIN, COORDINATE_X_MAX);
randomInteger(COORDINATE_Y_MIN, COORDINATE_Y_MAX);


const createAnnouncements = function (amount) {
  let announcements = [];
  for (let i = 0; i < amount; i++) {
    let announcement = {
      author: {
        avatar: getAvatars(avatars)
      },
      offer: {
        title: "Уютная квартира",
        address: ["randomInteger(COORDINATE_X_MIN, COORDINATE_X_MAX)", "randomInteger(COORDINATE_Y_MIN, COORDINATE_Y_MAX)"],
        price: getRandomElement(offerPrice),
        type: getRandomElement(offerType),
        rooms: getRandomElement(offerRooms),
        guests: getRandomElement(offerGuests),
        checkin: getRandomElement(offerCheckIn),
        checkout: getRandomElement(offerCheckOut),
        features: shuffle(offerFeatures),
        description: "Ну очень уютная квартира",
        photos: shuffle(photos)
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

let announcementItems = createAnnouncements(8);

const createPins = function (items) {
  let pinItems = [];
  for (let i = 0; i < items.length; i++) {
    const pinElements = pinTemplate.cloneNode(true);
    newPin.style.top = location.y - PIN_OFFSET_Y + "px";
    newPin.style.left = location.x - PIN_OFFSET_X + "px";
    newPin.querySelector("img").src = items[i].author.avatar;
    newPin.querySelector("img").alt = items[i].offer.title;
    pinItems.push(pinElements);
  }
  return pinItems;
};

const pinElements = createPins(announcementItems);

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

const createCards = function (items) {
  let cardItems = [];
  for (let i = 0; i < items.length; i++) {
    const cardElements = cardTemplate.cloneNode(true);

    newCard.querySelector(".popup__title").textContent = items[i].offer.title;
    newCard.querySelector(".popup__text--address").textContent = items[i].offer.address;
    newCard.querySelector(".popup__popup__text--price").textContent = items[i].offer.price + "₽/ночь";
    newCard.querySelector(".popup__type").textContent = items[i].offer.type;
    newCard.querySelector(".popup__text--capacity").textContent = items[i].offer.rooms + " " + "комнаты для" + items[i].offer.guests;
    newCard.querySelector(".popup__text--time").textContent = "Заезд после" + items[i].offer.checkin + ", выезд до" + items[i].offer.checkout;
    newCard.querySelector(".popup__features").textContent = items[i].offer.features;
    newCard.querySelector(".popup__description").textContent = items[i].offer.description;
    newCard.querySelector(".popup__photos").src = items[i].offer.photos;
    newCard.querySelector(".popup__avatar").src = items[i].author.avatar;

    cardItems.push(cardElements);
  }
  return cardItems;
};

const cardElements = createCards(announcementItems);

const renderCards = function (elements) {
  for (let i = 0; i < cardElements.length; i++) {
    elements = cardElements;
    fragment.appendChild(elements[i]);
    cardList.appendChild(fragment);
  }
};
renderCards(cardElements);
