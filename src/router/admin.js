export default {
  path: "/admin",
  name: "admin",
  component: () => import("@/pages/admin/AdminPage.vue"),
  children: [
    {
      path: "/students",
      name: "students",
      component: () => import("@/pages/admin/StudentPage.vue"),
    },
    {
      path: "/groups",
      name: "groups",
      component: () => import("@/pages/admin/GroupPage.vue"),
    },
    {
      path: "/rooms",
      name: "rooms",
      component: () => import("@/pages/admin/RoomPage.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("@/pages/admin/ProfilePage.vue"),
    },
    {
      path: "/courses",
      name: "courses",
      component: () => import("@/pages/admin/CoursePage.vue"),
    },
    {
      path: "/single_group/:id",
      name: "single_group",
      meta: {
        child: "single_group",
      },
      component: () => import("@/pages/admin/SingleGroupPage.vue"),
    },
  ],
  meta: {
    requiresAuth: true,
  },
};
