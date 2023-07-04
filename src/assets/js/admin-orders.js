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
};

(async () => {
  await renderOrderList();
  await viewOrderDetail();
  await updateOrder();
  await deleteOrder();
})();
