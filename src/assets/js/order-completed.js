import ProductsApi from "../../api/productsApi";
import ShopApi from "../../api/shopApi";
import { BACKEND_URL } from "../../constant/backend-domain";
import { imageContent, listCartHandler, textContent } from "../../utils/helper";

const viewCartEl = document.getElementById("view-history-cart");
const url = new URL(location.href);
const params = url.searchParams;
const orderId = params.get("id");

const renderHistoryOrder = async () => {
  const {
    order: {
      user: { fullName, email, phone, shippingAddress },
      products: { items, totalPrice },
      createdAt,
    },
    message,
  } = await ShopApi.getOrderById(orderId);

  const allTotal = (totalPrice + 8).toFixed(2);

  textContent("orderId", `#${orderId}`);
  textContent("orderCreatedAt", `${createdAt}`);
  textContent("subtotal", `$${totalPrice.toFixed(2)}`);
  textContent("discount", `0`);
  textContent("allTotal", `$${allTotal}`);

  //   Customer info
  textContent("customerName", `${fullName}`);
  textContent("shippingAddress", `${shippingAddress}`);
  textContent("email", `${email}`);
  textContent("phone", `${phone}`);

  imageContent("customerAvatar", `${BACKEND_URL}/images/user-avatar.jpg`);

  const cartList = items;

  viewCartEl.innerHTML = "";
  listCartHandler(cartList, viewCartEl, insertCart);
};

const insertCart = (prodId, name, thumbnail, cateName, qty, price, totalItem) => {
  const cartItemHtml = `
        <div prod-id=${prodId}
        class="mt-4 md:mt-6 flex flex-col md:flex-row justify-start items-start md:items-center md:space-x-6 xl:space-x-8 w-full">
        <div class="pb-4 md:pb-8 w-10 md:w-40 ">
            <img class="w-28 hidden md:block" src="${BACKEND_URL}/${thumbnail}"
                alt="${name}" />
            <img class="w-full md:hidden" src="${BACKEND_URL}/${thumbnail}"
                alt="${name}" />
        </div>
        <div
            class="border-b border-gray-200 md:flex-row flex-col flex justify-between items-start w-full pb-8 space-y-4 md:space-y-0">
            <div class="w-full flex flex-col justify-start items-start space-y-8">
                <h3
                    class="text-xl dark:text-white xl:text-2xl font-semibold leading-6 text-gray-800">
                    ${name}</h3>
                <div class="flex justify-start items-start flex-col space-y-2">
                    <p class="text-sm dark:text-white leading-none text-gray-800"><span
                            class="dark:text-gray-400 text-gray-300">Brand: </span>
                        ${cateName}</p>
                </div>
            </div>
            <div class="flex justify-between space-x-8 items-start w-full">
                <p class="text-base dark:text-white xl:text-lg leading-6">$${price} </p>
                <p class="text-base dark:text-white xl:text-lg leading-6 text-gray-800">${qty} <span class="italic font-normal text-gray-500">(item)</span></p>
                <p
                    class="text-base dark:text-white xl:text-lg font-semibold leading-6 text-gray-800">
                    $${totalItem}</p>
            </div>
        </div>
        </div>
      `;

  return cartItemHtml;
};

(async () => {
  await renderHistoryOrder();
})();
