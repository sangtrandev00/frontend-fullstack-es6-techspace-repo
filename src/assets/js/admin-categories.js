import DataTable from "datatables.net-dt";
import CategoriesApi from "../../api/categoriesApi";
import { BACKEND_URL } from "../../constant/backend-domain";
import { showToast } from "../../utils/helper";
import { Toast } from "tw-elements";

document.addEventListener("DOMContentLoaded", async (e) => {
  const tableCatgogies = document.getElementById("table-categories");
  const displayCateEl = document.getElementById("display-categories");
  // if (!tableCatgogies) return;
  const updateCategoryBtn = document.getElementById("updateCategoryBtn");
  const deleteCategoryBtn = document.getElementById("deleteCategoryBtn");
  const [tableBody] = tableCatgogies.tBodies;
  const previewCategory = () => {};

  // Toast.getInstance(document.getElementById("toast-primary-el")).hide();
  console.log(Toast.getInstance(document.getElementById("toast-primary-el")));
  const deleteCategory = async () => {
    const deleteConfirmCateBtn = document.getElementById("delete-cate-btn");
    if (!deleteConfirmCateBtn) return;
    displayCateEl.addEventListener("click", (e) => {
      if (
        e.target &&
        e.target.classList.contains("delete-modal-trigger") &&
        e.target.matches("button, button i")
      ) {
        const categoryId = e.target.closest("button").getAttribute("category-id");

        deleteCategoryBtn.click();
        deleteConfirmCateBtn.addEventListener("click", async (e) => {
          try {
            const response = await CategoriesApi.delete(categoryId);
            console.log(response);

            // Update ui here
            // Remove this item out of dom

            // currentDelRow?.remove();
            location.reload();
            // await triggerModal("deleteModal", "hide");
          } catch (error) {
            console.log(error);

            // Handle error here
          }
        });
      }
    });

    return;
  };

  const createCategory = async () => {
    const createCateBtn = document.getElementById("add-category-btn");
    if (!createCateBtn) return;
    const addCateForm = document.getElementById("add-cate-form");
    if (!addCateForm) return;

    addCateForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      // const addFormData = document.getElementById('add-form-data');
      console.log(e.target.elements["cateImage"].files);
      const cateImage = e.target.elements["cateImage"].files[0];
      const name = e.target.elements["name"].value;
      const description = e.target.elements["description"].value;
      const formData = new FormData();
      formData.append("name", name);
      formData.append("cateImage", cateImage);
      formData.append("description", description);

      try {
        const { category, message } = await CategoriesApi.add(formData);

        // UI --- update when sussessfully!
        // Insert to row of table

        location.reload();
        return;
        // location.reload();
        // await triggerModal("createCategoryModal", "hide");

        // await showToast("toast-success", message);
      } catch (error) {
        console.log(error);

        // Handle error here ?
        const {
          response: {
            data: { message },
          },
        } = error;

        showToast("toast-danger-el", "Validation failed", "1 minutes", message);
      }
    });
  };

  const renderCategoriesList = async () => {
    try {
      const { categories, message } = await CategoriesApi.getAll();

      // console.log("call http request get all");

      const tableHtml = categories.map((category) => {
        const {
          _id,
          products: { items },
          name,
          cateImage,
          description,
        } = category;

        const cateImageHtml = `<img class="w-10 h-10 object-cover" src="${BACKEND_URL}/${cateImage}" alt="${name}" />`;

        return [
          _id,
          name,
          cateImageHtml,
          description,
          0,
          `
          <div class="flex space-x-2 w-10 h-full">
            <button class="update-modal-trigger" category-id="${_id}" type="button">
              <i class="update-modal-trigger fa-solid fa-pen-to-square text-primary-700"></i>
              Edit
            </button>
            <button class="delete-modal-trigger" category-id="${_id}" type="button">
              <i class="delete-modal-trigger fa-solid fa-delete-left text-red-600"></i>
              Delete
            </button>
           
          </div>
          `,
        ];
      });

      // tableBody.innerHTML = tableHtml;

      const table = new DataTable("#table-categories", {
        data: tableHtml,
        columns: [
          { title: "ID" },
          { title: "Category name" },
          { title: "image" },
          { title: "Description" },
          { title: "Qty products" },
          { title: "Action" },
        ],
      });
    } catch (error) {
      console.log(error);
    }
  };

  const updateCategory = async () => {
    const updateCateForm = document.getElementById("update-cate-form");
    displayCateEl.addEventListener("click", async (e) => {
      if (
        e.target &&
        e.target.matches("button, button i") &&
        e.target.classList.contains("update-modal-trigger")
      ) {
        const categoryId = e.target.closest("button").getAttribute("category-id");

        console.log(categoryId);
        updateCategoryBtn.click();
        try {
          // return;
          const { category } = await CategoriesApi.getById(categoryId);
          const { name, description, cateImage, _id } = category;
          updateCateForm.elements["name"].value = name;
          updateCateForm.elements["description"].textContent = description;
          updateCateForm.elements["oldImage"].value = cateImage;
          updateCateForm.elements["categoryId"].value = categoryId;
          // console.log(e.target.closest("tr.category-row"));

          const currUpdateRow = e.target.closest("tr.category-row");

          updateCateForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            console.log("submited form!");
            const formData = new FormData(e.target);

            try {
              const { category, message } = await CategoriesApi.update(formData, categoryId);
              console.log(message);
              location.reload();
            } catch (error) {
              // Handle error here!!!
              console.log(error);

              const {
                response: {
                  data: { message },
                },
              } = error;

              showToast("toast-danger-el", "Validation failed", "1 minutes", message);
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    });

    return;
  };

  await renderCategoriesList();
  await updateCategory();
  await deleteCategory();
  await createCategory();
});
