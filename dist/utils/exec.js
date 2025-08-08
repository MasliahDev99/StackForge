"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = execCommand;
const child_process_1 = require("child_process");
const logger_1 = require("./logger");
/**
 * Ejecuta un comando en shell de forma silenciosa por defecto.
 * - stdout/stderr se capturan internamente y solo se muestran si hay error (o verbose=true).
 * - devuelve una Promise que se resuelve cuando el proceso termina con exit code 0.
 */
function execCommand(command, opts = {}) {
    const { cwd, verbose = false, timeoutMs } = opts;
    logger_1.logger.info(`Ejecutando comando: ${command}`);
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.spawn)(command, { shell: true, cwd });
        let stdout = '';
        let stderr = '';
        const MAX_BUF = 1024 * 1024; // 1MB máximo a almacenar (evita crecimiento ilimitado)
        const pushStdout = (chunk) => {
            if (verbose)
                process.stdout.write(chunk);
            else {
                stdout += chunk.toString();
                if (stdout.length > MAX_BUF)
                    stdout = stdout.slice(0, MAX_BUF) + '\n...[truncated]';
            }
        };
        const pushStderr = (chunk) => {
            if (verbose)
                process.stderr.write(chunk);
            else {
                stderr += chunk.toString();
                if (stderr.length > MAX_BUF)
                    stderr = stderr.slice(0, MAX_BUF) + '\n...[truncated]';
            }
        };
        child.stdout?.on('data', pushStdout);
        child.stderr?.on('data', pushStderr);
        let finished = false;
        const onFinish = (code, signal) => {
            if (finished)
                return;
            finished = true;
            if (code === 0) {
                resolve();
            }
            else {
                logger_1.logger.error(`❌ Comando falló: ${command} (code: ${code ?? 'null'}${signal ? `, signal: ${signal}` : ''})`);
                if (stderr.trim()) {
                    logger_1.logger.error(stderr.trim());
                }
                else if (stdout.trim()) {
                    logger_1.logger.error(stdout.trim());
                }
                const err = new Error(`Command failed: ${command} (code: ${code})`);
                // @ts-ignore attach outputs
                err.stdout = stdout;
                // @ts-ignore
                err.stderr = stderr;
                reject(err);
            }
        };
        child.on('error', (err) => {
            if (finished)
                return;
            finished = true;
            logger_1.logger.error(`❌ Error al ejecutar el comando: ${command}`);
            logger_1.logger.error(err.message);
            if (stderr.trim())
                logger_1.logger.error(stderr.trim());
            reject(err);
        });
        child.on('close', (code, signal) => onFinish(code, signal));
        if (typeof timeoutMs === 'number' && timeoutMs > 0) {
            const t = setTimeout(() => {
                if (!finished) {
                    logger_1.logger.warn(`⏱️  Timeout alcanzado (${timeoutMs}ms). Terminando proceso: ${command}`);
                    child.kill('SIGTERM');
                    // forzar kill si sigue vivo
                    setTimeout(() => child.kill('SIGKILL'), 5000);
                }
            }, timeoutMs);
            // limpiar timer si termina antes
            child.on('close', () => clearTimeout(t));
            child.on('error', () => clearTimeout(t));
        }
    });
}
//# sourceMappingURL=exec.js.map