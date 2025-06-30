import React from 'react';
import Select from 'react-select';
import type { Props as SelectProps } from 'react-select';
import { useTheme } from '@chakra-ui/react';

type Option = {
  value: string;
  label: string;
};

interface ChakraSelectProps extends SelectProps<Option, false> {
  label?: string;
  error?: boolean;
  errorMessage?: string;
}

const SelectBilo: React.FC<ChakraSelectProps> = ({
  label = "",
  isClearable = true,
  error,
  errorMessage,
  ...props
}) => {
  const theme = useTheme();

  // Custom styles para react-select
  const customStyles = {
    control: (base: any, state: any) => ({
        ...base,
        borderColor: error ? theme.colors.red[500] : theme.colors.dark[400],
        borderWidth: error ? '2px' : '1px',
        boxShadow: state.isFocused ? `0 0 0 1px ${theme.colors.blue[400]}` : 'none',
        '&:hover': {
        borderColor: state.isFocused ? 'white' : base.borderColor,
        },
        borderRadius: "1rem",
        fontSize: theme.fontSizes['2xl'],
        marginBottom: '1rem',
        
    }),
    valueContainer: (base: any) => ({
        ...base,
        padding: '0 0.7rem', 
    }),
    option: (base: any, state: any) => ({
        ...base,
        backgroundColor: (state.isSelected || state.isFocused) ? theme.colors.blue[600] : base.backgroundColor,
        color: (state.isSelected || state.isFocused) ? 'white' : base.color,
        cursor: 'pointer',
        fontSize: theme.fontSizes['2xl'],
    }),
    menu: (base: any) => ({
        ...base,
        borderRadius: theme.radii.md,
        overflow: 'hidden',
    }),
  };

  return (
    <div>
      {label && (
        <label
          style={{
            display: 'block',
            marginBottom: 4,
            fontWeight: 600,
            fontSize: '1rem',
            color: error ? 'red' : theme.colors.gray[700],
          }}
        >
          {label}
        </label>
      )}
      <Select
        styles={customStyles}
        isClearable={isClearable}
        noOptionsMessage={() => "No hay opciones disponibles"}
        {...props}
      />
    </div>
  );
};

export default SelectBilo;
