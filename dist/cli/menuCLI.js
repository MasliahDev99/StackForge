"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.menuCLI = menuCLI;
const banner_1 = require("../utils/banner");
const prompts_1 = require("@clack/prompts");
const chalk_1 = __importDefault(require("chalk"));
const menuConfig_1 = require("./menu/menuConfig");
const menuCreateApp_1 = require("./menu/menuCreateApp");
async function menuCLI() {
    while (true) {
        console.clear();
        (0, banner_1.printBanner)();
        const option = await (0, prompts_1.select)({
            message: chalk_1.default.cyan('Seleccione una opción:\n'),
            options: [
                { label: 'Configuración', value: 'config' },
                { label: 'Crear aplicación', value: 'createApp' },
                { label: 'Salir', value: 'exit' },
            ],
        });
        if ((0, prompts_1.isCancel)(option)) {
            console.clear();
            (0, prompts_1.cancel)('⛔ Operación cancelada.');
            return;
        }
        switch (option) {
            case 'config':
                console.clear();
                await (0, menuConfig_1.menuConfig)();
                break;
            case 'createApp':
                console.clear();
                await (0, menuCreateApp_1.menuCreateApp)();
                break;
            case 'exit':
                console.clear();
                (0, prompts_1.outro)(chalk_1.default.green('¡Hasta luego!'));
                process.exit(0);
        }
    }
}
//# sourceMappingURL=menuCLI.js.map