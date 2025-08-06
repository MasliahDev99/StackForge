import chalk from 'chalk';

export function printBanner() {
  console.log(chalk.cyanBright(`

    
 ▗▄▄▖▗▄▄▄▖ ▗▄▖  ▗▄▄▖▗▖ ▗▖▗▄▄▄▖ ▗▄▖ ▗▄▄▖  ▗▄▄▖▗▄▄▄▖
▐▌     █  ▐▌ ▐▌▐▌   ▐▌▗▞▘▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌   ▐▌   
 ▝▀▚▖  █  ▐▛▀▜▌▐▌   ▐▛▚▖ ▐▛▀▀▘▐▌ ▐▌▐▛▀▚▖▐▌▝▜▌▐▛▀▀▘
▗▄▄▞▘  █  ▐▌ ▐▌▝▚▄▄▖▐▌ ▐▌▐▌   ▝▚▄▞▘▐▌ ▐▌▝▚▄▞▘▐▙▄▄▖
                                                  
                                                  
   `));
  //console.log(chalk.gray('  ⚡ StackForge - Tu CLI para proyectos React + Tailwind + TS\n'));
}