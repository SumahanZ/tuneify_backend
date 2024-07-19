import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
  updatedAt: Date;
  createdAt: Date;
}

const userSchema = new mongoose.Schema(
  {
    email: {
      type: mongoose.Schema.Types.String,
      required: true,
      unique: true,
    },
    name: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    password: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  let user = this as UserDocument;
  if (!user.isModified("password")) return next();

  const salt = await bcrypt.genSalt(parseInt(process.env.SALT_ROUNDS!));
  const hashedPassword = bcrypt.hashSync(user.password, salt);
  user.password = hashedPassword;
  return next();
});

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
