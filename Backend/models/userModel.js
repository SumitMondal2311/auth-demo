import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
});

const UserModel = mongoose.model("users", UserSchema);

export { UserModel };
