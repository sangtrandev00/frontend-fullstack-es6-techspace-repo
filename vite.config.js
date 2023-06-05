// vite.config.js
import { resolve } from "path";
import { defineConfig } from "vite";

const root = resolve(__dirname, "src");
const outDir = resolve(__dirname, "dist");

export default defineConfig({
  root,
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "site", "index.html"),
        shop: resolve(root, "site", "shop.html"),
        productDetail: resolve(root, "site", "detail-product.html"),
        shopCart: resolve(root, "site", "view-cart.html"),
        wishlist: resolve(root, "site", "wishlist.html"),
        orderCompleted: resolve(root, "site", "order-completed.html"),
        checkout: resolve(root, "site", "checkout.html"),
        blogs: resolve(root, "site", "blog-posts.html"),
        login: resolve(root, "site", "login.html"),
        signUp: resolve(root, "site", "signup.html"),
        reset: resolve(root, "site", "reset.html"),
        resetPassword: resolve(root, "site", "reset-password.html"),
        about: resolve(root, "site", "about.html"),
        contact: resolve(root, "site", "contact.html"),
        admin: resolve(root, "admin", "index.html"),
        adminCategories: resolve(root, "admin", "categories.html"),
        adminProducts: resolve(root, "admin", "products.html"),
        adminUsers: resolve(root, "admin", "users.html"),
        adminOrders: resolve(root, "admin", "orders.html"),
        adminLogin: resolve(root, "admin", "login.html"),
      },
    },
  },
});
