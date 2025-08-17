# ⚡ StackForge

![Logo y bienvenida de StackForge CLI](https://raw.githubusercontent.com/MasliahDev99/StackForge/rc-1.0.0/docs/STACKFORGE_LOGO.webp)

> 🚀 La CLI para crear proyectos **React + Tailwind + TypeScript** en segundos, con **presets reutilizables**, configuración automatizada y auditoría de dependencias.

---

![npm](https://img.shields.io/npm/v/stackforge-cli)
![downloads](https://img.shields.io/npm/dw/stackforge-cli)
![license](https://img.shields.io/github/license/MasliahDev99/StackForge)


---

## 📚 Tabla de contenidos
- [✨ Visión](#-visión)
- [🎯 Casos de uso](#-casos-de-uso)
- [🛠️ Características](#-características)
- [⚡ Presets y Proyectos Rápidos](#-presets-y-proyectos-rápidos)
- [📂 Estructura de carpetas](#-estructura-de-carpetas)
- [🚀 Instalación y uso](#-instalación-y-uso)
- [📦 Novedades v2.2.0](#-novedades-v220)
- [🗺️ Roadmap](#-roadmap)
- [🎬 Demo en video](#-demo-en-video)
- [📄 Licencia](#-licencia)

---

## ✨ Visión
StackForge busca convertirse en el **punto de partida estándar** para desarrolladores frontend, ofreciendo proyectos **rápidos, consistentes y seguros**, con las mejores prácticas listas desde el minuto cero.

---

## 🎯 Casos de uso
- 🚀 Crear un proyecto React moderno en **segundos**.  
- ⚙️ Configurar automáticamente **ESLint + Prettier**.  
- 🎨 Añadir **TailwindCSS** (con versión configurable).  
- 🗂️ Definir tu **estructura de carpetas y archivos** personalizada.  
- 🛡️ Evitar dependencias con vulnerabilidades (auditoría automática).  
- 🔑 Inicializar y vincular proyectos a **GitHub** sin esfuerzo.  
- ⚡ Reutilizar presets para estandarizar proyectos en equipos.

---

## 🛠️ Características
| Categoría        | Detalles |
|------------------|----------|
| ⚡ Setup rápido   | Crear proyectos manuales o rápidos con presets |
| 🎨 Estilos       | Integración completa con **TailwindCSS** |
| 🛠️ Calidad       | Configuración lista de **ESLint + Prettier** |
| 🗂️ Estructura    | Carpetas y archivos personalizables desde la CLI |
| 🔒 Seguridad     | Auditoría automática de dependencias (`pnpm audit fix`) |
| 🔑 GitHub        | Init, repo y primer push automático |

---

## ⚡ Presets y Proyectos Rápidos
Con la versión **v2.2.0**, StackForge introduce los **proyectos rápidos con presets**:

- Podés guardar configuraciones previas en `config.json`.  
- Definí el **gestor de paquetes**, **bundler**, **lenguaje**, **estructura de carpetas** y **dependencias adicionales**.  
- Iniciá un proyecto nuevo en segundos reutilizando tu configuración favorita.  

Ejemplo de preset:
```json
{
  "packageManager": "pnpm",
  "bundlerType": "Vite",
  "language": "TypeScript",
  "useTailwind": true,
  "tailwindVersion": "4.1",
  "createFolders": true,
  "folderStructure": "pages, components/[UI/{Button.tsx,index.ts}, Home/{Home.tsx}], store, hooks",
  "installDeps": true,
  "depsList": "lucide-react react-router-dom"
}
```

---

## 📂 Estructura de carpetas
StackForge permite crear estructuras personalizadas directamente desde la CLI.  
Ejemplo:
```
src/
 ├── pages/
 ├── components/
 │   ├── UI/
 │   │   ├── Button.tsx
 │   │   └── index.ts
 │   └── Home/
 │       └── Home.tsx
 ├── store/
 └── hooks/
```

---

## 🚀 Instalación y uso
Instalá StackForge globalmente:

```bash
npm install stackforge-cli
```

Para crear un proyecto:

```bash
npx stackforge
```

Seguí las instrucciones interactivas para configurar tu proyecto.

---

## 📦 Novedades v2.2.0
- 🚀 **Proyectos rápidos con presets configurables**.
- 📂 Soporte para **estructuras de carpetas personalizadas** guardadas en `config.json`.
- 📚 Instalación automática de **dependencias adicionales** definidas por el usuario.
- 🛡️ **Auditoría de seguridad** antes de instalar dependencias vulnerables.
- ⚙️ **Menú CLI reestructurado**, con submenús escalables.

---

## 🗺️ Roadmap
- 🔌 Integración con **Supabase** como opción de configuración.
- 🌐 Plantillas adicionales para frameworks (Next.js, Remix, etc).
- 👥 Modo **multiusuario** y presets compartidos en equipo.
- ⏱️ Barra de progreso detallada en cada paso del setup.
- 💡 Generación de configuraciones recomendadas según la comunidad.




---

## 🎬 Demo en video
Mirá StackForge en acción:  
[!Demo de StackForge](https://www.youtube.com/watch?v=OSmmhkYobVg)

---

## 📄 Licencia
Este proyecto está bajo la licencia MIT.  
Consultá el archivo [LICENSE](LICENSE) para más detalles.