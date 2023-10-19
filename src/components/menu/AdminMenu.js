import {
  mdiAccount,
  mdiAccountGroup,
  mdiDoorOpen,
  mdiCog,
  mdiDoor,
  mdiDoorClosed,
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
    icon: mdiDoor,
  },
  {
    path: "/profile",
    name: "profile",
    label: "Profile",
    icon: mdiCog,
  },
  {
    path: "/courses",
    name: "courses",
    label: "Courses",
    icon: mdiGolf,
  },
];
