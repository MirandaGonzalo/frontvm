import { z } from "zod"

export const productSchema = z.object({
    id: z.number().optional(),
    codigo: z
    .string()
    .min(1, 'El Código es obligatorio.'),
    codigo_barra: z
    .string()
    .min(1, 'El Código de Barra es obligatorio.'),
    nombre: z
    .string({ invalid_type_error: 'El Nombre debe ser un texto.' })
    .min(1, 'El Nombre es obligatorio.'),
    descripcion: z
    .string({ invalid_type_error: 'La Descripción debe ser un texto.' })
    .min(1, 'La Descripción es obligatoria.'),
    produccionPropia: z
    .boolean({ 
        invalid_type_error: 'La Propiedad debe ser un booleano.' }),
    pesable: z
    .boolean({ 
        invalid_type_error: 'La Pesabilidad debe ser un booleano.' }),
    estado_articulo: z.string().optional(),
})

export type ProductType = z.infer<typeof productSchema>

