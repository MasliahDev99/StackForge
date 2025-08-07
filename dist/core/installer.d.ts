/**
 *  Installer -  Instalador de dependencias
 *
 *  Responsable de:
 *
 *  - Inicializar proyecto (ej: npm init, vite, create-react-app)
 *  - Instalar dependencias base y dev
 *  - Elegir bundler
 *
 */
import { UserAnswers } from "../types";
export declare function initializeProject(config: UserAnswers): Promise<void>;
export declare function installDeps(config: UserAnswers): Promise<void>;
//# sourceMappingURL=installer.d.ts.map