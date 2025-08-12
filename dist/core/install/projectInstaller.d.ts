/**
 * ProjectInstaller - Orquestador encargado de coordinar la ejecución
 * de los diferentes instaladores que forman parte del proceso de configuración
 * del proyecto.
 *
 * Esta clase implementa la interfaz IInstaller y agrupa los instaladores específicos,
 * tales como TailwindInstaller, ESLintPrettierInstaller y DependenciesInstaller,
 * ejecutándolos secuencialmente con la configuración proporcionada.
 *
 * Permite mantener el proceso de instalación modular, limpio y extensible,
 * delegando en cada instalador la responsabilidad de realizar su tarea específica
 * y decidir si debe ejecutarse según la configuración recibida.
 *
 * @implements {IInstaller}
 */
import { UserAnswers } from "../../types";
import { IInstaller } from './domain/iInstaller';
export declare class ProjectInstaller implements IInstaller {
    private installers;
    constructor();
    install(config: UserAnswers): Promise<void>;
}
//# sourceMappingURL=projectInstaller.d.ts.map