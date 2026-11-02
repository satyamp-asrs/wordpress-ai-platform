import { prisma } from "@/lib/prisma";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        email: "satyam.p@asrsbot.com",
      },
    });

    if (existingUser) {
      return NextResponse.json({
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(
      "Admin@123",
      10
    );

    const user = await prisma.user.create({
      data: {
        name: "Satyam",
        email: "satyam.p@asrsbot.com",
        password: hashedPassword,
        role: "SUPER_ADMIN",
      },
    });

    return NextResponse.json({
      success: true,
      user,
    });
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to create user",
      },
      {
        status: 500,
      }
    );
  }
}