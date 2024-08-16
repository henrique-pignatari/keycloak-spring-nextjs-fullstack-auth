"use client";

import { withRoles } from "@/hocs/withRoles";

interface AdminLayoutProps {
  children: React.ReactNode;
}

function AdminLayout({ children }: AdminLayoutProps) {
  return <div className="">{children}</div>;
}

export default withRoles(AdminLayout, ["ADMIN"]);
