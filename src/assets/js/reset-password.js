import AuthApi from "../../api/authApi";

const updatePassword = async () => {
  const resetPasswordForm = document.getElementById("reset-password-form");

  if (!resetPasswordForm) return;

  resetPasswordForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const url = new URL(location.href);
    const passwordToken = url.searchParams.get("token");
    const password = e.target.elements["password"].value;
    const { userId } = JSON.parse(localStorage.getItem("user"));

    const response = await AuthApi.updatePassword({ password, passwordToken, userId });

    if (response) {
      // location.assign("./login.html");
      // Change to another method!!

      // Define a function here to reuse!!!
      const redirectTimer = Date.now() + 5 * 1000;

      setInterval(() => {
        // Render to UI here!!! when have enough time!!!
        console.log("Redirect after: ", Math.trunc((redirectTimer - Date.now()) / 1000));

        if (Math.trunc((redirectTimer - Date.now()) / 1000) === 0) {
          location.assign("./login.html");
        }
      }, 1000);
    }
  });
};

export const timerRedirect = (timeCount, urlRedirect) => {
  // Define a function here to reuse!!!
  const redirectTimer = Date.now() + timeCount * 1000;

  setInterval(() => {
    // Render to UI here!!! when have enough time!!!
    console.log("Redirect after: ", Math.trunc((redirectTimer - Date.now()) / 1000));

    if (Math.trunc((redirectTimer - Date.now()) / 1000) === 0) {
      location.assign(urlRedirect);
    }
  }, 1000);
};

(async () => {
  await updatePassword();
})();
