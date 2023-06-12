import "flowbite";

import { Chart, initTE, Modal, Ripple, Toast, Tab } from "tw-elements";
import UsersApi from "../../api/usersApi";
import { imageContent, textContent } from "../../utils/helper";
import { BACKEND_URL } from "../../constant/backend-domain";

initTE({ Modal, Ripple, Toast, Tab });

const { adminId, adminToken, adminExpiryDate } = localStorage;

const authenticateAdmin = async () => {
  try {
    const { user: admin, message } = await UsersApi.getById(adminId);

    const { _id, name, avatar, email, role, loginToken, loginTokenExpiration } = admin;

    const imageUrl = avatar.startsWith("https://") ? avatar : `${BACKEND_URL}/${avatar}`;

    const isCorrectToken = adminToken === loginToken;
    const isExpired = new Date(loginTokenExpiration).getTime() - Date.now() < 0;

    const isAuthenticated = adminToken && isCorrectToken && !isExpired;

    console.log("isAuthenticated", isAuthenticated);

    if (isAuthenticated) {
      textContent("adminName", `${name}`);
      textContent("adminEmail", `${email}`);
      imageContent("adminAvatar", imageUrl, name);
    } else {
      location.href = "/login.html";
    }
  } catch (error) {
    console.log(error);
  }
};

const adminLogoutHandler = async () => {
  const logoutBtn = document.getElementById("admin-logout-btn");
  if (!logoutBtn) return;

  logoutBtn.addEventListener("click", (e) => {
    e.preventDefault();
    logout();
  });
};

const automateLogout = async () => {
  // console.log(date - )

  setInterval(() => {
    const timerOut = Math.trunc((adminExpiryDate - Date.now()) / 1000);

    if (timerOut <= 0) {
      logout();
    }
  }, 1000);

  setTimeout(() => {});
};

const logout = () => {
  localStorage.removeItem("adminExpiryDate");
  localStorage.removeItem("adminToken");
  localStorage.removeItem("adminId");

  location.assign("./login.html");
};

(async () => {
  await authenticateAdmin();
  await adminLogoutHandler();
  await automateLogout();
})();
