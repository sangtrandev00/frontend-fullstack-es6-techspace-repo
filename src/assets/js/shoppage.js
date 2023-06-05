// Initialization for ES Users
import { Dropdown, Ripple, initTE } from "tw-elements";
import ProductsApi from "../../api/productsApi";
import ShopApi from "../../api/shopApi";
import {
  addToCart,
  getParams,
  innerHTML,
  inputValue,
  setParams,
  showByCate,
  showByRange,
  showBySort,
  toggleModal,
  updateViews,
} from "../../utils/helper";

import CategoriesApi from "../../api/categoriesApi";
import { BACKEND_URL } from "../../constant/backend-domain";

initTE({ Ripple });

const prodListEl = document.getElementById("product-list");
const cateListEl = document.getElementById("cate-list");
const displayProEl = document.querySelector(".shop-content__products-display");
const showResultByCate = document.querySelector(".show-result-text__by-cate");
const showResultByRange = document.querySelector(".show-result-text__by-range");
const showResultBySort = document.querySelector(".show-result-text__by-sort");

let sortGlobalValue;

const listProducts = (products, totalRows = products.length, currPage = 1, limit = 12) => {
  prodListEl.innerHTML = "";
  products.forEach((product) => {
    const { _id, name, thumbnail, oldPrice, discount } = product;
    const newPrice = (oldPrice * (1 - discount / 100)).toFixed(2);
    let imageUrl;

    if (thumbnail) {
      imageUrl = thumbnail.startsWith("http") ? thumbnail : `${BACKEND_URL}/${thumbnail}`;
    } else {
      imageUrl = `https://placehold.co/358x358`;
    }

    const cardProd = `
      <div data-id=${_id} class="lg:w-1/3 md:w-1/2 p-4 w-full card-product">
        <a href="./detail-product.html?id=${_id}"
          class="group relative block overflow-hidden border pt-2 card-product__link">
          <button
              class="card-product__wishlist absolute end-4 top-4 z-4 rounded-full bg-white p-1.5 text-gray-900 transition hover:text-gray-900/75">
              <span class="sr-only">Wishlist</span>

              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                  stroke-width="1.5" stroke="currentColor" class="h-4 w-4">
                  <path stroke-linecap="round" stroke-linejoin="round"
                      d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
          </button>

          <div>
              <img src="${imageUrl}"
                  alt="${name}"
                  class="h-64 w-full transition duration-500 group-hover:scale-105 sm:h-72 xl:px-4 md:px-2" />

          </div>
          <div class="relative border border-gray-100 bg-white p-6">
              <span class="whitespace-nowrap bg-slate-300 px-3 py-1.5 text-xs font-medium">
                  New
              </span>

              <h3 class="mt-4 card-product__title text-lg font-medium text-gray-900">
                  ${name}
              </h3>

              <div class="flex items-center">
                  <p class="mt-1.5 text-xl text-red-500 ">$${newPrice}</p>
                  <p class="mt-1.5 text-sm text-gray-700 ms-2 line-through ">$${oldPrice}</p>
              </div>

              <!-- Rating here -->
              <ul class="flex justify-center mt-2">
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="currentColor" class="mr-1 h-5 w-5 text-warning">
                          <path fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="currentColor" class="mr-1 h-5 w-5 text-warning">
                          <path fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                          fill="currentColor" class="mr-1 h-5 w-5 text-warning">
                          <path fill-rule="evenodd"
                              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                              clip-rule="evenodd" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5" stroke="currentColor"
                          class="mr-1 h-5 w-5 text-warning">
                          <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                  </li>
                  <li>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                          stroke-width="1.5" stroke="currentColor"
                          class="mr-1 h-5 w-5 text-warning">
                          <path stroke-linecap="round" stroke-linejoin="round"
                              d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                      </svg>
                  </li>
              </ul>

              <form class="mt-4">
                  <button
                      class="add-to-cart block w-full rounded bg-slate-300 p-4 text-sm font-medium transition hover:scale-105">
                      Add to Cart
                  </button>
              </form>
          </div>
      </a>
    </div>
  `;

    prodListEl.insertAdjacentHTML("beforeend", cardProd);
  });

  // List pagination here ?
  createPagination(currPage, totalRows, limit);
};

