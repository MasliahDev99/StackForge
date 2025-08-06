# ⚡ StackForge

**StackForge** es una herramienta de línea de comandos (CLI) diseñada para acelerar la creación de proyectos modernos con **React**, **TailwindCSS**, **TypeScript** y buenas prácticas preconfiguradas. En cuestión de segundos, tendrás un entorno listo para comenzar a desarrollar.

---

## 🚀 Características

- ✅ Setup interactivo personalizado
- ⚙️ Soporte para Vite, CRA y configuración sin bundler
- 🎨 Instalación automática de TailwindCSS
- 🧠 Elección de lenguaje: TypeScript, JavaScript o TypeScript + SWC
- 📂 Generación de estructura de carpetas optimizada
- 🧹 Configuración automática de ESLint + Prettier
- 🔒 Auditoría de seguridad con `npm audit fix`
- ✨ Soporte para alias de imports

---

## 📁 Estructura del proyecto

```
STACKFORGE/
├── src/
│   ├── bin/                  # Punto de entrada del CLI (index.ts)
│   ├── cli/                  # Prompts interactivos al usuario
│   ├── core/                 # Lógica principal del generador
│   │   ├── creator.ts
│   │   ├── installer.ts
│   │   ├── tailwind.ts
│   │   ├── folderStructure.ts
│   │   ├── eslintPrettier.ts
│   │   ├── alias.ts
│   │   └── audit.ts
│   ├── utils/                # Utilidades generales
│   │   ├── exec.ts
│   │   ├── logger.ts
│   │   └── fileUtils.ts
│   └── types/                # Tipos compartidos
│       └── index.d.ts
├── package.json
├── tsconfig.json
├── README.md
└── .gitignore
```

---

## 🛠️ Instalación y uso

### 1. Compilar el CLI

```bash
pnpm build
```

### 2. Ejecutar localmente

```bash
node dist/index.js
```

### 3. Usar con NPX (si está publicado)

```bash
npx stackforge
```

---

## 🧪 Requisitos

- Node.js 18+
- pnpm (opcional pero recomendado)

---

## 💡 Roadmap

- [ ] Publicación en npm
- [ ] Integración con git


---

## 📄 Licencia

MIT © 2025 — StackForge Contributors