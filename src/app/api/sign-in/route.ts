
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { dbConnect } from "@/lib/dbConnect"; // Assuming you have a DB connection utility
import UserModel from "@/models/User"; // Your User model
import { NextResponse } from "next/server";

// Secret key for JWT (use ENV variables in production)
const JWT_SECRET = process.env.NEXT_PUBLIC_JWT_SECRET ;

export async function POST(req: Request) {
  const { email, password } = await req.json();

  // Validate input
  if (!email || !password) {
    return NextResponse.json(
      { success: false, message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Connect to the database
    await dbConnect();

    // Find user by email in the database
    const user = await UserModel.findOne({ email });
    if (!user) {
      console.log(email, "emai-----------------------");
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 401 }
      );
    }

    // Compare the hashed password with the password provided in the request
    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log(isMatch, "Ismatch-----------------------");
      return NextResponse.json(
        { error: "Invalid Credentials" },
        { status: 400 }
      );
    }

    // Generate JWT token (with user details in the payload)
    if (!JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined");
    }
    const token = jwt.sign({ email: user.email, id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    return NextResponse.json(
      { message: "User LoggedIn successfully", token, email: user.email },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging in user:", error);
    return NextResponse.json({ message: "Internal Srver" }, { status: 500 });
  }
}
