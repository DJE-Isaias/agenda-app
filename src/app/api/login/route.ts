import { signToken } from '@/lib/jwt';
import { prisma } from '@/lib/prisma';
import bcrypt from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { username, password } = await req.json();

  const user = await prisma.user.findUnique({ where: { username } });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return NextResponse.json(
      { message: 'Usuario o contraseña incorrectos.' },
      { status: 401 }
    );
  }

  const token = await signToken({ id: user.id, username: user.username });
  const response = NextResponse.json({ message: 'Login exitoso.' });
  response.cookies.set('token', token, { httpOnly: true });
  return response;
}
