"use strict";

(function () {
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
  const MAX_SIMILAR_ANNOUNCEMENT_COUNT = 8;

  window.announcements = {
    createAnnouncements: function (amount) {
      const announcements = [];
      for (let i = 0; i < amount; i++) {
        const announcement = {
          author: {
            avatar: "img/avatars/user" + "0" + window.counting.randomInteger(1, amount) + ".png"
          },
          offer: {
            title: "Уютная квартира",
            address: [window.counting.randomInteger(COORDINATE_X_MIN, COORDINATE_X_MAX), window.counting.randomInteger(COORDINATE_Y_MIN, COORDINATE_Y_MAX)],
            price: window.counting.getRandomElement(offerPrice),
            type: window.counting.getRandomElement(offerType),
            rooms: window.counting.getRandomElement(offerRooms),
            guests: window.counting.getRandomElement(offerGuests),
            checkin: window.counting.getRandomElement(offerCheckIn),
            checkout: window.counting.getRandomElement(offerCheckOut),
            features: window.photos.getRandomPhotoFeatures(offerFeatures),
            description: "Ну очень уютная квартира",
            photos: window.photos.getRandomPhotoFeatures(photos)
          },
          location: {
            x: window.counting.randomInteger(COORDINATE_X_MIN, COORDINATE_X_MAX),
            y: window.counting.randomInteger(COORDINATE_Y_MIN, COORDINATE_Y_MAX)
          }
        };
        announcements.push(announcement);
      }
      return announcements;
    }
  };
})();
window.announcements.createAnnouncements(8);
