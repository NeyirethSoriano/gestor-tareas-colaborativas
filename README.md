# Gestor de Tareas Colaborativas

Aplicación web completa para gestión de proyectos y tareas colaborativas con autenticación de usuarios, base de datos online y despliegue en la nube.

## 📋 Descripción del Proyecto

Sistema CRUD full-stack que permite a los usuarios:
- **Crear, leer, actualizar y eliminar proyectos**
- **Crear, leer, actualizar y eliminar tareas** dentro de proyectos
- **Asignar tareas a usuarios**
- **Gestionar estado y prioridad de tareas**
- **Agregar comentarios en tareas**
- **Sistema de autenticación seguro**
- **Dashboard con visualización de proyectos y tareas**

## 🎯 Características Principales

### Gestión de Proyectos
- ✅ Crear nuevos proyectos
- ✅ Listar proyectos del usuario
- ✅ Editar información del proyecto
- ✅ Eliminar proyectos
- ✅ Estados: activo, pausado, completado

### Gestión de Tareas
- ✅ Crear tareas dentro de un proyecto
- ✅ Asignar tareas a usuarios
- ✅ Establecer prioridad (baja, media, alta)
- ✅ Definir fecha límite
- ✅ Cambiar estado (pendiente, en progreso, completada)
- ✅ Editar y eliminar tareas
- ✅ Visualizar tareas por estado

### Gestión de Usuarios
- ✅ Registro de nuevos usuarios
- ✅ Autenticación segura con JWT
- ✅ Visualización de tareas asignadas
- ✅ Roles (usuario, admin)

### Funcionalidades Avanzadas
- ✅ Sistema de autenticación con JWT
- ✅ Comentarios en tareas
- ✅ Relaciones entre entidades (usuarios, proyectos, tareas)
- ✅ Validaciones de formularios
- ✅ Manejo de errores robusto

## 🏗️ Arquitectura y Tecnologías

### Frontend
- **Next.js 14** - Framework React full-stack
- **React 18** - Librería UI
- **TypeScript** - Tipado estático
- **CSS nativo** - Estilos

### Backend
- **Next.js API Routes** - Endpoints REST
- **Node.js** - Runtime

### Base de Datos
- **MongoDB Atlas** - Base de datos online NoSQL
- **Mongoose** - ODM para MongoDB

### Autenticación
- **JWT (JSON Web Tokens)** - Autenticación sin sesiones
- **bcryptjs** - Hash de contraseñas

### Despliegue
- **Vercel** - Hosting y despliegue automático

## 📦 Entidades del Proyecto

### Usuario
```typescript
{
  nombre: string;
  email: string;
  password: string;
  rol: 'usuario' | 'admin';
  fechaRegistro: Date;
  activo: boolean;
}
```

### Proyecto
```typescript
{
  nombre: string;
  descripcion: string;
  propietario: ObjectId (Usuario);
  miembros: ObjectId[] (Usuario);
  estado: 'activo' | 'pausado' | 'completado';
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
```

### Tarea
```typescript
{
  titulo: string;
  descripcion: string;
  proyecto: ObjectId (Proyecto);
  asignadoA: ObjectId (Usuario);
  prioridad: 'baja' | 'media' | 'alta';
  estado: 'pendiente' | 'en-progreso' | 'completada';
  fechaLimite: Date;
  fechaCreacion: Date;
  fechaActualizacion: Date;
}
```

### Comentario
```typescript
{
  contenido: string;
  tarea: ObjectId (Tarea);
  autor: ObjectId (Usuario);
  fechaCreacion: Date;
}
```

## 🚀 Instalación y Configuración

### Prerequisitos
- Node.js 18+ instalado
- Git instalado
- Cuenta en MongoDB Atlas
- Cuenta en Vercel (para despliegue)

### Pasos de Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/tu-usuario/gestor-tareas-colaborativas.git
cd gestor-tareas-colaborativas
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
# Copiar archivo ejemplo
cp .env.example .env.local
```

Editar `.env.local` y completar:
```
MONGODB_URI=mongodb+srv://usuario:contraseña@cluster.mongodb.net/gestor_tareas?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_segura
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### Obtener Connection String de MongoDB Atlas

1. Ir a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crear una cuenta o iniciar sesión
3. Crear un nuevo cluster (Free tier)
4. Ir a "Connect" → "Connect your application"
5. Copiar la connection string
6. Reemplazar `<password>` con tu contraseña y `<database>` con el nombre de la BD

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

La aplicación estará disponible en: `http://localhost:3000`

5. **Compilar para producción**
```bash
npm run build
npm start
```

## 📚 Endpoints API

### Autenticación
- `POST /api/auth/register` - Registro de usuario
- `POST /api/auth/login` - Iniciar sesión

### Proyectos
- `GET /api/proyectos` - Obtener proyectos del usuario
- `POST /api/proyectos` - Crear nuevo proyecto
- `GET /api/proyectos/[id]` - Obtener proyecto específico
- `PUT /api/proyectos/[id]` - Actualizar proyecto
- `DELETE /api/proyectos/[id]` - Eliminar proyecto

