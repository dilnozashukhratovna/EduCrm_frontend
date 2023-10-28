import { mdiCog, mdiAccountSupervisor } from "@mdi/js";

export const TeacherMenu = [
  {
    path: "/teacher-groups",
    name: "teacher-groups",
    label: "Groups",
    keys: "teacher_single_group",
    icon: mdiAccountSupervisor,
  },
  {
    path: "/profile",
    name: "profile",
    label: "Profile",
    icon: mdiCog,
  },
];
