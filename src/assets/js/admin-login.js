import AuthApi from "../../api/authApi";

const adminLoginHandler = async () => {
  const loignForm = document.getElementById("admin-login-form");

  if (!loignForm) return;

  loignForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const password = e.target.elements["password"].value;

    const user = {
      email,
      password,
    };

    const { message, token, userId } = await AuthApi.adminLogin(user);

    const expiryDate = Date.now() + 60 * 60 * 1000;

    console.log("Expiry Date", expiryDate);
    console.log(message);
    localStorage.setItem("adminId", userId);
    localStorage.setItem("adminToken", token);
    localStorage.setItem("adminExpiryDate", expiryDate);

    location.assign("./index.html");
  });
};

(async () => {
  await adminLoginHandler();
})();
