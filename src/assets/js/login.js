import AuthApi from "../../api/authApi";
import { GoogleAuthProvider, signInWithPopup, FacebookAuthProvider } from "firebase/auth";
import { auth } from "../../firebase/firebase-config";

// // Initialize the Facebook SDK with your app ID
// initializeFacebookSDK("984824306042759");

// // Call the loginWithFacebook function when you want to initiate the login process
// loginWithFacebook(function (response) {
//   if (response.error) {
//     // Handle login error
//     console.log("Error:", response.error);
//   } else {
//     // Login successful
//     console.log("Welcome,", response.name);
//   }
// });

const loginHandler = async () => {
  const loignForm = document.getElementById("login-form");

  if (!loignForm) return;

  loignForm.addEventListener("submit", async (e) => {
    e.preventDefault();
    const email = e.target.elements["email"].value;
    const password = e.target.elements["password"].value;
    const user = {
      email,
      password,
    };

    const { message, token, userId } = await AuthApi.login(user);
    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
    console.log("Expiry Date", expiryDate);
    console.log(message);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expiryDate", expiryDate);

    location.assign("./index.html");
  });
};

const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const { providerId, user } = await signInWithPopup(auth, provider);

    const {
      displayName,
      email,
      phoneNumber,
      photoURL: avatar,
      stsTokenManager: { accessToken, expirationTime, refreshToken },
    } = user;

    const { message, result } = await AuthApi.checkExisingUser({ email, providerId });

    console.log(message, result);

    if (result === "not found") {
      const response = await AuthApi.signup({
        providerId,
        name: displayName,
        email,
        avatar,
        password: "google.com",
        role: "client",
      });

      console.log(response);
    }

    const { mesasge, token, userId } = await AuthApi.googleLogin({ token: accessToken });

    // Login using google Login

    const expiryDate = new Date(Date.now() + 60 * 60 * 1000);
    console.log("Expiry Date", expiryDate);
    localStorage.setItem("userId", userId);
    localStorage.setItem("token", token);
    localStorage.setItem("expiryDate", expiryDate);

    location.href = "index.html";
  } catch (error) {
    // Handle errors
    const errorCode = error.code;
    const errorMessage = error.message;
    console.log("Error:", errorCode, errorMessage);
  }
};

// Function to handle Facebook login
// const signInWithFacebook = async () => {
//   const provider = new FacebookAuthProvider();

//   try {
//     const { user } = await signInWithPopup(auth, provider);

//     console.log(user);

//     // Successful login

//     // Check if the user's Facebook account is already linked to another Firebase account
//     if (user) {
//       // Perform account linking with the existing Firebase account
//       try {
//         const credential = FacebookAuthProvider.credentialFromResult(user);
//         const currentUser = auth.currentUser;

//         await currentUser.linkWithCredential(credential);
//         // Account linking successful
//         console.log("Account linking successful");
//       } catch (linkingError) {
//         // Account linking failed
//         console.log("Account linking failed", linkingError);
//       }
//     } else {
//       console.log("No user found!!!");
//     }
//   } catch (error) {
//     // Handle other login errors
//     console.log("Error:", error.code, error.message);
//   }
// };

const automateLogout = () => {
  const now = new Date();

  const expiryDate = localStorage.getItem("expiryDate");
  if (now > expiryDate) {
    localStorage.removeItem("expiryDate");
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  }
};

const logoutHandler = async () => {};

const signupHandler = async () => {};

const googleLoginHandler = () => {
  const googleSignInBtn = document.getElementById("google-signin-btn");

  if (!googleSignInBtn) return;

  googleSignInBtn.addEventListener("click", (e) => {
    signInWithGoogle();
  });
};

// const facebookLoginHandler = () => {
//   const facebookSignInBtn = document.getElementById("facebook-signin-btn");

//   if (!facebookSignInBtn) return;

//   facebookSignInBtn.addEventListener("click", (e) => {
//     signInWithFacebook();
//   });
// };

(async () => {
  automateLogout();
  await loginHandler();
  googleLoginHandler();
})();

// facebookLoginHandler();
