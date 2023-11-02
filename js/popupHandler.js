const popupLinks = document.querySelectorAll(".popup-link");
const popupCloseIcons = document.querySelectorAll(".close-popup");
const tabsSwitchInputs = document.querySelectorAll(".tabs-switch__input");
let unlock = true;
const timeout = 100;
const body = document.body;

export function initPopupHandlers() {
  // Инициализация обработчиков для открытия/закрытия popup
  if (popupLinks.length > 0) {
    popupLinks.forEach((popupLink) => {
      popupLink.addEventListener("click", (event) => {
        const popupName = popupLink.getAttribute("href").replace("#", "");
        const currentPopup = document.getElementById(popupName);
        popupOpen(currentPopup);
        event.preventDefault();
      });
    });
    popupCloseIcons.forEach((icon) => {
      icon.addEventListener("click", (event) => {
        const popup = icon.closest(".overlay");
        popupClose(popup);
        event.preventDefault();
      });
    });
  }

  // Обработка выбранных данных в payment-popup
  document
    .querySelector(".popup__submit-btn_payment")
    .addEventListener("click", handlePaymentSubmit);

  // Переключение вида доставки в delivery-popup
  tabsSwitchInputs.forEach((input) => {
    input.addEventListener("change", handleDeliveryChange);
  });

  // Обработка выбранных данных в delivery-popup
  document
    .querySelector(".popup__submit-btn_delivery")
    .addEventListener("click", handleDeliverySubmit);
}

// Функция для открытия popup
function popupOpen(currentPopup) {
  if (currentPopup && unlock) {
    const popupActive = document.querySelector(".overlay.open");
    popupActive ? popupClose(popupActive, false) : bodyLock();
    currentPopup.classList.add("open");
    currentPopup.addEventListener("click", (event) => {
      if (!event.target.closest(".popup")) {
        popupClose(currentPopup);
      }
    });
  }
}

// Функция для закрытия popup
function popupClose(popup, doUnlock = true) {
  if (unlock) {
    popup.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

// Функция блокировки скролла
function bodyLock() {
  body.classList.add("lock");

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

// Функция разблокировки скролла
function bodyUnLock() {
  setTimeout(() => {
    body.classList.remove("lock");
  }, timeout);
  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

// Логика обработки submit для payment-popup
function handlePaymentSubmit(event) {
  event.preventDefault();

  let selectedInput = document.querySelector('input[name="payment-method"]:checked');
  let inputBlock = selectedInput.closest(".payment-option__radio-input");
  let cardAbsoluteUrl = inputBlock.querySelector(".payment-option__card-img").src;
  let urlObj = new URL(cardAbsoluteUrl);
  let cardRelativePath = "." + urlObj.pathname;
  let cardNumber = inputBlock.querySelector(".payment-option__card-details").textContent;
  let cardExpiry = inputBlock.querySelector(".payment-option__card-expired").textContent;

  // Поиски и замена данных на странице
  let sidebarPaymentElement = document.querySelector(".payment__chosen");
  let sidebarImg = sidebarPaymentElement.querySelector("img");
  let sidebarText = sidebarPaymentElement.querySelector("span");

  let basketPaymentElement = document.querySelector(".basket-payment__card");
  let basketImg = basketPaymentElement.querySelector("img");
  let basketText = basketPaymentElement.querySelector(".basket-payment__card-details");
  let basketExpired = basketPaymentElement.querySelector(".basket-payment__card-expired");

  sidebarImg.src = cardRelativePath;
  sidebarText.textContent = cardNumber;

  basketImg.src = cardRelativePath;
  basketText.textContent = cardNumber;
  basketExpired.textContent = cardExpiry;

  const popupActive = document.querySelector(".overlay.open");
  popupClose(popupActive);
}

// Логика обработки изменения в delivery-popup
function handleDeliveryChange(event) {
  let selfDeliveryWrap = document.querySelector(".delivery-option__wrap_self");
  let courierDeliveryWrap = document.querySelector(".delivery-option__wrap_courier");
  let tabsSwitchItems = document.querySelectorAll(".tabs-switch__item");

  // Проверяем, какой радио-инпут выбран
  if (event.target.value === "self") {
    selfDeliveryWrap.style.display = "flex";
    courierDeliveryWrap.style.display = "none";
  } else if (event.target.value === "courier") {
    courierDeliveryWrap.style.display = "flex";
    selfDeliveryWrap.style.display = "none";
  }

  // Переключение активного элемента таба
  tabsSwitchItems.forEach((item) => item.classList.remove("tabs-switch__item_active"));
  event.target.parentElement.classList.add("tabs-switch__item_active");
}

// Логика обработки submit для delivery-popup
function handleDeliverySubmit(event) {
  event.preventDefault();

  let selectedDeliveryInput = document.querySelector(".tabs-switch__input:checked");
  let pickupLabel = document.querySelector(".basket-delivery__pickup-label");
  let deliveryType = document.querySelector(".delivery__type span");
  let addressInBasket = document.querySelector(".basket-delivery__pickup-address");
  let addressInDelivery = document.querySelector(".delivery__address");
  let pickupInfo = document.querySelector(".basket-delivery__pickup-info");
  let ratingInBasket = document.querySelector(".basket-delivery__rating");

  let selectedDeliveryAddressElement = document
    .querySelector('input[name="delivery-method"]:checked')
    .closest(".radio-input__item");
  let selectedDeliveryAddress = selectedDeliveryAddressElement.querySelector(
    ".delivery-option__pickup-address"
  ).textContent;
  let selectedRating = selectedDeliveryAddressElement.querySelector(".delivery-option__rating");

  // Проверяем, какой тип доставки выбран
  if (selectedDeliveryInput.value === "courier") {
    pickupLabel.textContent = "Доставка курьером";
    deliveryType.textContent = "Доставка курьером";
    pickupInfo.style.display = "none";
  } else {
    pickupLabel.textContent = "Пункт выдачи";
    deliveryType.textContent = "Доставка в пункт выдачи";
    pickupInfo.style.display = "flex";
  }

  // Обновляем адрес доставки
  addressInBasket.textContent = selectedDeliveryAddress;
  addressInDelivery.textContent = selectedDeliveryAddress;
  if (selectedRating) {
    ratingInBasket.textContent = selectedRating.textContent;
  }

  const popupActive = document.querySelector(".overlay.open");
  popupClose(popupActive);
}
