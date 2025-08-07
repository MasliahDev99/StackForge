"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = execCommand;
const child_process_1 = require("child_process");
const logger_1 = require("./logger");
/**
 * Ejecuta un comando en la terminal y retorna una promesa.
 * Muestra salida estándar y errores en consola.
 *
 * @param command El comando a ejecutar (string completo)
 */
function execCommand(command) {
    logger_1.logger.info(`Ejecutando comando: ${command}`);
    return new Promise((resolve, reject) => {
        const child = (0, child_process_1.exec)(command, (error, stdout, stderr) => {
            if (stdout)
                process.stdout.write(stdout);
            if (stderr)
                process.stderr.write(stderr);
            if (error) {
                logger_1.logger.error(`Error ejecutando: ${command}`);
                reject(error);
            }
            else {
                resolve();
            }
        });
        // Forward output en tiempo real
        child.stdout?.pipe(process.stdout);
        child.stderr?.pipe(process.stderr);
    });
}
//# sourceMappingURL=exec.js.map