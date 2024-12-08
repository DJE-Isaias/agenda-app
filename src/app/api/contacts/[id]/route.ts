import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getUserFromCookies } from "@/lib/jwt";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  const contact = await prisma.contact.findUnique({
    where: { id: params.id },
  });

  if (!contact || contact.userId !== user.id) {
    return NextResponse.json({ error: "No encontrado" }, { status: 404 });
  }

  return NextResponse.json(contact);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const data = await req.json();
    const { name, email, phone, comment, socialLinks, image } = data;

    const updatedContact = await prisma.contact.update({
      where: { id: params.id },
      data: {
        name,
        email,
        phone,
        comment,
        socialLinks: JSON.stringify(socialLinks),
        image,
      },
    });

    return NextResponse.json(updatedContact);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al actualizar el contacto: " + error },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const user = await getUserFromCookies();

  if (!user) {
    return NextResponse.json({ error: "No autorizado" }, { status: 401 });
  }

  try {
    const deletedContact = await prisma.contact.delete({
      where: { id: params.id },
    });

    return NextResponse.json(deletedContact);
  } catch (error) {
    return NextResponse.json(
      { error: "Error al eliminar el contacto: " + error },
      { status: 500 }
    );
  }
}
