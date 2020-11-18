'use strict';

(function () {
  const TIMEOUT_IN_MS = 10000;
  const MAX_ANNOUNCEMENTS = 5;
  const STATUS_OK = 200;
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const filtersElements = document.querySelectorAll(`.map__filters select`);
  const StatusCode = {
    OK: STATUS_OK
  };

  window.load = {
    onErrorNotLoad: function (errorMessage) {
      const error = document.createElement(`div`);
      error.style = `z-index: 100; margin: 0 auto; text-align: center; background-color: red; font-weight: bold;`;
      error.style.position = `absolute`;
      error.style.left = 0;
      error.style.right = 0;
      error.style.fontSize = `30px`;
      error.textContent = errorMessage;
      document.body.insertAdjacentElement(`afterbegin`, error);
    },
    onSuccessLoad: function (announcements) {
      window.announcements = announcements;
      for (const filter of filtersElements) {
        filter.disabled = false;
      }
      window.pins.renderPins(window.pins.createPins(window.announcements.slice(0, MAX_ANNOUNCEMENTS)));
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
