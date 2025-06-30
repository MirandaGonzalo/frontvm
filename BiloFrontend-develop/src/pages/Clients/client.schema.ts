import { z } from "zod"

export const clientSchema = z.object({
    codigo: z.string().min(1, "El Código es obligatorio."),
    id: z.number().optional(),
    cuit: z
    .string()
    .min(1, 'El CUIT es obligatorio.')
    .refine((val) => val.replace(/\D/g, '').length >= 10, {
        message: 'El CUIT debe tener al menos 10 dígitos.',
    }),
    idTipoDocumento: z.string().min(1,"El Tipo de Documento es obligatorio."),
    tipoDocumento: z.string().optional(),
    dni: z
    .string()
    .min(1, 'El Número de Documento es obligatorio.')
    .regex(/^[^a-zA-Z]*$/, "El Número de Documento no debe contener letras.")
    .refine((val) => val.replace(/\D/g, '').length >= 7, {
        message: 'El Número de Documento debe tener al menos 7 dígitos.',
    }),
    nombre: z.string().min(1, "El Nombre es obligatorio."),
    apellido: z.string().min(1, "El Apellido es obligatorio."),
    idCondicionIva: z.string().min(1, "La Condición de IVA es obligatoria."),
    condicionIva: z.string().optional(),
    telefono: z
    .string()
    .min(1, 'El Número de Teléfono es obligatorio.')
    .refine((val) => val.replace(/\D/g, '').length >= 10, {
        message: 'El Número de Teléfono debe tener al menos 10 dígitos.',
    }),
    email: z.string().min(1, "El Email es obligatorio.").email("El formato del Email es inválido."),
    estado_cliente: z.string().optional(),
    direccion: z.object({
        id: z.number().optional(),
        idLocalidad: z.string().min(1, "La Localidad es obligatoria."),
        localidad: z.string().optional(),
        idProvincia: z.string().min(1, "La Provincia es obligatoria."),
        provincia: z.string().optional(),
        calle: z.string().min(1, "La Calle es obligatoria."),
        numeroCalle: z.string().min(1, "El Número de Calle es obligatorio.").regex(/^[^a-zA-Z]*$/, "El Número de Calle no debe contener letras."),
        piso: z.string().regex(/^[^a-zA-Z]*$/, "El Piso no debe contener letras."),
        departamento: z.string(),
        barrio: z.string(),
    }),
})

export type ClientType = z.infer<typeof clientSchema>

