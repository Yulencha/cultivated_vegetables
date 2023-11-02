export const items = [
  {
    name: "Футболка UZcotton мужская",
    imagePath: "./img/item_01.png",
    color: "белый",
    size: "56",
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      registration: "1067746062449",
      adress:
        "142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1",
    },
    quantity: 1,
    availability: 2,
    currency: "сом",
    price: 526,
    originalPrice: 1051,
    personalDiscount: 10,
    discount: 40,
    favorite: false,
    checked: true,
  },
  {
    name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
    imagePath: "./img/item_02.png",
    color: "прозрачный",
    size: false,
    store: "Коледино WB",
    seller: {
      name: "OOO Мегапрофстиль",
      registration: "5167746237148",
      adress: "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    quantity: 200,
    availability: 205,
    currency: "сом",
    price: 10350,
    originalPrice: 11500,
    personalDiscount: 4,
    discount: 5,
    favorite: false,
    checked: true,
  },
  {
    name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    imagePath: "./img/item_03.png",
    color: false,
    size: false,
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      registration: "1067746062449",
      adress:
        "142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1",
    },
    quantity: 2,
    availability: 2,
    currency: "сом",
    price: 247,
    originalPrice: 475,
    personalDiscount: 12,
    discount: 40,
    favorite: false,
    checked: true,
  },

  {
    name: "Футболка UZcotton мужская",
    imagePath: "./img/item_04.png",
    color: "белый",
    size: "56",
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      registration: "1067746062449",
      adress:
        "142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1",
    },
    quantity: 1,
    availability: 0,
    currency: "сом",
    price: 526,
    originalPrice: 1051,
    personalDiscount: 10,
    discount: 40,
    favorite: false,
    checked: false,
  },
  {
    name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
    imagePath: "./img/item_05.png",
    color: "прозрачный",
    size: false,
    store: "Коледино WB",
    seller: {
      name: "OOO Мегапрофстиль",
      registration: "5167746237148",
      adress: "129337, Москва, улица Красная Сосна, 2, корпус 1, стр. 1, помещение 2, офис 34",
    },
    quantity: 200,
    availability: 0,
    currency: "сом",
    price: 10350,
    originalPrice: 11500,
    personalDiscount: 4,
    discount: 5,
    favorite: false,
    checked: false,
  },
  {
    name: 'Карандаши цветные Faber-Castell "Замок", набор 24 цвета, заточенные, шестигранные, Faber-Castell',
    imagePath: "./img/item_06.png",
    color: false,
    size: false,
    store: "Коледино WB",
    seller: {
      name: "ООО Вайлдберриз",
      registration: "1067746062449",
      adress:
        "142181, Московская область, д Коледино, тер. Индустриальный Парк Коледино, д. 6 стр. 1",
    },
    quantity: 2,
    availability: 0,
    currency: "сом",
    price: 247,
    originalPrice: 475,
    personalDiscount: 12,
    discount: 40,
    favorite: false,
    checked: false,
  },
];

class ProductCard {
  constructor(item) {
    this.item = item;
    this.availability = item.availability > 0;
  }

