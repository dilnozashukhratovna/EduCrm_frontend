import {
  mdiAccount,
  mdiAccountGroup,
  mdiDoorOpen,
  mdiCog,
  mdiDoor,
  mdiGolf,
} from "@mdi/js";

export const AdminMenu = [
  {
    path: "/students",
    name: "students",
    label: "Students",
    icon: mdiAccount,
  },
  {
    path: "/groups",
    name: "groups",
    label: "Groups",
    keys: "single_group",
    icon: mdiAccountGroup,
  },
  {
    path: "/rooms",
    name: "rooms",
    label: "Rooms",
    icon: mdiDoorOpen,
  },
  {
    path: "/courses",
    name: "courses",
    label: "Courses",
    icon: mdiGolf,
  },
  {
    path: "/profile",
    name: "profile",
    label: "Profile",
    icon: mdiCog,
  },
];
