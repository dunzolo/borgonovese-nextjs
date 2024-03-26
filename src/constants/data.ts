import { NavItem } from "@/types";

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Squadre",
    href: "/admin/squad",
    icon: "user",
    label: "squadre",
  },
  {
    title: "Match",
    href: "/admin/match",
    icon: "trophy",
    label: "match",
  },
  // {
  //   title: "Profile",
  //   href: "/dashboard/profile",
  //   icon: "profile",
  //   label: "profile",
  // },
  // {
  //   title: "Kanban",
  //   href: "/dashboard/kanban",
  //   icon: "kanban",
  //   label: "kanban",
  // },
  // {
  //   title: "Login",
  //   href: "/",
  //   icon: "login",
  //   label: "login",
  // },
];

export const navItemsRoot: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: "home",
    label: "Home",
  },
];

export const footerAdminItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/admin",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Aggiungi",
    href: "/admin/match/update",
    icon: "pencil",
    label: "Aggiungi",
  },
];
