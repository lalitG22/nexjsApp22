"use client";
import Footer from "@/componets/footer";
import Header from "@/componets/header";
import React, { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { status } = useSession();

  return (
    <div>
      {status === "authenticated" ? (
        <>
          <Header />
          <section className="mainbody">{children}</section>
          {/* <Footer /> */}
        </>
      ) : (
        <section className="mainbody">{children}</section>
      )}
    </div>
  );
};

export default Layout;