const renderProdList = async () => {
  if (!prodListEl) return;
  const _q = getParams("_q");
  const _limit = +(getParams("_limit") || 12);
  const _page = +(getParams("_page") || 1);
  const _sort = getParams("_sort");
  const _order = getParams("_order");
  const _min = getParams("_min");
  const _max = getParams("_max");
  const _cateIds = getParams("_cateIds");
  const showResultTextEl = document.getElementById("show-result-text");
  const keyword = document.getElementById("keyword");

  try {
    const query = {
      _limit,
      _page,
    };

    if (_sort) {
      query._sort = _sort;
      query._order = _order;

      showBySort(showResultBySort, sortGlobalValue);
    }

    if (_q) {
      query._q = _q;

      showResultTextEl.classList.remove("hidden");

      keyword.innerText = _q;
    }

    if (_min) {
      query._min = _min;

      showByRange(showResultByRange, _min, _max);
    }

    if (_max) {
      query._max = _max;

      showByRange(showResultByRange, _min, _max);
    }

    if (_cateIds) {
      query._cateIds = _cateIds;

      showByCate(showResultByCate, _cateIds);
    } else {
      // Reset show cate
      // showResultByCate.innerHTML = "";
    }

    console.log("query: ", query);

    const {
      products,
      pagination: { _totalRows },
      message,
    } = await ShopApi.getProducts(query);

    listProducts(products, _totalRows, _page, _limit);
  } catch (error) {
    console.log(error);
  }
};

const renderCateList = async () => {
  const { message, categories } = await CategoriesApi.getAll();

  const viewAllEl = ` <a href="#"
  class="flex items-center text-sm font-medium text-primary-600 dark:text-primary-500 hover:underline">
  View all
</a>`;

  categories.forEach((cate) => {
    const { _id, name, cateImage, description } = cate;

    const cateItem = `
    <div data-id=${_id} class="flex items-center cate-item">
      <input id="${_id}" type="checkbox" value=""
          class="w-4 h-4 bg-gray-100 border-gray-300 rounded text-primary-600 focus:bg-slate-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />

      <label for="${_id}" class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
         ${name}
      </label>
    </div>
  `;

    cateListEl.insertAdjacentHTML("beforeend", cateItem);
  });

  cateListEl.insertAdjacentHTML("beforeend", viewAllEl);

  // Render range [minvalue - maxvalue];

  const {
    result: [{ _id: prodMaxMinId, minFieldValue }],
  } = await ShopApi.getMinPrice();

  const {
    result: [{ _id: prodMaxPriceId, maxFieldValue }],
  } = await ShopApi.getMaxPrice();

  inputValue("price-from", minFieldValue);
  inputValue("price-to", maxFieldValue);

  // console.log(minFieldValue);
  // console.log(maxFieldValue);
};

const addCartHandler = async () => {
  // const prodListEl = document.getElementById("product-list");
  prodListEl.addEventListener("click", (e) => {
    e.preventDefault();
    if (e.target && e.target.classList.contains("add-to-cart")) {
      const productCard = e.target.closest(".card-product");
      const productId = productCard.dataset.id;
      const qty = 1;
      addToCart(productId, qty);

      // Trigger modal here
      innerHTML(
        "modalIcon",
        `
        <i class="fa-solid fa-cart-plus text-xl text-sky-600"></i>
      `
      );

      innerHTML("modalTitle", `Add Product to cart successfully!`);

      toggleModal("toggleModalBtn");
    }
  });
};

const moveToDetail = () => {
  prodListEl.addEventListener("click", async (e) => {
    if (e.target && e.target.nodeName === "IMG") {
      const id = e.target.closest(".card-product").dataset.id;

      updateViews(id);

      location.href = `./detail-product.html?id=${id}`;
    }
  });
};

const filterProductsByPrice = async () => {
  const filterEl = document.getElementById("shop-content__filter-bar");
  const applyFilterBtn = document.getElementById("apply-filter-btn");
  if (!filterEl) return;

  applyFilterBtn.addEventListener("click", (e) => {
    // Do it later
    // const cateItemChecked = [...cateItems].filter((cate) => cate.checked).map((item) => item.id);
    // console.log(cateItemChecked.join(","));

    // setParams("cates", cateItemChecked.join(","));

    const _min = document.getElementById("price-from").value;
    const _max = document.getElementById("price-to").value;

    setParams("_min", _min);
    setParams("_max", _max);

    renderProdList();
  });
};

const filterByCate = async () => {
  const cateItems = document.querySelectorAll(".cate-item input");

  cateListEl.addEventListener("click", async (e) => {
    if (e.target && e.target.nodeName === "INPUT") {
      const isChecked = e.target.checked;
      console.log("is checked: ", isChecked);
      const cateId = e.target.id;

      const cateIds = getParams("_cateIds")?.split(",");

      console.log(cateIds);
      let cateIdsQuery;
      if (cateIds && cateIds.length > 0) {
        if (!isChecked) {
          cateIdsQuery = getParams("_cateIds")
            .split(",")
            .filter((ci) => ci !== cateId);
        } else {
          cateIdsQuery = [...getParams("_cateIds").split(","), cateId].join(",");
        }
        console.log(cateIdsQuery);
        setParams("_cateIds", cateIdsQuery);
      } else {
        setParams("_cateIds", cateId);
        cateIdsQuery = cateId;
      }

      // Render products here

      // displayProEl.innerHTML = "";

      // const {
      //   products,
      //   pagination: { _totalRows },
      // } = await ShopApi.getProducts({
      //   _limit: 12,
      //   _cateIds: cateIdsQuery,
      // });

      // console.log(products);

      // const currPage = +(getParams("_page") || 1);
      // const limit = +(getParams("_limit") || 12);

      // listProducts(products, _totalRows, currPage, limit);

      await renderProdList();
    }
  });
};

