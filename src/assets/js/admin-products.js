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

// const renderProductsList = async () => {
//   try {
//     const { products, message } = await ProductsApi.getAll();
//     const tableHtml = products.map((product) => {
//       const {
//         _id,
//         name,
//         oldPrice,
//         images,
//         thumbnail,
//         shortDesc,
//         fullDesc,
//         stockQty,
//         categoryId,
//         discount,
//       } = product;
//       // const [thumbnail] = images.split(", ");
//       const tableRow = `
//             <tr class="border-b dark:border-gray-700 relative">
//             <th scope="row"
//                 class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
//                 ${_id}</th>
//             <td class="px-4 py-3">${name}</td>
//             <td class="px-4 py-3"> <img src="${BACKEND_URL}/${thumbnail}" alt="" class="w-16 h-16 object-cover" /> </td>
//             <td class="px-4 py-3 max-w-[12rem] truncate">${categoryId}</td>
//             <td class="px-4 py-3">${oldPrice}</td>
//             <td class="px-4 py-3">${discount}</td>
//             <td class="px-4 py-3">${0}</td>
//             <td class="px-4 py-3">${stockQty}</td>
//             <td class="table-data-action px-4 py-3 flex items-center justify-end">
//                 <button product-id=${_id} id="apple-imac-27-dropdown-btn"
//                     data-dropdown-toggle="apple-imac-27-dropdown"
//                     class="dropdown-action-btn inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
//                     type="button">
//                     <svg class="w-5 h-5" aria-hidden="true" fill="currentColor"
//                         viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
//                         <path
//                             d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
//                     </svg>
//                 </button>
//                 <div id="apple-imac-27-dropdown"
//                     class="absolute dropdown-menu-action hidden z-10 w-44 right-16 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
//                     <ul class="py-1 text-sm"
//                         aria-labelledby="">
//                         <li>
//                             <button type="button" data-modal-target="updateProductModal"
//                                 data-modal-toggle="updateProductModal"
//                                 product-id=${_id}
//                                 class="edit-product-btn flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
//                                 <svg class="w-4 h-4 mr-2"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewbox="0 0 20 20" fill="currentColor"
//                                     aria-hidden="true">
//                                     <path
//                                         d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
//                                     <path fill-rule="evenodd" clip-rule="evenodd"
//                                         d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
//                                 </svg>
//                                 Edit
//                             </button>
//                         </li>
//                         <li>
//                             <button type="button" data-modal-target="readProductModal"
//                                 data-modal-toggle="readProductModal"
//                                 class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
//                                 <svg class="w-4 h-4 mr-2"
//                                     xmlns="http://www.w3.org/2000/svg"
//                                     viewbox="0 0 20 20" fill="currentColor"
//                                     aria-hidden="true">
//                                     <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
//                                     <path fill-rule="evenodd" clip-rule="evenodd"
//                                         d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
//                                 </svg>
//                                 Preview
//                             </button>
//                         </li>
//                         <li>
//                             <button type="button" data-modal-target="deleteModal"
//                                 data-modal-toggle="deleteModal"
//                                 product-id="${_id}"
//                                 class="delete-product-btn flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
//                                 <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15"
//                                     fill="none" xmlns="http://www.w3.org/2000/svg"
//                                     aria-hidden="true">
//                                     <path fill-rule="evenodd" clip-rule="evenodd"
//                                         fill="currentColor"
//                                         d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
//                                 </svg>
//                                 Delete
//                             </button>
//                         </li>
//                     </ul>
//                 </div>
//             </td>
//         </tr>
//         `;
//       return tableRow;
//     });

