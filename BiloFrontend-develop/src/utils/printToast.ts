import { Slide, toast } from 'react-toastify';

export const showPrintToast = (printDocument: () => Promise<any>) => {
    toast.promise(
      printDocument(),
      {
        pending: {
          render: 'Imprimiendo...',
          transition: Slide,
        },
        success: {
          render: '¡Impresión finalizada!',
          transition: Slide,
        },
        error: {
          render: 'Error en impresión',
          transition: Slide,
        },
      },
      {
        hideProgressBar: false,
        closeOnClick: true,
        theme: 'light',
      }
    );
  };