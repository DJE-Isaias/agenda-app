"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Header from "./Header";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split("; ")
      .find((row) => row.startsWith("token="))
      ?.split("=")[1];
    if (!token) {
      router.push("/");
    }
  }, [router]);

  return (
    <>
      <Header />
      <main className="p-4">{children}</main>
    </>
  );
}
