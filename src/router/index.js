import { createRouter, createWebHistory } from "vue-router";

import admin from "./admin";
import director from "./director";
import notFound from "./notFound";
import student from "./student";
import teacher from "./teacher";
import auth from "./auth";
import NProgress from "nprogress";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [auth, admin, director, teacher, student, notFound],
});

// ================= NProgress Start ================
router.beforeResolve((to, from, next) => {
  NProgress.start();
  next();
});

// router.beforeEach((to, from, next) => {
//   const token = localStorage.getItem("token");

//   if (to.path.includes("/")) {
//     if (!token) {
//       return next();
//     } else if (token) {
//       return next({ name: "students" });
//     }
//   } else if (token) {
//     return next();
//   } else {
//     return next({ name: "auth" });
//   }
//   return next();
// });

router.afterEach(() => {
  NProgress.done();
});

export default router;
