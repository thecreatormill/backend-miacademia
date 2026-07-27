# 🎓 MiAcademia Backend

API REST para la gestión académica de **MiAcademia**, desarrollada con una arquitectura modular utilizando **NestJS** y **TypeScript**.

El sistema permite administrar usuarios, roles, cursos, clases, horarios, matrículas, notas y asistencias mediante autenticación JWT y control de permisos basado en roles.

---

## 🚀 Tecnologías utilizadas

![NestJS](https://img.shields.io/badge/NestJS-11-red)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-blue)
![TypeORM](https://img.shields.io/badge/TypeORM-ORM-orange)
![JWT](https://img.shields.io/badge/Auth-JWT-black)

### Backend

- NestJS 11
- TypeScript
- Node.js
- Express
- TypeORM
- PostgreSQL
- JWT Authentication
- bcryptjs
- class-validator
- class-transformer

---

# ✨ Características

## 🔐 Autenticación y seguridad

- Inicio de sesión mediante JWT.
- Protección de rutas privadas.
- Control de acceso basado en roles.
- Guards personalizados:
  - `JwtAuthGuard`
  - `RolesGuard`

## 👥 Gestión de usuarios

- Creación de usuarios.
- Actualización de perfiles.
- Consulta por DNI.
- Gestión por roles.

## 🎓 Gestión académica

- Administración de cursos.
- Creación de clases.
- Gestión de horarios.
- Consulta de clases asignadas a profesores.

## 📝 Registro académico

- Matrículas.
- Historial académico.
- Registro de notas.
- Control de asistencias.

---

# 📂 Estructura del proyecto

```text
src
│
├── auth
│   ├── controllers
│   ├── guards
│   ├── decorators
│   └── dto
│
├── usuarios
│   ├── entities
│   └── dto
│
├── roles
│   └── entities
│
├── gestion-academica
│   ├── entities
│   └── dto
│
├── registro
│   ├── entities
│   └── dto
│
├── database
│   └── database.seed.ts
│
├── app.module.ts
└── main.ts
```

---

# ⚙️ Instalación

Clonar el repositorio:

```bash
git clone https://github.com/thecreatormill/backend-miacademia.git
```

Ingresar al proyecto:

```bash
cd backend-miacademia
```

Instalar dependencias:

```bash
npm install
```

---

# 🔑 Variables de entorno

Crear un archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=password
DB_NAME=mi_academia

JWT_SECRET=your_secret_key

PORT=3000
```

---

# ▶️ Ejecutar proyecto

Modo desarrollo:

```bash
npm run start:dev
```

Compilar:

```bash
npm run build
```

Producción:

```bash
npm run start:prod
```

---

# 🌐 API desplegada

URL:

```
https://backend-miacademia.onrender.com
```

---

# 👤 Usuario de prueba

```
Usuario:
7777777

Contraseña:
admin
```

---

# 🔐 Autenticación

La API utiliza JWT.

Después del login se debe enviar el token en las peticiones protegidas:

```http
Authorization: Bearer TOKEN
```

---

# 📚 Endpoints

## 🔐 Auth

| Método | Endpoint | Descripción |
|---|---|---|
| POST | `/auth/login` | Inicio de sesión |
| GET | `/auth/perfil` | Obtener perfil autenticado |

---

# 👥 Usuarios

| Método | Endpoint | Rol |
|---|---|---|
| GET | `/usuarios/mi-perfil` | Usuario autenticado |
| GET | `/usuarios/buscar/:dni` | ADMIN, PROFESOR |
| GET | `/usuarios/rol/:rol` | ADMIN |
| POST | `/usuarios` | ADMIN |
| PATCH | `/usuarios/mi-perfil` | PROFESOR, ALUMNO |
| PATCH | `/usuarios/admin/:dni` | ADMIN |

---

# 🎓 Gestión Académica

## Cursos

| Método | Endpoint | Rol |
|---|---|---|
| POST | `/gestion-academica/cursos` | ADMIN |
| GET | `/gestion-academica/cursos` | ADMIN |
| PATCH | `/gestion-academica/cursos/:id` | ADMIN |

## Clases

| Método | Endpoint | Rol |
|---|---|---|
| POST | `/gestion-academica/clases` | ADMIN |
| PATCH | `/gestion-academica/clases/:id` | ADMIN |
| GET | `/gestion-academica/clases/buscar?nombre=` | ADMIN |
| GET | `/gestion-academica/clases` | ADMIN |
| GET | `/gestion-academica/mis-clases` | PROFESOR |

## Horarios

| Método | Endpoint | Rol |
|---|---|---|
| POST | `/gestion-academica/clases/:id_clase/horarios` | ADMIN |
| PATCH | `/gestion-academica/horarios/:id_horario` | ADMIN |

---

# 📝 Registro Académico

## Matrículas

| Método | Endpoint | Rol |
|---|---|---|
| POST | `/registro/matriculas` | ADMIN |
| GET | `/registro/mis-matriculas` | ALUMNO |
| GET | `/registro/mi-historial` | ALUMNO |
| GET | `/registro/clases/:id_clase/matriculas` | ADMIN, PROFESOR |
| PATCH | `/registro/matriculas/:id/cerrar` | ADMIN, PROFESOR |

## Notas

| Método | Endpoint | Rol |
|---|---|---|
| POST | `/registro/matriculas/:id/notas` | ADMIN, PROFESOR |
| GET | `/registro/matriculas/:id/notas` | ADMIN, PROFESOR |
| PATCH | `/registro/notas/:id_nota` | ADMIN, PROFESOR |

## Asistencias

| Método | Endpoint | Rol |
|---|---|---|
| POST | `/registro/matriculas/:id/asistencias` | ADMIN, PROFESOR |
| GET | `/registro/matriculas/:id/asistencias` | ADMIN, PROFESOR |
| PATCH | `/registro/asistencias/:id_asistencia` | ADMIN, PROFESOR |

---

# 🧪 Testing

Ejecutar pruebas:

```bash
npm run test
```

Cobertura:

```bash
npm run test:cov
```

---

# 📄 Licencia

Este proyecto está bajo licencia MIT.

---

# 👨‍💻 Autor

**Franco Contreras**

Proyecto desarrollado para la gestión académica de MiAcademia.
