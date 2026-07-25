# 🧪 Frontend – Laboratorio Clínico

Aplicación web desarrollada en **Angular 19** para la gestión de un sistema de laboratorio clínico. Permite administrar usuarios, laboratorios y resultados de exámenes, con autenticación basada en JWT y comunicación con microservicios REST.

---

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Tecnologías Utilizadas](#tecnologías-utilizadas)
- [Arquitectura del Proyecto](#arquitectura-del-proyecto)
- [Módulos y Funcionalidades](#módulos-y-funcionalidades)
- [Requisitos Previos](#requisitos-previos)
- [Instalación y Ejecución Local](#instalación-y-ejecución-local)
- [Variables de Entorno](#variables-de-entorno)
- [Rutas de la Aplicación](#rutas-de-la-aplicación)
- [Despliegue con Docker](#despliegue-con-docker)
- [Pruebas Unitarias](#pruebas-unitarias)
- [Análisis de Calidad con SonarQube](#análisis-de-calidad-con-sonarqube)

---

## Descripción General

Este proyecto es el frontend de un sistema de gestión para laboratorios clínicos. Se comunica con **tres microservicios** independientes a través de una API REST, permitiendo realizar operaciones CRUD sobre:

- **Usuarios** – Pacientes y personal del laboratorio.
- **Laboratorios** – Sucursales o centros clínicos registrados.
- **Resultados de Exámenes** – Resultados asociados a pacientes con parámetros clínicos.

El acceso a todas las rutas está protegido mediante autenticación JWT. Al iniciar sesión, el token se almacena en `localStorage` y se adjunta automáticamente a cada petición HTTP mediante un interceptor.

---

## Tecnologías Utilizadas

| Tecnología | Versión | Uso |
|---|---|---|
| Angular | 19.2.x | Framework principal |
| TypeScript | 5.7.x | Lenguaje de desarrollo |
| Bootstrap | 5.3.x | Estilos y componentes UI |
| Bootstrap Icons | — | Íconos de la interfaz |
| RxJS | 7.8.x | Programación reactiva |
| Angular SSR | 19.2.x | Server-Side Rendering |
| Karma + Jasmine | 6.4.x / 5.6.x | Pruebas unitarias |
| SonarQube | — | Análisis de calidad de código |
| Docker + Nginx | — | Contenerización y despliegue |

---

## Arquitectura del Proyecto

```
src/
└── app/
    ├── core/
    │   ├── guards/         # authGuard – protección de rutas
    │   └── interceptors/   # authInterceptor – adjunta el token JWT
    ├── features/
    │   ├── auth/
    │   │   └── login/      # Componente de inicio de sesión
    │   ├── laboratorios/
    │   │   ├── lab-list/   # Listado de laboratorios
    │   │   └── lab-form/   # Formulario crear/editar laboratorio
    │   ├── resultados/
    │   │   ├── resultados-list/  # Listado de resultados
    │   │   └── resultados-form/ # Formulario crear/editar resultado
    │   └── usuarios/
    │       ├── usuario-list/     # Listado de usuarios
    │       └── usuario-form/     # Formulario crear/editar usuario
    ├── models/             # Interfaces TypeScript (Laboratorio, Resultado, Usuario)
    ├── services/           # Servicios HTTP (auth, laboratorio, resultado, usuario)
    └── shared/
        └── navbar/         # Componente de navegación global
```

---

## Módulos y Funcionalidades

### 🔐 Autenticación
- Inicio de sesión con email y contraseña.
- El token JWT recibido se guarda en `localStorage`.
- El `authInterceptor` lo inyecta automáticamente en el header `Authorization: Bearer <token>` de cada petición.
- El `authGuard` redirige a `/login` si el usuario no está autenticado.

### 👤 Usuarios
- Listar todos los usuarios registrados.
- Crear un nuevo usuario con nombre, apellido, email, contraseña, rol y laboratorio asociado.
- Editar un usuario existente (la contraseña es opcional en modo edición).
- Eliminar usuarios.

### 🏥 Laboratorios
- Listar todos los laboratorios.
- Crear y editar laboratorios con nombre, teléfono, email, sitio web y convenio asociado.
- Eliminar laboratorios.

### 📄 Resultados de Exámenes
- Listar todos los resultados o filtrar por paciente.
- Registrar resultados con valor obtenido, valores de referencia (mín/máx), tipo de examen, tipo de parámetro, unidad de medida, laboratorio y fecha.
- Editar y eliminar resultados existentes.

---

## Requisitos Previos

- [Node.js](https://nodejs.org/) v18 o superior
- [npm](https://www.npmjs.com/) v9 o superior
- [Angular CLI](https://angular.dev/tools/cli) v19

```bash
npm install -g @angular/cli@19
```

---

## Instalación y Ejecución Local

```bash
# 1. Clonar el repositorio
git clone <URL_DEL_REPOSITORIO>
cd laboratorio-clinico

# 2. Instalar dependencias
npm install

# 3. Iniciar el servidor de desarrollo
ng serve
```

La aplicación estará disponible en: **http://localhost:4200**

> La aplicación recargará automáticamente ante cambios en los archivos fuente.

---

## Variables de Entorno

Las URLs de los microservicios se configuran en `src/environments/environments.ts`:

```typescript
export const environment = {
  production: false,
  apiUrlUsuarios:     'http://localhost:8080/api/usuarios',
  apiUrlLaboratorios: 'http://localhost:8081/api/laboratorios',
  apiUrlResultados:   'http://localhost:8082/api/resultados',
  apiUrlAuthLogin:    'http://localhost:8080/api/auth/login'
};
```

> Para producción, crea o actualiza un archivo `environments.prod.ts` con las URLs correspondientes al entorno productivo y ajusta `angular.json` si es necesario.

---

## Rutas de la Aplicación

| Ruta | Componente | Protegida |
|---|---|---|
| `/login` | `LoginComponent` | No |
| `/usuarios` | `UsuarioListComponent` | Sí |
| `/usuarios/crear` | `UsuarioFormComponent` | Sí |
| `/usuarios/editar/:id` | `UsuarioFormComponent` | Sí |
| `/laboratorios` | `LabListComponent` | Sí |
| `/laboratorios/crear` | `LabFormComponent` | Sí |
| `/laboratorios/editar/:id` | `LabFormComponent` | Sí |
| `/resultados` | `ResultadosListComponent` | Sí |
| `/resultados/crear` | `ResultadosFormComponent` | Sí |
| `/resultados/editar/:id` | `ResultadosFormComponent` | Sí |
| `/` | Redirige a `/login` | — |

---

## Despliegue con Docker

El proyecto incluye un `Dockerfile` multietapa que compila la aplicación y la sirve con **Nginx**.

### Construir y levantar el contenedor

```bash
# Opción 1: Docker Compose (recomendado)
docker-compose up --build

# Opción 2: Docker directamente
docker build -t laboratorio-clinico-frontend .
docker run -p 4200:80 laboratorio-clinico-frontend
```

La aplicación estará disponible en: **http://localhost:4200**

### Detalles del Dockerfile

- **Etapa 1 (build):** Usa `node:18-alpine` para compilar el proyecto con `npm run build --configuration=production`. El resultado queda en `dist/laboratorio-clinico/browser`.
- **Etapa 2 (serve):** Usa `nginx:alpine` para servir los archivos estáticos. La configuración de Nginx maneja el ruteo de SPA redirigiendo todas las rutas a `index.html`.

---

## Pruebas Unitarias

El proyecto usa **Karma** como test runner y **Jasmine** como framework de pruebas.

```bash
# Ejecutar pruebas unitarias
ng test

# Ejecutar pruebas con reporte de cobertura
ng test --code-coverage
```

El reporte de cobertura se genera en `coverage/laboratorio-clinico/lcov.info`.

### Cobertura de Pruebas

Se incluyen pruebas unitarias para:
- `AuthService` – login, logout, manejo de token.
- `LaboratorioService` – operaciones CRUD.
- `ResultadoService` – operaciones CRUD y filtro por paciente.
- `UsuarioService` – operaciones CRUD.
- `AuthGuard` – verificación de autenticación.
- `AuthInterceptor` – inyección del token en peticiones.
- Componentes principales de cada módulo.

---

## Análisis de Calidad con SonarQube

El proyecto está configurado para análisis estático con SonarQube mediante `sonar-project.properties`.

```bash
# Ejecutar el análisis (requiere SonarQube corriendo localmente o en servidor)
npx sonar-scanner
```

**Configuración del proyecto:**
- **Project Key:** `laboratorio-clinico-front`
- **Fuentes analizadas:** `src/` (excluyendo specs, environments, main y archivos de configuración)
- **Reporte de cobertura:** `coverage/laboratorio-clinico/lcov.info`

> ⚠️ Recuerda actualizar las credenciales de SonarQube (`sonar.login`) antes de ejecutar el análisis en un entorno compartido.
