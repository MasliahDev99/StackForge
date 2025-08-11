#! /usr/bin/env node


import { promptUser } from "./cli/prompts/prompts";
import { runCreator } from "./core/project/creator";
import { showResume } from './utils/resume'


export default async function main() {  
  const config = await promptUser();
  if (!config) return;
  await runCreator(config);
  showResume(config);
}


