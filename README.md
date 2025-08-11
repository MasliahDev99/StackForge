# ⚡ StackForge

![Logo y bienvenida de StackForge CLI](https://raw.githubusercontent.com/MasliahDev99/StackForge/rc-1.0.0/docs/STACKFORGE_LOGO.png)



**StackForge** es una herramienta de línea de comandos (CLI) diseñada para acelerar y estandarizar la creación de proyectos modernos en React con tecnologías actuales como **TailwindCSS**, **TypeScript**, y una configuración lista para producción.

---

## 🌟 ¿Qué es StackForge?

**StackForge** es una herramienta CLI avanzada que automatiza y estandariza la creación de proyectos modernos de frontend con React. Simplifica el setup inicial integrando tecnologías punteras como TailwindCSS, TypeScript, configuración robusta de ESLint y Prettier, y vinculación automática con repositorios Git, acelerando tu productividad desde el primer minuto.

---

## 🎯 Visión

Queremos que StackForge sea el punto de partida estándar para desarrolladores frontend, ofreciendo una experiencia ágil, confiable y segura que promueva las mejores prácticas de desarrollo, rendimiento y seguridad desde el inicio del proyecto.

---

## 🚀 Casos de uso

- Creación rápida de proyectos React con configuración moderna y optimizada.
- Vinculación automática con git
- Integración automática de TailwindCSS para estilos.
- Setup automático de ESLint y Prettier con reglas recomendadas.
- Estructura modular y escalable de carpetas y alias para imports.
- Auditoría inicial de seguridad para detectar y mitigar vulnerabilidades comunes.
- Base para equipos que quieran uniformizar la estructura y configuración de sus proyectos.

---

## 🛠️ Características principales

- CLI interactiva y amigable.
- Elección flexible de gestor de paquetes, bundler y lenguaje.
- Configuración lista para desarrollo y producción.
- Auditoría automática de dependencias y fallback seguro.
- Generación de README inicial y estructura de carpetas personalizable.
- Vinculación automática de nuevos proyectos con repositorios Git.

---

## 🔑 Autenticación y usuario de Git

Cuando StackForge crea un repositorio en GitHub y realiza el primer `git push`, Git utiliza el **usuario y correo configurados en tu instalación de Git** (`~/.gitconfig` o `.git/config`).  
Si estos datos no coinciden con la cuenta asociada al **token personal de GitHub** que configuraste en StackForge, el push fallará por falta de permisos.

**Recomendación:**
- Configurá tu nombre y correo globales de Git para que coincidan con la cuenta del token:
  ```bash
  git config --global user.name "TU_USUARIO_GITHUB"
  git config --global user.email "tu-email@ejemplo.com"
  ```
- Generá el token desde la misma cuenta de GitHub y con los permisos requeridos: `repo` y `read:user`.

---


## 📂 Definir estructura personalizada de carpetas y archivos

En StackForge podés definir la estructura inicial de tu proyecto escribiendo la ruta de carpetas y archivos en un solo input, separando elementos por comas.

### 1️⃣ Carpetas vacías
```
pages, components, hooks
```
Esto crea:
```
src/pages/
src/components/
src/hooks/
```

### 2️⃣ Carpetas anidadas
```
pages/admin/users
```
Esto crea:
```
src/pages/admin/users/
```

### 3️⃣ Archivos dentro de carpetas
```
pages, components/{Header.tsx, Footer.tsx}
```
Esto crea:
```
src/pages/
src/components/Header.tsx
src/components/Footer.tsx
```

### 4️⃣ Carpetas anidadas con archivos
```
pages/admin/{index.tsx, AdminPanel.tsx}, shared/hooks/{useFetch.ts}
```
Esto crea:
```
src/pages/admin/index.tsx
src/pages/admin/AdminPanel.tsx
src/shared/hooks/useFetch.ts
```

### 5️⃣ Combinación de carpetas y archivos
```
pages, components/[UI/{Button.tsx, index.ts}, Home/{Home.tsx}], adapters
```
Esto crea:
```
src/pages/
src/components/UI/Button.tsx
src/components/UI/index.ts
src/components/Home/Home.tsx
src/adapters/
```

💡 **Tip:** Usá `{}` para definir archivos dentro de una carpeta, y `/` para crear subcarpetas.

## 🔮 Mejoras futuras

-  Creación de nuevos proyectos a partir de históricos para mejorar la automatización y experiencia del usuario.
- **Mejoras en la experiencia de usuario:** interfaz CLI más intuitiva, con feedback visual avanzado y soporte para modos rápidos y avanzados.
- **Enfoque avanzado en seguridad:** incorporación de configuraciones predeterminadas para mitigar riesgos como XSS, inyección SQL, CSPs básicas y otras vulnerabilidades de frontend.
- **Integración de IA:** incorporación de inteligencia artificial para mejorar la automatización en la creación del proyecto, por ejemplo, generando templates personalizados y arquitecturas dinámicas a partir de descripciones del usuario.


---


## 🎬 Demo en Video

Para ver una demostración completa de StackForge CLI en acción, podés acceder al siguiente video:

[![Demo StackForge CLI](https://img.youtube.com/vi/OSmmhkYobVg/hqdefault.jpg)](https://youtu.be/OSmmhkYobVg)

---

Este video muestra la configuración de StackForge, desde la inicialización hasta la creación y vinculación del repositorio Git, todo automatizado desde la CLI.



---
## Instalación y Uso

### Requisitos previos
- Tener instalado Node.js 16 o superior.
- Contar con npm.

### Instalación 
```bash
npm install stackforge-cli
```

### Uso con npx 
```bash
npx stackforge
```



---
## 📄 Licencia

MIT © 2025 — StackForge Contributors [!LICENSE](./LICENSE)

---

> **Nota:** StackForge es una herramienta en evolución. Se agradecen las contribuciones y feedback para seguir mejorando la experiencia de desarrollo.

> contacto: 📩 d3vTek-mv@outlook.com
