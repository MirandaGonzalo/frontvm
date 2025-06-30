export const formatCuit = (cuit?: number | string | null): string => {
  if (!cuit) return '';
  const str = cuit.toString().padStart(11, '0');
  return `${str.slice(0, 2)}-${str.slice(2, 10)}-${str.slice(10)}`;
};

export const formatDni = (dni?: number | string | null): string => {
  if (!dni) return '';
  return dni.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};

export const formatTelefono = (telefono?: string | number | null): string => {
  if (!telefono) return '';
  const str = telefono.toString().replace(/\D/g, '');
  return `(${str.slice(0, 3)}) ${str.slice(3, 6)}-${str.slice(6)}`;
};