//Обновление цен, количества товаров в корзине
export function updateTotalOrderInfo() {
  const itemsInfo = collectItemsInfo();
  updateBasketDelivery(itemsInfo);
  updateSidebarPrices(itemsInfo);
}

// Сбор информации о выбранных товарах
function collectItemsInfo() {
  // Найти все элементы .accordion__item внутри #accordion_available
  const items = document.querySelectorAll("#accordion_available .accordion__item");
  const result = [];

  items.forEach((item) => {
    // Проверка, что чекбокс отмечен
    const checkbox = item.querySelector('.item__checkbox input[type="checkbox"]');
    if (checkbox && checkbox.checked) {
      // Получение пути к изображению
      let imgAbsoluteUrl = item.querySelector(".item__img img").src;
      let urlObj = new URL(imgAbsoluteUrl);

      let imgRelativePath = "." + urlObj.pathname.slice(urlObj.pathname.indexOf("/img/"));

      // Получение количества
      const countInput = item.querySelector('.item__count input[type="number"]');
      const itemCount = countInput ? countInput.value : 0;

      // Получение названия товара
      const nameSpan = item.querySelector(".good-info__name");
      const itemName = nameSpan ? nameSpan.textContent.trim() : "";

      // Получение информации о цене и скидках
      const priceDiv = item.querySelector(".item__price-wrap");
      const price = priceDiv ? priceDiv.dataset.price : 0;
      const sellerDiscount = priceDiv ? priceDiv.dataset.sellerDiscount : 0;
      const personalDiscount = priceDiv ? priceDiv.dataset.personalDiscount : 0;
      const currency = priceDiv ? priceDiv.dataset.currency : "";

      // Добавление информации о товаре в массив результатов
      result.push({
        imagePath: imgRelativePath,
        quantity: itemCount,
        name: itemName,
        price: price,
        sellerDiscount: sellerDiscount,
        personalDiscount: personalDiscount,
        currency: currency,
      });
    }
  });

  return result;
}

//Обновление данных в блоке доставки
function updateBasketDelivery(itemsInfo) {
  const productLists = document.querySelectorAll(".basket-delivery__products-list");
  const datesRange = document.querySelectorAll(".basket-delivery__date-range");

  const firstProductList = productLists[0];
  const secondProductList = productLists[1];
  const firstDateRange = datesRange[0];
  const secondDateRange = datesRange[1];

  firstProductList.innerHTML = "";
  secondProductList.innerHTML = "";

  // Скрываем списки и даты, если itemsInfo пуст
  if (itemsInfo.length === 0) {
    firstProductList.style.display = "none";
    secondProductList.style.display = "none";
    firstDateRange.style.display = "none";
    secondDateRange.style.display = "none";
    return;
  } else {
    firstProductList.style.display = "flex";
    firstDateRange.style.display = "block";
  }

  let hasExtraItems = false;

  itemsInfo.forEach((item) => {
    const quantity = parseInt(item.quantity, 10);

    // Если количество товара больше 184, добавляем в оба списка
    if (quantity > 184) {
      hasExtraItems = true;
      addProductToBasket(firstProductList, item.imagePath, item.name, 184);
      addProductToBasket(secondProductList, item.imagePath, item.name, quantity - 184);
    } else {
      addProductToBasket(firstProductList, item.imagePath, item.name, quantity);
    }
  });

  secondProductList.style.display = hasExtraItems ? "flex" : "none";
  secondDateRange.style.display = hasExtraItems ? "block" : "none";
}

function addProductToBasket(productList, imagePath, name, quantity) {
  const productDiv = document.createElement("div");
  productDiv.classList.add("basket-delivery__product");

  const img = document.createElement("img");
  img.src = imagePath;
  img.alt = name;
  img.classList.add("basket-delivery__product-image");
  productDiv.appendChild(img);

  if (quantity > 1) {
    const countSpan = document.createElement("span");
    countSpan.classList.add("basket-delivery__product-count");
    countSpan.textContent = quantity;
    productDiv.appendChild(countSpan);
  }

  productList.appendChild(productDiv);
}

