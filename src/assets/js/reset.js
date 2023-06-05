import AuthApi from "../../api/authApi";
import { showToast } from "../../utils/helper";

const resetPassword = async () => {
  const resetForm = document.getElementById("reset-form");

  if (!resetForm) return;

  resetForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    console.log("submit reset password");

    const email = e.target.elements["email"].value;

    try {
      const response = await AuthApi.sendEmailReset({ email });
      console.log(response);

      const {
        message,
        user: { _id },
      } = response;

      localStorage.setItem(
        "user",
        JSON.stringify({
          email,
          userId: _id,
        })
      );

      console.log("submit sending email to reset password");

      console.log("user token: ", localStorage.getItem("user"));
    } catch (error) {
      console.log(error.response.status);

      if (error.response.status === 402) {
        showToast("");
      }
    }
  });
};

(async () => {
  await resetPassword();
})();