const searchProducts = async () => {
  const searchEl = document.getElementById("searchInput");
  const searchBtn = document.getElementById("search-btn");
  if (!searchEl) return;

  searchBtn.addEventListener("click", async (e) => {
    console.log("click search", searchEl.value);
    const searchVal = searchEl.value;

    setParams("_q", searchVal);

    location.href = `./shop.html?_q=${searchVal}`;

    // Update UI and pagination
    // await renderProdList();
    // Reset Input:

    searchEl.value = "";
  });
};

const createPagination = (currentPage, totalProds, limit) => {
  const totalPages = Math.ceil(totalProds / limit);
  console.log("total pages: ", totalPages);
  console.log("current page: ", currentPage);
  console.log("total products: ", totalProds);
  console.log("limit: ", limit);

  let navigationHTML =
    '<nav aria-label="Page navigation example" class="py-8"><ul id="paginationEl" class="list-style-none flex justify-center">';
  // Add the "Previous" link
  if (currentPage > 1) {
    navigationHTML += `<li><a class="border-2 border-slate-300 relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" data-page=${
      currentPage - 1
    } href="?_page=${currentPage - 1}">Previous</a></li>`;
  } else {
    navigationHTML += `<li><a class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Previous</a></li>`;
  }

  // Add the page links
  for (let page = 1; page <= totalPages; page++) {
    if (page === currentPage) {
      navigationHTML += `<li aria-current="page"><a class="border-2 border-slate-300 relative block rounded bg-slate-600-100 px-3 py-1.5 text-sm font-medium text-primary-700 transition-all duration-300" data-page=${page} href="?_page=${page}">${page}<span class="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">(current)</span></a></li>`;
    } else {
      navigationHTML += `<li><a class="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" data-page=${page} href="?_page=${page}">${page}</a></li>`;
    }
  }

  // Add the "Next" link
  if (currentPage < totalPages) {
    navigationHTML += `<li><a class="border-2 border-slate-300 relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white" data-page=${
      currentPage + 1
    } href="?_page=${currentPage + 1}">Next</a></li>`;
  } else {
    navigationHTML += `<li><a class="pointer-events-none relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-500 transition-all duration-300 dark:text-neutral-400">Next</a></li>`;
  }

  navigationHTML += "</ul></nav>";
  const paginationEl = document.getElementById("pagination");

  paginationEl.innerHTML = navigationHTML;
};

const paginationHandler = () => {
  const paginationEl = document.getElementById("paginationEl");
  if (!paginationEl) return;

  paginationEl.addEventListener("click", async (e) => {
    e.preventDefault();
    console.log("click");
    if (e.target && e.target.nodeName === "A") {
      console.log(e.target.dataset.page);
      const currentPage = +e.target.dataset.page;
      setParams("_page", currentPage);

      renderProdList();
    }
  });
};

const sortHandler = () => {
  const sortBarEl = document.getElementById("sortBarEl");
  if (!sortBarEl) return;

  sortBarEl.addEventListener("click", async (e) => {
    if (e.target && e.target.nodeName === "A") {
      const sortVal = e.target.dataset.sort;

      switch (sortVal) {
        case "pricedesc":
          setParams("_sort", "oldPrice");
          setParams("_order", "desc");

          sortGlobalValue = "Price descrease";
          break;
        case "priceasc":
          setParams("_sort", "oldPrice");
          setParams("_order", "asc");

          sortGlobalValue = "Price ascending";
          break;
        case "oldest":
          setParams("_sort", "createdAt");
          setParams("_order", "asc");
          sortGlobalValue = "Oldest products";
          break;
        case "latest":
          setParams("_sort", "createdAt");
          setParams("_order", "desc");

          sortGlobalValue = "Latest products";

          break;

        default:
          break;
      }

      // location.reload();  --> Render after sorting!

      await renderProdList();
    }
  });
};

(async () => {
  await renderProdList();
  await renderCateList();
  await filterProductsByPrice();
  await filterByCate();
  await searchProducts();
  await addCartHandler();
  paginationHandler();
  sortHandler();
  moveToDetail();
})();

console.log(getParams("_cateIds")?.split(","));
console.log([...getParams("_cateIds")?.split(","), "dfsdjfksdlfjdskl"].join(","));

document.addEventListener("DOMContentLoaded", (e) => {
  console.log(e);

  console.log("ahihi");
});
