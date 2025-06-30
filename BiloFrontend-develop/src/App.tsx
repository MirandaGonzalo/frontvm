import { BrowserRouter, Route, Routes } from 'react-router-dom';
import MainPage from './pages/MainPage/MainPage';
import Layout from './components/layouts/Layout';
import PrivateRoute from './routes/PrivateRoute';
import PublicRoute from './routes/PublicRoute';
import LoginPage from './pages/LogIn/LoginPage';
import { ListClient,CreateClient,EditClient,ShowClient } from './pages/Clients';
import { ListProduct,CreateProduct,EditProduct,ShowProduct } from './pages/Products';
import NotFoundPage from './pages/NotFoundPage';
import ListConfigurations from './pages/Configurations/ListConfigurations';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  // ###################
  // CONVENCION DE RUTAS
  // ###################
  // Los breadcrumbs en el headBar se generan en base a la convención de rutas definida en el proyecto.
  // Es importante mantener esta estructura para que los accesos se representen correctamente:
  // - '/modulo'               → listado general del módulo (ej: /clientes)
  // - '/modulo/crear'         → pantalla de creación (ej: /clientes/crear)
  // - '/modulo/editar/:id'    → pantalla de edición (ej: /clientes/editar/:id)
  // - '/modulo/detalleModulo/:id'   → pantalla de detalle (ej: /clientes/detalleCliente/:id)

  return (
    <BrowserRouter>
     <ToastContainer 
        position="top-center"
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        toastStyle={{ fontSize: '12px' }}
      />
      <Routes>
        {/* Private Routes */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<MainPage />} />
            <Route path="/clientes" element={<ListClient />} />
            <Route path="/clientes/registrar" element={<CreateClient />} />
            <Route path="/clientes/editar/:id" element={<EditClient />} />
            <Route path="/clientes/detalleCliente/:id" element={<ShowClient />} />
            <Route path="/productos" element={<ListProduct />} />
            <Route path="/productos/registrar" element={<CreateProduct />} />
            <Route path="/productos/editar/:id" element={<EditProduct />} />
            <Route path="/productos/detalleProducto/:id" element={<ShowProduct />} />
            <Route path="/configuraciones" element={<ListConfigurations />} />
          </Route>
        </Route>
        {/* Public Routes */}
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        {/* Not Found Page */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
