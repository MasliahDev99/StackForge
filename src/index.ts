#! /usr/bin/env node


import { promptUser } from "./cli/prompts";
import { runCreator } from "./core/creator";
import { logger } from "./utils/logger"; 
import { showResume } from './utils/resume'


export default async function main() {  
  const config = await promptUser();
  if (!config) return;
  await runCreator(config);
  showResume(config);
}

main().catch((err) => {
  logger?.error(`❌ Error inesperado: ${err.message}`);
  process.exit(1);
});
