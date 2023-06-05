import OrdersApi from "../../api/ordersApi";
import { BACKEND_URL } from "../../constant/backend-domain";
import { listCartHandler, showToast, textContent } from "../../utils/helper";
import DataTable from "datatables.net-dt";
const tableOrders = document.getElementById("table-orders");
const [tableBody] = tableOrders.tBodies;
const viewDetailCart = document.getElementById("view-detail-cart");
const displayOrderEl = document.getElementById("display-order");
const updateOrderBtn = document.getElementById("updateOrderBtn");
const viewOrderDetailBtn = document.getElementById("viewOrderDetailBtn");
const deleteOrderBtnTrigger = document.getElementById("deleteOrderBtnTrigger");

const renderOrderList = async () => {
  try {
    const { orders } = await OrdersApi.getAll();
    tableBody.innerHTML = "";
    const tableRows = orders.map((order) => {
      const {
        _id,
        shippingFee,
        vatFee,
        paymentMethod,
        status,
        user: { fullName, email, phone, shippingAddress },
        products: { items, totalPrice },
        createdAt,
        updatedAt,
      } = order;

      const cartLength = items.reduce((acc, item) => acc + item.qty, 0);

      return [
        _id,
        fullName,
        totalPrice.toFixed(2),
        status,
        paymentMethod,
        createdAt,
        cartLength,
        `
        <div class="flex space-x-2 w-30 h-full py-2 px-2">
          <button class="update-modal-trigger" order-id="${_id}" type="button">
            <i class="update-modal-trigger fa-solid fa-pen-to-square text-primary-700"></i>
            Update
          </button>
          <button class="view-detail-modal-trigger" order-id="${_id}" type="button">
          <i class="view-detail-modal-trigger fa-regular fa-eye text-secondary-700"></i>
            View
          </button>
          <button class="delete-modal-trigger" order-id="${_id}" type="button">
            <i class="delete-modal-trigger fa-solid fa-delete-left text-red-600"></i>
            Delete
          </button>
         
        </div>
        
        `,
      ];

      const tableRow = `
      <tr class="border-b dark:border-gray-700">
        <th scope="row"
            class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
            ${_id}</th>
        <td class="px-4 py-3">${fullName}</td>
        <td class="px-4 py-3">${totalPrice.toFixed(2)}</td>
        <td class="px-4 py-3 max-w-[12rem] truncate">${status}</td>
        <td class="px-4 py-3">${paymentMethod}</td>
        <td class="px-4 py-3">${createdAt}</td>
        <td class="px-4 py-3">${cartLength}</td>
        <td class="px-4 py-3 flex items-center justify-end">
            <button order-id=${_id} id="apple-imac-27-dropdown-button"
                data-dropdown-toggle="apple-imac-27-dropdown"
                class="dropdown-action-btn inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
                type="button">
                <svg class="w-5 h-5" aria-hidden="true" fill="currentColor"
                    viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
                </svg>
            </button>
            <div id="apple-imac-27-dropdown"
                class="hidden z-10 w-44 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
                <ul class="py-1 text-sm"
                    aria-labelledby="apple-imac-27-dropdown-button">
                    <li>
                        <button type="button" data-modal-target="updateOrderModal"
                            data-modal-toggle="updateOrderModal"
                            class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                            <svg class="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewbox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path
                                    d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
                            </svg>
                            Update Order
                        </button>
                    </li>
                    <li>
                        <button id="viewOrderDetailBtn" type="button" data-modal-target="readProductModal"
                            data-modal-toggle="readProductModal"
                            class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
                            <svg class="w-4 h-4 mr-2"
                                xmlns="http://www.w3.org/2000/svg"
                                viewbox="0 0 20 20" fill="currentColor"
                                aria-hidden="true">
                                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                            View Detail
                        </button>
                    </li>
                    <li>
                        <button type="button" data-modal-target="deleteModal"
                            data-modal-toggle="deleteModal"
                            class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
                            <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15"
                                fill="none" xmlns="http://www.w3.org/2000/svg"
                                aria-hidden="true">
                                <path fill-rule="evenodd" clip-rule="evenodd"
                                    fill="currentColor"
                                    d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
                            </svg>
                            Delete
                        </button>
                    </li>
                </ul>
            </div>
        </td>
    </tr>
              `;

      tableBody.insertAdjacentHTML("beforeend", tableRow);
    });

    new DataTable("#table-orders", {
      data: tableRows,
      columns: [
        { title: "#ID" },
        { title: "Customer" },
        { title: "Total($)" },
        { title: "Status" },
        { title: "Payment method" },
        { title: "Date order" },
        { title: "Qty (items)" },
        { title: "Action" },
      ],
      responsive: true,
    });
  } catch (error) {
    console.log(error);
  }
};

