export default {
  path: "/director",
  name: "director",
  component: import("@/pages/director/DirectorPage.vue"),
  meta: {
    requiresAuth: true,
  },
  children: [
    {
      path: "/staffs",
      name: "staffs",
      component: import("@/pages/director/StaffPage.vue"),
    },
    {
      path: "/roles",
      name: "roles",
      component: import("@/pages/director/RolesPage.vue"),
    },
  ],
};
