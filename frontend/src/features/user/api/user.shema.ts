import z4 from "zod/v4";
import { UserRoles } from "../../../shared/types/UserRoles.enum";

export const CreateUserShema = z4.object({

    email: z4.email(),
    password: z4.string().min(6),
    name: z4.string()
})

export const GetUserShema = z4.object({
    id: z4.number()
})

const GetManagerPageShema = z4.object({
    page: z4.number(),
    limit: z4.number(),
    managerId: z4.number().optional()
})

export const UserShema = z4.object({
    name: z4.string(),
    id: z4.number(),
    email: z4.email(),
    role: z4.enum(UserRoles)
})

export const MyRoleShema = z4.object({
    role: z4.enum(UserRoles)
})

export const ResponseManagersPagesShema = z4.object({
    managers:  z4.array(UserShema),
    hasMore: z4.boolean()
})

export type UserDto = z4.infer<typeof UserShema>
export type GetManagerDto = z4.infer<typeof GetManagerPageShema>
export type CreateUserDto = z4.infer<typeof CreateUserShema>
export type GetUserDto = z4.infer<typeof GetUserShema>
export type ResponseManagerPagesDto = z4.infer<typeof ResponseManagersPagesShema>
export type MyRoleDto = z4.infer<typeof MyRoleShema>