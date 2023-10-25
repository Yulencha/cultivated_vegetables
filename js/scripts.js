let checkboxArr = Array.from(document.getElementsByClassName("checkbox"));

function toggleCheckbox(event) {
  console.log("check");
  const checkbox = event.currentTarget.querySelector('input[type="checkbox"]');

  checkbox.checked = !checkbox.checked;
  event.currentTarget.classList.toggle("checkbox_active", checkbox.checked);
}

checkboxArr.forEach((checkbox) => {
  checkbox.addEventListener("click", toggleCheckbox);
});

// Для разбиения суммы по тысячам
function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

// Для счетчика
// Найти все блоки счетчика на странице
const countBlocks = document.querySelectorAll(".item__count");

// Для каждого блока счетчика добавить обработчики событий
countBlocks.forEach((countBlock) => {
  const numericInput = countBlock.querySelector(".count__numeric");
  const minusButton = countBlock.querySelector(".count__minus");
  const plusButton = countBlock.querySelector(".count__plus");

  minusButton.addEventListener("click", () => {
    numericInput.stepDown(); // Уменьшает значение на один шаг
    console.log(numericInput.min);
    if (numericInput.value === numericInput.min) {
      minusButton.classList.add("count__limit");
      plusButton.classList.remove("count__limit");
    } else {
      minusButton.classList.remove("count__limit");
      plusButton.classList.remove("count__limit");
    }
  });

  plusButton.addEventListener("click", () => {
    numericInput.stepUp(); // Увеличивает значение на один шаг
    console.log(numericInput.max);
    if (numericInput.value === numericInput.max) {
      plusButton.classList.add("count__limit");
      minusButton.classList.remove("count__limit");
    } else {
      plusButton.classList.remove("count__limit");
      minusButton.classList.remove("count__limit");
    }
  });
});
