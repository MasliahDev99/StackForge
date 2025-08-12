import path from "path";
import fs from 'fs'
import { execCommand } from "../../../utils/exec";
import { logger } from "../../../utils/logger";

export async function setupLinting() {
    logger.title('Configurando ESLint + Prettier');

    await execCommand('npm install -D eslint prettier eslint-config-prettier eslint-plugin-prettier',{verbose:false});
  
    const eslintConfig = {
      root: true,
      env: { browser: true, es2021: true },
      extends: ['eslint:recommended', 'plugin:prettier/recommended'],
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      rules: {}
    };
  
    const prettierConfig = {
      semi: true,
      singleQuote: true,
      printWidth: 100,
      trailingComma: 'none'
    };
  
    fs.writeFileSync(path.join(process.cwd(), '.eslintrc.json'), JSON.stringify(eslintConfig, null, 2));
    fs.writeFileSync(path.join(process.cwd(), '.prettierrc'), JSON.stringify(prettierConfig, null, 2));
  
    logger.success('ESLint y Prettier configurados correctamente.\n');
}
