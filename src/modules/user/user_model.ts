import mongoose, { InferSchemaType } from "mongoose";
import bcrypt from "bcrypt";
import env from "../../env";

export interface UserInput {
  email: string;
  name: string;
  password: string;
}

export type UserDocument = InferSchemaType<typeof userSchema>;

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
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(env.SALT_ROUNDS);
  const hashedPassword = bcrypt.hashSync(this.password, salt);
  this.password = hashedPassword;
  return next();
});

export const UserModel = mongoose.model<UserDocument>("User", userSchema);
