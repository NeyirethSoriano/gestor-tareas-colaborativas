# Gestor de Tareas Colaborativas

## Descripción del Proyecto

Aplicación web full-stack CRUD para gestión de proyectos y tareas colaborativas con autenticación, base de datos online (MongoDB Atlas) y despliegue en Vercel.

## Tecnologías Principales

- **Frontend:** Next.js 14, React 18, TypeScript
- **Backend:** Next.js API Routes, Node.js
- **Base de Datos:** MongoDB Atlas
- **Autenticación:** JWT, bcryptjs
- **Despliegue:** Vercel

## Estructura de Proyecto

```
app/                    # Páginas y rutas de Next.js
├── api/               # Endpoints REST API
├── dashboard/         # Dashboard del usuario
├── login/             # Página de login
├── register/          # Página de registro
├── proyectos/         # Gestión de proyectos
└── globals.css        # Estilos globales

lib/                   # Funciones utilitarias
├── mongodb.ts         # Conexión a MongoDB
├── auth.ts            # JWT y autenticación
└── password.ts        # Hash de contraseñas

models/                # Esquemas Mongoose
├── Usuario.ts
├── Proyecto.ts
├── Tarea.ts
└── Comentario.ts

.env.example           # Variables de entorno
package.json           # Dependencias
tsconfig.json          # Configuración TypeScript
next.config.js         # Configuración Next.js
README.md              # Documentación
```

## Instrucciones de Configuración

### Variables de Entorno (.env.local)

```
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/gestor_tareas
JWT_SECRET=tu_clave_secreta_segura
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Instalación Local

```bash
npm install
npm run dev
# Acceder a: http://localhost:3000
```

### Despliegue en Vercel

1. Conectar repositorio GitHub con Vercel
2. Configurar variables de entorno en Vercel
3. Deploy automático en cada push a main

## Entidades del Proyecto

- **Usuario:** Registro, autenticación, roles
- **Proyecto:** Gestión de proyectos
- **Tarea:** Tareas con prioridad y estado
- **Comentario:** Comentarios en tareas

## Endpoints Principales

### Auth
- POST /api/auth/register
- POST /api/auth/login

### Proyectos
- GET /api/proyectos
- POST /api/proyectos
- GET/PUT/DELETE /api/proyectos/[id]

### Tareas
- GET/POST /api/tareas
- GET/PUT/DELETE /api/tareas/[id]

### Comentarios
- GET/POST /api/comentarios
- DELETE /api/comentarios/[id]

## Desarrollo

- **Ramas:** main (producción), develop (desarrollo)
- **Commits:** Usar mensajes descriptivos
- **Testing:** npm run build para compilar antes de push

## URLs Importantes

- **Repositorio:** https://github.com/tu-usuario/gestor-tareas
- **Aplicación Desplegada:** https://gestor-tareas.vercel.app
- **MongoDB Atlas:** https://cloud.mongodb.com
- **Vercel Dashboard:** https://vercel.com/dashboard

## Notas Importantes

- Los tokens JWT expiran en 7 días
- Todas las contraseñas se hashean con bcryptjs
- Las relaciones entre entidades se manejan con ObjectId
- NUNCA versionar archivos .env con datos sensibles

## Requisitos Completados

✅ Gestión CRUD completa
✅ Autenticación con JWT
✅ Base de datos online
✅ Relaciones entre entidades
✅ Validaciones de formularios
✅ API REST
✅ Despliegue en Vercel
✅ Documentación README
✅ Control de versiones Git
✅ Interfaz web funcional
