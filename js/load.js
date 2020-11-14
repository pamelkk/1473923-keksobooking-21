'use strict';

(function () {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const STATUS_OK = 200;
  const StatusCode = {
    OK: STATUS_OK
  };
  const TIMEOUT_IN_MS = 10000;

  window.load = {
    errorLoadHandler: function (errorMessage) {
      const error = document.createElement(`div`);
      error.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; font-weight: bold;`;
      error.style.position = `absolute`;
      error.style.left = 0;
      error.style.right = 0;
      error.style.fontSize = `30px`;
      error.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, error);
    },
    successLoadHanlder: function (announcements) {
      window.announcements = announcements;
      window.pins.renderPins(window.pins.createPins(window.announcements));
    },
    startLoading: function (onSuccess, onError) {
      const xhr = new XMLHttpRequest();
      xhr.responseType = `json`;

      xhr.addEventListener(`load`, function () {
        if (xhr.status === StatusCode.OK) {
          onSuccess(xhr.response);
        } else {
          onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
        }
      });
      xhr.addEventListener(`error`, function () {
        onError(`Произошла ошибка соединения`);
      });
      xhr.addEventListener(`timeout`, function () {
        onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
      });

      xhr.timeout = TIMEOUT_IN_MS;

      xhr.open(`GET`, URL);
      xhr.send();
    }
  };
})();
