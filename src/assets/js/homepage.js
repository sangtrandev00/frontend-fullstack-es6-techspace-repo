import CategoriesApi from "../../api/categoriesApi";
import ProductsApi from "../../api/productsApi";
import shopApi from "../../api/shopApi";
import { BACKEND_URL } from "../../constant/backend-domain";
import {
  addToCart,
  calcTotalAndLengthOfCart,
  getParams,
  imageContent,
  innerHTML,
  setParams,
  textContent,
  toggleModal,
  updateUICartNumber,
  updateViews,
} from "../../utils/helper";

// Loading Catalog
const displayProdEl = document.getElementById("show-product");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const showResultProducts = document.getElementById("show-result-products");

const renderCatalogs = async () => {
  const catalogsSection = document.getElementById("catalog-section");
  const catalogsSlider = document.querySelector("#slider");
  if (!catalogsSection) return;

  const { categories: catalogs } = await CategoriesApi.getAll();

  // Clear html before initialize!!!
  catalogsSlider.innerHTML = "";
  catalogs.forEach((catalog, index) => {
    const { cateImage, name, _id } = catalog;

    const catalogItemHtml = `
        <div class="flex flex-shrink-0 relative md:w-1/4 sm:w-auto max-[640px]:w-auto">
                            <img src="${BACKEND_URL}/${cateImage}"
                                alt="black chair and white table" class="object-cover object-center w-[358px] h-[358px]"/>
                            <div class="bg-gray-800 bg-opacity-30 absolute w-full h-full p-6">
                                <h2 class="lg:text-xl leading-4 text-base lg:leading-5 text-white dark:text-gray-900">
                                    Catalog ${index + 1}</h2>
                                <div class="flex h-full items-end pb-6">
                                    <a href="./shop.html?_cateIds=${_id}"
                                        class="text-xl lg:text-2xl font-semibold leading-5 lg:leading-6 text-white dark:text-gray-900">
                                       ${name}</a>
                                </div>
                            </div>
                        </div>

    `;
    catalogsSlider.insertAdjacentHTML("beforeend", catalogItemHtml);
  });
};

const renderProducts = async (params) => {
  const { products } = await shopApi.getProducts(params);

  showResultProducts.innerText = `Showing ${products.length} products`;

  displayProdEl.innerHTML = "";
  if (!displayProdEl) return;
  products.forEach((product) => {
    const { thumbnail, name, _id, oldPrice, discount } = product;

    const mainPrice = oldPrice * discount;

    const imageUrl = thumbnail.startsWith("http") ? thumbnail : `${BACKEND_URL}/${thumbnail}`;

    const cardProductHtml = `
      <div data-id=${_id} class="product-item relative mb-10">
      <div class="absolute z-10 top-0 left-0 py-2 px-4 bg-slate-300 bg-opacity-50 rounded-[10px]">
          <p class="text-xs leading-3 text-gray-800">New</p>
      </div>
      <div class="relative group">
          <div
              class="flex justify-center items-center opacity-0 bg-gradient-to-t from-gray-800 via-gray-800 to-opacity-30 group-hover:opacity-50 absolute top-0 left-0 h-full w-full">
          </div>
          <img class="w-full"
              src="${imageUrl}"
              alt="${name}" />
          <div class="absolute bottom-0 p-8 w-full opacity-0 group-hover:opacity-100">
              <button
                  class="add-to-cart dark:bg-gray-800 dark:text-gray-300 font-medium text-base leading-4 text-gray-800 bg-white py-3 w-full">Add to cart</button>
              <button
                  class="bg-transparent font-medium text-base leading-4 border-2 border-white py-3 w-full mt-2 text-white">Quick
                  View</button>
          </div>
      </div>
      <p class="font-normal dark:text-white text-xl leading-5 text-gray-800 md:mt-6 mt-4">${name}</p>
      <div class="flex">
          <p class="font-semibold dark:text-gray-300 text-xl leading-5 text-red-700 mt-4">$${mainPrice}</p>
          <p
              class="font-semibold dark:text-gray-300 text-lg leading-5 text-gray-800 mt-4 ms-4 line-through">
              $${oldPrice}
          </p>

      </div>

      <a href="detail-product.html?id=${_id}"
          class="detail-product inline-block font-normal dark:text-gray-300 text-base leading-4 text-gray-600 mt-4 border border-slate-400 p-4">Xem
          ngay</a>
    </div>
    `;

    displayProdEl.insertAdjacentHTML("beforeend", cardProductHtml);
  });
};

const addCartHandler = async () => {
  // const productsContainer = document.getElementById("show-product");

  displayProdEl.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("add-to-cart")) {
      const addToCartBtn = e.target;
      const productCard = e.target.closest(".product-item");
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

const moveToDetail = async () => {
  displayProdEl.addEventListener("click", async (e) => {
    e.preventDefault();

    console.log("clicked: ", e.target);
    if (e.target && e.target.classList.contains("detail-product")) {
      const id = e.target.closest(".product-item").dataset.id;

      updateViews(id);

      location.href = `./detail-product.html?id=${id}`;
    }
  });
};

// Iffe
(async () => {
  // id="right-banner-image-1"

  await renderCatalogs();
  // Initial products
  await renderProducts({ _limit: 12, _page: 1 });

  await addCartHandler();

  await moveToDetail();

  const generateCatalog = () => {
    let defaultTransform = 0;
    function goNext() {
      defaultTransform = defaultTransform - 398;
      var slider = document.getElementById("slider");
      if (Math.abs(defaultTransform) >= slider.scrollWidth / 1.7) defaultTransform = 0;
      slider.style.transform = "translateX(" + defaultTransform + "px)";
    }
    next.addEventListener("click", goNext);
    function goPrev() {
      var slider = document.getElementById("slider");
      if (Math.abs(defaultTransform) === 0) defaultTransform = 0;
      else defaultTransform = defaultTransform + 398;
      slider.style.transform = "translateX(" + defaultTransform + "px)";
    }
    prev.addEventListener("click", goPrev);
  };

  generateCatalog();

  // Handle slide products
  nextBtn.addEventListener("click", async () => {
    const currPage = +(getParams("_page") || 1);

    const {
      pagination: { _totalRows },
    } = await shopApi.getProducts({ _limit: 12 });
    const maxPage = Math.ceil(_totalRows / 12);

    if (currPage >= maxPage) return;

    setParams("_page", currPage + 1);

    await renderProducts({ _page: currPage + 1, _limit: 12 });
  });

  prevBtn.addEventListener("click", async () => {
    const currPage = +(getParams("_page") || 1);

    if (currPage === 1) return;
    setParams("_page", currPage - 1);

    await renderProducts({ _page: currPage - 1, _limit: 12 });
  });
})();

document.addEventListener("DOMContentLoaded", () => {
  imageContent("right-banner-image-1", `${BACKEND_URL}/images/small-picture-banner-1-right.jpg`);
  imageContent("right-banner-image-2", `${BACKEND_URL}/images/small-picture-banner-2-right.jpg`);
  imageContent("right-banner-image-3", `${BACKEND_URL}/images/small-picture-banner-3-right.jpg`);
  // imageContent("right-banner-image-3", `${BACKEND_URL}/images/small-picture-banner-3-right.jpg`);
});
