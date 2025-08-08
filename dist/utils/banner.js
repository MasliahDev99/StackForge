"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.printBanner = printBanner;
const chalk_1 = __importDefault(require("chalk"));
function printBanner() {
    console.log(chalk_1.default.cyanBright(`

    
 ▗▄▄▖▗▄▄▄▖ ▗▄▖  ▗▄▄▖▗▖ ▗▖▗▄▄▄▖ ▗▄▖ ▗▄▄▖  ▗▄▄▖▗▄▄▄▖
▐▌     █  ▐▌ ▐▌▐▌   ▐▌▗▞▘▐▌   ▐▌ ▐▌▐▌ ▐▌▐▌   ▐▌   
 ▝▀▚▖  █  ▐▛▀▜▌▐▌   ▐▛▚▖ ▐▛▀▀▘▐▌ ▐▌▐▛▀▚▖▐▌▝▜▌▐▛▀▀▘
▗▄▄▞▘  █  ▐▌ ▐▌▝▚▄▄▖▐▌ ▐▌▐▌   ▝▚▄▞▘▐▌ ▐▌▝▚▄▞▘▐▙▄▄▖
                                                  
                                                  
   `));
    console.log(chalk_1.default.gray('  ⚡ StackForge - Tu CLI para proyectos React + Tailwind + TS\n'));
}
//# sourceMappingURL=banner.js.map