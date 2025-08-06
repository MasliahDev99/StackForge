#! /usr/bin/env node


import { promptUser } from "./cli/prompts";
import { runCreator } from "./core/creator";
import { logger } from "./utils/logger"; 

async function main() {
  const config = await promptUser();
  if (!config) return;

  await runCreator(config);

  console.log(`\n✅ Configuración final:\n${JSON.stringify(config, null, 2)}\n`);
}

main().catch((err) => {
  logger?.error(`❌ Error inesperado: ${err.message}`);
  process.exit(1);
});
