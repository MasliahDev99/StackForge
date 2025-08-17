import chalk from "chalk";
import { UserAnswers } from "../../../types/UserAnswer";
import { quickConfigService } from "../../../services/quickConfigService";
import { GitPrompt } from "../../git/prompt/gitPrompt";
import { GitService } from "../../git/service/gitService";
import { confirm, isCancel, select, text } from "@clack/prompts";
import { promptDepsConfig, promptFolderStructureConfig } from "./prompts";


export async function PromptQuickProject(): Promise<UserAnswers | null> {
    // 1. Cargar configuración rápida
    const quickConfig = quickConfigService.loadConfig();

    if (!quickConfig || Object.keys(quickConfig).length === 0) {
        console.log(
            chalk.red("❌ No hay configuración rápida guardada."),
            "\n➡ Ve a:", chalk.cyan("Configuración -> Configuración rápida"),
            "para crearla."
        );
        return null;
    }

    // 2. Mostrar preset actual
    console.log(chalk.cyan("⚙️ Preset de configuración rápida:"));
    console.table(quickConfig);
    console.log(chalk.cyanBright("\n----------------------------\n"));

    const result: Partial<UserAnswers> = {...quickConfig};

    // 3. Nombre del proyecto (siempre obligatorio)
    const projectName = await text({
        message: "📁 Nombre del proyecto:",
        initialValue: "",
    });
    if (isCancel(projectName)) {
        console.log(chalk.red("✖️ Operación cancelada por el usuario."));
        return null;
    }
    result.projectName = projectName;

    // 4. Bundler
    if (!quickConfig.bundlerType) {
        const bundlerChoice = await select({
            message: "📦 ¿Qué bundler querés usar para el proyecto?",
            options: [
                { value: "Vite", label: "Vite" },
                { value: "Ninguno", label: "Ninguno" },
            ],
        });
        if (isCancel(bundlerChoice)) return null;
        result.bundler = bundlerChoice;
    } else {
        result.bundler = quickConfig.bundlerType;
    }

    // 5. packageName solo si bundler es "Vite"
    if(result.bundler === "Vite"){
        let packageName;
        if(quickConfig.packageName === undefined){
            packageName = await text({
                message: '📦 Nombre del package:',
                defaultValue: typeof projectName === 'string'
                  ? projectName.toLowerCase().replace(/\s+/g, '-')
                  : '',
                validate: (value) =>
                  /^[a-z0-9-_]+$/.test(value) ? undefined : 'Solo minúsculas, números, guiones y guion bajo.',
              });
              if (isCancel(packageName)) return null;
            result.packageName = packageName;
        }else{
            result.packageName = quickConfig.packageName;
        }
    }

    // 6. Git
    if (quickConfig.useGit === undefined) {
        const useGit = await confirm({
            message: "📚 ¿Querés inicializar proyecto con git?",
            initialValue: false,
        });
        if (isCancel(useGit)) return null;
        result.useGit = useGit === true;
    } else {
        result.useGit = quickConfig.useGit;
    }

    if (result.useGit) {
        const token = process.env.GITHUB_TOKEN;
        const userName = process.env.GITHUB_USERNAME ?? "";

        if (!token) {
            console.log(chalk.red("❌ No se encontró el token PAT de GitHub. Configuralo primero."));
            return null;
        }

        const gitService = new GitService(token);
        if (!(await gitService.validateToken())) {
            console.log(chalk.red("❌ Token inválido o expirado."));
            return null;
        }

        const gitPrompt = new GitPrompt(gitService);
        const repoConfig = await gitPrompt.promptRepoConfig();
        if (!repoConfig) return null;

        result.gitConfig = { token, userName };
        result.repoCreation = repoConfig;
    }

    // 7. Tailwind
    if (quickConfig.useTailwind === undefined) {
        const useTailwind = await confirm({
            message: "🎨 ¿Querés usar Tailwind CSS?",
            initialValue: false,
        });
        if (isCancel(useTailwind)) return null;
        result.useTailwind = useTailwind === true;
    } else {
        result.useTailwind = quickConfig.useTailwind;
    }

    if (result.useTailwind && !quickConfig.tailwindVersion) {
        const tailwindVersion = await select({
            message: "🎨 Selecciona versión de Tailwind:",
            options: [
                { label: 'latest', value: 'latest' },
                { label: '4.1', value: '4.1' },
                { label: '3.4.17', value: '3.4.17' },
                { label: '2.2.19', value: '2.2.19' },
                { label: '1.9.6', value: '1.9.6' },
                { label: '0.7.4', value: '0.7.4' },
            ],
        });
        if (isCancel(tailwindVersion)) return null;
        result.tailwindVersion = tailwindVersion;
    }

    // 8. createFolders
    if (quickConfig.createFolders === undefined) {
        const folderStructureConfig = await promptFolderStructureConfig();
        if (!folderStructureConfig) return null;
        Object.assign(result, folderStructureConfig);
    } else {
        result.createFolders = quickConfig.createFolders;
    }

    

    // 9. installDeps
    if (quickConfig.installDeps === undefined) {
        const depsConfig = await promptDepsConfig();
        if (!depsConfig) return null;
        Object.assign(result, depsConfig);
    } else {
        result.installDeps = quickConfig.installDeps;
    }

    // 10. language
    if (quickConfig.languageType === undefined) {
        const language = await select({
            message: '📝 ¿Qué lenguaje querés usar?',
            options: [
                { label: 'TypeScript', value: 'TypeScript' },
                { label: 'JavaScript', value: 'JavaScript' },
                { label: 'TypeScript + SWC', value: 'TypeScript + SWC' },
            ],
        });
        if (isCancel(language)) return null;
        result.language = language;
    } else {
        result.language = quickConfig.languageType;
    }

    // 11. packageManager
    if (quickConfig.packageManager === undefined) {
        const packageManager = await select({
            message: '📦 ¿Qué gestor de paquetes querés usar?',
            options: [
                { label: 'npm', value: 'npm' },
                { label: 'pnpm', value: 'pnpm' },
            ],
        });
        if (isCancel(packageManager)) return null;
        result.packageManager = packageManager;
    } else {
        result.packageManager = quickConfig.packageManager;
    }

    return result as UserAnswers;
}