import { exec } from 'child_process';
import { logger } from './logger';

/**
 * Ejecuta un comando en la terminal y retorna una promesa.
 * Muestra salida estándar y errores en consola.
 * 
 * @param command El comando a ejecutar (string completo)
 */
export function execCommand(command: string): Promise<void> {
  logger.info(`Ejecutando comando: ${command}`);

  return new Promise((resolve, reject) => {
    const child = exec(command, (error, stdout, stderr) => {
      if (stdout) process.stdout.write(stdout);
      if (stderr) process.stderr.write(stderr);

      if (error) {
        logger.error(`Error ejecutando: ${command}`);
        reject(error);
      } else {
        resolve();
      }
    });

    // Forward output en tiempo real
    child.stdout?.pipe(process.stdout);
    child.stderr?.pipe(process.stderr);
  });
}