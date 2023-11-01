import { items, ProductCard } from "./productCard.js";
// Логика для спойлера/аккордиона

const accordions = document.querySelectorAll(".accordion");

function accordionButtonClick(event) {
  const accordion = event.currentTarget.closest(".accordion");
  accordion.classList.toggle("accordion_close");
}

const accordionIcon = document.querySelectorAll(".accordion__icon");
accordionIcon.forEach((icon) => {
  icon.addEventListener("click", accordionButtonClick);
});

// Генерация карточек товаров и их добавление на страницу

function generateProductCards(items) {
  const accordionAvailable = document.getElementById("accordion_available");
  const accordionNotAvailable = document.getElementById("accordion_not-available");

  items.forEach((item) => {
    const product = new ProductCard(item);
    const productCard = product.generateCard();

    if (item.availability > 0) {
      accordionAvailable.appendChild(productCard);
    } else {
      accordionNotAvailable.appendChild(productCard);
    }
  });
}

generateProductCards(items);

// Логика для чекбоксов

let checkboxArr = document.querySelectorAll(".checkbox");

function toggleCheckbox(event) {
  const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');

  checkbox.checked = !checkbox.checked;
  event.currentTarget.classList.toggle("checkbox_active", checkbox.checked);
}

checkboxArr.forEach((checkbox) => {
  checkbox.addEventListener("click", toggleCheckbox);
});

// Логика для радиокнопок

function updateRadioDisplay(radioInput) {
  const radioList = radioInput.closest(".radio-input__list");
  if (!radioList) return;

  const radioDecorElements = radioList.querySelectorAll(".radio-input__decor");
  radioDecorElements.forEach((decor) => {
    decor.classList.remove("radio-input__decor_active");
  });

  if (radioInput.checked) {
    const decorElement = radioInput.nextElementSibling;
    decorElement.classList.add("radio-input__decor_active");
  }
}

const radioInputs = document.querySelectorAll(".radio-input__input");

radioInputs.forEach((radioInput) => {
  radioInput.addEventListener("change", () => updateRadioDisplay(radioInput));

  if (radioInput.checked) {
    updateRadioDisplay(radioInput);
  }
});

// Логика для открытия/закрытия popup

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.body;
const popupCloseIcons = document.querySelectorAll(".close-popup");

let unlock = true;
const timeout = 100;

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

function popupClose(popup, doUnlock = true) {
  if (unlock) {
    popup.classList.remove("open");
    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  body.classList.add("lock");

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    body.classList.remove("lock");
  }, timeout);
  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

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

document.querySelector(".popup__submit-btn_payment").addEventListener("click", function (event) {
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
});

// Переключение вида доставки в delivery-popup

let tabsSwitchInputs = document.querySelectorAll(".tabs-switch__input");
let selfDeliveryWrap = document.querySelector(".delivery-option__wrap_self");
let courierDeliveryWrap = document.querySelector(".delivery-option__wrap_courier");
let tabsSwitchItems = document.querySelectorAll(".tabs-switch__item");

tabsSwitchInputs.forEach((input) => {
  input.addEventListener("change", function () {
    // Проверяем, какой радио-инпут выбран
    if (input.value === "self") {
      selfDeliveryWrap.style.display = "flex";
      courierDeliveryWrap.style.display = "none";
    } else if (input.value === "courier") {
      courierDeliveryWrap.style.display = "flex";
      selfDeliveryWrap.style.display = "none";
    }

    tabsSwitchItems.forEach((item) => item.classList.remove("tabs-switch__item_active"));
    input.parentElement.classList.add("tabs-switch__item_active");
  });
});

// Обработка выбранных данных в delivery-popup

document.querySelector(".popup__submit-btn_delivery").addEventListener("click", function (event) {
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
    pickupInfo.style.display = "block";
  }

  // Обновляем адрес доставки
  addressInBasket.textContent = selectedDeliveryAddress;
  addressInDelivery.textContent = selectedDeliveryAddress;
  if (selectedRating) {
    ratingInBasket.textContent = selectedRating.textContent;
  }

  const popupActive = document.querySelector(".overlay.open");
  popupClose(popupActive);
});

// Логика для кнопки удаления

const buttons = document.querySelectorAll(".btn__del");

buttons.forEach((button) => {
  button.addEventListener("click", function (event) {
    event.stopPropagation();

    let parent = this.parentElement;
    while (parent && !parent.className.endsWith("__item")) {
      parent = parent.parentElement;
    }
    if (parent) {
      parent.remove();
    }
  });
});
