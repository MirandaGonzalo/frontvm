// Archivo principal que exporta todos los componentes de tabla
// Mantiene compatibilidad con el código existente

// Importar los componentes
import EditableTable from './EditableTable'
import EditableCell from './EditableCell'

// Re-exportar los tipos y componentes
export type { BasicTableProps } from './BasicTable'
import type { EditableTableProps } from './EditableTable'
export type { EditableCellType, EditableCellProps } from './EditableCell'

// Exportar los componentes
export { EditableCell, EditableTable }

// Para mantener compatibilidad con el código existente, TableBiloProps es ahora EditableTableProps
export type TableBiloProps<T extends object> = EditableTableProps<T>

// Para mantener compatibilidad con el código existente, TableBilo es ahora EditableTable
export { EditableTable as TableBilo }

// Exportar por defecto EditableTable para mantener compatibilidad con el código existente
export default EditableTable