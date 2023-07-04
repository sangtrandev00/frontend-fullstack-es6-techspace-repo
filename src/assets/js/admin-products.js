import ProductsApi from "../../api/productsApi";
import CategoryApi from "../../api/categoriesApi";
import DataTable from "datatables.net-dt";
import { Modal } from "tw-elements";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { BACKEND_URL } from "../../constant/backend-domain";

// import Essentials  from "@ckeditor/ckeditor5-essentials";
// import  Autoformat  from "@ckeditor/ckeditor5-autoformat";

// import Heading from "@ckeditor/ckeditor5-heading";
// import  List from "@ckeditor/ckeditor5-list";
// import { showToast } from "../../utils/helper";
// import "datatables.net-responsive-dt";

let tableProductsGlobal;
let fullDescEditor;
let shortDescEditor;
let updateShortDescEditor;
let updateFullDescEditor;
const tableProducts = document.getElementById("table-products");
const [tableBody] = tableProducts.tBodies;
const selectElement = document.getElementById("categorySelectId");
const updateProductBtn = document.getElementById("updateProductBtn");
const deleteProductBtn = document.getElementById("deleteProductBtn");
const productsDisplayEl = document.getElementById("products-display");

const renderCateList = async (selectElement) => {
  if (!selectElement) return;

  const { categories } = await CategoryApi.getAll();

  const categoryHtmls = categories.map((cate) => {
    return `
      <option value="${cate._id}">${cate.name}</option>
    `;
  });
  categoryHtmls.unshift(`<option value="">Select Category</option>`);

  selectElement.innerHTML = categoryHtmls;
};

//Render products with table data lib

const renderProductsList = async () => {
  try {
    const { products, message } = await ProductsApi.getAll();

    const tableRows = products.map((product) => {
      const {
        _id,
        name,
        oldPrice,
        images,
        thumbnail,
        shortDesc,
        fullDesc,
        stockQty,
        categoryId,
        discount,
      } = product;
      let imageUrl;
      if (thumbnail) {
        imageUrl = thumbnail.startsWith("http") ? thumbnail : `${BACKEND_URL}/${thumbnail}`;
      } else {
        imageUrl = `https://placehold.co/358x358`;
      }

      const imageHtml = `<img src="${imageUrl}" alt="${name}" class="w-16 h-16 object-cover" />`;

      return [
        _id,
        name,
        imageHtml,
        categoryId,
        oldPrice,
        discount,
        0,
        stockQty,
        `
        <div class="flex space-x-2 w-10 h-full">
          <button class="update-modal-trigger" product-id="${_id}" type="button">
            <i class="update-modal-trigger fa-solid fa-pen-to-square text-primary-700"></i>
            Edit
          </button>
          <button class="delete-modal-trigger" product-id="${_id}" type="button">
            <i class="delete-modal-trigger fa-solid fa-delete-left text-red-600"></i>
            Delete
          </button>
         
        </div>
        `,
      ];
    });

    tableProductsGlobal = new DataTable("#table-products", {
      data: tableRows,
      columns: [
        { title: "ID" },
        { title: "Name" },
        { title: "Image" },
        { title: "Category" },
        { title: "Old Price" },
        { title: "Discount" },
        { title: "Rating" },
        { title: "Stock Qty" },
        { title: "Actions" },
      ],
      responsive: true,
    });
  } catch (error) {
    console.log(error);
  }
};

const createProduct = async () => {
  const addProductForm = document.getElementById("add-product-form");
  if (!addProductForm) return;

  addProductForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const fullDescVal = fullDescEditor.getData();
    const shortDescVal = shortDescEditor.getData();

    const addProductForm = e.target;

    // console.log(addProductForm.elements);
    const [nameEl, qtyEl, oldPriceEl, categoryEl, discountEl, imagesEl, shortDescEl, fullDescEl] = [
      ...addProductForm.elements,
    ];

    const formData = new FormData();

    formData.append("name", nameEl.value);
    formData.append("stockQty", qtyEl.value);
    formData.append("oldPrice", oldPriceEl.value);
    formData.append("categoryId", categoryEl.value);
    formData.append("discount", discountEl.value);

    for (let i = 0; i < imagesEl.files.length; i++) {
      formData.append("images[]", imagesEl.files[i]);
    }

    // formData.append("images[]", imagesEl.files);
    formData.append("shortDesc", shortDescVal);
    formData.append("fullDesc", fullDescVal);

    const { message, product } = await ProductsApi.add(formData);
    const { _id } = product;

    // Update ui
    // closeModal("createProductModal");
    location.reload();
    return;
    // Add table element to DOM table row

    // Show feedback toast here!!!
  });
};

// update product  -- not fully Success

