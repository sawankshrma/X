import { z } from "zod";

export const CreateUserSchema = z.object({
    username: z.string().min(3).max(20),
    password: z.string().min(5).max(20),
    email: z.email(),
    profile_pic_url: z.url().optional()
})

export const SigninSchema = CreateUserSchema.pick({
    username: true,
    password: true,
})


