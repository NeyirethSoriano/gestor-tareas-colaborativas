# API Documentation - Gestor de Tareas

## Visión General

Todos los endpoints requieren autenticación JWT (excepto `/api/auth/register` y `/api/auth/login`)

### Headers Requeridos
```
Authorization: Bearer <JWT_TOKEN>
Content-Type: application/json
```

---

## 🔐 Autenticación

### Register User
**POST** `/api/auth/register`

No requiere autenticación.

**Body:**
```json
{
  "nombre": "string",
  "email": "string (email unique)",
  "password": "string (min 6 caracteres)"
}
```

**Response (201):**
```json
{
  "mensaje": "Usuario registrado exitosamente",
  "usuario": {
    "id": "ObjectId",
    "nombre": "string",
    "email": "string",
    "rol": "usuario"
  },
  "token": "JWT_TOKEN"
}
```

**Errores:**
- 400: Email, contraseña y nombre requeridos
- 409: El usuario ya existe
- 500: Error interno del servidor

---

### Login User
**POST** `/api/auth/login`

No requiere autenticación.

**Body:**
```json
{
  "email": "string",
  "password": "string"
}
```

**Response (200):**
```json
{
  "mensaje": "Login exitoso",
  "usuario": {
    "id": "ObjectId",
    "nombre": "string",
    "email": "string",
    "rol": "usuario"
  },
  "token": "JWT_TOKEN"
}
```

**Errores:**
- 400: Email y contraseña requeridos
- 401: Email o contraseña inválidos
- 500: Error interno del servidor

---

## 📁 Proyectos

### Get All Projects
**GET** `/api/proyectos`

Requiere JWT.

**Response (200):**
```json
[
  {
    "_id": "ObjectId",
    "nombre": "string",
    "descripcion": "string",
    "propietario": {
      "_id": "ObjectId",
      "nombre": "string",
      "email": "string"
    },
    "miembros": ["ObjectId"],
    "estado": "activo | pausado | completado",
    "fechaCreacion": "ISO8601",
    "fechaActualizacion": "ISO8601"
  }
]
```

---

### Create Project
**POST** `/api/proyectos`

Requiere JWT.

**Body:**
```json
{
  "nombre": "string",
  "descripcion": "string (opcional)"
}
```

**Response (201):**
```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "descripcion": "string",
  "propietario": "ObjectId",
  "miembros": ["ObjectId"],
  "estado": "activo",
  "fechaCreacion": "ISO8601",
  "fechaActualizacion": "ISO8601"
}
```

**Errores:**
- 400: Nombre del proyecto requerido
- 401: No autorizado
- 500: Error del servidor

---

### Get Project by ID
**GET** `/api/proyectos/[id]`

Requiere JWT.

**Response (200):**
```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "descripcion": "string",
  "propietario": { "nombre": "string", "email": "string" },
  "miembros": [{ "nombre": "string", "email": "string" }],
  "estado": "string",
  "fechaCreacion": "ISO8601",
  "fechaActualizacion": "ISO8601"
}
```

**Errores:**
- 401: No autorizado
- 404: Proyecto no encontrado
- 500: Error del servidor

---

### Update Project
**PUT** `/api/proyectos/[id]`

Requiere JWT.

**Body:**
```json
{
  "nombre": "string",
  "descripcion": "string",
  "estado": "activo | pausado | completado"
}
```

**Response (200):**
```json
{
  "_id": "ObjectId",
  "nombre": "string",
  "descripcion": "string",
  "propietario": "ObjectId",
  "miembros": ["ObjectId"],
  "estado": "string",
  "fechaCreacion": "ISO8601",
  "fechaActualizacion": "ISO8601"
}
```

---

### Delete Project
**DELETE** `/api/proyectos/[id]`

Requiere JWT.

**Response (200):**
```json
{
  "mensaje": "Proyecto eliminado exitosamente"
}
```

**Errores:**
- 401: No autorizado
- 404: Proyecto no encontrado
- 500: Error del servidor

---

## ✅ Tareas

### Get Tasks by Project
**GET** `/api/tareas?proyectoId=<project_id>`

Requiere JWT.

**Query Parameters:**
- `proyectoId` (requerido): ID del proyecto

**Response (200):**
```json
[
  {
    "_id": "ObjectId",
    "titulo": "string",
    "descripcion": "string",
    "proyecto": "ObjectId",
    "asignadoA": {
      "_id": "ObjectId",
      "nombre": "string",
      "email": "string"
    },
    "prioridad": "baja | media | alta",
    "estado": "pendiente | en-progreso | completada",
    "fechaLimite": "ISO8601",
    "fechaCreacion": "ISO8601",
    "fechaActualizacion": "ISO8601"
  }
]
```

---

### Create Task
**POST** `/api/tareas`

