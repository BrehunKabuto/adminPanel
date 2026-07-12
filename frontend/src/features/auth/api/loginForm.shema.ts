import z4 from "zod/v4";

export const LoginFormShema = z4.object({

    email: z4.email("not valid email"),
    password: z4.string().min(6, "password must be long 6 characters")
})

export type LoginFormDto = z4.infer<typeof LoginFormShema>  