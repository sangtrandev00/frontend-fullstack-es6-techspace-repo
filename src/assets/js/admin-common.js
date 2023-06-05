import { getTopHeader } from "./components/admin-header";
import getSidebar from "./components/admin-sidebar";
// import { toastComponent } from "./components/toastComponent";

// IFFEE
(() => {
  const initSidebar = () => {
    document.getElementById("sidebar").innerHTML = getSidebar();
  };

  const initTopHeader = () => {
    document.getElementById("top-header").innerHTML = getTopHeader();
  };

  // const initToastComponent = () => {
  //   document.getElementById("toast-component")?.innerHTML = toastComponent();
  // };

  initTopHeader();
  initSidebar();
  // initToastComponent();
})();
