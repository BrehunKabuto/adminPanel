import z4 from "zod/v4";



export const AccessTokenShema = z4.object({
    accessToken: z4.string()
})

export type AccessTokenDto = z4.infer<typeof AccessTokenShema>