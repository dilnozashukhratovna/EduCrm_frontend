export default {
  path: "/teacher",
  name: "teacher",
  component: import("@/pages/teacher/TeacherPage.vue"),
  children: [
    {
      path: "/teacher-groups",
      name: "teacher-groups",
      component: import("@/pages/teacher/GroupPage.vue"),
    },
    {
      path: "/profile",
      name: "profile",
      component: () => import("../pages/global/ProfilePage.vue"),
    },
  ],
};
