import {
  Carousel,
  initTE,
  Collapse,
  Dropdown,
  Sidenav,
  Select,
  Input,
  Modal,
  Ripple,
  Toast,
} from "tw-elements";
// Initialization for ES Users

initTE({ Collapse, Dropdown, Carousel, Sidenav, Select, Input, Modal, Ripple, Toast }, true);
// Initialization for ES Users

// initTE({ Carousel }, true ); // set second parameter to true if you want to use a debugger
import UsersApi from "../../api/usersApi";
import { imageContent, textContent } from "../../utils/helper";
import ShopApi from "../../api/shopApi";
import { BACKEND_URL } from "../../constant/backend-domain";

const loginHeaderBtn = document.getElementById("loginHeaderBtn");

const checkAuthenticate = async () => {
  const userAuthenticate = document.getElementById("userAuthenticate");
  console.log(userAuthenticate);

  try {
    const userId = localStorage.getItem("userId");
    if (!userId) return;
    const { user, message } = await ShopApi.getUserById(userId);

    const { name, avatar, email } = user;
    const avatarUrl = avatar.startsWith("https://") ? avatar : `${BACKEND_URL}/${avatar}`;
    // console.log(userAuthenticate.classList);
    // userAuthenticate.classList.remove("hidden");
    // userAuthenticate.classList.add("flex");

    textContent("userName", `Welcome: ${name}`);
    imageContent("userAvatar", avatarUrl, name);
  } catch (error) {
    console.log(error);

    // Handle error here.
  }

  if (!userAuthenticate) return;
};

const logoutHandler = async () => {
  const logoutBtn = document.getElementById("logoutBtn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");

    location.assign("./login.html");
  });
};

(async () => {
  await checkAuthenticate();
  await logoutHandler();
})();
