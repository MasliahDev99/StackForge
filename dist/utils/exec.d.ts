export type ExecOptions = {
    cwd?: string;
    verbose?: boolean;
    timeoutMs?: number;
};
/**
 * Ejecuta un comando en shell de forma silenciosa por defecto.
 * - stdout/stderr se capturan internamente y solo se muestran si hay error (o verbose=true).
 * - devuelve una Promise que se resuelve cuando el proceso termina con exit code 0.
 */
export declare function execCommand(command: string, opts?: ExecOptions): Promise<void>;
