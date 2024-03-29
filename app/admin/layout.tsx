import type { Metadata } from "next";
import "./globals.css";
import GlobalStateManager from "@/Utils/GlobalStateManager";
import SidebarMenu from "@/Utils/SidebarMenu";
import HeaderComponent from "@/Utils/HeaderComponent";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <GlobalStateManager>
      <div className="md:w-[18vw] h-screen">
        <SidebarMenu />
      </div>
      <div
        className={`overflow-y-auto lg:w-[80vw] md:w-[73vw] w-screen lg:ml-2 md:ml-20`}
      >
        <HeaderComponent />
        {children}
      </div>
    </GlobalStateManager>
  );
}
