import React from "react";
import { SidebarDemo } from "../components/navbar";
import { IconBrandTabler, IconUserBolt, IconSettings, IconArrowLeft } from "@tabler/icons-react";

export const Admin = () => {
  const adminLinks = [
    { label: "Dashboard", href: "/admin/dashboard", icon: <IconBrandTabler /> },
    { label: "Users", href: "/admin/users", icon: <IconUserBolt /> },
    { label: "Settings", href: "/admin/settings", icon: <IconSettings /> },
    { label: "Logout", href: "/logout", icon: <IconArrowLeft /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Sidebar */}
      <SidebarDemo
        links={adminLinks}
        className="h-full w-[300px] bg-white dark:bg-neutral-900 flex-shrink-0"
      />
    </div>
  );
};
