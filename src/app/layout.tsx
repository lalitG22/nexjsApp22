import type { Metadata } from "next";
import "@/app/styles/globals.css";
import SessionWrapper from "@/componets/utility/session";
import Layout from "@/views/Layout";

export const metadata: Metadata = {
  title: "E-commerce",
  description: "E-commerce Web Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionWrapper>
          <Layout children={children} />
        </SessionWrapper>
      </body>
    </html>
  );
}
