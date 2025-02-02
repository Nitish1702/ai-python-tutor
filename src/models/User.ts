import mongoose, { Schema, Document } from "mongoose";
import bcrypt from "bcryptjs";


// User schema definition


interface User extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: string;
  apiKey?: string;
}

const UserSchema = new Schema<User>({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  avatar: { type: String }, // Store avatar path
  apiKey: { type: String }, // Gemini API key storage
});



// Middleware to hash password before saving
UserSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

// Method to compare passwords
UserSchema.methods.comparePassword = function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

// User model
const UserModel = mongoose.models.User || mongoose.model<User>("User", UserSchema);

export default UserModel;