  generateCard() {
    const card = document.createElement("div");
    card.className = "item accordion__item";

    const checkboxHtml = this.availability ? this.generateCheckboxHtml() : "";
    const colorHtml = this.item.color ? this.generatePropertyHtml("Цвет", this.item.color) : "";
    const sizeHtml = this.item.size
      ? this.generatePropertyHtml("Размер", this.item.size, "hide-mobile")
      : "";
    const sizeMobHtml = this.item.size ? this.generateSizeMobHtml() : "";

    const infoPropertiesHtml =
      this.item.color || this.item.size
        ? `<div class="good-info__properties">
            ${colorHtml}
            ${sizeHtml}
          </div>`
        : "";

    const infoStoreHtml = this.availability ? this.generateStoreHtml() : "";
    const infoSellerHtml = this.availability ? this.generateSellerHtml() : "";
    const countHtml = this.availability ? `<div class="item__count count"></div>` : "";

    const limitHtml =
      this.item.availability < 6 && this.item.availability > 0 ? this.generateLimitHtml() : "";
    const priceHtml = this.item.availability > 0 ? this.generatePriceHtml() : "";

    card.innerHTML = `
      <div class="item__wrap">
        ${checkboxHtml}
        <a href="#" class="item__img" title=${this.item.name}>
          <img src=${this.item.imagePath} alt=${this.item.name} />
        </a>
        ${sizeMobHtml}
      </div>
      
      <div class="item__good-info good-info">
        <a href="#" class="good-info__title">
          <span class="good-info__name">${this.item.name}
          </span>
        </a>

        ${infoPropertiesHtml}
        ${infoStoreHtml}
        ${infoSellerHtml}
      </div>
      
      <div class="item__btn-wrap">
        ${countHtml}
        ${limitHtml}
        <div class="item__btn btn">
          <button class="btn__postpone" type="button">
            <span>В избранное
              <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16" viewBox="0 0 19 16" fill="none">
                <path d="M8.7038 2.12882C8.7978 2.22448 8.9263 2.27836 9.06041 2.27836C9.19453 2.27836 9.32302 2.22448 9.41703 2.12882C10.037 1.49801 11.1892 0.499741 13.0604 0.499741C14.212 0.499741 15.4619 0.874807 16.3615 1.68724C17.261 2.49966 17.8104 3.74962 17.5604 5.49974C17.3104 7.24975 16.1854 8.99974 14.6229 10.6872C13.0604 12.3747 11.0604 13.9997 9.06041 15.4997C7.06042 13.9997 5.06043 12.3747 3.49793 10.6872C1.93545 8.99974 0.810441 7.24975 0.56041 5.49974C0.310364 3.74962 0.859731 2.49966 1.75929 1.68724C2.65885 0.874807 3.90881 0.499741 5.06041 0.499741C6.93163 0.499741 8.08386 1.49801 8.7038 2.12882Z" stroke="black" stroke-linejoin="round" />
              </svg>
            </span>
          </button>
          <button class="btn__del" type="button">
            <span>Удалить
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M2.5 5C2.5 4.72386 2.72386 4.5 3 4.5H17C17.2761 4.5 17.5 4.72386 17.5 5C17.5 5.27614 17.2761 5.5 17 5.5H3C2.72386 5.5 2.5 5.27614 2.5 5Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M3.4584 4.5H16.5059L15.6411 15.6926C15.5405 16.9947 14.4546 18 13.1486 18H6.84639C5.54299 18 4.45829 16.9986 4.35435 15.6994L3.4584 4.5ZM4.5416 5.5L5.35117 15.6196C5.41353 16.3992 6.06435 17 6.84639 17H13.1486C13.9322 17 14.5837 16.3968 14.6441 15.6155L15.4256 5.5H4.5416Z" fill="black" />
                <path fill-rule="evenodd" clip-rule="evenodd" d="M13 5.5H7V3.46875C7 2.65758 7.65758 2 8.46875 2H11.5312C12.3424 2 13 2.65758 13 3.46875V5.5ZM8.46875 3C8.20987 3 8 3.20987 8 3.46875V4.5H12V3.46875C12 3.20987 11.7901 3 11.5312 3H8.46875Z" fill="black" />
              </svg>
            </span>
          </button>
        </div>
      </div>
      
      <div class="item__price">
        ${priceHtml}
      </div>`;

    if (this.availability) {
      const parentNode = card.querySelector(".item__btn-wrap");
      const oldChild = card.querySelector(".item__count");
      const newChild = this.generateCountBlock();
      parentNode.replaceChild(newChild, oldChild);
    }

    return card;
  }

  generateCheckboxHtml() {
    return `
      <label class="item__checkbox checkbox">
        <input type="checkbox" />
        <span class="checkbox__decor"></span>
      </label>
    `;
  }

  generatePropertyHtml(label, value, className = "") {
    return `
      <span class="good-info__item ${className}">${label}: ${value}</span>
    `;
  }

  generateSizeMobHtml() {
    return `
      <div class="item__size-mobile hide-desktop">${this.item.size}</div>
    `;
  }

  generateStoreHtml() {
    return `
      <div class="good-info__store">
        <span class="good-info__item">${this.item.store}</span>
      </div>
    `;
  }

  generateSellerHtml() {
    return `
      <div class="good-info__seller hide-mobile">
        <span class="good-info__item">${this.item.seller.name}</span>
        <div class="good-info__seller-info seller-info">
          <span class="seller-info__icon"></span>
          <div class="seller-info__popup">
            <span class="seller-info__name">${this.item.seller.name}</span>
            <span class="seller-info__registration">ОГРН: ${this.item.seller.registration}</span>
            <span class="seller-info__address">${this.item.seller.adress}</span>
          </div>
        </div>
      </div>
    `;
  }

  generateCountHtml() {
    const minusButtonClass = this.item.quantity == 1 ? "count__minus count__limit" : "count__minus";
    return `
      <div class="item__count count">
        <button type="button" class=${minusButtonClass}>-</button>
        <input type="number" autocomplete="off" maxlength="3" min="1" max="${this.item.availability}" 
          class="count__numeric" value="${this.item.quantity}" />
        <button type="button" class="count__plus">+</button>
      </div>
    `;
  }

  generateLimitHtml() {
    return `
      <div class="item__limit">Осталось ${this.item.availability} шт.</div>
    `;
  }
  generatePriceHtml() {
    return generatePrice(
      this.item.originalPrice,
      this.item.discount,
      this.item.personalDiscount,
      this.item.quantity,
      this.item.currency
    );
  }

  generateCountBlock() {
    const countBlock = document.createElement("div");
    countBlock.className = "item__count count";

    const minusButtonClass = this.item.quantity == 1 ? "count__minus count__limit" : "count__minus";
    const plusButtonClass =
      this.item.quantity == this.item.availability ? "count__plus count__limit" : "count__plus";

    const minusButton = this.createButton("-", minusButtonClass);
    const numericInput = this.createNumericInput();
    const plusButton = this.createButton("+", plusButtonClass);

    this.setupCountEventListeners(minusButton, plusButton, numericInput);

    countBlock.appendChild(minusButton);
    countBlock.appendChild(numericInput);
    countBlock.appendChild(plusButton);

    return countBlock;
  }

