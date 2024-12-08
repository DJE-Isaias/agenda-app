"use client";

import { getUserFromCookies } from "@/lib/jwt";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
  children?: React.ReactNode;
}

export default function Header({ children }: Props) {
  const [isLogged, setIsLogged] = useState<boolean>(false);
  const pathName = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await fetch(`/api/logout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const loadUser = async () => {
      console.log("here");
      const user = await getUserFromCookies();
      if (user) {
        setIsLogged(true);
      } else {
        setIsLogged(false);
      }
    };
    loadUser();
  }, [pathName]);

  return (
    <header className="flex justify-between bg-primary text-white p-4">
      <h1 className="text-lg font-bold">Agenda App</h1>
      {children}
      {isLogged && (
        <nav
          onClick={handleLogout}
          className="text-white cursor-pointer text-center underline-offset-2 hover:underline"
        >
          Cerrar Sesión
        </nav>
      )}
    </header>
  );
}
