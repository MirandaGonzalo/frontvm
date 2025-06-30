import { useState, useEffect, useMemo } from 'react'
import {
  Table as ChakraTable,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Box,
  Flex,
  IconButton,
  Input,
  Select,
  Text,
  useColorModeValue,
  Spinner,
  HStack,
  InputGroup,
  InputRightElement,
  Switch,
} from '@chakra-ui/react'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
} from '@tanstack/react-table'
import type {
  ColumnDef,
  SortingState,
  ColumnFiltersState,
  Row,
  PaginationState,
} from '@tanstack/react-table'
import { ChevronLeftIcon, ChevronRightIcon, SearchIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom'

// Props para la tabla básica
// Interfaz para los filtros personalizados
export interface FilterSwitch {
  id: string;               // ID único para el filtro
  label: string;            // Texto a mostrar (ej: "Activo")
  text: string;             // Texto a mostrar (ej: "Ver")
  field: string;            // Campo a filtrar (ej: "estado")
  value: string | boolean;            // Valor a comparar (ej: "Activo")
  color?: string;           // Color del switch (opcional, por defecto naranja)
  pluralLabel?: boolean;    // Si es true, añade 's' al final del label
}

export interface BasicTableProps<T extends object> {
  columns: ColumnDef<T>[]      // Definiciones de columnas de TanStack Table
  data: T[]                    // Array de datos a mostrar
  isLoading?: boolean          // Estado de carga
  detailPath?: string          // Ruta base para vista detallada (se añadirá el ID)
  showActionBar?: boolean      // Mostrar barra de acciones con búsqueda y filtros
  onRowClick?: (row: Row<T>) => void // Manejador personalizado de clic en fila
  getRowId?: (row: T) => string // Función para obtener ID único de fila
  pageSize?: number           // Tamaño de página inicial
  pageSizeOptions?: number[]  // Opciones de tamaño de página disponibles
  manualPagination?: boolean  // Para paginación controlada por el servidor
  totalCount?: number         // Conteo total para paginación del servidor
  onPaginationChange?: (pagination: { pageIndex: number; pageSize: number }) => void
  
  // Compatibilidad con versión anterior (un solo switch)
  showActiveSwitch?: boolean  // Mostrar switch para filtrar activos
  activeStateLabel?: string   // Nombre del estado a mostrar (ej: "Activo")
  activeStateField?: string   // Campo a filtrar (ej: "estado")
  
  // Nueva forma de configurar múltiples filtros
  filterSwitches?: FilterSwitch[] // Array de configuraciones de filtros
}

export const BasicTable = <T extends object>({
  columns,
  data,
  isLoading = false,
  detailPath,
  showActionBar = false,
  onRowClick,
  getRowId,
  pageSize = 10,
  pageSizeOptions = [5, 10, 20, 50],
  manualPagination = false,
  totalCount,
  onPaginationChange,
  filterSwitches = [],
}: BasicTableProps<T>): JSX.Element => {
  const navigate = useNavigate()
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>('')
  const debouncedFilter = useDebounce(globalFilter, 300) 
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize,
  })
  
  // Estado para los filtros personalizados
  const [activeFilters, setActiveFilters] = useState<Record<string, boolean>>({});
  
  // Inicializar los estados de los filtros
  useEffect(() => {
    const initialFilters: Record<string, boolean> = {};
    filterSwitches.forEach(filter => {
      initialFilters[filter.id] = false;
    });
    setActiveFilters(initialFilters);
  }, [filterSwitches]);

  // Función para actualizar un filtro específico
  const toggleFilter = (filterId: string) => {
    setActiveFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }));
  };

  // Filtrar datos según todos los filtros activos (usando useMemo para optimizar)
  const filteredData = useMemo(() => {
    let result = [...data];
    
    // Aplicar filtros personalizados
    filterSwitches.forEach(filter => {
      if (activeFilters[filter.id]) {
        result = result.filter((row: any) => {
          return row && typeof row === 'object' && 
                 filter.field in row && 
                 row[filter.field] === filter.value;
        });
      }
    });
    
    return result;
  }, [data, filterSwitches, activeFilters])


  // Inicializar la tabla
  const table = useReactTable<T>({
    data: filteredData,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter: debouncedFilter,
      pagination,
    },
    manualPagination,
    pageCount: manualPagination ? Math.ceil((totalCount || 0) / pagination.pageSize) : undefined,
    onPaginationChange: (updater) => {
      const newPagination = typeof updater === 'function' 
        ? updater(pagination) 
        : updater
      
      setPagination(newPagination)
      if (onPaginationChange) {
        onPaginationChange(newPagination)
      }
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    ...(getRowId && { getRowId }),
  })


  // Manejar clic en fila para navegación
  const handleRowClick = (row: Row<T>): void => {
    if (onRowClick) {
      onRowClick(row)
      return
    }

    if (detailPath) {
      const id = getRowId ? getRowId(row.original) : (row.original as any).id
      if (id) {
        navigate(`${detailPath}/${id}`)
      }
    }
  }

  // Estilos Tabla
  const hoverBgColor = useColorModeValue('blue.50', 'dark.700')
  const borderColor = useColorModeValue('gray.200', 'dark.600')
  const headerBgColor = useColorModeValue('gray.200', 'dark.600')
  const headerTextColor = useColorModeValue('dark.600', 'dark.900')
  const tableBoxShadow = useColorModeValue('sm', 'none')
  
  return (
    <Box width="100%" overflowX="auto">
      {/* Barra de acciones */}
      {showActionBar && (
        <Flex 
          p={4} 
          justifyContent="space-between" 
          alignItems="center" 
          mb={4} 
          wrap="wrap" 
          gap={4}
          bg={useColorModeValue('white', 'dark.700')}
          borderRadius="md"
          boxShadow={tableBoxShadow}
          borderWidth="1px"
          borderColor={borderColor}
        >
          <Flex alignItems="center" gap={6}>
            <InputGroup>
              <Input
                placeholder="Buscar..."
                value={globalFilter || ''}
                onChange={(e) => setGlobalFilter(e.target.value)}
                size="lg"
                width="auto"
                borderRadius="md"
                borderColor={useColorModeValue('blue.200', 'blue.700')}
                _hover={{ borderColor: 'lightBlue.400' }}
                _focus={{ borderColor: 'lightBlue.400', boxShadow: 'none' }}
              />
              <InputRightElement pointerEvents="none" display="flex" alignItems="center" height="100%" mr={2}>
                <Box color="gray.400" >
                  <SearchIcon />
                </Box>
              </InputRightElement>
            </InputGroup>
            
            {/* Filtros personalizados */}
            {filterSwitches.map((filter) => (
              <Flex key={filter.id} alignItems="center" gap={2}>
                <Text fontSize="2xl" mr={2} whiteSpace="nowrap" fontWeight="500">
                  {`${filter.text} ${filter.label}${filter.pluralLabel !== false ? 's' : ''}`}
                </Text>
                <Switch
                  colorScheme={filter.color || "orange"}
                  isChecked={activeFilters[filter.id] || false}
                  onChange={() => toggleFilter(filter.id)}
                  size="lg"
                  sx={{
                    ".chakra-switch__track": { bg: useColorModeValue('gray.200', 'gray.600') },
                    ".chakra-switch__thumb": { bg: 'white' },
                    _checked: {
                      ".chakra-switch__track": { bg: filter.color || '#FF8559' }
                    }
                  }}
                />
              </Flex>
            ))}

          </Flex>
        </Flex>
      )}

      {/* Tabla */}
      <Box 
        position="relative" 
        maxH="70vh" 
        overflowY="auto" 
        borderWidth="1px" 
        borderColor={borderColor} 
        borderRadius="md"
        boxShadow={tableBoxShadow}
        bg={useColorModeValue('white', 'dark.700')}
      >
        {isLoading && (
          <Flex
            position="absolute"
            top="0"
            left="0"
            right="0"
            bottom="0"
            bg="blackAlpha.300"
            zIndex="1"
            justifyContent="center"
            alignItems="center"
          >
            <Spinner 
              size="xl" 
              color="blue.400" 
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
            />
          </Flex>
        )}

        <ChakraTable variant="simple" size="md" width="100%">
          <Thead position="sticky" top={0} zIndex="1" bg={headerBgColor}>
            {table.getHeaderGroups().map((headerGroup) => (
              <Tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <Th
                    key={header.id}
                    onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                    cursor={header.column.getCanSort() ? 'pointer' : 'default'}
                    whiteSpace="nowrap"
                    px={4}
                    py={5}
                    color={headerTextColor}
                    fontWeight="bold"
                    fontSize="xl"
                    textTransform="none"
                    letterSpacing="wider"
                    borderBottomColor={borderColor}
                    _hover={header.column.getCanSort() ? { bg: useColorModeValue('blue.100', 'blue.800') } : {}}
                  >
                    <Flex alignItems="center">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      <Box ml={1}>
                        {{
                          asc: '▲',
                          desc: '▼',
                        }[header.column.getIsSorted() as string] ?? null}
                      </Box>
                    </Flex>
                  </Th>
                ))}
              </Tr>
            ))}
          </Thead>
          <Tbody>
            {table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <Tr
                  key={row.id}
                  onClick={() => handleRowClick(row)}
                  cursor={detailPath || onRowClick ? 'pointer' : 'default'}
                  _hover={{ bg: hoverBgColor }}
                  borderBottomWidth="1px"
                  borderBottomColor={borderColor}
                  transition="background 0.2s"
                >
                  {row.getVisibleCells().map((cell) => (
                    <Td 
                      key={cell.id} 
                      px={4} 
                      py={1}
                      fontSize="2xl"
                      lineHeight="1.5" 
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </Td>
                  ))}
                </Tr>
              ))
            ) : (
              <Tr>
                <Td colSpan={columns.length} textAlign="center" py={6} fontSize="xl" color="gray.500">
                  No hay datos disponibles
                </Td>
              </Tr>
            )}
          </Tbody>
        </ChakraTable>
      </Box>

      {/* Paginación */}
      <Flex 
        justifyContent="space-between" 
        alignItems="center" 
        mt={4} 
        px={4}
        py={3}
        bg={useColorModeValue('white', 'dark.700')}
        borderRadius="md"
        boxShadow={tableBoxShadow}
        borderWidth="1px"
        borderColor={borderColor}
      >
        <Flex alignItems="center">
          <Text fontSize="xl" mr={2} color={useColorModeValue('gray.600', 'gray.300')}>
            Filas por página:
          </Text>
          <Select
            value={pagination.pageSize}
            onChange={(e) => {
              table.setPageSize(Number(e.target.value))
            }}
            size="sm"
            width="80px"
            borderColor={useColorModeValue('blue.200', 'blue.700')}
            _hover={{ borderColor: 'lightBlue.400' }}
            _focus={{ borderColor: 'lightBlue.400', boxShadow: 'none' }}
          >
            {pageSizeOptions.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </Select>
        </Flex>

        <HStack spacing={2}>
          <Text fontSize="xl" color={useColorModeValue('gray.600', 'gray.300')}>
            Página {table.getState().pagination.pageIndex + 1} de {table.getPageCount() || 1}
          </Text>
          <HStack>
            <IconButton
              aria-label="Página anterior"
              icon={<ChevronLeftIcon />}
              onClick={() => table.previousPage()}
              isDisabled={!table.getCanPreviousPage()}
              size="lg"
              colorScheme="blue"
              variant="ghost"
            />
            <IconButton
              aria-label="Página siguiente"
              icon={<ChevronRightIcon />}
              onClick={() => table.nextPage()}
              isDisabled={!table.getCanNextPage()}
              size="md"
              colorScheme="blue"
              variant="ghost"
            />
          </HStack>
        </HStack>
      </Flex>


    </Box>
  )
}

export default BasicTable

// Hook personalizado para debounce
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