Requiere JWT.

**Body:**
```json
{
  "titulo": "string",
  "descripcion": "string",
  "proyecto": "ObjectId",
  "asignadoA": "ObjectId (opcional)",
  "prioridad": "baja | media | alta",
  "fechaLimite": "ISO8601 (opcional)"
}
```

**Response (201):**
```json
{
  "_id": "ObjectId",
  "titulo": "string",
  "descripcion": "string",
  "proyecto": "ObjectId",
  "asignadoA": "ObjectId",
  "prioridad": "string",
  "estado": "pendiente",
  "fechaLimite": "ISO8601",
  "fechaCreacion": "ISO8601",
  "fechaActualizacion": "ISO8601"
}
```

---

### Get Task by ID
**GET** `/api/tareas/[id]`

Requiere JWT.

**Response (200):**
```json
{
  "_id": "ObjectId",
  "titulo": "string",
  "descripcion": "string",
  "proyecto": "ObjectId",
  "asignadoA": { "nombre": "string", "email": "string" },
  "prioridad": "string",
  "estado": "string",
  "fechaLimite": "ISO8601",
  "fechaCreacion": "ISO8601",
  "fechaActualizacion": "ISO8601"
}
```

---

### Update Task
**PUT** `/api/tareas/[id]`

Requiere JWT.

**Body:**
```json
{
  "titulo": "string",
  "descripcion": "string",
  "asignadoA": "ObjectId",
  "prioridad": "baja | media | alta",
  "estado": "pendiente | en-progreso | completada",
  "fechaLimite": "ISO8601"
}
```

**Response (200):**
```json
{
  "_id": "ObjectId",
  "titulo": "string",
  "descripcion": "string",
  "proyecto": "ObjectId",
  "asignadoA": "ObjectId",
  "prioridad": "string",
  "estado": "string",
  "fechaLimite": "ISO8601",
  "fechaCreacion": "ISO8601",
  "fechaActualizacion": "ISO8601"
}
```

---

### Delete Task
**DELETE** `/api/tareas/[id]`

Requiere JWT.

**Response (200):**
```json
{
  "mensaje": "Tarea eliminada exitosamente"
}
```

---

## 💬 Comentarios

### Get Comments by Task
**GET** `/api/comentarios?tareaId=<task_id>`

Requiere JWT.

**Query Parameters:**
- `tareaId` (requerido): ID de la tarea

**Response (200):**
```json
[
  {
    "_id": "ObjectId",
    "contenido": "string",
    "tarea": "ObjectId",
    "autor": {
      "_id": "ObjectId",
      "nombre": "string",
      "email": "string"
    },
    "fechaCreacion": "ISO8601"
  }
]
```

---

### Create Comment
**POST** `/api/comentarios`

Requiere JWT.

**Body:**
```json
{
  "contenido": "string",
  "tarea": "ObjectId"
}
```

**Response (201):**
```json
{
  "_id": "ObjectId",
  "contenido": "string",
  "tarea": "ObjectId",
  "autor": "ObjectId",
  "fechaCreacion": "ISO8601"
}
```

---

### Delete Comment
**DELETE** `/api/comentarios/[id]`

Requiere JWT.

**Response (200):**
```json
{
  "mensaje": "Comentario eliminado exitosamente"
}
```

---

## 🔑 Códigos de Error Comunes

| Código | Descripción |
|--------|-------------|
| 400 | Bad Request - Falta información requerida |
| 401 | Unauthorized - Token inválido o no proporcionado |
| 404 | Not Found - Recurso no encontrado |
| 409 | Conflict - El recurso ya existe (ej: usuario duplicado) |
| 500 | Internal Server Error - Error del servidor |

---

## 📝 Ejemplos con cURL

### Registrarse
```bash
curl -X POST http://localhost:3000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "nombre": "Juan Pérez",
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Iniciar Sesión
```bash
curl -X POST http://localhost:3000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "juan@example.com",
    "password": "password123"
  }'
```

### Crear Proyecto
```bash
curl -X POST http://localhost:3000/api/proyectos \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "nombre": "Mi Nuevo Proyecto",
    "descripcion": "Descripción del proyecto"
  }'
```

### Crear Tarea
```bash
curl -X POST http://localhost:3000/api/tareas \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "titulo": "Mi Primera Tarea",
    "descripcion": "Descripción",
    "proyecto": "PROJECT_ID",
    "prioridad": "alta"
  }'
```

---

## 🔐 Notas de Seguridad

- Los tokens JWT expiran en 7 días
- Las contraseñas se almacenan hasheadas con bcryptjs
- Todas las contraseñas deben tener al menos 6 caracteres
- Los endpoints están protegidos con autenticación JWT
- En producción, usar HTTPS siempre

---

**Última actualización:** 2026-06-12
