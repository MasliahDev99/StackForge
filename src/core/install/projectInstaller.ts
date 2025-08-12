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


import { DependenciesInstaller } from './dependenciesInstaller';
import { ESLintPrettierInstaller } from './eslintPrettierInstaller';
import { TailwindInstaller } from './tailwind';


export class ProjectInstaller implements IInstaller {
    private installers: IInstaller[]

    constructor() {
        this.installers = [
            new TailwindInstaller(),
            new ESLintPrettierInstaller(),
            new DependenciesInstaller(),
        ]
    }
    async install(config: UserAnswers): Promise<void> {
        for (const installer of this.installers) {
            await installer.install(config)
        }
    }
}
