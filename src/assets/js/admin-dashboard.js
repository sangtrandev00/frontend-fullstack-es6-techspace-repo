import OrdersApi from "../../api/ordersApi";
import ProductsApi from "../../api/productsApi";
import UsersApi from "../../api/usersApi";
import { innerHTML, showToast, textContent } from "../../utils/helper";
import Chart from "chart.js/auto";
import DataTable from "datatables.net-dt";
// import { updateOrder, viewOrderDetail } from "./admin-orders";

const totalProdsEl = document.getElementById("totalProducts");

const totalViewsEl = document.getElementById("totalViews");

const totalUsersEl = document.getElementById("totalUsers");

const totalSaleEl = document.getElementById("totalSale");

const tableOrders = document.getElementById("table-orders");
const [tableBody] = tableOrders.tBodies;
const viewDetailCart = document.getElementById("view-detail-cart");
const displayOrderEl = document.getElementById("display-order");
const updateOrderBtn = document.getElementById("updateOrderBtn");
const viewOrderDetailBtn = document.getElementById("viewOrderDetailBtn");
const deleteOrderBtnTrigger = document.getElementById("deleteOrderBtnTrigger");

const ordersStatusTriggerBtn = document.getElementById("ordersStatusTriggerBtn");

const ctx = document.getElementById("myChart");
let tableOrdersGlobal;
let myChart;

const createChartByYear = (ordersSuccess, selectedYear) => {
  const selectedOrders = ordersSuccess.filter((order) => {
    const yearOfOrder = new Date(order.createdAt).getFullYear();

    return selectedYear === yearOfOrder;
  });

  const monthLabels = [];
  const summarizedData = [];

  for (let i = 1; i <= 12; i++) {
    const currTotalSaleMonth = selectedOrders
      .filter((order) => {
        const createdAtMonth = new Date(order.createdAt).getMonth() + 1;
        return i === createdAtMonth;
      })
      .reduce((acc, order) => {
        return acc + order.products.totalPrice + order.vatFee + order.shippingFee;
      }, 0);

    monthLabels.push("Month " + i);
    summarizedData.push(currTotalSaleMonth);
  }

  if (myChart) {
    myChart.destroy();
  }

  myChart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: monthLabels,
      datasets: [
        {
          label: `Our sale in ${selectedYear}`,
          data: summarizedData,
          borderWidth: 1,
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(255, 159, 64, 0.2)",
            "rgba(255, 205, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(201, 203, 207, 0.2)",
            "rgba(210,105,30, 0.2)",
            "rgba	(112,128,144, 0.2)",
            "rgba(0,128,128, 0.2)",
            "rgba(46,139,87, 0.2)",
            "rgba(138,43,226, 0.2)",
          ],
          borderColor: [
            "rgb(255, 99, 132)",
            "rgb(255, 159, 64)",
            "rgb(255, 205, 86)",
            "rgb(75, 192, 192)",
            "rgb(54, 162, 235)",
            "rgb(153, 102, 255)",
            "rgb(201, 203, 207)",
            "rgb(210,105,30)",
            "rgb(112,128,144)",
            "rgb(0,128,128)",
            "rgb(46,139,87)",
            "rgb(138,43,226)",
          ],
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  });
};

