import ProductsApi from "../../api/productsApi";
import CategoriesApi from "../../api/categoriesApi";
import { calcTotalAndLengthOfCart, listCartHandler, textContent } from "../../utils/helper";
import { BACKEND_URL } from "../../constant/backend-domain";

let checkout = document.getElementById("checkout");
let checdiv = document.getElementById("chec-div");
let flag3 = false;

const checkoutHandler = () => {
  if (!flag3) {
    checkout.classList.add("translate-x-full");
    checkout.classList.remove("translate-x-0");
    setTimeout(function () {
      checdiv.classList.add("hidden");
    }, 1000);
    flag3 = true;
  } else {
    setTimeout(function () {
      checkout.classList.remove("translate-x-full");
      checkout.classList.add("translate-x-0");
    }, 1000);
    checdiv.classList.remove("hidden");
    flag3 = false;
  }
};

const viewCartEl = document.getElementById("view-cart");

const updateUiViewCart = (cartList) => {
  // Calculate cart Item and number of items in cart!.
  const { totalPrice, cartLength } = calcTotalAndLengthOfCart(cartList);

  textContent("cartQty", cartLength);
  textContent("summaryTotal", `$${totalPrice.toFixed(2)}`);
  textContent("totalCost", `$${totalPrice.toFixed(2)}`);
};

const renderCart = async () => {
  const cart = JSON.parse(localStorage.getItem("cart"));

  const cartList = cart.cartList;

  await listCartHandler(cartList, viewCartEl, insertCart);

  // Calculate cart Item and number of items in cart!.
  const { totalPrice, cartLength } = calcTotalAndLengthOfCart(cartList);

  textContent("cartQty", cartLength);
  textContent("summaryTotal", `$${totalPrice.toFixed(2)}`);
  textContent("totalCost", `$${totalPrice.toFixed(2)}`);

  //   if (!viewCartEl) return;
  //   let sum = 0;
  //   cartList.forEach(async (cartItem) => {
  //     const { prodId, qty } = cartItem;
  //     const {
  //       product: { oldPrice, discount, name, thumbnail, categoryId },
  //     } = await ProductsApi.getById(prodId);

  //     const {
  //       category: { name: cateName },
  //     } = await CategoriesApi.getById(categoryId);

  //     // console.log("qty: ", qty);
  //     // console.log("id: ", prodId);
  //     // console.log("oldPrice: ", oldPrice);
  //     // console.log("discount: ", discount);
  //     // console.log("name: ", name);
  //     // console.log("thumbnail: ", thumbnail);
  //     const price = oldPrice * (1 - discount / 100);
  //     sum += qty * price;
  //     console.log("sum: ", sum);
  //     const totalItem = price * qty;
  //     const cartItemHtml = `
  //     <div class="flex items-center hover:bg-gray-100 -mx-8 px-6 py-3">
  //         <div class="flex w-2/5">
  //             <div class="w-20">
  //                 <img class="h-24"
  //                     src="${BACKEND_URL}/${thumbnail}" alt="${name}">
  //             </div>
  //             <div class="flex flex-col justify-between ml-4 flex-grow">
  //                 <span class="font-bold text-sm">${name}</span>
  //                 <span class="text-red-500 text-xs">${cateName}</span>
  //                 <a href="#"
  //                     class="font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
  //             </div>
  //         </div>
  //         <div class="flex justify-center w-1/5">
  //             <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
  //                 <path
  //                     d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
  //             </svg>

  //             <input class="mx-2 border text-center w-12" type="text" value="${qty}">

  //             <svg class="fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
  //                 <path
  //                     d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
  //             </svg>
  //         </div>
  //         <span class="text-center w-1/5 font-semibold text-sm">${price}</span>
  //         <span class="text-center w-1/5 font-semibold text-sm">$${totalItem}</span>
  //     </div>
  //     `;
  //     // Calculate sum here!!!;

  //     viewCartEl.insertAdjacentHTML("beforeend", cartItemHtml);
  //   });

  const continueShopEl = `
    <a  href="./shop.html" class="flex font-semibold text-indigo-600 text-sm my-5">

    <svg class="fill-current mr-2 text-indigo-600 w-4" viewBox="0 0 448 512">
        <path
            d="M134.059 296H436c6.627 0 12-5.373 12-12v-56c0-6.627-5.373-12-12-12H134.059v-46.059c0-21.382-25.851-32.09-40.971-16.971L7.029 239.029c-9.373 9.373-9.373 24.569 0 33.941l86.059 86.059c15.119 15.119 40.971 4.411 40.971-16.971V296z" />
    </svg>
    Continue Shopping
    </a>
  `;

  viewCartEl.insertAdjacentHTML("beforeend", continueShopEl);
};

