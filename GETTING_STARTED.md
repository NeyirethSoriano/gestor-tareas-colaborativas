# 🚀 Guía de Inicio Rápido - Gestor de Tareas Colaborativas

## Primeros Pasos

### 1. Configurar MongoDB Atlas

1. Ve a [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Crea una cuenta (es gratis)
3. Crea un nuevo cluster (Tier Gratis)
4. Espera a que se cree el cluster (5-10 minutos)
5. Haz clic en "Connect"
6. Selecciona "Connect your application"
7. Copia la connection string y reemplaza:
   - `<password>` con tu contraseña
   - `<database>` con `gestor_tareas`

Ejemplo:
```
mongodb+srv://usuario:contraseña@cluster0.xxxxx.mongodb.net/gestor_tareas?retryWrites=true&w=majority
```

### 2. Configurar Variables de Entorno

Edita el archivo `.env.local`:

```bash
MONGODB_URI=tu_connection_string_aqui
JWT_SECRET=una_clave_secreta_fuerte
NEXT_PUBLIC_API_URL=http://localhost:3000
NODE_ENV=development
```

### 3. Instalar Dependencias

```bash
npm install
```

### 4. Ejecutar en Desarrollo

```bash
npm run dev
```

Abre tu navegador en: `http://localhost:3000`

### 5. Crear tu Primer Usuario

- Haz clic en "Registrarse"
- Llena los campos (nombre, email, contraseña)
- Completa el registro

### 6. Crear tu Primer Proyecto

1. Inicia sesión con tus credenciales
2. En el Dashboard, llena el formulario "Crear Nuevo Proyecto"
3. Haz clic en "Crear Proyecto"
4. Haz clic en "Ver Tareas" para acceder al proyecto

### 7. Crear tu Primera Tarea

1. En la página del proyecto, llena el formulario "Crear Nueva Tarea"
2. Establece:
   - Título
   - Descripción
   - Prioridad (baja, media, alta)
3. Haz clic en "Crear Tarea"

## 🔄 Estructura de Carpetas

```
├── app/                    # Páginas y API
├── lib/                    # Funciones utilitarias
├── models/                 # Esquemas MongoDB
├── .env.local             # Variables de entorno (no versionar)
├── .env.example           # Ejemplo de variables
├── package.json           # Dependencias
└── README.md              # Documentación completa
```

## 📝 Funcionalidades Disponibles

### Usuario
- ✅ Registrarse
- ✅ Iniciar sesión
- ✅ Ver datos del usuario
- ✅ Cerrar sesión

### Proyectos
- ✅ Crear proyectos
- ✅ Ver listado de proyectos
- ✅ Eliminar proyectos
- ✅ Actualizar información del proyecto

### Tareas
- ✅ Crear tareas
- ✅ Ver tareas por proyecto
- ✅ Establecer prioridad
- ✅ Cambiar estado
- ✅ Eliminar tareas

### Comentarios
- ✅ Agregar comentarios en tareas
- ✅ Ver comentarios de una tarea
- ✅ Eliminar comentarios propios

## 🔧 Comandos Útiles

```bash
# Desarrollo
npm run dev

# Compilar para producción
npm run build

# Iniciar servidor de producción
npm start

# Verificar linting
npm run lint

# Auditoría de seguridad
npm audit
```

## 🌐 Desplegar en Vercel

1. Pushea tu código a GitHub
2. Ve a [vercel.com](https://vercel.com)
3. Conecta tu repositorio GitHub
4. Configura variables de entorno en Vercel
5. Vercel hará deploy automático

## 📧 Endpoints de API

Todos los endpoints requieren autenticación con JWT (excepto registro y login)

### Header Requerido
```
Authorization: Bearer <token>
```

### Ejemplos

#### Registrarse
```bash
POST /api/auth/register
Content-Type: application/json

{
  "nombre": "Juan",
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

#### Iniciar Sesión
```bash
POST /api/auth/login
Content-Type: application/json

{
  "email": "juan@example.com",
  "password": "contraseña123"
}
```

#### Crear Proyecto
```bash
POST /api/proyectos
Content-Type: application/json
Authorization: Bearer <token>

{
  "nombre": "Mi Proyecto",
  "descripcion": "Descripción del proyecto"
}
```

#### Crear Tarea
```bash
POST /api/tareas
Content-Type: application/json
Authorization: Bearer <token>

{
  "titulo": "Mi Tarea",
  "descripcion": "Descripción",
  "proyecto": "id_del_proyecto",
  "prioridad": "alta"
}
```

## 🐛 Solucionar Problemas

### MongoDB no conecta
- Verifica la connection string en `.env.local`
- Asegúrate de haber whitelisted tu IP en MongoDB Atlas
- Verifica usuario y contraseña

### Token inválido
- Limpia localStorage: Abre DevTools → Application → Storage → Clear All
- Vuelve a iniciar sesión

### Puerto 3000 ya está en uso
```bash
# Linux/Mac
lsof -i :3000
kill -9 <PID>

# Windows (PowerShell)
Get-Process | Where-Object {$_.Name -like "*node*"} | Stop-Process
```

## 📚 Documentación Completa

Para más información, lee [README.md](./README.md)

## 💡 Próximos Pasos

1. Personalizar estilos en `app/globals.css`
2. Agregar más funcionalidades
3. Mejorar la interfaz de usuario
4. Agregar pruebas unitarias
5. Implementar filtros avanzados
6. Agregar carga de imágenes

---

¡Listo para desarrollar! Si tienes problemas, revisa el archivo README.md o los logs de la consola.
