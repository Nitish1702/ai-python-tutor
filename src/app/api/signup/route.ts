import { dbConnect } from "@/lib/dbConnect";
import UserModel from "@/models/User";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";


export async function POST(req: Request) {
  await dbConnect();

  try {
    const { name, email, password } = await req.json();

    if (!name||!email || !password) {
      return NextResponse.json({ error: "Name Email and password are required" }, { status: 400 });
    }

    // Check if the user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: "User already exists" }, { status: 409 });
    }

    // Hash the password before saving it
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user and save it to the database
      await UserModel.create({
        name,
      email,
      password: hashedPassword,
    });

    return NextResponse.json({ message: "User registered successfully" }, { status: 201 });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
