// src/utils/quickConfigUtils.ts
import fs from "fs";
import path from "path";
import os from "os";
import chalk from "chalk";

export function clearQuickConfig() {
  const configPath = path.join(os.homedir(), '.stackforge', 'config.json');
  if (fs.existsSync(configPath)) {
    fs.unlinkSync(configPath);
    console.clear();
    console.log(chalk.green('Configuración de proyecto rápido limpiada exitosamente.'));
  } else {
    console.clear();
    console.log(chalk.yellow('No se encontró configuración de proyecto rápido para limpiar.'));
  }
}

