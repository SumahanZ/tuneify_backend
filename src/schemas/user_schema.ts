import { z, object, string } from "zod";

export const createUserInputSchema = object({
  body: object({
    name: string({
      required_error: "Name is required",
    }),
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short -  should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export const loginUserInputSchema = object({
  body: object({
    password: string({
      required_error: "Password is required",
    }).min(6, "Password too short -  should be 6 chars minimum"),
    email: string({
      required_error: "Email is required",
    }).email("Not a valid email"),
  }),
});

export type CreateUserInput = z.infer<typeof createUserInputSchema>;
export type LoginUserInput = z.infer<typeof loginUserInputSchema>;