  createButton(text, className) {
    const button = document.createElement("button");
    button.type = "button";
    button.className = className;
    button.textContent = text;
    return button;
  }

  createNumericInput() {
    const numericInput = document.createElement("input");
    numericInput.type = "number";
    numericInput.autocomplete = "off";
    numericInput.maxLength = 3;
    numericInput.min = 1;
    numericInput.max = this.item.availability;
    numericInput.className = "count__numeric";
    numericInput.value = this.item.quantity;
    return numericInput;
  }

  setupCountEventListeners(minusButton, plusButton, numericInput) {
    minusButton.addEventListener("click", (event) => {
      numericInput.stepDown();
      updatePrices(numericInput.value, event);
      plusButton.classList.remove("count__limit");
      if (numericInput.value === numericInput.min) {
        minusButton.classList.add("count__limit");
      } else {
        minusButton.classList.remove("count__limit");
      }
    });

    plusButton.addEventListener("click", (event) => {
      numericInput.stepUp();
      updatePrices(numericInput.value, event);
      minusButton.classList.remove("count__limit");
      if (numericInput.value === numericInput.max) {
        plusButton.classList.add("count__limit");
      } else {
        plusButton.classList.remove("count__limit");
      }
    });
  }

  updatePrices(number) {
    return updatePrices(number);
  }
}

// Для разбиения суммы по тысячам
function formatNumberWithSpaces(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, "\u00a0");
}

// Генерация блока с ценой для каждого товара
function generatePrice(price, sellerDiscountValue, personalDiscountValue, quantity, curr) {
  const personalDiscount = Math.round(((personalDiscountValue * price) / 100) * quantity);
  const sellerDiscount = Math.round(((sellerDiscountValue * price) / 100) * quantity);

  const totalPrice = price * quantity;
  const totalPriceWithDiscount = totalPrice - personalDiscount - sellerDiscount;

  const priceSize = totalPriceWithDiscount < 1000000 ? "item__price-new_big" : "";

  const currency = ` ${curr}`;

  const priceNewHtml = `
    <div class="item__price-new">
      <span class=${priceSize}>${formatNumberWithSpaces(totalPriceWithDiscount)}</span>
      <span>${currency}</span>
    </div>`;

  const priceOldHtml = `
    <div class="item__price-wrap" data-price=${price} data-seller-discount=${sellerDiscountValue} data-personal-discount=${personalDiscountValue} data-currency=${curr}>
      <div class="item__price-old">
        <span>${formatNumberWithSpaces(totalPrice)}</span>
        <span>${currency}</span>
      </div>
      <div class="item__discount-popup">
        <div class="item__discount-key">
          <span>Скидка ${sellerDiscountValue}%</span>
          <span>Скидка покупателя ${personalDiscountValue}%</span>
        </div>
        <div class="item__discount-value">
          <span>-${formatNumberWithSpaces(sellerDiscount)}</span>
          <span>-${formatNumberWithSpaces(personalDiscount)}</span>
        </div>
        <div class="item__discount-currency">
          <span>&nbsp;${currency}</span>
          <span>&nbsp;${currency}</span>
        </div>
      </div>
    </div>
  `;
  return `${priceNewHtml}${priceOldHtml}`;
}

// обновление блока с ценой
function updatePrices(number, event) {
  const productCard = event.currentTarget.closest(".accordion__item");
  const priceBlock = productCard.querySelector(".item__price");
  const data = priceBlock.querySelector(".item__price-wrap").dataset;

  const newPrice = generatePrice(
    data.price,
    data.sellerDiscount,
    data.personalDiscount,
    number,
    data.currency
  );
  priceBlock.innerHTML = newPrice;
}

// Логика для счетчика

// const countBlocks = document.querySelectorAll(".item__count");

// countBlocks.forEach((countBlock) => {
//   const numericInput = countBlock.querySelector(".count__numeric");
//   const minusButton = countBlock.querySelector(".count__minus");
//   const plusButton = countBlock.querySelector(".count__plus");

//   minusButton.addEventListener("click", () => {
//     numericInput.stepDown();
//     plusButton.classList.remove("count__limit");
//     if (numericInput.value === numericInput.min) {
//       minusButton.classList.add("count__limit");
//     } else {
//       minusButton.classList.remove("count__limit");
//     }
//   });

//   plusButton.addEventListener("click", () => {
//     numericInput.stepUp();
//     minusButton.classList.remove("count__limit");
//     if (numericInput.value === numericInput.max) {
//       plusButton.classList.add("count__limit");
//     } else {
//       plusButton.classList.remove("count__limit");
//     }
//   });
// });

// Генерация карточек товаров и их добавление на страницу
export function generateProductCards(items) {
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
