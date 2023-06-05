import getHeader, { getTopHeader } from "./components/header";
import getFooter from "./components/footer";
import { getModalComponent } from "./components/modal";
// import { toastComponent } from "./components/toastComponent";

//   import Swiper JS
import Swiper, { Navigation, Pagination } from "swiper";
// import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { calcTotalAndLengthOfCart, textContent, updateUICartNumber } from "../../utils/helper";
import ShopApi from "../../api/shopApi";
// Initialization for ES Users

export const swiper = new Swiper(".mySwiper", {
  modules: [Navigation, Pagination],
  // And if we need scrollbar
  scrollbar: {
    el: ".swiper-scrollbar",
  },
  slidesPerView: 1,
  spaceBetween: 10,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  // Navigation arrows
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    "@0.00": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    "@0.75": {
      slidesPerView: 2,
      spaceBetween: 20,
    },
    "@1.00": {
      slidesPerView: 3,
      spaceBetween: 40,
    },
    "@1.50": {
      slidesPerView: 3,
      spaceBetween: 50,
    },
  },
});

export const bannerSwiper = new Swiper(".banner-swiper", {
  modules: [Navigation, Pagination],
  loop: true,
  slidesPerView: 1,
  spaceBetween: 10,
  nagigation: {
    nextEl: ".swiper-button-prev.swiper-button-prev--banner",
    prevEl: ".swiper-button-next.swiper-button-prev--banner",
  },
  pagination: {
    el: ".swiper-banner-pagination",
    clickable: true,
  },
  breakpoints: {
    "@1.5": {
      slidesPerView: 1,
      spaceBetween: 10,
    },
  },
});

(async () => {
  if (!localStorage.getItem("cart")) {
    const cart = {
      cartList: [],
      totalPrice: 0,
    };
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  if (!sessionStorage.getItem("views")) {
    const views = {
      fsdalfjdkslfjdskl: "viewed",
      fsdalfjdkslfjd234: "viewed",
      fslfjdkslfdfdsfkl: "viewed",
      fsd234jdkslfjdskl: "viewed",
    };

    sessionStorage.setItem("views", JSON.stringify(views));
  }

  const initHeader = () => {
    document.getElementById("header").innerHTML = getHeader();
  };

  const initTopHeader = () => {
    document.getElementById("top-header").innerHTML = getTopHeader();
  };

  const initFooter = () => {
    document.getElementById("footer").innerHTML = getFooter();
  };

  const initModal = () => {
    const modalWrapper = document.getElementById("modal-wrapper");

    if (!modalWrapper) return;

    modalWrapper.innerHTML = getModalComponent();
  };

  const initToastComponent = () => {
    const toastComponentEl = document.getElementById("toast-component");
    if (!toastComponentEl) return;
    // toastComponentEl.innerHTML = toastComponent();
  };

  initHeader();
  initTopHeader();
  initModal();
  initFooter();
  initToastComponent();
  const { cart, token, userId } = localStorage;

  // Init cart number ui
  updateUICartNumber();

  // Init User Avatar.

  if (token) {
    const { user, message } = await ShopApi.getUserById(userId);

    const isCorrectedToken = token === user.loginToken;
    const isExpired = new Date(user.loginTokenExpiration).getTime() - Date.now() < 0;

    const isAuthenticated = token && isCorrectedToken && !isExpired;
    console.log("isAuthenticated: ", isAuthenticated);

    if (isAuthenticated) {
      document.getElementById("userAuthenticate").classList.remove("hidden");
      document.getElementById("loginHeaderBtn").classList.add("hidden");
    }
  }
})();
