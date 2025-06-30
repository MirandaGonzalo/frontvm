import { z } from "zod"

export const loginSchema = z.object({
    username: z.string().min(1, "Ingresá tu nombre de usuario"),
    password: z.string().min(1, "Ingresá tu contraseña"),
})

export type LoginType = z.infer<typeof loginSchema>