import { createRouter, createWebHistory } from "vue-router";

import admin from "./admin";
import director from "./director";
import notFound from "./notFound";
import student from "./student";
import teacher from "./teacher";
import auth from "./auth";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [auth, admin, director, teacher, student, notFound],
});

export default router;
