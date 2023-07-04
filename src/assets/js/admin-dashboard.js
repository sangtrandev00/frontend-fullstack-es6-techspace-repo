import OrdersApi from "../../api/ordersApi";
import ProductsApi from "../../api/productsApi";
import UsersApi from "../../api/usersApi";
import { innerHTML, showToast, textContent } from "../../utils/helper";
import Chart from "chart.js/auto";
import DataTable from "datatables.net-dt";
// import { updateOrder, viewOrderDetail } from "./admin-orders";

const orderStatus1El = document.querySelector("a[href='#tabs-orders-status-1']");
const orderStatus2El = document.querySelector("a[href='#tabs-orders-status-2']");
const orderStatus3El = document.querySelector("a[href='#tabs-orders-status-3']");
const orderStatus4El = document.querySelector("a[href='#tabs-orders-status-4']");
const orderStatus5El = document.querySelector("a[href='#tabs-orders-status-5']");

const totalViewsEl = document.getElementById("totalViews");

const totalUsersEl = document.getElementById("totalUsers");

const totalSaleEl = document.getElementById("totalSale");

const tabsListEl = document.getElementById("tabs-list");

// const tableOrders = document.getElementById("table-orders");
// const [tableBody] = tableOrders?.tBodies;

const viewDetailCart = document.getElementById("view-detail-cart");
const displayOrderEl = document.getElementById("display-order");
const displayOrderModalEl = document.getElementById("display-orders-modal");
const updateOrderBtn = document.getElementById("updateOrderBtn");
const viewOrderDetailBtn = document.getElementById("viewOrderDetailBtn");
const deleteOrderBtnTrigger = document.getElementById("deleteOrderBtnTrigger");

const ordersStatusTriggerBtn = document.getElementById("ordersStatusTriggerBtn");

const ctx = document.getElementById("myChart");

let tableOrdersGlobal;

let myChart;

