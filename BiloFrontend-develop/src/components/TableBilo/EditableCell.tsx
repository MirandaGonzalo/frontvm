import { useState, useEffect } from 'react'
import {
  Box,
  Input,
  Select,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import type { Row, ColumnDef } from '@tanstack/react-table'

// Tipos de celdas editables
export type EditableCellType = 'input' | 'select' | 'datepicker'

// Props para el componente de celda editable
export interface EditableCellProps {
  value: any
  row: Row<any>
  column: ColumnDef<any>
  table: any
  type: EditableCellType
  options?: Array<{ value: string; label: string }>
  onChange: (value: any) => void
  isEditing?: boolean
}

export const EditableCell = ({
  value,
  type,
  options = [],
  onChange,
  isEditing = false,
}: EditableCellProps): JSX.Element => {
  const [editValue, setEditValue] = useState<any>(value)
  const [editing, setEditing] = useState<boolean>(isEditing)

  // Actualizar el valor cuando cambia externamente
  useEffect(() => {
    setEditValue(value)
  }, [value])

  // Colores Celda
  const borderColor = useColorModeValue('blue.400', 'blue.300')
  const bgColor = useColorModeValue('white', 'dark.700')
  const hoverBgColor = useColorModeValue('gray.50', 'dark.600')
  const textColor = useColorModeValue('dark.800', 'white')
  const placeholderColor = useColorModeValue('gray.400', 'gray.500')

  // Estilos comunes para los inputs
  const inputStyles = {
    border: '1px solid',
    borderColor: borderColor,
    borderRadius: 'md',
    bg: bgColor,
    color: textColor,
    fontSize: 'sm',
    height: '2rem',
    minWidth: '100%',
    maxWidth: '100%',
    px: 2,
    _hover: {
      borderColor: 'lightBlue.400',
    },
    _focus: {
      borderColor: 'lightBlue.400',
      boxShadow: `0 0 0 1px var(--chakra-colors-lightBlue-400)`,
    },
    _placeholder: {
      color: placeholderColor,
    },
  }

  // Si no esta en modo edicion, mostrar el valor como texto
  if (!editing) {
    return (
      <Box 
        onClick={() => setEditing(true)} 
        cursor="pointer"
        py={1}
        px={2}
        borderRadius="md"
        _hover={{ bg: hoverBgColor }}
        transition="background 0.2s"
        whiteSpace="nowrap"
        overflow="hidden"
        textOverflow="ellipsis"
      >
        {type === 'select' && options.length > 0
          ? options.find(opt => opt.value === value)?.label || value
          : value}
      </Box>
    )
  }

  // Funcion para manejar el fin de la edicion
  const handleBlur = (): void => {
    setEditing(false)
    if (editValue !== value) {
      onChange(editValue)
    }
  }

  // Renderizar el tipo de input adecuado segun el tipo de celda
  switch (type) {
    case 'input':
      return (
        <Box width="100%" position="relative">
          <Input
            value={editValue || ''}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            sx={inputStyles}
          />
        </Box>
      )
    case 'select':
      return (
        <Box width="100%" position="relative">
          <Select
            value={editValue || ''}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            sx={inputStyles}
          >
            {options.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>
        </Box>
      )
    case 'datepicker':
      return (
        <Box width="100%" position="relative">
          <Input
            type="date"
            value={editValue || ''}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            sx={inputStyles}
          />
        </Box>
      )
    default:
      return <Text>{value}</Text>
  }
}

export default EditableCell