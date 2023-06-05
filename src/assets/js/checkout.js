import GhnApi from "../../api/ghnApi";
import ProductsApi from "../../api/productsApi";
import ShopApi from "../../api/shopApi";
import { BACKEND_URL } from "../../constant/backend-domain";
import {
  calcTotalAndLengthOfCart,
  inputValue,
  listCartHandler,
  textContent,
} from "../../utils/helper";

// Initialization for ES Users
import { Select, initTE } from "tw-elements";
initTE({ Select });

const cart = JSON.parse(localStorage.getItem("cart"));
const userId = localStorage.getItem("userId");

const selectProvinceEl = document.getElementById("selectProvince");
const selectDistrictEl = document.getElementById("selectDistrict");
const selectWardEl = document.getElementById("selectWard");
const cartList = cart.cartList;
const defaultShippingEl = document.querySelector(".default-shipping-el");
const defaultShippingInput = document.querySelector(".default-shipping-input");
const newShippingAddressRadioInput = document.getElementById("radioDefault02");
const defaultShippingAddressRadioInput = document.getElementById("radioDefault01");
const viewCartEl = document.getElementById("view-cart");
const newShippingAddressEl = document.querySelector(".new-shipping-el");
const newShippingSelectAddressEl = document.querySelector(".new-shipping-address-select-el");

const checkoutMethod1 = document.getElementById("checkoutMethod1");
const checkoutMethod2 = document.getElementById("checkoutMethod2");

const renderOrder = async () => {
  viewCartEl.innerHTML = "";
  listCartHandler(cartList, viewCartEl, insertCart);

  const { totalPrice, cartLength } = calcTotalAndLengthOfCart(cartList);

  const allTotal = totalPrice + 8;

  textContent("subtotal", `$${totalPrice.toFixed(2)}`);
  textContent("allTotal", `$${allTotal.toFixed(2)}`);

  if (!userId) {
    newShippingAddressRadioInput.checked = true;
    return;
  }

  defaultShippingEl.classList.remove("hidden");
  defaultShippingInput.classList.remove("hidden");

  // newShippingAddressEl.classList.add("hidden");
  newShippingSelectAddressEl.classList.add("hidden");

  const { user, message } = await ShopApi.getUserById(userId);
  const { email, name, payment, address, phone } = user;

  inputValue("email", email);
  inputValue("fullName", name);
  inputValue("phone", phone);
  inputValue("default-shipping-input", address);
};

const insertCart = (prodId, name, thumbnail, cateName, qty, price, totalItem) => {
  const cartItemHtml = `
        <div prod-id=${prodId} class="flex flex-col rounded-lg bg-white sm:flex-row">
            <img class="m-2 h-24 w-28 rounded-md border object-cover object-center"
                src="${BACKEND_URL}/${thumbnail}"
                alt="${name}" />
            <div class="flex w-full flex-col px-4 py-4">
                <span class="font-semibold">${name}</span>
                <span class="float-right text-gray-400">Qty: ${qty}, Price/item: $${price}</span>
                <p class="text-lg font-bold">Total item: $${totalItem}</p>
            </div>
        </div>
      `;

  return cartItemHtml;
};

const createOrder = async () => {
  const orderFormEl = document.getElementById("order-form");

  if (!orderFormEl) return;

  orderFormEl.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("submited!");

    const currFormEles = e.target.elements;

    const inputSelectShippings = document.querySelectorAll("input[data-te-select-input-ref]");

    let addressShipping = "";

    if (newShippingAddressRadioInput.checked) {
      // addressShipping =
      addressShipping = [...inputSelectShippings].map((input) => input.value).join(", ");
    } else if (defaultShippingAddressRadioInput.checked) {
      addressShipping = defaultShippingInput.value;
    }

    const email = currFormEles["email"].value;
    const fullName = currFormEles["fullName"].value;
    const phone = currFormEles["phone"].value;
    const note = currFormEles["note"].value;

    let paymentMethod = "COD"; // Default --- Fix here later

    if (checkoutMethod1.checked) {
      paymentMethod = "COD";
    } else if (checkoutMethod2.checked) {
      paymentMethod = "VNPAY";
    }

    const user = {
      email,
      fullName,
      phone,
      shippingAddress: addressShipping,
    };

    const cart = JSON.parse(localStorage.getItem("cart"));
    const products = {
      items: [],
      totalPrice: 0,
    };

    const promisesProducts = cart.cartList.map(async (cartItem) => {
      const { prodId, qty } = cartItem;
      try {
        const {
          product: { name, oldPrice, discount, thumbnail },
        } = await ProductsApi.getById(prodId);

        const productItem = {};
        productItem.prodId = prodId;
        productItem.qty = qty;
        productItem.name = name;
        productItem.price = oldPrice * (1 - discount / 100);
        productItem.image = thumbnail;
        // products.items.push(productItem);
        return productItem;
      } catch (error) {
        console.log(error);
      }
    });

    products.totalPrice = cart.cartList.reduce((acc, cartItem) => {
      return acc + cartItem.qty * cartItem.price;
    }, 0);

    // Using Promise.all to resolve concerruntly promises
    const productsList = await Promise.all(promisesProducts);
    products.items = productsList;
    const order = {
      paymentMethod,
      note,
      user,
      products,
    };

    const response = await ShopApi.createOrder(order);

    const {
      message,
      order: { _id },
    } = response;

    // Store order at session storage
    // sessionStorage.setItem("order", JSON.stringify(orderCreated));
    // Clear cart
    localStorage.removeItem("cart");

    // Minus stockQty at databasae

    location.assign(`./order-completed.html?id=${_id}`);
  });
};

(async () => {
  await renderOrder();
  await createOrder();

  const { code, data: provinces } = await GhnApi.getProvinces();

  for (const province of provinces) {
    const { ProvinceID, ProvinceName } = province;
    const optionItem = `<option value="${ProvinceID}">${ProvinceName}</option>`;

    selectProvinceEl.insertAdjacentHTML("beforeend", optionItem);
  }

  // Generate shipping adress
  selectProvinceEl.addEventListener("valueChange.te.select", async (e) => {
    const ProvinceID = e.target.value;

    const { data: districts, code } = await GhnApi.getDistricts({
      province_id: +ProvinceID,
    });

    for (const district of districts) {
      const { DistrictID, DistrictName } = district;

      const option = `<option value=${DistrictID}>${DistrictName}</option>`;

      selectDistrictEl.insertAdjacentHTML("beforeend", option);
    }

    selectDistrictEl.addEventListener("valueChange.te.select", async (e) => {
      const DistrictID = e.target.value;

      const { code, data: wards } = await GhnApi.getWards(DistrictID);

      for (const ward of wards) {
        const { WardID, WardName } = ward;
        const option = `<option value=${WardID}>${WardName}`;

        selectWardEl.insertAdjacentHTML("beforeend", option);
      }
    });
  });

  // Select options input address

  const inputRadios = document.querySelectorAll("input[name='shippingRadioInput']");

  for (const radioEl of inputRadios) {
    radioEl.addEventListener("click", (e) => {
      if (e.target.checked) {
        console.log("Oke", e.target.id);

        if (e.target.id === "radioDefault01") {
          // newShippingAddressEl.classList.add("hidden");
          newShippingSelectAddressEl.classList.add("hidden");
          defaultShippingInput.classList.remove("hidden");
        } else if (e.target.id === "radioDefault02") {
          // defaultShippingEl.classList.add("hidden");

          defaultShippingInput.classList.add("hidden");

          newShippingSelectAddressEl.classList.remove("hidden");
        }
      }
    });
  }
})();