var tableElement1 = document.querySelector("#table-orders-status-1");
var tableElement2 = document.querySelector("#table-orders-status-2");
var tableElement3 = document.querySelector("#table-orders-status-3");
var tableElement4 = document.querySelector("#table-orders-status-4");
var tableElement5 = document.querySelector("#table-orders-status-5");

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
const renderOrdersByStatus = (selectedOrders, tableId) => {
  const tableOrders = document.getElementById(tableId);

  const [tableBody] = tableOrders.tBodies;

  // console.log("tableOrderEl: ", tableOrders);
  // console.log("tableOrderEl: ", tableBody);

  if (!tableBody) return;

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

    // if (tableOrdersGlobal) {
    //   tableOrdersGlobal.destroy();
    // }

    if (tableElement1.classList.contains("dataTable")) {
      // Destroy DataTable
      const dataTable = new DataTable(tableElement1);
      dataTable.destroy();
    }
    if (tableElement2.classList.contains("dataTable")) {
      // Destroy DataTable
      const dataTable = new DataTable(tableElement2);
      dataTable.destroy();
    }
    if (tableElement3.classList.contains("dataTable")) {
      // Destroy DataTable
      const dataTable = new DataTable(tableElement3);
      dataTable.destroy();
    }
    if (tableElement4.classList.contains("dataTable")) {
      // Destroy DataTable
      const dataTable = new DataTable(tableElement4);
      dataTable.destroy();
    }
    if (tableElement5.classList.contains("dataTable")) {
      // Destroy DataTable
      const dataTable = new DataTable(tableElement5);
      dataTable.destroy();
    }

    // console.log("data: ", tableRows);

    tableOrdersGlobal = new DataTable(`#${tableId}`, {
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

    console.log("tableOrdersGlobal", tableOrdersGlobal);
  } catch (error) {
    console.log(error);
  }
};

const updateOrder = async () => {
  displayOrderModalEl.addEventListener("click", async (e) => {
    // console.log("target clicked: ", e.target);

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
    "unconfirmed-qty-orders",
    `(${unconfirmedOrders.length} ) <i class="fa-solid fa-cart-shopping text-primary-600"></i>`
  );

  innerHTML(
    "confirmedOrders",
    `${confirmedOrders.length}<i class="fa-solid fa-magnifying-glass-plus"></i>`
  );

  innerHTML(
    "confirmed-qty-orders",
    `(${confirmedOrders.length} ) <i class="fa-solid fa-cart-shopping text-primary-600"></i>`
  );

  innerHTML(
    "shippingOrders",
    `${shippingOrders.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );

  innerHTML(
    "shipping-qty-orders",
    `(${shippingOrders.length} ) <i class="fa-solid fa-cart-shopping text-primary-600"></i>`
  );
  innerHTML(
    "successOrders",
    `${ordersSuccess.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );
  innerHTML(
    "success-qty-orders",
    `(${ordersSuccess.length} ) <i class="fa-solid fa-cart-shopping text-primary-600"></i>`
  );
  innerHTML(
    "failedOrders",
    `${failedOrders.length} <i class="fa-solid fa-magnifying-glass-plus"></i>`
  );
  innerHTML(
    "failed-qty-orders",
    `(${failedOrders.length} ) <i class="fa-solid fa-cart-shopping text-primary-600"></i>`
  );

  // Create a bar chart
  createChartByYear(ordersSuccess, 2023);

  document.getElementById("selectYear").addEventListener("change", (e) => {
    const selectedYear = +e.target.value;
    createChartByYear(ordersSuccess, selectedYear);
  });

  document.getElementById("orders-status-el").addEventListener("click", async (e) => {
    e.preventDefault();
    // Unconfirmed
    if (e.target && e.target.id === "unconfirmedOrders") {
      ordersStatusTriggerBtn.click();
      // orderStatus1El.click();
      renderOrdersByStatus(unconfirmedOrders, "table-orders-status-1");
    }

    // Confirmed
    if (e.target && e.target.id === "confirmedOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(confirmedOrders, "table-orders-status-2");
      orderStatus2El.click();
    }

    // Shipping
    if (e.target && e.target.id === "shippingOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(shippingOrders, "table-orders-status-3");

      orderStatus3El.click();
    }

    // Success
    if (e.target && e.target.id === "successOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(ordersSuccess, "table-orders-status-4");

      orderStatus4El.click();
    }

    // Failed
    if (e.target && e.target.id === "failedOrders") {
      ordersStatusTriggerBtn.click();

      renderOrdersByStatus(failedOrders, "table-orders-status-5");

      orderStatus5El.click();
    }

    await updateOrder();
  });

  // renderOrdersByStatus(unconfirmedOrders, "table-orders-status-1");
  // renderOrdersByStatus(confirmedOrders, "table-orders-status-2");
  // renderOrdersByStatus(shippingOrders, "table-orders-status-3");
  // renderOrdersByStatus(ordersSuccess, "table-orders-status-4");
  // renderOrdersByStatus(failedOrders, "table-orders-status-5");

  tabsListEl.addEventListener("click", async (e) => {
    const linkEl = e.target.closest("a");

    switch (linkEl.dataset.orderStatus) {
      case "unconfirmed":
        // document.getElementById("table-orders-status-1").innerHTML = "";
        renderOrdersByStatus(unconfirmedOrders, "table-orders-status-1");

        break;
      case "confirmed":
        // document.getElementById("table-orders-status-2").innerHTML = "";

        renderOrdersByStatus(confirmedOrders, "table-orders-status-2");

        break;
      case "shipping":
        // document.getElementById("table-orders-status-3").innerHTML = "";

        renderOrdersByStatus(shippingOrders, "table-orders-status-3");

        break;
      case "success":
        // document.getElementById("table-orders-status-4").innerHTML = "";

        renderOrdersByStatus(ordersSuccess, "table-orders-status-4");

        break;
      case "failed":
        // document.getElementById("table-orders-status-5").innerHTML = "";

        renderOrdersByStatus(failedOrders, "table-orders-status-5");

        break;

      default:
        break;
    }

    await updateOrder();
  });

  await updateOrder();
})();

// await updateOrder();
// await deleteOrder();
// await viewOrderDetail();
