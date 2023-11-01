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

  updateRadioDisplay(radioInput);
});

// Логика для открытия/закрытия popup

const popupLinks = document.querySelectorAll(".popup-link");
const body = document.body;
const lockPadding = document.querySelectorAll(".lock-padding");
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
  // const lockPaddingValue =
  //   window.innerWidth - document.querySelector(".wrapper").offsetWidth + "px";
  // if (lockPadding > 0) {
  //   lockPadding.forEach((el) => {
  //     el.style.paddingRight = lockPaddingValue;
  //   });
  // }
  // body.style.paddingRight = lockPaddingValue;
  body.classList.add("lock");

  unlock = false;
  setTimeout(() => {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(() => {
    // if (lockPadding > 0) {
    //   lockPadding.forEach((el) => {
    //     el.style.paddingRight = "0px";
    //   });
    // }
    // body.style.paddingRight = "0px";
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

document.querySelector(".payment-popup__submit-btn").addEventListener("click", function (event) {
  event.preventDefault(); // Предотвращение отправки формы

  // Получить выбранное значение
  let selectedInput = document.querySelector('input[name="payment-method"]:checked');

  let inputBlock = selectedInput.closest(".payment-option__radio-input");

  let cardAbsoluteUrl = inputBlock.querySelector(".payment-option__card-img").src; // Изображение карты
  let urlObj = new URL(cardAbsoluteUrl);
  let cardRelativePath = "." + urlObj.pathname;
  let cardNumber = inputBlock.querySelector(".payment-option__card-details").textContent; // Номер карты
  let cardExpiry = inputBlock.querySelector(".payment-option__card-expired").textContent; // Срок действия карты

  // console.log(cardRelativePath);
  // console.log(cardNumber);
  // console.log(cardExpiry);
  // Замена содержимого в других элементах .

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
