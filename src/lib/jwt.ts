'use server';

import { SignJWT, jwtVerify } from 'jose';
import { prisma } from './prisma';
import { cookies } from 'next/headers';

const SECRET = new TextEncoder().encode(process.env.JWT_SECRET || '');

if (!SECRET) {
  throw new Error('Falta configurar JWT_SECRET en el archivo .env');
}

export async function getUserFromCookies() {
  const cookieStore = await cookies(); // Obtén las cookies disponibles
  const token = cookieStore.get('token')?.value;

  if (!token) {
    return null;
  }

  try {
    // Verificar y decodificar el token
    const decodedToken = await verifyToken(token);

    // Opcional: Validar que el usuario existe en la base de datos
    const user = await prisma.user.findUnique({
      where: { id: decodedToken.id as (undefined | string) },
    });

    return user;
  } catch (error) {
    console.error('Error verificando el token:', error);
    return null;
  }
}

// Generar un token JWT
export async function signToken(payload: object, expiresIn = '1d') {
  const alg = 'HS256';
  const jwt = await new SignJWT({ ...payload })
    .setProtectedHeader({ alg })
    .setExpirationTime(expiresIn) 
    .sign(SECRET);
  return jwt;
}

// Verificar y decodificar un token JWT
export async function verifyToken(token: string) {
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload;
  } catch (error) {
    throw new Error('Token inválido o expirado'  + error);
  }
}
