// Логика для спойлера/аккордиона

function accordionButtonClick(event) {
  const accordion = event.currentTarget.closest(".accordion");
  accordion.classList.toggle("accordion_close");
}

export function initAccordions() {
  const accordionIcon = document.querySelectorAll(".accordion__icon");
  accordionIcon.forEach((icon) => {
    icon.addEventListener("click", accordionButtonClick);
  });
}
