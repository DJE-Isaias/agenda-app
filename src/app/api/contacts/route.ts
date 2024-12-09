import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookies } from "@/lib/jwt";

export async function GET() {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const contacts = await prisma.contact.findMany({
    where: { userId: user.id },
  });

  return NextResponse.json(contacts);
}

export async function POST(req: NextRequest) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { name, email, phone, comment, socialLinks, image } = data;

    const newContact = await prisma.contact.create({
      data: {
        userId: user.id,
        name,
        email,
        phone,
        comment,
        socialLinks,
        image,
      },
    });

    return NextResponse.json(newContact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Error al crear el contacto: " + error },
      { status: 500 }
    );
  }
}
