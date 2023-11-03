import { items, generateProductCards } from "./productCard.js";
import { initAccordions } from "./accordion.js";
import { initCheckboxHandlers } from "./checkboxHandler.js";
import { initRadioButtonHandlers } from "./radioButtonHandler.js";
import { initPopupHandlers } from "./popupHandler.js";
import { initFormHandlers } from "./formHandler.js";
import {
  updateTotalOrderInfo,
  updateAccordionHeaderInfo,
  updateBasketIconCount,
} from "./infoUpdaters.js";

// Генерация карточек товаров и их добавление на страницу
generateProductCards(items);

// Логика для спойлера/аккордиона
initAccordions();

// Логика для чекбоксов
initCheckboxHandlers();

// Логика для радиокнопок
initRadioButtonHandlers();

// Логика для popup
initPopupHandlers();

// Логика для валидации и отправки формы
initFormHandlers();

//Обновление цен, количества товаров в корзине
updateTotalOrderInfo();

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
      const accordionBody = parent.closest(".accordion__body");
      parent.remove();
      if (accordionBody.id === "accordion_available") {
        updateTotalOrderInfo();
        updateBasketIconCount();
      } else if (accordionBody.id === "accordion_not-available") {
        updateAccordionHeaderInfo();
      }
    }
  });
});
