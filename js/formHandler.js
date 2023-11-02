const form = document.querySelector(".basket-form");
const recipientInputs = document.querySelectorAll(".basket-recipient__input");
const phoneInput = document.getElementById("recipient-phone");
let formAttempted = false; // Флаг для отслеживания попытки отправки формы

export function initFormHandlers() {
  // Изменение вводимого формата телефона
  phoneInput.addEventListener("input", function () {
    phoneInput.value = formatPhoneNumber(phoneInput.value);
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    const isValid = validateAndScroll(form, recipientInputs);

    if (isValid) {
      form.submit();
      console.log("Форма отправлена");
    }
  });

  // Обработчики для отображения метки
  recipientInputs.forEach((recipientInput) => {
    recipientInput.addEventListener("input", () => showLabel(recipientInput));
  });

  // Обработчики для валидации при потере фокуса
  recipientInputs.forEach((recipientInput) => {
    recipientInput.addEventListener("blur", () => {
      if (formAttempted) validateField(recipientInput);
    });
  });
}

function formatPhoneNumber(value) {
  // Удаляем все нецифровые символы
  let numbers = value.replace(/\D/g, "");
  // Ограничиваем длину до 11 цифр
  numbers = numbers.substring(0, 11);
  // Форматируем номер
  let formattedNumber = "";
  for (let i = 0; i < numbers.length; i++) {
    if (i === 0) formattedNumber += "+" + numbers[i];
    else if (i === 1 || i === 4 || i === 7 || i === 9) formattedNumber += " " + numbers[i];
    else formattedNumber += numbers[i];
  }

  return formattedNumber;
}

// Функция для отображения подписи
function showLabel(input) {
  const wrapInput = input.closest(".basket-recipient__input-group");
  const label = wrapInput.querySelector(".basket-recipient__label");
  if (input.value.trim() !== "") {
    label.style.visibility = "visible";
  } else {
    label.style.visibility = "hidden";
  }
}

// Функция валидации поля
function validateField(input) {
  let error = "";

  if (input.value.trim() === "") {
    // Текст ошибки для пустых полей
    switch (input.id) {
      case "recipient-name":
        error = "Укажите имя";
        break;
      case "recipient-surname":
        error = "Укажите фамилию";
        break;
      case "recipient-email":
        error = "Укажите электронную почту";
        break;
      case "recipient-phone":
        error = "Укажите номер телефона";
        break;
      case "recipient-vin":
        error = "Укажите ИНН";
        break;
    }
  } else {
    // Специфические ошибки
    if (input.id === "recipient-email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(input.value)) {
        error = "Проверьте адрес электронной почты";
      }
    }
    if (input.id === "recipient-phone") {
      const phoneRegex = /^\+\d{1}\s\d{3}\s\d{3}\s\d{2}\s\d{2}$/;
      if (!phoneRegex.test(input.value)) {
        error = "Формат: +9 999 999 99 99";
      }
    }
    if (input.id === "recipient-vin") {
      if (input.value.length !== 14 || !/^\d+$/.test(input.value)) {
        error = "Проверьте ИНН";
      }
    }
  }

  // Отображение или скрытие ошибки
  const wrapInput = input.closest(".basket-recipient__input-group");
  const errorElement = wrapInput.querySelector(".basket-recipient__error");
  if (error) {
    errorElement.textContent = error;
    errorElement.style.display = "block";
    input.classList.add("error");
  } else {
    errorElement.style.display = "none";
    input.classList.remove("error");
  }
}

//Функция валидации и прокрутки к ошибке
function validateAndScroll(form, recipientInputs) {
  // Валидация каждого поля
  recipientInputs.forEach((recipientInput) => {
    validateField(recipientInput);
  });

  // Поиск полей с ошибкой
  const errors = form.querySelectorAll(".basket-recipient__input.error");
  if (errors.length > 0) {
    formAttempted = true; // Устанавливаем флаг, что была попытка отправки

    // Прокрутка для мобильных устройств
    if (window.innerWidth < 1024) {
      errors[0].scrollIntoView({ block: "center", inline: "center", behavior: "smooth" });
    }

    return false; // Раз найдены ошибки, форму нельзя отправлять
  } else {
    return true; //  форма валидна
  }
}
