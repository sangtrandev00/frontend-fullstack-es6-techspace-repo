import { Modal, Dropdown } from "flowbite";
import { Toast } from "tw-elements";
import ProductsApi from "../api/productsApi";
import CategoriesApi from "../api/categoriesApi";
import ShopApi from "../api/shopApi";
const { cart } = localStorage;

export const toggleModal = (modalBtnId) => {
  document.getElementById(modalBtnId).click();
};

// Send feedback to customer!!!
export const showToast = (toastElId, toastTitle, toastMinutes, toastMessage) => {
  const toastEl = document.getElementById(toastElId);
  try {
    // Toast.getInstance(document.getElementById(toastElId)).update({
    //   autohide: true,
    //   deplay: 2000,
    // });

    toastEl.classList.add("data-[te-toast-show]:block");
    toastEl.querySelector(".toast-title").textContent = toastTitle;
    toastEl.querySelector(".toast-minutes").textContent = toastMinutes;
    toastEl.querySelector(".toast-message").textContent = toastMessage;
  } catch (error) {
    console.log("error: ", error);
  }
};

export const textContent = (elementId, text) => {
  if (!elementId) return;
  document.getElementById(elementId).textContent = text;
};

export const innerHTML = (elementId, html) => {
  if (!elementId) return;

  document.getElementById(elementId).innerHTML = html;
};

export const imageContent = (elementId, imageUrl, alt = "error image") => {
  if (!elementId) return;
  const imageEl = document.getElementById(elementId);

  imageEl?.setAttribute("src", imageUrl);
  imageEl?.setAttribute("alt", alt);
};

export const inputValue = (elementId, value) => {
  document.getElementById(elementId)?.setAttribute("value", value);
};

export const listCartHandler = async (cartList, viewCartEl, callback) => {
  if (!viewCartEl) return;
  let sum = 0;

  for (const cartItem of cartList) {
    const { prodId, qty } = cartItem;
    const {
      product: { oldPrice, discount, name, thumbnail, categoryId },
    } = await ProductsApi.getById(prodId);

    const {
      category: { name: cateName },
    } = await CategoriesApi.getById(categoryId);

    const price = oldPrice * (1 - discount / 100);
    sum += qty * price;
    const totalItem = price * qty;
    const cartItemHtml = callback(prodId, name, thumbnail, cateName, qty, price, totalItem);

    viewCartEl.insertAdjacentHTML("beforeend", cartItemHtml);
  }
};

export const calcTotalAndLengthOfCart = (cartList) => {
  const { totalPrice, cartLength } = cartList.reduce(
    (acc, item) => {
      acc["cartLength"] += item.qty;
      acc["totalPrice"] += item.qty * item.price;

      return acc;
    },
    {
      totalPrice: 0,
      cartLength: 0,
    }
  );
  return {
    totalPrice,
    cartLength,
  };
};

export const addToCart = async (productId, qtyValue) => {
  if (!productId) return;

  if (qtyValue <= 0 || typeof qtyValue !== "number") {
    // show error message before return;

    alert(`${qtyValue} is lower than zero!!! or not valid!`);
  }

  const { product } = await ProductsApi.getById(productId);
  const { oldPrice, discount, thumbnail, name, stockQty } = product;
  if (qtyValue > stockQty) {
    // Show modal alert
    alert(`Your quantity has overloaded at stock: ${stockQty} available`);
    return;
  }

  const newPrice = oldPrice * (1 - discount / 100);
  const currCart = JSON.parse(localStorage.getItem("cart"));
  const currCartList = currCart.cartList;
  const cartItemExistingIdx = currCartList.findIndex((cartItem) => cartItem.prodId === productId);

  if (cartItemExistingIdx >= 0) {
    console.log("cart item: ", currCartList[cartItemExistingIdx]);
    currCartList[cartItemExistingIdx].qty += Number(qtyValue);
  } else {
    const cartItem = {
      prodId: productId,
      name,
      image: thumbnail,
      price: newPrice,
      qty: qtyValue,
    };

    currCartList.push(cartItem);
  }

  const totalPrice = currCartList.reduce((acc, cartItem) => {
    return acc + cartItem.qty * cartItem.price;
  }, 0);

  const updatedCart = {
    cartList: currCartList,
    totalPrice: totalPrice,
  };

  console.log(updatedCart);

  // Up date UI here ???
  const { cartLength } = calcTotalAndLengthOfCart(currCartList);

  textContent("numberCartItems", cartLength);

  localStorage.setItem("cart", JSON.stringify(updatedCart));
};

export const getParams = (param) => {
  const url = new URL(location.href);
  return url.searchParams.get(param);
};

export const setParams = (key, value) => {
  const url = new URL(location.href);
  url.searchParams.set(key, value);
  history.pushState({}, "", url);
};

export const showByRange = (resultEl, _min = 0, _max = 1140) => {
  resultEl.innerHTML = `Theo giá từ: $${_min} -> $${_max}`;
  resultEl.classList.remove("hidden");
};

export const showByCate = async (resultEl, _cateIds) => {
  // <i class="fa-solid fa-check"></i> Oppo <i class="fa-solid fa-check"></i> Samsung

  // How to get cateName ?

  const cateIdList = _cateIds.split(",");
  const showResult = cateIdList.map(async (cateId) => {
    const {
      category: { name },
    } = await ShopApi.getCategoryById(cateId);

    return `
    <i class="fa-solid fa-check"></i> ${name}
    `;
  });

  resultEl.innerHTML = `
  Trong danh mục: ${(await Promise.all(showResult)).join(", ")}
  `;
  resultEl.classList.remove("hidden");
};

export const showBySort = (resultEl, sortValue) => {
  resultEl.innerHTML = `
  Lọc sản phẩm: <i class="fa-solid fa-filter-circle-xmark"></i> ${sortValue}
  `;
  resultEl.classList.remove("hidden");
};

// function update number cart

export const updateUICartNumber = () => {
  const cartList = JSON.parse(cart || [])?.cartList;
  const { cartLength } = calcTotalAndLengthOfCart(cartList);

  if (cart) {
    textContent("numberCartItems", cartLength);
  } else {
    textContent("numberCartItems", 0);
  }
};

export const updateUiTopUserAvatar = () => {};

export const updateViews = async (id) => {
  const viewsAtSessionStorage = JSON.parse(sessionStorage.getItem("views"));

  let alreadyViewed = id in viewsAtSessionStorage;

  if (alreadyViewed) return;

  // Set it to view session storage!
  viewsAtSessionStorage[id] = "viewed";
  sessionStorage.setItem("views", JSON.stringify(viewsAtSessionStorage));

  // Add it into database

  try {
    const response = await ShopApi.updateViews(id);
  } catch (error) {
    console.log(error);
  }
};