export const viewOrderDetail = async () => {
  displayOrderEl.addEventListener("click", async (e) => {
    if (e.target && e.target.classList.contains("view-detail-modal-trigger")) {
      const orderId = e.target.closest("button").getAttribute("order-id");

      viewOrderDetailBtn.click();

      try {
        const { order, message } = await OrdersApi.getById(orderId);

        const {
          _id,
          products: { items, totalPrice },
          user: { phone, shippingAddress, email, fullName },
          shippingFee,
          createdAt,
          status,
        } = order;

        const allTotal = (totalPrice + shippingFee).toFixed(2);

        viewDetailCart.innerHTML = "";

        listCartHandler(items, viewDetailCart, insertCart);

        textContent("orderId", _id);
        textContent("createdAt", createdAt);
        textContent("phone", phone);
        textContent("email", email);
        textContent("fullName", fullName);
        textContent("status", status);
        textContent("shippingAddress", shippingAddress);
        // textContent('discountPercent', discount);
        // textContent('discountMoney', phone);
        textContent("shippingFee", `$${shippingFee}`);
        textContent("subtotal", `$${totalPrice.toFixed(2)}`);
        textContent("allTotal", `$${allTotal}`);
      } catch (error) {
        console.log(error);
      }
    }
  });
  const dropdownActionBtns = document.querySelectorAll(".dropdown-action-btn");

  [...dropdownActionBtns].forEach((actionBtn) => {
    actionBtn.addEventListener("click", async (e) => {
      const orderId = e.currentTarget.getAttribute("order-id");

      const viewOrderDetailBtn = document.getElementById("viewOrderDetailBtn");
      if (!viewOrderDetailBtn) return;

      viewOrderDetailBtn.addEventListener("click", (e) => {});

      const { order, message } = await OrdersApi.getById(orderId);

      const {
        _id,
        products: { items, totalPrice },
        user: { phone, shippingAddress, email, fullName },
        shippingFee,
        createdAt,
        status,
      } = order;

      const allTotal = (totalPrice + shippingFee).toFixed(2);

      viewDetailCart.innerHTML = "";

      listCartHandler(items, viewDetailCart, insertCart);

      textContent("orderId", _id);
      textContent("createdAt", createdAt);
      textContent("phone", phone);
      textContent("email", email);
      textContent("fullName", fullName);
      textContent("status", status);
      textContent("shippingAddress", shippingAddress);
      // textContent('discountPercent', discount);
      // textContent('discountMoney', phone);
      textContent("shippingFee", `$${shippingFee}`);
      textContent("subtotal", `$${totalPrice.toFixed(2)}`);
      textContent("allTotal", `$${allTotal}`);
    });
  });
};

const insertCart = (prodId, name, thumbnail, cateName, qty, price, totalItem) => {
  const cartItemHtml = `
      <div
      prod-id = ${prodId}
      class="flex md:flex-row justify-start items-start md:items-center border border-gray-200 w-full">
      <div class="-m-px w-40 md:w-32">
          <img class="hidden md:block"
              src="${BACKEND_URL}/${thumbnail}"
              alt="${name}" />
          <img class="md:hidden"
              src="${BACKEND_URL}/${thumbnail}"
              alt="${name}" />
      </div>
      <div
          class="flex justify-start md:justify-between items-start md:items-center flex-col md:flex-row w-full p-4 md:px-8">
          <div
              class="flex flex-col md:flex-shrink-0 justify-start items-start">
              <h3
                  class="text-lg md:text-xl dark:text-white w-full font-semibold leading-6 md:leading-5 text-gray-800">
                  ${name}</h3>
              <div
                  class="flex flex-row justify-start space-x-4 md:space-x-6 items-start mt-4">
                  <p
                      class="text-sm leading-none dark:text-gray-300 text-gray-600">
                      Brand: <span class="text-gray-800 dark:text-white">
                          ${cateName}</span></p>
                  <p
                      class="text-sm leading-none dark:text-gray-300 text-gray-600">
                      Quantity: <span class="text-gray-800 dark:text-white">
                          ${qty}</span></p>
                  <p
                      class="text-sm leading-none dark:text-gray-300 text-gray-600">
                      Price/item: <span class="text-gray-800 dark:text-white">
                          $${price}</span></p>
            

              </div>
          </div>
          <div class="flex mt-4 md:mt-0 md:justify-end items-center w-full">
              <p
                  class="text-xl dark:text-white lg:text-2xl font-semibold leading-5 lg:leading-6 text-gray-800">
                  $${totalItem}</p>
          </div>
      </div>
    </div>
    `;

  return cartItemHtml;
};

