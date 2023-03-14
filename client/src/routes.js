import React from "react";

import { Icon } from "@chakra-ui/react";
import {
  MdBarChart,
  MdPerson,
  MdHome,
  MdLock,
  MdOutlineShoppingCart,
  MdPayments
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import NFTMarketplace from "views/admin/marketplace";
import Profile from "views/admin/profile";
import DataTables from "views/admin/dataTables";

// Auth Imports
import SignInCentered from "views/auth/signIn";
import Workers from "views/admin/workers";
import Notify from "views/admin/notify";
import Invoices from "views/admin/invoices";

const routes = [
  {
    name: "Panel główny",
    layout: "/admin",
    path: "/panel",
    icon: <Icon as={MdHome} width='20px' height='20px' color='inherit' />,
    component: MainDashboard,
  },
  {
    name: "NFT Marketplace",
    layout: "/admin",
    path: "/nft-marketplace",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width='20px'
        height='20px'
        color='inherit'
      />
    ),
    component: NFTMarketplace,
    secondary: true,
  },
  {
    name: "Data Tables",
    layout: "/admin",
    icon: <Icon as={MdBarChart} width='20px' height='20px' color='inherit' />,
    path: "/data-tables",
    component: DataTables,
  },
  {
    name: "Faktury",
    layout: "/admin",
    path: "/faktury",
    role: "0",
    icon: <Icon as={MdPayments} width='20px' height='20px' color='inherit' />,
    component: Invoices,
  },
  {
    name: "Profil",
    layout: "/admin",
    path: "/profile",
    role: "0",
    icon: <Icon as={MdPerson} width='20px' height='20px' color='inherit' />,
    component: Profile,
  },
  {
    name: "Sign In",
    layout: "/auth",
    path: "/sign-in",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: SignInCentered,
    notVisible: true
  },
  {
    name: "Pracownicy",
    layout: "/admin",
    path: "/workers",
    role:"10",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: Workers,
    // notVisible: true
  },
  {
    name: "Powiadomienia",
    layout: "/admin",
    path: "/notify",
    role:"10",
    icon: <Icon as={MdLock} width='20px' height='20px' color='inherit' />,
    component: Notify,
    // notVisible: true
  },

];

export default routes;
