"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import Link from "next/link";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const { message } = await res.json();
        toast.error(message);
        return;
      }

      toast.success("Login exitoso. Redirigiendo...");
      router.push("/contacts");
    } catch (error: unknown) {
      toast.error(`Ocurrió un error. Inténtalo de nuevo: ${error}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4 mt-4 text-center">
        Inicio de Sesión
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Nombre de usuario"
          className="w-full p-2 border rounded"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Contraseña"
          className="w-full p-2 border rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button
          type="submit"
          className="w-full bg-primary text-white py-2 rounded"
        >
          Iniciar Sesión
        </button>
        <div className="flex justify-center">
          <Link href="/register" className="text-primary underline-offset-2 hover:underline text-center">
            ¿Tienes cuenta?
          </Link>
        </div>
      </form>
    </div>
  );
}
