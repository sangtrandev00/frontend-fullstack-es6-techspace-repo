// Initialization for ES Users
import { Tab, initTE } from "tw-elements";
import ProductsApi from "../../api/productsApi";
import { addToCart, imageContent, innerHTML, textContent, toggleModal } from "../../utils/helper";

initTE({ Tab });
import Swiper, { Pagination, Navigation } from "swiper";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { BACKEND_URL } from "../../constant/backend-domain";

const url = new URL(location.href);
const params = url.searchParams;
const productId = params.get("id");
const smallThumbsEle = document.getElementById("small-thumbnails", `${name}`);
console.log(smallThumbsEle);

const renderProdDetail = async () => {
  if (!productId) return;

  const { product } = await ProductsApi.getById(productId);
  const { _id, thumbnail, images, name, oldPrice, discount, shortDesc, fullDesc, stockQty, views } =
    product;
  const newPrice = oldPrice * (1 - discount / 100);
  let imageUrl;

  if (thumbnail) {
    imageUrl = thumbnail.startsWith("http") ? thumbnail : `${BACKEND_URL}/${thumbnail}`;
  } else {
    imageUrl = `https://placehold.co/358x358`;
  }

  textContent("product-title", name);
  textContent("oldPrice", `$${oldPrice}`);
  textContent("newPrice", `$${newPrice.toFixed(2)}`);
  textContent("stockQty", `${stockQty}`);
  innerHTML("shortDesc", `${shortDesc}`);
  innerHTML("tabs-description", `${fullDesc}`);

  textContent("views", views || 0);

  imageContent("thumbnail", `${imageUrl}`);

  if (!smallThumbsEle) return;

  smallThumbsEle.innerHTML = "";
  images.split(", ").forEach((image) => {
    const imageUrl = image.startsWith("http") ? image : `${BACKEND_URL}/${image}`;

    const smallThubHtml = `
        <div class="swiper-slide cursor-pointer">
          <img alt="Error image"
              src="${imageUrl}"
              class="aspect-square w-full rounded-xl object-cover" />
      </div>
    `;

    smallThumbsEle.insertAdjacentHTML("beforeend", smallThubHtml);
  });
};

const handleAddCart = async () => {
  const addCartBtn = document.getElementById("addToCartBtn");
  if (!addCartBtn) return;

  addCartBtn.addEventListener("click", (e) => {
    e.preventDefault();
    // console.log("form: ", e.target.closest("form").elements["qty"].value);
    const qtyEl = document.getElementById("Quantity");
    const qtyValue = qtyEl.value;
    // const formEl = e.target.closest("form");
    // console.log("qty: ", +qtyValue);
    // console.log(productId, qtyValue);
    addToCart(productId, +qtyValue);

    // Trigger modal here
    innerHTML(
      "modalIcon",
      `
          <i class="fa-solid fa-cart-plus text-xl text-sky-600"></i>
        `
    );

    innerHTML("modalTitle", `Add Product to cart successfully!`);

    toggleModal("toggleModalBtn");
  });
};

const triggerViewSmallThumbs = async () => {
  smallThumbsEle.addEventListener("click", (e) => {
    // console.log(e.target);

    if (e.target && e.target.nodeName === "IMG") {
      const imgUrl = e.target.getAttribute("src");

      imageContent("thumbnail", imgUrl);
    }
  });
};

(async () => {
  await renderProdDetail();
  await addToCart();
  await handleAddCart();
  await triggerViewSmallThumbs();
})();
