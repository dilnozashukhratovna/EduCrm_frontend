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
    {
      path: "/teacher_single_group/:id",
      name: "teacher_single_group",
      meta: {
        child: "teacher_single_group",
      },
      component: () => import("@/pages/teacher/SingleGroupPage.vue"),
    },
  ],
};