const updateProduct = async () => {
  if (!productsDisplayEl) return;

  productsDisplayEl.addEventListener("click", async (e) => {
    // console.log(e.target);

    if (
      e.target &&
      e.target.matches("button, button i") &&
      e.target.classList.contains("update-modal-trigger")
    ) {
      updateProductBtn.click();
      const actionBtn = e.target;

      const productId = e.target.closest("button").getAttribute("product-id");
      const updateProductForm = document.getElementById("update-product-form");

      if (!updateProductForm) return;
      try {
        const { product, message } = await ProductsApi.getById(productId);

        const { _id, name, discount, stockQty, oldPrice, categoryId, images, shortDesc, fullDesc } =
          product;

        const selectCateEl = document.querySelector("#update-product-form #categorySelectId");
        await renderCateList(selectCateEl);

        updateProductForm.elements["name"].value = name;
        updateProductForm.elements["quantity"].value = stockQty;
        updateProductForm.elements["price"].value = oldPrice;
        updateProductForm.elements["discount"].value = discount;
        updateProductForm.elements["category"].value = categoryId;
        updateProductForm.elements["oldImages"].value = images;
        // updateProductForm.elements["shortDesc"].innerText = shortDesc;
        // updateProductForm.elements["fullDesc"].innerText = fullDesc;
        updateShortDescEditor.setData(shortDesc);
        updateFullDescEditor.setData(fullDesc);

        updateProductForm.addEventListener("submit", async (e) => {
          e.preventDefault();

          const shortDescVal = updateShortDescEditor.getData();
          const fullDescVal = updateFullDescEditor.getData();

          const [
            nameEl,
            qtyEl,
            oldPriceEl,
            categoryEl,
            discountEl,
            oldImagesEl,
            imagesEl,
            shortDescEl,
            fullDescEl,
          ] = [...updateProductForm.elements];

          const formData = new FormData();

          formData.append("name", nameEl.value);
          formData.append("stockQty", qtyEl.value);
          formData.append("oldPrice", oldPriceEl.value);
          formData.append("categoryId", categoryEl.value);
          formData.append("discount", discountEl.value);
          formData.append("oldImages", oldImagesEl.value);

          if (imagesEl.files.length > 0) {
            for (let i = 0; i < imagesEl.files.length; i++) {
              formData.append("images[]", imagesEl.files[i]);
            }
          }

          // formData.append("images[]", imagesEl.files);
          formData.append("shortDesc", shortDescVal);
          formData.append("fullDesc", fullDescVal);
          // Call Api here
          const { product, message } = await ProductsApi.update(formData, productId);

          // Close modal
          // Update UI / RESET / Re render table products (How and don't want to reset DOM)

          tableProductsGlobal.destroy();
          await renderProductsList();
          await renderCateList();

          updateProductBtn.click();
        });
      } catch (error) {
        console.log(error);
      }
    }
  });
  return;
};

const deleteProduct = async () => {
  if (!productsDisplayEl) return;
  const deleteProductConfirmBtn = document.getElementById("delete-product-btn");
  productsDisplayEl.addEventListener("click", (e) => {
    if (e.target && e.target.classList.contains("delete-modal-trigger")) {
      deleteProductBtn.click();

      const productId = e.target.closest("button").getAttribute("product-id");
      const currDelRow = e.target.closest("tr");

      deleteProductConfirmBtn.addEventListener("click", async (e) => {
        try {
          const response = await ProductsApi.delete(productId);
          // Remove out of DOM
          currDelRow?.remove();
          deleteProductBtn.click();
          showToast(
            "toast-danger-el",
            "Delete product",
            "1 minutes",
            `Delete product ${productId} successfully!`
          );
          // Remove product from DOM here!!!
          // Should i use websocket.io ?
        } catch (error) {
          console.log(error);
        }
      });
    }
  });

  // const actionBtns = document.querySelectorAll(".dropdown-action-btn");
  // const deleteProductBtns = document.querySelectorAll(".delete-product-btn");
  // if (!deleteProductBtns) return;
  return;
};

(async () => {
  await renderProductsList();
  await renderCateList(selectElement);
  await createProduct();
  await updateProduct();
  await deleteProduct();

  ClassicEditor.create(document.querySelector("#fullDescription"))
    .then((newEditor) => {
      // console.log(editor);
      fullDescEditor = newEditor;
    })
    .catch((error) => {
      console.error(error);
    });
  ClassicEditor.create(document.querySelector("#shortDescription"))
    .then((newEditor) => {
      shortDescEditor = newEditor;
    })
    .catch((error) => {
      console.error(error);
    });
  ClassicEditor.create(document.querySelector("#update-product-form #fullDescription"))
    .then((newEditor) => {
      updateFullDescEditor = newEditor;
    })
    .catch((error) => {
      console.error(error);
    });
  ClassicEditor.create(document.querySelector("#update-product-form #shortDescription"))
    .then((newEditor) => {
      updateShortDescEditor = newEditor;
    })
    .catch((error) => {
      console.error(error);
    });
})();
