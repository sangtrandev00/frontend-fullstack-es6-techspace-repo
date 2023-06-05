// // FacebookLogin.js

// export function initializeFacebookSDK(appId) {
//   window.fbAsyncInit = function () {
//     FB.init({
//       appId: appId,
//       cookie: true,
//       xfbml: true,
//       version: "v17.0",
//     });
//   };

//   // Load the Facebook SDK asynchronously
//   function loadFacebookSDK() {
//     const js = document.createElement("script");
//     js.id = "facebook-jssdk";
//     js.src = "https://connect.facebook.net/en_US/sdk.js";
//     js.onload = function () {
//       FB = window.FB;
//       window.fbAsyncInit();
//     };
//     document.head.appendChild(js);
//   }

//   if (window.FB) {
//     window.fbAsyncInit();
//   } else {
//     loadFacebookSDK();
//   }
// }

// export function loginWithFacebook(callback) {
//   function statusChangeCallback(response) {
//     console.log("statusChangeCallback");
//     console.log(response);
//     if (response.status === "connected") {
//       testAPI(callback);
//     } else {
//       callback({ error: "Not logged in" });
//     }
//   }

//   function checkLoginState() {
//     FB.getLoginStatus(function (response) {
//       statusChangeCallback(response);
//     });
//   }

//   function testAPI(callback) {
//     console.log("Welcome! Fetching your information....");
//     FB.api("/me", function (response) {
//       console.log("Information:", response);
//       console.log("Successful login for: " + response.name);
//       callback({ name: response.name });
//     });
//   }

//   FB.getLoginStatus(function (response) {
//     statusChangeCallback(response);
//   });
// }
