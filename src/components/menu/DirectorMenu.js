import {
  mdiAccountGroup,
  mdiCog,
  mdiAccountQuestion,
  mdiAccountTie,
} from "@mdi/js";

export const DirectorMenu = [
  {
    path: "/staffs",
    name: "staffs",
    label: "Staff",
    icon: mdiAccountTie,
  },
  {
    path: "/roles",
    name: "roles",
    label: "Roles",
    icon: mdiAccountQuestion,
  },
  {
    path: "/profile",
    name: "profile",
    label: "Profile",
    icon: mdiCog,
  },
];
