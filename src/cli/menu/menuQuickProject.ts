// src/cli/menu/menuQuickProject.ts
import { multiselect, text, select } from "@clack/prompts";
import chalk from "chalk";
import { QuickConfig } from "../../types/quickConfig";
import { quickConfigService } from "../../services/quickConfigService";

export async function menuQuickProject(): Promise<void> {
  const existingConfig = quickConfigService.loadConfig();

  console.clear()
  if (existingConfig) {
    console.log(chalk.yellow("Configuración existente:"));
    console.table(existingConfig);
    await text({ message: "Presione Enter para continuar..." });
    console.clear()
  }

  const selected = await multiselect({
    message: chalk.cyan(`Seleccione las configuraciones que desea automatizar:\n`),
    initialValues: existingConfig
      ? Object.keys(existingConfig).filter((key) => {
          const value = existingConfig[key as keyof QuickConfig];
          return value === true || (typeof value === "string" && value.length > 0);
        })
      : [],
    options: [
      { label: '📦 Nombre del paquete', value: 'packageName' },
      { label: '🎨 Usar TailwindCSS', value: 'useTailwind' },
      { label: '🔗 Usar Git', value: 'useGit' },
      { label: '🔧 Seleccionar Bundler', value: 'bundlerType' },
      { label: '📄 Lenguaje', value: 'languageType' },
      { label: '📦 Gestor de paquetes', value: 'packageManager' },
      { label: "📂 Configurar estructura de carpetas", value: "folderStructure" },
      { label: "📦 Configurar dependencias adicionales", value: "installDeps" },
      { label: "⬅️ Volver al menú anterior", value: "back" }
    ]
  });

  if (typeof selected === "symbol" || selected.includes("back")) {
    console.log(chalk.yellow("⚠ Operación cancelada"));
    return;
  }

  

  const config: Partial<QuickConfig> = { ...(existingConfig || {}) };

  if (selected.includes("packageName")) {
    config.packageName = await text({
      message: "Ingrese el nombre del paquete:",
      initialValue: existingConfig?.packageName || ""
    }) as string;
  }
  // Si el usuario seleccionó usar Tailwind, no volver a preguntar; simplemente asigna true
  if (selected.includes("useTailwind")) {
    config.useTailwind = true;
  }
  if (selected.includes("useGit")) {
    config.useGit = true
  }
  
  if (selected.includes("bundlerType")) {
    config.bundlerType = await select({
      message: "Seleccione el bundler:",
      initialValue: existingConfig?.bundlerType || "Vite",
      options: [
        { label: "Vite", value: "Vite" },
        { label: "Ninguno", value: "Ninguno" }
      ]
    }) as QuickConfig["bundlerType"];
  }
  if (selected.includes("languageType")) {
    config.languageType = await select({
      message: "Seleccione el lenguaje:",
      initialValue: existingConfig?.languageType || "TypeScript",
      options: [
        { label: "TypeScript", value: "TypeScript" },
        { label: "JavaScript", value: "JavaScript" },
        { label: "JavaScript + SWC", value: "JavaScript + SWC" },
        { label: "TypeScript + SWC", value: "TypeScript + SWC" }
      ]
    }) as QuickConfig["languageType"];
  }
  // Solo mostrar el prompt para tailwindVersion si useTailwind fue marcado y config.useTailwind es true
  if (selected.includes("useTailwind") && config.useTailwind) {
    config.tailwindVersion = await select({
      message: "Seleccione la versión de Tailwind:",
      initialValue: existingConfig?.tailwindVersion || "latest",
      options: [
        { label: "latest", value: "latest" },
        { label: "4.1", value: "4.1" },
        { label: "3.4.17", value: "3.4.17" }
      ]
    }) as QuickConfig["tailwindVersion"];
  }
  if (selected.includes("packageManager")) {
    config.packageManager = await select({
      message: "Seleccione el gestor de paquetes:",
      initialValue: existingConfig?.packageManager || "npm",
      options: [
        { label: "npm", value: "npm" },
        { label: "pnpm", value: "pnpm" }
      ]
    }) as QuickConfig["packageManager"];
  }

  // Prompt para estructura de carpetas
  if (selected.includes("folderStructure")) {
    config.createFolders = true;
    config.folderStructure = await text({
      message: "Ingresá estructura (ej: pages, components, shared/hooks/{useFetch.ts}, admin/users/{index.ts}, admin/settings):",
      initialValue: existingConfig?.folderStructure || ""
    }) as string;
  }

  // Prompt para dependencias adicionales
  if (selected.includes("installDeps")) {
    config.installDeps = true;
    // Permite ingresar dependencias separadas por coma o espacio
    config.depsList = await text({
      message: "Ingrese las dependencias adicionales (separadas por espacio, ej: Lucide-react react-router-dom):",
      initialValue: existingConfig?.depsList || ""
    }) as string;
  }

  quickConfigService.saveConfig(config as QuickConfig);
  const configPath =
    (quickConfigService as any).configPath ||
    require("path").join(process.cwd(), "quick.config.json");
  console.log(chalk.green("✅ Configuración rápida guardada"));
  console.log(
    chalk.blueBright(
      `Archivo guardado en: ${configPath}`
    )
  );
}