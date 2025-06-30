import { useMemo } from 'react'
import {
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { EditIcon, DeleteIcon } from '@chakra-ui/icons'
import type { ColumnDef, Row } from '@tanstack/react-table'
import BasicTable from './BasicTable'
import type { BasicTableProps } from './BasicTable'

// Props para la tabla editable
export interface EditableTableProps<T extends object> extends BasicTableProps<T> {
  showActionColumn?: boolean // Mostrar la columna de acciones con botones editar/eliminar
  onEdit?: (row: Row<T>) => void // Callback para acción de editar
  onDelete?: (row: Row<T>) => void // Callback para acción de eliminar
}

/**
 * Componente EditableTable - Tabla con capacidades de edición
 * 
 * Extiende BasicTable y agrega funcionalidades para editar y eliminar filas
 */
export const EditableTable = <T extends object>(props: EditableTableProps<T>): JSX.Element => {
  const {
    columns,
    showActionColumn = false,
    onEdit,
    onDelete,
    ...restProps
  } = props

  // Agregar columna de acciones si es necesario
  const tableColumns = useMemo(() => {
    if (!showActionColumn) return columns

    // Colores para los botones
    const editBgHover = useColorModeValue('blue.50', 'blue.900')
    const deleteBgHover = useColorModeValue('red.50', 'red.900')

    return [
      ...columns,
      {
        id: 'actions',
        //header: 'Acciones',
        cell: ({ row }) => (
          <HStack spacing={2} justifyContent="center">
            {onEdit && (
              <Tooltip label="Editar" placement="top" bg="dark.600" hasArrow>
                <IconButton
                  aria-label="Editar"
                  icon={<EditIcon boxSize={"1.6rem"}/> }
                  size="lg"
                  colorScheme="blue"
                  variant="ghost"
                  _hover={{ bg: editBgHover }}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    onEdit(row)
                  }}
                />
              </Tooltip>
            )}
            {onDelete && (
              <Tooltip label="Eliminar" placement="top" bg="dark.600" hasArrow>
                <IconButton
                  aria-label="Eliminar"
                  icon={<DeleteIcon boxSize={"1.6rem"}/>}
                  size="lg"
                  colorScheme="red"
                  variant="ghost"
                  _hover={{ bg: deleteBgHover }}
                  onClick={(e: React.MouseEvent) => {
                    e.stopPropagation()
                    onDelete(row)
                  }}
                />
              </Tooltip>
            )}
          </HStack>
        ),
      },
    ] as ColumnDef<T>[]
  }, [columns, showActionColumn, onEdit, onDelete])

  return <BasicTable<T> {...restProps} columns={tableColumns} />
}

export default EditableTable