// await renderOrderList();
const renderOrdersByStatus = (selectedOrders) => {
  try {
    tableBody.innerHTML = "";
    const tableRows = selectedOrders.map((order) => {
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

      let actionBtnHtml = ``;

      switch (status) {
        case "Waiting to Confirm":
        case "confirmed":
        case "shipping":
          actionBtnHtml = `
          <div class="flex space-x-2 w-30 h-full py-2 px-2">
            <button class="update-modal-trigger" order-id="${_id}" type="button">
              <i class="update-modal-trigger fa-regular fa-circle-check text-green-500"></i>
                Confirm
            </button>
          </div>
          `;
          break;
        case "success":
          actionBtnHtml = `
          <div class="flex space-x-2 w-30 h-full py-2 px-2">
            <button class="update-modal-trigger" order-id="${_id}" type="button">
              <i class="update-modal-trigger fa-regular fa-circle-check text-warning-500"></i>
                UnConfirm
            </button>
          </div>
          `;
          break;
        case "failed":
          actionBtnHtml = `
          <div class="flex space-x-2 w-30 h-full py-2 px-2">
            <button class="update-modal-trigger" order-id="${_id}" type="button">
              <i class="update-modal-trigger fa-regular fa-circle-check text-success-500"></i>
                ReOrder
            </button>
          </div>
          `;
          break;

        default:
          break;
      }

      return [
        _id,
        fullName,
        totalPrice.toFixed(2),
        status,
        paymentMethod,
        createdAt,
        cartLength,
        actionBtnHtml,
      ];
    });

    if (tableOrdersGlobal) {
      tableOrdersGlobal.destroy();
    }

    tableOrdersGlobal = new DataTable("#table-orders", {
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

const updateOrder = async () => {
  displayOrderEl.addEventListener("click", async (e) => {
    if (e.target && e.target.classList.contains("update-modal-trigger")) {
      const orderId = e.target.closest("button").getAttribute("order-id");

      try {
        const { order, message } = await OrdersApi.getById(orderId);

        const {
          user: { fullName, email },
          status,
          _id,
        } = order;

        e.preventDefault();

        let updatedOrderStatus;

        switch (status) {
          case "Waiting to Confirm":
            updatedOrderStatus = "confirmed";
            break;
          case "confirmed":
            updatedOrderStatus = "shipping";
            break;
          case "shipping":
            updatedOrderStatus = "success";
            break;
          case "success":
            updatedOrderStatus = "failed";
            break;
          case "failed":
            updatedOrderStatus = "confirmed";
            break;

          default:
            break;
        }

        const response = await OrdersApi.updateOrderStatus({ status: updatedOrderStatus }, _id);

        if (response.order) {
          // await renderOrderList();

          // Reload page automatically (alternative way to re update!!!! --> fixed later);

          // location.reload();
          showToast(
            "toast-success-el",
            `Order ${orderId} has updated`,
            "1 minutes",
            response.message
          );

          setTimeout(() => {
            location.reload();
          }, 2500);

          ordersStatusTriggerBtn.click();
        }
      } catch (error) {
        console.log(error);
      }
    }
  });

  return;
};

(async () => {
  const { products } = await ProductsApi.getAll({});

  const { users } = await UsersApi.getAll();

  const { orders } = await OrdersApi.getAll();

  const ordersSuccess = orders.filter((order) => order.status === "success");

  const unconfirmedOrders = orders.filter((order) => order.status === "Waiting to Confirm");
  const confirmedOrders = orders.filter((order) => order.status === "confirmed");
  const shippingOrders = orders.filter((order) => order.status === "shipping");
  const failedOrders = orders.filter((order) => order.status === "failed");

  const totalSales = ordersSuccess.reduce(
    (acc, order) => acc + order.products.totalPrice + order.vatFee + order.shippingFee,
    // acc + orderItem.products.totalPrice + orderItem.vatFee + orderItem.shippingFee;
    0
  );

  console.log("success: ", ordersSuccess);
  console.log("sales: ", totalSales);

  const totalViews = products.reduce((acc, product) => acc + product.views, 0);

  textContent("totalProducts", products.length);
  textContent("totalUsers", users.length);
  textContent("totalSale", `$${totalSales.toFixed(2)} `);
  textContent("totalViews", totalViews);
  innerHTML(
    "unconfirmedOrders",
    `${unconfirmedOrders.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );
  innerHTML(
    "confirmedOrders",
    `${confirmedOrders.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );
  innerHTML(
    "shippingOrders",
    `${shippingOrders.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );
  innerHTML(
    "successOrders",
    `${ordersSuccess.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );
  innerHTML(
    "failedOrders",
    `${failedOrders.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );
  // Create a bar chart
  createChartByYear(ordersSuccess, 2023);

  document.getElementById("selectYear").addEventListener("change", (e) => {
    const selectedYear = +e.target.value;
    createChartByYear(ordersSuccess, selectedYear);
  });

  document.getElementById("orders-status-el").addEventListener("click", (e) => {
    e.preventDefault();
    // Unconfirmed
    if (e.target && e.target.id === "unconfirmedOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(unconfirmedOrders);
    }
    // Confirmed
    if (e.target && e.target.id === "confirmedOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(confirmedOrders);
    }
    // Shipping
    if (e.target && e.target.id === "shippingOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(shippingOrders);
    }
    // Success

    if (e.target && e.target.id === "successOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(ordersSuccess);
    }

    // Failed
    if (e.target && e.target.id === "failedOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(failedOrders);
    }
  });

  await updateOrder();
})();

// await updateOrder();
// await deleteOrder();
// await viewOrderDetail();
