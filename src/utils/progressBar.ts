/**
 * 
 *  Barra de carga 
 * 
 */

import { SingleBar, Presets } from "cli-progress";
import chalk from "chalk";


const  bar = new SingleBar(
    {
        format: `${chalk.cyanBright('{task}')} | {bar} | {percentage}% || {step}/{total} pasos`,
        barCompleteChar: '\u2588',
        barIncompleteChar: '\u2591',
        hideCursor: true,

    },Presets.shades_classic)

let current:number = 0
let total:number = 0

export function initProgressBar(steps:string[]){
    current = 0
    total = steps.length
    bar.start(total, 0, {step: current, task: steps[0]})
}

export function advanceStep(task: string) {
    current++;
    bar.update(current, { step: current, task });
  }
  
  export function stopProgressBar() {
    bar.stop();
  }

export async function step(action: () => Promise<void>, task: string) {
    await action();
    advanceStep(task);
}