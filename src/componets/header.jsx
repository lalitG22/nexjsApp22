"use client";
import React from "react";
import { signOut, useSession } from "next-auth/react";

const Header = () => {
    const { status } = useSession();

  console.log("status : ", status);

  const logout = async () => {
    await signOut({ callbackUrl: "/login", portno: 3000 });
  };

  return (
    <header>
      <h2>KUSHAPP</h2>
      <div>
        <button className="btn" onClick={logout}>
          Logout
        </button>
      </div>
    </header>
  );
};

export default Header;
