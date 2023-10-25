export const items = [
  {
    name: "Футболка UZcotton мужская",
    imagePath: "./img/item_01.png",
    color: "белый",
    size: "56",
    store: "Коледино WB",
    seller: "OOO Вайлдберриз",
    quantity: 1,
    availability: 15,
    currency: "сом",
    price: 526,
    originalPrice: 1051,
    personalDiscount: 10,
    sellerDiscount: 40,
    favorite: false,
    checked: true,
  },
  {
    name: "Силиконовый чехол картхолдер (отверстия) для карт, прозрачный кейс бампер на Apple iPhone XR, MobiSafe",
    imagePath: "./img/item_02.png",
    color: "прозрачный",
    size: false,
    store: "Коледино WB",
    seller: "OOO Мегапрофстиль",
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
    seller: "OOO Вайлдберриз",
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
    seller: "OOO Вайлдберриз",
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
    seller: "OOO Мегапрофстиль",
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
    seller: "OOO Вайлдберриз",
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

export class ProductCard {
  constructor(item) {
    this.name = item.name;
    this.imagePath = item.imagePath;
    this.color = item.color;
    this.size = item.size;
    this.store = item.store;
    this.seller = item.seller;
    this.quantity = item.quantity;
    this.availability = item.availability;
    this.price = item.price;
    this.originalPrice = item.originalPrice;
    this.personalDiscount = item.personalDiscount;
    this.sellerDiscount = item.sellerDiscount;
    this.favorite = item.favorite;
  }

  generateCard() {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <h2>${this.name}</h2>
      <p>${this.description}</p>
      <img src="${this.imagePath}" alt="${this.name}" />
      <p>Цвет: ${this.color}</p>
      <p>Размер: ${this.size}</p>
      <p>Местоположение: ${this.store}</p>
      <p>Продавец: ${this.seller}</p>
      <p>Количество: ${this.quantity}</p>
      <p>Цена: ${this.price}</p>
      <p>Оригинальная цена: ${this.originalPrice}</p>
      <p>${this.favorite}</p>
    `;

    return card;
  }
}

// Генерация карточек товаров и их добавление на страницу
const productContainer = document.getElementById("product-container");

jsonData.items.forEach((itemData) => {
  const product = new ProductCard(itemData);
  const productCard = product.generateCard();
  productContainer.appendChild(productCard);
});