//     tableBody.innerHTML = tableHtml;
//   } catch (error) {
//     console.log(error);
//   }
// };

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
  // })

  // [...editProductBtns].forEach((editBtn) => {
  //   editBtn.addEventListener("click", async (e) => {
  //     const currUpdateRow = e.target.closest("tr");

  //     const productId = editBtn.getAttribute("product-id");

  //     try {
  //       const { product } = await ProductsApi.getById(productId);

  //       const { _id, name, discount, stockQty, oldPrice, categoryId, images, shortDesc, fullDesc } =
  //         product;
  //       updateProductForm.elements["name"].value = name;
  //       updateProductForm.elements["quantity"].value = stockQty;
  //       updateProductForm.elements["price"].value = oldPrice;
  //       updateProductForm.elements["discount"].value = discount;
  //       // updateProductForm.elements["categoryId"].value = categoryId;  - let's fix here!!!
  //       updateProductForm.elements["images"].value = images;
  //       updateProductForm.elements["shortDesc"].innerText = shortDesc;
  //       updateProductForm.elements["fullDesc"].innerText = fullDesc;

  //       updateProductForm.addEventListener("submit", async (e) => {
  //         const updateProductForm = document.getElementById("update-product-form");
  //         e.preventDefault();
  //         const formData = new FormData(updateProductForm);

  //         const [
  //           updatedName,
  //           updatedQty,
  //           updatedOldPrice,
  //           updatedCategoryId,
  //           updatedDiscount,
  //           updatedImages,
  //           updatedShortDesc,
  //           updatedFullDesc,
  //         ] = [...formData.values()];

  //         e.preventDefault();
  //         // Call Api here
  //         const { product, message } = await ProductsApi.update({
  //           id: productId,
  //           name: updatedName,
  //           stockQty: updatedQty,
  //           oldPrice: updatedOldPrice,
  //           categoryId: updatedCategoryId,
  //           discount: updatedDiscount,
  //           shortDesc: updatedShortDesc,
  //           fullDesc: updatedFullDesc,
  //           images: updatedImages,
  //         });
  //         // console.log(response);

  //         const { _id, name, stockQty, discount, oldPrice, categoryId, shortDesc, fullDesc } =
  //           product;
  //         const thumbnail = images.split(" ")[0];

  //         // Close modal
  //         closeModal("updateProductModal");

  //         // Update ui table row here!!!
  //         const tableRow = document.createElement("tr");
  //         tableRow.className = "border-b dark:border-gray-700 relative";
  //         tableRow.innerHTML = `
  //         <th scope="row"
  //         class="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
  //         ${_id}</th>
  //     <td class="px-4 py-3">${name}</td>
  //     <td class="px-4 py-3"> <img src="${thumbnail}" alt="" class="w-16 h-16 object-cover" /> </td>
  //     <td class="px-4 py-3 max-w-[12rem] truncate">${categoryId}</td>
  //     <td class="px-4 py-3">${oldPrice}</td>
  //     <td class="px-4 py-3">${discount}</td>
  //     <td class="px-4 py-3">${0}</td>
  //     <td class="px-4 py-3">${stockQty}</td>
  //     <td class="table-data-action px-4 py-3 flex items-center justify-end">
  //         <button id=""
  //             data-dropdown-toggle=""
  //             class="dropdown-action-btn inline-flex items-center text-sm font-medium hover:bg-gray-100 dark:hover:bg-gray-700 p-1.5 dark:hover-bg-gray-800 text-center text-gray-500 hover:text-gray-800 rounded-lg focus:outline-none dark:text-gray-400 dark:hover:text-gray-100"
  //             type="button">
  //             <svg class="w-5 h-5" aria-hidden="true" fill="currentColor"
  //                 viewbox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
  //                 <path
  //                     d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
  //             </svg>
  //         </button>
  //         <div id=""
  //             class="absolute dropdown-menu-action hidden z-10 w-44 right-16 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600">
  //             <ul class="py-1 text-sm"
  //                 aria-labelledby="">
  //                 <li>
  //                     <button type="button" data-modal-target="updateProductModal"
  //                         data-modal-toggle="updateProductModal"
  //                         product-id=${_id}
  //                         class="edit-product-btn flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
  //                         <svg class="w-4 h-4 mr-2"
  //                             xmlns="http://www.w3.org/2000/svg"
  //                             viewbox="0 0 20 20" fill="currentColor"
  //                             aria-hidden="true">
  //                             <path
  //                                 d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
  //                             <path fill-rule="evenodd" clip-rule="evenodd"
  //                                 d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
  //                         </svg>
  //                         Edit
  //                     </button>
  //                 </li>
  //                 <li>
  //                     <button type="button" data-modal-target="readProductModal"
  //                         data-modal-toggle="readProductModal"
  //                         class="flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white text-gray-700 dark:text-gray-200">
  //                         <svg class="w-4 h-4 mr-2"
  //                             xmlns="http://www.w3.org/2000/svg"
  //                             viewbox="0 0 20 20" fill="currentColor"
  //                             aria-hidden="true">
  //                             <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
  //                             <path fill-rule="evenodd" clip-rule="evenodd"
  //                                 d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" />
  //                         </svg>
  //                         Preview
  //                     </button>
  //                 </li>
  //                 <li>
  //                     <button type="button" data-modal-target="deleteModal"
  //                         data-modal-toggle="deleteModal"
  //                         product-id="${_id}"
  //                         class="delete-product-btn flex w-full items-center py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 text-red-500 dark:hover:text-red-400">
  //                         <svg class="w-4 h-4 mr-2" viewbox="0 0 14 15"
  //                             fill="none" xmlns="http://www.w3.org/2000/svg"
  //                             aria-hidden="true">
  //                             <path fill-rule="evenodd" clip-rule="evenodd"
  //                                 fill="currentColor"
  //                                 d="M6.09922 0.300781C5.93212 0.30087 5.76835 0.347476 5.62625 0.435378C5.48414 0.523281 5.36931 0.649009 5.29462 0.798481L4.64302 2.10078H1.59922C1.36052 2.10078 1.13161 2.1956 0.962823 2.36439C0.79404 2.53317 0.699219 2.76209 0.699219 3.00078C0.699219 3.23948 0.79404 3.46839 0.962823 3.63718C1.13161 3.80596 1.36052 3.90078 1.59922 3.90078V12.9008C1.59922 13.3782 1.78886 13.836 2.12643 14.1736C2.46399 14.5111 2.92183 14.7008 3.39922 14.7008H10.5992C11.0766 14.7008 11.5344 14.5111 11.872 14.1736C12.2096 13.836 12.3992 13.3782 12.3992 12.9008V3.90078C12.6379 3.90078 12.8668 3.80596 13.0356 3.63718C13.2044 3.46839 13.2992 3.23948 13.2992 3.00078C13.2992 2.76209 13.2044 2.53317 13.0356 2.36439C12.8668 2.1956 12.6379 2.10078 12.3992 2.10078H9.35542L8.70382 0.798481C8.62913 0.649009 8.5143 0.523281 8.37219 0.435378C8.23009 0.347476 8.06631 0.30087 7.89922 0.300781H6.09922ZM4.29922 5.70078C4.29922 5.46209 4.39404 5.23317 4.56282 5.06439C4.73161 4.8956 4.96052 4.80078 5.19922 4.80078C5.43791 4.80078 5.66683 4.8956 5.83561 5.06439C6.0044 5.23317 6.09922 5.46209 6.09922 5.70078V11.1008C6.09922 11.3395 6.0044 11.5684 5.83561 11.7372C5.66683 11.906 5.43791 12.0008 5.19922 12.0008C4.96052 12.0008 4.73161 11.906 4.56282 11.7372C4.39404 11.5684 4.29922 11.3395 4.29922 11.1008V5.70078ZM8.79922 4.80078C8.56052 4.80078 8.33161 4.8956 8.16282 5.06439C7.99404 5.23317 7.89922 5.46209 7.89922 5.70078V11.1008C7.89922 11.3395 7.99404 11.5684 8.16282 11.7372C8.33161 11.906 8.56052 12.0008 8.79922 12.0008C9.03791 12.0008 9.26683 11.906 9.43561 11.7372C9.6044 11.5684 9.69922 11.3395 9.69922 11.1008V5.70078C9.69922 5.46209 9.6044 5.23317 9.43561 5.06439C9.26683 4.8956 9.03791 4.80078 8.79922 4.80078Z" />
  //                         </svg>
  //                         Delete
  //                     </button>
  //                 </li>
  //             </ul>
  //         </div>
  //     </td>
  //         `;
  //         tableBody.replaceChild(tableRow, currUpdateRow);
  //       });

  // });
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
  [...actionBtns].forEach((actionBtn) => {
    actionBtn.addEventListener("click", (e) => {
      e.preventDefault();
      const currDelRow = e.target.closest("tr");

      const productId = actionBtn.getAttribute("product-id");

      deleteProductConfirmBtn.addEventListener("click", async (e) => {
        try {
          const response = await ProductsApi.delete(productId);

          // Remove out of DOM
          location.reload();
          currDelRow?.remove();
          closeModal("deleteModal");
          // Remove product from DOM here!!!
          // Should i use websocket.io ?
        } catch (error) {
          console.log(error);
        }
      });
    });
  });
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
