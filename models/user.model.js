import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 2,
      maxLength: 50,
    },
    email: {
      type: String,
      required: [true, "User Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/\S+@\S+\.\S+/, "Please fill a valid email address"],
    },
    password: {
      type: String,
      required: [true, "User name is required"],
      minLength: 6,
    },
  },
  { timestamps: true }
);

const User = mongoose.modelNames("User", userSchema);

export default User;

// User.create(docs:{})
// { name: "John Doe", email:"johnny@email.com", password:"password" }
