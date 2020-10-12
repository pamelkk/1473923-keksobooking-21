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

map.classList.remove(".map--faded");

// Рандомное число

const getRandomElement = function (elements) {
  const randomElement = elements[Math.floor(Math.random() * elements.length)];
  return randomElement;
};

// Выбор рандомного фитчера, фото и аватара

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

let randomFeatures = shuffle(offerFeatures);
let randomPhotos = shuffle(photos);
let randomAvatar = "img/avatars/user" + "0" + (shuffle(avatars)) + ".png";

// Рандомные координаты

function randomInteger(min, max) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

let coordinateX = randomInteger(COORDINATE_X_MIN, COORDINATE_X_MAX);
let coordinateY = randomInteger(COORDINATE_Y_MIN, COORDINATE_Y_MAX);


let createAnnouncement = function (amount) {
  let announcements = [];
  for (let i = 0; i < amount; i++) {
    let announcement = {
      author: {
        avatar: randomAvatar
      },
      offer: {
        title: "Уютная квартира",
        address: ["{{location.x}}", "{{location.y}}"],
        price: getRandomElement(offerPrice),
        type: getRandomElement(offerType),
        rooms: getRandomElement(offerRooms),
        guests: getRandomElement(offerGuests),
        checkin: getRandomElement(offerCheckIn),
        checkout: getRandomElement(offerCheckOut),
        features: randomFeatures,
        description: "Ну очень уютная квартира",
        photos: randomPhotos
      },
      location: {
        x: coordinateX,
        y: coordinateY
      }
    };
    announcements.push(announcement);
  }
  return announcements;
};

let announcementsArr = createAnnouncement(8);

const createPins = function (items) {
  let pinItems = [];
  for (let i = 0; i < items.length; i++) {
    const pinElements = pinTemplate.cloneNode(true);
    newPin.style.top = location.y - PIN_OFFSET_Y + "px";
    newPin.style.left = location.x - PIN_OFFSET_X + "px";
    newPin.querySelector("img").src = author.avatar;
    newPin.querySelector("img").alt = offer.title;
    pinItems.push(pinElements);
  }
  return pinItems;
};

let pinElements = createPins(announcementsArr);

// Рисую элементы меток

const fragment = document.createDocumentFragment();

let renderElements = function (elements) {
  for (let i = 0; i < pinElements.length; i++) {
    elements = pinElements;
    fragment.appendChild(elements[i]);
    pinList.appendChild(fragment);
  }
};
renderElements(pinElements);
