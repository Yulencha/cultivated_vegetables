import { updateTotalOrderInfo } from "./infoUpdaters.js";

// Обработчик отображения переключения чекбоксов
function toggleCheckbox(event) {
  const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');
  const isMainCheckbox = checkbox.closest("#accordion-header_available") ? true : false; //Проверка - щелкнули ли по чекбоксу "Выбрать все"

  checkbox.checked = !checkbox.checked;
  event.currentTarget.classList.toggle("checkbox_active", checkbox.checked);

  //Если щелкнули ли по чекбоксу "Выбрать все"
  if (isMainCheckbox) {
    // Найти все чекбоксы внутри блока с id accordion_available
    const checkboxesToToggle = document.querySelectorAll(
      '#accordion_available input[type="checkbox"]'
    );
    checkboxesToToggle.forEach((cb) => {
      cb.checked = checkbox.checked;
      cb.parentElement.classList.toggle("checkbox_active", checkbox.checked);
    });
    updateTotalOrderInfo();
  }
}

// Обработчик чекбокса оплаты

function handlePaymentCheckboxChange() {
  let paymentText = document.querySelector(".payment__options .payment__text");
  let basketPaymentInfo = document.querySelector(".basket-payment__payment-info");
  let orderBtnNotChecked = document.querySelector(".sidebar__order-btn_not-checkted");
  let orderBtnChecked = document.querySelector(".sidebar__order-btn_checkted");

  if (this.checked) {
    paymentText.style.display = "none";
    basketPaymentInfo.style.display = "none";
    orderBtnNotChecked.style.display = "none";
    orderBtnChecked.style.display = "block";
  } else {
    paymentText.style.display = "block";
    basketPaymentInfo.style.display = "block";
    orderBtnNotChecked.style.display = "block";
    orderBtnChecked.style.display = "none";
  }
}

// Инициализация обработчиков чекбоксов
export function initCheckboxHandlers() {
  const checkboxArr = document.querySelectorAll(".checkbox");
  checkboxArr.forEach((checkbox) => {
    checkbox.addEventListener("click", toggleCheckbox);
  });

  const paymentCheckbox = document.querySelector(
    '.payment__options .payment__checkbox input[type="checkbox"]'
  );
  if (paymentCheckbox) {
    paymentCheckbox.addEventListener("change", handlePaymentCheckboxChange);
  }

  const goodsCheckbox = document.querySelectorAll("#accordion_available .item__checkbox");
  goodsCheckbox.forEach((goodCheckbox) => {
    goodCheckbox.addEventListener("change", updateTotalOrderInfo);
  });
}
