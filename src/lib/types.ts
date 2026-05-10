import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string(),
    email: z.string().email(),
    profile_pic_url: z.string().url().optional()
})

export const SigninSchema = CreateUserSchema.pick({
    username: true,
    password: true,
})