export const deleteOrder = async () => {
  displayOrderEl.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-modal-trigger")) {
      deleteOrderBtnTrigger.click();
      const orderId = e.target.closest("button").getAttribute("order-id");
      const currDelRow = e.target.closest("tr");

      try {
        const deleteOrderBtn = document.getElementById("deleteOrderBtn");
        deleteOrderBtn.addEventListener("click", async (e) => {
          const { message } = await OrdersApi.delete(orderId);

          deleteOrderBtnTrigger.click();
          currDelRow?.remove();

          showToast("toast-danger-el", `Deleted Order #${orderId}`, "1 minutes", message);

          setTimeout(() => {
            location.reload();
          }, 2000);
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
  return;
  const dropdownActionBtns = document.querySelectorAll(".dropdown-action-btn");

  [...dropdownActionBtns].forEach((actionBtn) => {
    actionBtn.addEventListener("click", async (e) => {
      const orderId = e.currentTarget.getAttribute("order-id");
      console.log(orderId);

      const deleteOrderBtn = document.getElementById("deleteOrderBtn");
      deleteOrderBtn.addEventListener("click", async (e) => {
        const response = await OrdersApi.delete(orderId);
      });
    });
  });
};

const updateOrder = async () => {
  displayOrderEl.addEventListener("click", async (e) => {
    if (e.target && e.target.classList.contains("update-modal-trigger")) {
      updateOrderBtn.click();
      const orderId = e.target.closest("button").getAttribute("order-id");

      try {
        const { order, message } = await OrdersApi.getById(orderId);

        const {
          user: { fullName, email },
          status,
          _id,
        } = order;

        const updateOrderForm = document.getElementById("update-order-form");

        if (!updateOrderForm) return;

        const formEls = updateOrderForm.elements;

        formEls["name"].value = fullName;
        formEls["email"].value = email;
        formEls["currStatus"].value = status;
        textContent("orderFormId", _id);

        updateOrderForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const categorySelectEl = document.getElementById("category");
          console.log("Submitted update order status!!!");

          // console.log("categorySelectEl: ", e.target.elements["category"].value);

          const updatedOrderStatus = e.target.elements["category"].value;

          const response = await OrdersApi.updateOrderStatus({ status: updatedOrderStatus }, _id);

          console.log(response);

          if (response.order) {
            // await renderOrderList();

            // Reload page automatically (alternative way to re update!!!! --> fixed later);

            location.reload();
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  });

  return;

  const dropdownActionBtns = document.querySelectorAll(".dropdown-action-btn");
  [...dropdownActionBtns].forEach((actionBtn) => {
    actionBtn.addEventListener("click", async (e) => {
      const orderId = e.currentTarget.getAttribute("order-id");

      try {
        const { order, message } = await OrdersApi.getById(orderId);

        const {
          user: { fullName, email },
          status,
          _id,
        } = order;

        const updateOrderForm = document.getElementById("update-order-form");

        if (!updateOrderForm) return;

        const formEls = updateOrderForm.elements;

        formEls["name"].value = fullName;
        formEls["email"].value = email;
        formEls["currStatus"].value = status;
        textContent("orderFormId", _id);

        updateOrderForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const categorySelectEl = document.getElementById("category");
          console.log("Submitted update order status!!!");

          // console.log("categorySelectEl: ", e.target.elements["category"].value);

          const updatedOrderStatus = e.target.elements["category"].value;

          const response = await OrdersApi.updateOrderStatus({ status: updatedOrderStatus }, _id);

          console.log(response);

          if (response.order) {
            // await renderOrderList();

            // Reload page automatically (alternative way to re update!!!! --> fixed later);

            location.reload();
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
};

(async () => {
  await renderOrderList();
  await viewOrderDetail();
  await updateOrder();
  await deleteOrder();
})();