const insertCart = (prodId, name, thumbnail, cateName, qty, price, totalItem) => {
  const cartItemHtml = `
    <div prod-id=${prodId} class="cart-row flex items-center hover:bg-gray-100 -mx-8 px-6 py-3">
        <div class="flex w-2/5">
            <div class="w-20">
                <img class="h-24"
                    src="${BACKEND_URL}/${thumbnail}" alt="${name}">
            </div>
            <div class="flex flex-col justify-between ml-4 flex-grow">
                <a href="./detail-product.html?id=${prodId}" class="font-bold text-sm">${name}</a>
                <span class="text-red-500 text-xs">${cateName}</span>
                <a href="#"
                    class="remove-link font-semibold hover:text-red-500 text-gray-500 text-xs">Remove</a>
            </div>
        </div>
        <div class="flex justify-center w-1/5">
            <svg class="descrease-btn fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
                <path class="descrease-btn"
                    d="M416 208H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h384c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>

            <input class="cart-qty mx-2 border text-center w-12" type="text" value="${qty}">

            <svg class="increase-btn fill-current text-gray-600 w-3 cursor-pointer" viewBox="0 0 448 512">
                <path class="increase-btn"
                    d="M416 208H272V64c0-17.67-14.33-32-32-32h-32c-17.67 0-32 14.33-32 32v144H32c-17.67 0-32 14.33-32 32v32c0 17.67 14.33 32 32 32h144v144c0 17.67 14.33 32 32 32h32c17.67 0 32-14.33 32-32V304h144c17.67 0 32-14.33 32-32v-32c0-17.67-14.33-32-32-32z" />
            </svg>
        </div>
        <span class="text-center w-1/5 font-semibold text-sm">$<span class="price-item">${price}</span> </span>
        <span class="text-center w-1/5 font-semibold text-sm">$<span class="total-item">${totalItem}</span></span>
    </div>
    `;

  return cartItemHtml;
};

const removeCart = () => {
  viewCartEl.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("remove-link")) {
      e.preventDefault();

      const cartRow = e.target.closest(".cart-row");
      const prodId = cartRow.getAttribute("prod-id");

      // Remove out of DOM
      cartRow.remove();

      // Remove out of localstorage

      const currentCartList = JSON.parse(localStorage.getItem("cart")).cartList;

      const updatedCartList = currentCartList.filter((cartItem) => cartItem.prodId !== prodId);

      const updatedCart = {
        cartList: updatedCartList,
      };

      // Update Top UI number of cart items
      const { cartLength } = calcTotalAndLengthOfCart(updatedCartList);
      textContent("numberCartItems", cartLength);
      // Update Cart view ui

      updateUiViewCart(updatedCartList);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
    }
  });
};

const updateLocalStorageCart = (currProdId, newQty) => {
  const { cartList } = JSON.parse(localStorage.getItem("cart"));

  const updatedCartList = [...cartList];

  const cartItemIndex = updatedCartList.findIndex((cartItem) => cartItem.prodId === currProdId);

  updatedCartList[cartItemIndex].qty = newQty;

  const updatedCart = {
    cartList: updatedCartList,
  };

  localStorage.setItem("cart", JSON.stringify(updatedCart));

  return updatedCart;
};

const updateCart = () => {
  viewCartEl.addEventListener("click", (e) => {
    const cartRow = e.target.closest(".cart-row");
    const currQtyEl = cartRow.querySelector(".cart-qty");
    const currQty = +cartRow.querySelector(".cart-qty").value;
    const priceItem = cartRow.querySelector(".price-item");
    const priceItemVal = +cartRow.querySelector(".price-item").textContent;
    const totalItem = cartRow.querySelector(".total-item");
    const totalItemVal = +cartRow.querySelector(".total-item").textContent;
    const currProdId = cartRow.getAttribute("prod-id");

    // Increase quanity number of cart
    if (e.target && e.target.classList.contains("increase-btn")) {
      // const increaseBtn = e.target.closest(".increase-btn");
      // const descreaseBtn = e.target.closest(".descrease-btn");
      const newQty = currQty + 1;
      // Update qty at DOM
      currQtyEl.value = newQty;

      // update qty at local storage
      const updatedCart = updateLocalStorageCart(currProdId, newQty);
      // Update total item price at DOM
      const currTotalItemVal = priceItemVal * newQty;
      totalItem.textContent = currTotalItemVal.toFixed(2);

      updateUiViewCart(updatedCart.cartList);
    }

    // Descrease quantity number of cart
    if (e.target && e.target.classList.contains("descrease-btn")) {
      // Handle error
      if (currQty <= 1) return;
      const newQty = currQty - 1;

      // Update qty at DOM
      currQtyEl.value = newQty;

      // Update at local storage
      const updatedCart = updateLocalStorageCart(currProdId, newQty);

      // Update total item price at DOM

      const currTotalItemVal = priceItemVal * newQty;
      totalItem.textContent = currTotalItemVal.toFixed(2);

      updateUiViewCart(updatedCart.cartList);
    }
  });
};

const handleCheckout = async () => {
  const checkoutBtn = document.getElementById("checkoutBtn");
  if (!checkoutBtn) return;

  checkoutBtn.addEventListener("click", () => {});
};

(async () => {
  await renderCart();
  await handleCheckout();
  removeCart();
  updateCart();
})();