//Обновление общей цены заказа
function updateSidebarPrices(items) {
  let totalQuantity = 0;
  let overallPrice = 0;
  let totalDiscount = 0;
  let totalPriceWithDiscount = 0;

  items.forEach((item) => {
    const prices = calculatePrices(item);
    totalQuantity += parseInt(item.quantity, 10);
    overallPrice += prices.totalPrice;
    totalDiscount += prices.sellerDiscountTotal + prices.personalDiscountTotal;
    totalPriceWithDiscount += prices.discountedPrice;
  });

  const sidebarNewPriceValue = document.querySelector(".sidebar__new-price-value span");
  const sidebarPriceValue = document.querySelector(".sidebar__price-value span");
  const sidebarDiscountValue = document.querySelector(".sidebar__discount-value span");
  const sidebarOrderBtn = document.querySelector(".sidebar__order-btn_checkted");
  const sidebarTotalProducts = document.querySelector(".sidebar__price span");

  const accordionInfoCount = document.querySelector(
    "#accordion-header_available .accordion__count"
  );
  const accordionInfoPrice = document.querySelector(
    "#accordion-header_available .accordion__price"
  );
  const correctWordForQuantity = getCorrectWordForQuantity(totalQuantity);

  // Установка значений в DOM
  if (sidebarNewPriceValue)
    sidebarNewPriceValue.textContent = totalPriceWithDiscount.toLocaleString();
  if (sidebarPriceValue) sidebarPriceValue.textContent = overallPrice.toLocaleString();
  if (sidebarDiscountValue) sidebarDiscountValue.textContent = `-${totalDiscount.toLocaleString()}`;
  if (sidebarOrderBtn)
    sidebarOrderBtn.textContent = `Оплатить ${totalPriceWithDiscount.toLocaleString()} сом`;
  if (sidebarTotalProducts) {
    sidebarTotalProducts.textContent = `${totalQuantity} ${correctWordForQuantity}`;
  }
  if (accordionInfoCount) {
    accordionInfoCount.textContent = `${totalQuantity} ${correctWordForQuantity}`;
  }
  if (accordionInfoPrice) {
    accordionInfoPrice.textContent = totalPriceWithDiscount.toLocaleString() + " сом";
  }

  // Если в items нет элементов, скрываем блок цены
  const priceBlock = document.querySelector(".sidebar__price-block");
  if (items.length === 0) {
    if (priceBlock) priceBlock.style.display = "none";
  } else {
    if (priceBlock) priceBlock.style.display = "block";
  }
}

//Утилита для правильного склонения слова "товар"
function getCorrectWordForQuantity(quantity) {
  const lastDigit = quantity % 10;
  const lastTwoDigits = quantity % 100;

  if (lastTwoDigits > 10 && lastTwoDigits < 20) {
    return "товаров";
  } else if (lastDigit === 1) {
    return "товар";
  } else if (lastDigit >= 2 && lastDigit <= 4) {
    return "товара";
  } else {
    return "товаров";
  }
}

// Вычисление всех цен для каждого товара
export function calculatePrices({ price, sellerDiscount, personalDiscount, quantity }) {
  const sellerDiscountTotal = Math.round((sellerDiscount / 100) * price * quantity);
  const personalDiscountTotal = Math.round((personalDiscount / 100) * price * quantity);

  const totalPrice = price * quantity;
  const discountedPrice = totalPrice - sellerDiscountTotal - personalDiscountTotal;

  return {
    totalPrice,
    discountedPrice,
    sellerDiscountTotal,
    personalDiscountTotal,
  };
}

export function updateAccordionHeaderInfo() {
  const items = document.querySelectorAll("#accordion_not-available .accordion__item");
  let totalQuantity = items.length;
  const accordion = document.querySelector(".basket__accordion.accordion.not-available");
  const accordionInfoText = accordion.querySelector(
    "#accordion-header_not-available .accordion__info-title"
  );
  if (totalQuantity === 0) {
    accordion.style.display = "none";
    return;
  } else if (totalQuantity === 1) {
    accordion.style.display = "block";
    accordionInfoText.textContent = "Отсутствует";
  } else {
    accordion.style.display = "block";
    accordionInfoText.textContent = "Отсутствуют";
  }

  const accordionInfoCount = accordion.querySelector(
    "#accordion-header_not-available .accordion__count"
  );
  const correctWordForQuantity = getCorrectWordForQuantity(totalQuantity);
  if (accordionInfoCount) {
    accordionInfoCount.textContent = `${totalQuantity} ${correctWordForQuantity}`;
  }
}

export function updateBasketIconCount() {
  const items = document.querySelectorAll("#accordion_available .accordion__item");
  let totalQuantity = items.length;

  const headerBasketIconCount = document.querySelector(".navbar-pc__notify");
  const navbarMobileBasketIconCount = document.querySelector(".navbar-mobile__notify");

  if (totalQuantity === 0) {
    headerBasketIconCount.style.display = "none";
    navbarMobileBasketIconCount.style.display = "none";
  } else {
    headerBasketIconCount.style.display = "inline-flex";
    navbarMobileBasketIconCount.style.display = "inline-flex";
    headerBasketIconCount.textContent = totalQuantity;
    navbarMobileBasketIconCount.textContent = totalQuantity;
  }
}
