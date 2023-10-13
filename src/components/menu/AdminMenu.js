import {
  mdiAccount,
  mdiAccountGroup,
  mdiDoorOpen,
  mdiCog,
  mdiDoor,
  mdiDoorClosed,
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
];
