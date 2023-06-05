import AuthApi from "../../api/authApi";
import { auth } from "../../firebase/firebase-config";
import { GoogleAuthProvider } from "firebase/auth";

const signupHandler = async () => {
  const signupForm = document.getElementById("signup-form");
  console.log(signupForm);
  if (!signupForm) return;

  signupForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const fullName = e.target.elements["fullName"].value;
    const password = e.target.elements["password"].value;
    const repassword = e.target.elements["repassword"].value;

    if (password !== repassword) {
      console.log("Please enter re password again!");

      // Validate here
      return;
    }

    const user = {
      email,
      name: fullName,
      password,
      role: "client",
    };

    const { message, userId } = await AuthApi.signup(user);

    console.log(message, userId);

    if (userId) {
      location.assign("./login.html");
    }
  });
};

const signupWithGoogle = async () => {};

async () => {
  await signupHandler();
};
