"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBasicIndexHtmlIfNone = createBasicIndexHtmlIfNone;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const logger_1 = require("../../../utils/logger");
function createBasicIndexHtmlIfNone() {
    const indexPath = path_1.default.join(process.cwd(), 'index.html');
    if (fs_1.default.existsSync(indexPath))
        return;
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Proyecto StackForge</title>
  <script src="https://cdn.tailwindcss.com"></script>
</head>
<body class="bg-neutral-900 min-h-screen flex flex-col items-center justify-center text-white">

  <div class="text-center mb-8">
    <div class="font-mono text-cyan-400 text-lg md:text-2xl lg:text-2xl leading-tight mb-4">
      <pre class="whitespace-pre">
███████╗████████╗ █████╗  ██████╗██╗  ██╗███████╗ ██████╗ ██████╗  ██████╗ ███████╗
██╔════╝╚══██╔══╝██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔═══██╗██╔══██╗██╔════╝ ██╔════╝
███████╗   ██║   ███████║██║     █████╔╝ █████╗  ██║   ██║██████╔╝██║  ███╗█████╗  
╚════██║   ██║   ██╔══██║██║     ██╔═██╗ ██╔══╝  ██║   ██║██╔══██╗██║   ██║██╔══╝  
███████║   ██║   ██║  ██║╚██████╗██║  ██╗██║     ╚██████╔╝██║  ██║╚██████╔╝███████╗
╚══════╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚═╝      ╚═════╝ ╚═╝  ╚═╝ ╚═════╝ ╚══════╝
      </pre>
    </div>
    <div class="w-24 h-1 bg-cyan-400 mx-auto"></div>
  </div>
  
  
  <div class="text-center">
    <h2 class="text-xl md:text-2xl font-medium text-white max-w-2xl px-4">
      Generado automáticamente con StackForge CLI para un arranque rápido.
    </h2>
  </div>
  

  <div class="absolute top-10 left-10 w-2 h-2 bg-cyan-400 rounded-full opacity-60"></div>
  <div class="absolute bottom-10 right-10 w-3 h-3 bg-cyan-400 rounded-full opacity-40"></div>
  <div class="absolute top-1/3 right-20 w-1 h-1 bg-cyan-400 rounded-full opacity-80"></div>
</body>
</html>

`;
    fs_1.default.writeFileSync(indexPath, htmlContent, 'utf-8');
    logger_1.logger.success('✅ index.html base creado con Tailwind CDN para modo sin bundler.');
}
//# sourceMappingURL=createBasicHtml.js.map