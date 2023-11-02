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

export function initRadioButtonHandlers() {
  const radioInputs = document.querySelectorAll(".radio-input__input");

  radioInputs.forEach((radioInput) => {
    radioInput.addEventListener("change", () => updateRadioDisplay(radioInput));

    if (radioInput.checked) {
      updateRadioDisplay(radioInput);
    }
  });
}
