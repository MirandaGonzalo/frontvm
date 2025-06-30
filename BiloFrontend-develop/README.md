# frontend_bilo

Este proyecto es el frontend de **Bilo Sistema de Facturación Web**

---

## ⚙️ Scripts Disponibles

```bash
# Ejecuta la app en modo desarrollo
npm run dev

# Compila y construye el proyecto
npm run build

# Compila y construye con configuración de producción
npm run build:prod
```

## 📁 Estructura del Proyecto

```bash
frontend_bilo/
├── assets/ # Íconos e imágenes utilizados en la app
│ ├── icons/
│ └── images/
│
├── components/ # Componentes reutilizables y layouts
│ ├── layouts/
│ └── ...
│
├── hooks/ # Hooks personalizados
│
├── lib/ # Configuraciones compartidas
│ ├── axiosConfig.ts # Configuración de Axios
│ └── queryClient.ts # Cliente de React Query
│
├── pages/ # Vistas principales del proyecto
│ ├── EjemploPage/
│ │ ├── ejemplo.controller.ts # Controlador de la página
│ │ ├── ejemplo-schema.ts # Validaciones Zod para formularios con React Hook Form
│ │ └── EjemploPage.tsx # Vista de la página
│ └── ...
│
├── services/ # Llamadas a APIs
│
├── store/ # Estado global con Zustand
│
├── styles/ # Temas y estilos globales
│ └── theme.ts # Custom theme para Chakra UI
│
├── utils/ # Funciones reutilizables
│
├── app.tsx # Definición principal de rutas del proyecto
│
├── vite.config.ts # Configuración de Vite
└── tsconfig.json # Configuración de TypeScript
```

## 🚀 Tecnologías

- **React 18** — Biblioteca principal para construir interfaces de usuario.
- **Vite** — Empaquetador rápido para desarrollo y producción.
- **Chakra UI** — Sistema de diseño basado en componentes accesibles.
- **Zustand** — Manejo de estado global ligero.
- **React Hook Form + Zod** — Manejo de formularios y validación.
- **React Router DOM** — Enrutamiento del lado del cliente.
- **React Query** — Manejo eficiente de solicitudes HTTP.
- **Axios** — Cliente HTTP para conectar con el backend.
- **SASS** — Preprocesador CSS.
- **ESLint + Prettier** — Linting y formateo de código.

---

## Requisitos

- Node.js v22.14.0
- npm v10.14.0

