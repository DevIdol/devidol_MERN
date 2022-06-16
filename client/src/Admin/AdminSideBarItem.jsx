import { AccountCircle, Dashboard, PostAdd } from "@material-ui/icons";

export const adminSideBarItem = [
  {
    id: 1,
    link: "/admin/dashboard",
    icon: <Dashboard />,
    name: "Dashboard",
  },
  {
    id: 2,
    link: "/admin/blog",
    icon: <PostAdd />,
    name: "Blog",
  },
  {
    id: 3,
    link: "/admin/account",
    icon: <AccountCircle />,
    name: "Account",
  },
];