### Tareas
- `GET /api/tareas?proyectoId=id` - Obtener tareas de un proyecto
- `POST /api/tareas` - Crear nueva tarea
- `GET /api/tareas/[id]` - Obtener tarea específica
- `PUT /api/tareas/[id]` - Actualizar tarea
- `DELETE /api/tareas/[id]` - Eliminar tarea

### Comentarios
- `GET /api/comentarios?tareaId=id` - Obtener comentarios de una tarea
- `POST /api/comentarios` - Crear nuevo comentario
- `DELETE /api/comentarios/[id]` - Eliminar comentario

## 🔐 Autenticación

La aplicación utiliza **JWT (JSON Web Tokens)** para autenticación:

1. El usuario se registra o inicia sesión
2. El servidor retorna un token JWT
3. El cliente almacena el token en `localStorage`
4. Para acceder a rutas protegidas, incluir el token en el header:
```
Authorization: Bearer <token>
```

## 📋 Estructura del Proyecto

```
gestor-tareas-colaborativas/
├── app/
│   ├── api/
│   │   ├── auth/
│   │   │   ├── login/
│   │   │   │   └── route.ts
│   │   │   └── register/
│   │   │       └── route.ts
│   │   ├── proyectos/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   ├── tareas/
│   │   │   ├── [id]/
│   │   │   │   └── route.ts
│   │   │   └── route.ts
│   │   └── comentarios/
│   │       ├── [id]/
│   │       │   └── route.ts
│   │       └── route.ts
│   ├── dashboard/
│   │   └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── register/
│   │   └── page.tsx
│   ├── proyectos/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── lib/
│   ├── mongodb.ts
│   ├── auth.ts
│   └── password.ts
├── models/
│   ├── Usuario.ts
│   ├── Proyecto.ts
│   ├── Tarea.ts
│   └── Comentario.ts
├── .env.example
├── .env.local (no versionar)
├── .gitignore
├── package.json
├── next.config.js
├── tsconfig.json
└── README.md
```

## 🌐 Despliegue en Vercel

### Pasos para Desplegar

1. **Pushear código a GitHub**
```bash
git init
git add .
git commit -m "Initial commit: Gestor de Tareas Colaborativas"
git branch -M main
git remote add origin https://github.com/tu-usuario/repo-nombre.git
git push -u origin main
```

2. **Conectar Vercel con GitHub**
- Ir a [vercel.com](https://vercel.com)
- Iniciar sesión con GitHub
- Click en "New Project"
- Seleccionar el repositorio

3. **Configurar variables de entorno en Vercel**
- En la configuración del proyecto, agregar:
  - `MONGODB_URI`
  - `JWT_SECRET`
  - `NODE_ENV=production`

4. **Desplegar**
- Vercel detecta cambios en main y despliega automáticamente
- La URL estará disponible en el dashboard de Vercel

## 📸 Capturas de Pantalla

### Página de Inicio
![Home Page - Descripción del proyecto y acceso]

### Registro e Inicio de Sesión
![Login/Register - Formularios de autenticación]

### Dashboard
![Dashboard - Listado de proyectos del usuario]

### Gestión de Tareas
![Tareas - Crear, editar y ver tareas del proyecto]

## ✅ Checklist de Funcionalidades

- [x] Gestión CRUD de proyectos
- [x] Gestión CRUD de tareas
- [x] Sistema de autenticación
- [x] Relaciones entre entidades
- [x] Validaciones de formularios
- [x] API REST completa
- [x] Base de datos online (MongoDB Atlas)
- [x] Despliegue en Vercel
- [x] Variables de entorno
- [x] Manejo de errores
- [x] Interfaz web amigable
- [x] Comentarios en tareas
- [x] Estados y prioridades
- [x] JWT para autenticación

## 🔄 Flujo de Desarrollo

1. Crear rama para nueva funcionalidad:
```bash
git checkout -b feature/nueva-funcionalidad
```

2. Hacer cambios y commits:
```bash
git add .
git commit -m "Descripción clara del cambio"
```

3. Hacer push y crear Pull Request:
```bash
git push origin feature/nueva-funcionalidad
```

## 🐛 Solución de Problemas

### Error de conexión a MongoDB
- Verificar connection string en `.env.local`
- Asegurar que la IP está whitelisted en MongoDB Atlas
- Verificar usuario y contraseña

### Token JWT inválido
- Limpiar localStorage: `localStorage.clear()`
- Hacer login nuevamente
- Verificar que JWT_SECRET es consistente

### Errores de CORS
- Verificar que el servidor está corriendo
- Revisar headers en las solicitudes API

## 📝 Notas de Desarrollo

- Los tokens JWT expiran en 7 días
- Las contraseñas se hashean con bcryptjs
- Las relaciones en MongoDB se manejan con ObjectId
- Las consultas se cachean en el servidor de desarrollo

## 📧 Contacto y Soporte

Para reportar bugs o sugerencias:
- Crear un issue en GitHub
- Contactar al equipo de desarrollo

## 📄 Licencia

Este proyecto está bajo licencia MIT.

---

**Última actualización:** 2026-06-12
**Versión:** 1.0.0
