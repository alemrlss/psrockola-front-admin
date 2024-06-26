/* eslint-disable react/prop-types */
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import { useTranslation } from "react-i18next";
import SidebarItem from "./SidebarItem";
import SidebarItemCollapse from "./SidebarItemCollapse";
import DashboardIcon from "@mui/icons-material/Dashboard";
import PeopleIcon from "@mui/icons-material/People";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import BusinessIcon from "@mui/icons-material/Business";
import PersonIcon from "@mui/icons-material/Person";
import SupervisorAccountIcon from "@mui/icons-material/SupervisorAccount";
import LogoutIcon from "@mui/icons-material/Logout";
import SidebarItemLogout from "./SidebarItemLogout";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { useState } from "react";

function Sidebar({ handleDrawerToggle }) {
  const { t } = useTranslation();

  const [activeItem, setActiveItem] = useState("dashboard");
  const handleItemClick = (itemId) => {
    console.log(itemId);
    setActiveItem(itemId);
    handleDrawerToggle();
  };

  const menuItems = [
    {
      id: "dashboard",
      translationKey: "menu_dashboard",
      icon: <DashboardIcon />,
      subItems: null,
    },
    {
      id: "users",
      translationKey: "menu_users",
      icon: <PeopleIcon />,
      subItems: [
        {
          id: "companies",
          translationKey: "menu_companies",
          icon: <BusinessIcon />,
        },
        {
          id: "clients",
          translationKey: "menu_clients",
          icon: <PersonIcon />,
        },
        {
          id: "moderators",
          translationKey: "menu_moderators",
          icon: <SupervisorAccountIcon />,
        },
        {
          id: "distributors",
          translationKey: "menu_distributors",
          icon: <SupervisorAccountIcon />,
        },
        {
          id: "create-user",
          translationKey: "Crear",
          icon: <DashboardIcon />,
        },
      ],
    },
    {
      id: "transactions",
      translationKey: "menu_transactions",
      icon: <MonetizationOnIcon />,
    },
    {
      id: "memberships",
      translationKey: "menu_memberships",
      icon: <AccountBalanceIcon />,
      subItems: [
        {
          id: "companies",
          translationKey: "Companies",
          icon: <BusinessIcon />,
          subItems: [
            {
              id: "create",
              translationKey: "menu_membership_create",
              icon: <BusinessIcon />,
            },
            {
              id: "edit",
              translationKey: "menu_membership_edit",
              icon: <PersonIcon />,
            },
            {
              id: "eliminated",
              translationKey: "menu_membership_eliminated",
              icon: <PersonIcon />,
            },
          ],
        },
        {
          id: "distributors",
          translationKey: "Distributors",
          icon: <PersonIcon />,
          subItems: [
            {
              id: "create-membership",
              translationKey: "menu_membership_create",
              icon: <BusinessIcon />,
            },
            {
              id: "edit-membership",
              translationKey: "menu_membership_edit",
              icon: <PersonIcon />,
            },
            {
              id: "eliminated-membership",
              translationKey: "menu_membership_eliminated",
              icon: <PersonIcon />,
            },
          ],
        },
      ],
    },

    {
      id: "ubications",
      translationKey: "menu_ubications",
      icon: <AccountBalanceIcon />,
      subItems: [
        {
          id: "country",
          translationKey: "menu_ubications_country",
          icon: <BusinessIcon />,
        },
        {
          id: "state",
          translationKey: "menu_ubications_state",
          icon: <PersonIcon />,
        },
        {
          id: "city",
          translationKey: "menu_ubications_city",
          icon: <PersonIcon />,
        },
      ],
    },
    {
      id: "packages",
      translationKey: "menut_packages",
      icon: <MonetizationOnIcon />,
      subItems: [
        {
          id: "create-package",
          translationKey: "menu_package_create",
          icon: <BusinessIcon />,
        },
        {
          id: "list",
          translationKey: "menu_package_list",
          icon: <PersonIcon />,
        },
      ],
    },
  ];

  return (
    <div className="bg-[#555CB3] overflow-y-auto h-full flex flex-col">
      <div className="flex mx-8 justify-center items-center space-x-2 my-8">
        <img src="/logo.png" className="h-12 w-12" alt="" />
        <h2
          style={{ textShadow: "2px 2px 1px #B45946", color: "white" }}
          className="font-semibold text-white text-xl tracking-widest text-shadow-lg"
        >
          PSROCKOLA
        </h2>
      </div>
      <Divider />
      <List>
        {menuItems.map((item, index) =>
          item.subItems ? (
            <SidebarItemCollapse
              item={item}
              t={t}
              key={index}
              handleDrawerToggle={handleDrawerToggle}
              handleItemClick={handleItemClick}
              activeItem={activeItem}
            />
          ) : (
            <SidebarItem
              item={item}
              t={t}
              key={index}
              handleDrawerToggle={handleDrawerToggle}
              handleItemClick={handleItemClick}
              activeItem={activeItem}
            />
          )
        )}
      </List>
      <div className="mt-auto mb-5">
        <SidebarItemLogout
          item={{
            id: "logout",
            translationKey: "menu_logout",
            icon: <LogoutIcon />,
            subItems: null,
          }}
          t={t}
        />
      </div>
    </div>
  );
}

export default Sidebar;
