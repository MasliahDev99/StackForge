import { spawn } from 'child_process';
import { logger } from './logger';

export type ExecOptions = {
  cwd?: string;
  verbose?: boolean; // si true, imprime stdout/stderr en tiempo real
  timeoutMs?: number; // tiempo máximo (ms) antes de terminar el proceso
};

/**
 * Ejecuta un comando en shell de forma silenciosa por defecto.
 * - stdout/stderr se capturan internamente y solo se muestran si hay error (o verbose=true).
 * - devuelve una Promise que se resuelve cuando el proceso termina con exit code 0.
 */
export function execCommand(command: string, opts: ExecOptions = {}): Promise<void> {
  const { cwd, verbose = false, timeoutMs } = opts;
  logger.info(`Ejecutando comando: ${command}`);

  return new Promise((resolve, reject) => {
    const child = spawn(command, { shell: true, cwd });

    let stdout = '';
    let stderr = '';
    const MAX_BUF = 1024 * 1024; // 1MB máximo a almacenar (evita crecimiento ilimitado)

    const pushStdout = (chunk: Buffer) => {
      if (verbose) process.stdout.write(chunk);
      else {
        stdout += chunk.toString();
        if (stdout.length > MAX_BUF) stdout = stdout.slice(0, MAX_BUF) + '\n...[truncated]';
      }
    };

    const pushStderr = (chunk: Buffer) => {
      if (verbose) process.stderr.write(chunk);
      else {
        stderr += chunk.toString();
        if (stderr.length > MAX_BUF) stderr = stderr.slice(0, MAX_BUF) + '\n...[truncated]';
      }
    };

    child.stdout?.on('data', pushStdout);
    child.stderr?.on('data', pushStderr);

    let finished = false;

    const onFinish = (code: number | null, signal: NodeJS.Signals | null) => {
      if (finished) return;
      finished = true;

      if (code === 0) {
        resolve();
      } else {
        logger.error(`❌ Comando falló: ${command} (code: ${code ?? 'null'}${signal ? `, signal: ${signal}` : ''})`);
        if (stderr.trim()) {
          logger.error(stderr.trim());
        } else if (stdout.trim()) {
          logger.error(stdout.trim());
        }
        const err = new Error(`Command failed: ${command} (code: ${code})`);
        // @ts-ignore attach outputs
        (err as any).stdout = stdout;
        // @ts-ignore
        (err as any).stderr = stderr;
        reject(err);
      }
    };

    child.on('error', (err) => {
      if (finished) return;
      finished = true;
      logger.error(`❌ Error al ejecutar el comando: ${command}`);
      logger.error(err.message);
      if (stderr.trim()) logger.error(stderr.trim());
      reject(err);
    });

    child.on('close', (code, signal) => onFinish(code, signal));

    if (typeof timeoutMs === 'number' && timeoutMs > 0) {
      const t = setTimeout(() => {
        if (!finished) {
          logger.warn(`⏱️  Timeout alcanzado (${timeoutMs}ms). Terminando proceso: ${command}`);
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