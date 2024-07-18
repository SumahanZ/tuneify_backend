import { omit } from "lodash";
import { UserBody, UserDocument, UserModel } from "./user_model";
import { FilterQuery } from "mongoose";
import bcrypt from "bcrypt";
import log from "../../utils/logger";

export async function createUser(input: UserBody) {
  try {
    const createdUser = await UserModel.create(input);
    if (!createdUser) throw new Error("User created unsuccessfully!");
    return omit(createdUser, "password");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function findUser(query: FilterQuery<UserDocument>) {
  try {
    const foundUser = await UserModel.find(query).lean();
    if (!foundUser) throw new Error("User not found!");
    return omit(foundUser, "password");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function findUserById(userId: number) {
  try {
    const foundUser = await UserModel.findById(userId).lean();
    if (!foundUser) throw new Error("User not found!");
    return omit(foundUser, "password");
  } catch (err: any) {
    throw new Error(err);
  }
}

export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  try {
    const user = await UserModel.findOne({ email });
    if (!user) return false;
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) return false;
    return omit(user.toJSON(), "password");
  } catch (err: any) {
    log.error(err);
    throw new Error(err);
  }
}
