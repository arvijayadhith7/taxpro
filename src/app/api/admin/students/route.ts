import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const students = await prisma.user.findMany({
      where: {
        role: "TAXPAYER",
      },
      select: {
        id: true,
        pan: true,
        name: true,
        email: true,
        createdAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ data: students });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { pan, name, password, email } = body;

    if (!pan || !name || !password) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    // Check if PAN already exists
    const existingUser = await prisma.user.findUnique({
      where: { pan: pan.toUpperCase() },
    });

    if (existingUser) {
      return NextResponse.json({ error: "PAN already registered" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newStudent = await prisma.user.create({
      data: {
        pan: pan.toUpperCase(),
        name,
        password: hashedPassword,
        email: email || `${name.toLowerCase().replace(/\s+/g, "")}@example.com`,
        role: "TAXPAYER",
      },
    });

    return NextResponse.json({
      message: "Student user created successfully",
      data: {
        id: newStudent.id,
        pan: newStudent.pan,
        name: newStudent.name,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== "ADMIN") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Missing student ID" }, { status: 400 });
    }

    await prisma.user.delete({
      where: { id },
    });

    return NextResponse.json({ message: "Student deleted successfully" });
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
