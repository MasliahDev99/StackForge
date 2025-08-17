// src/services/quickConfigService.ts
import fs from "fs";
import path from "path";
import { QuickConfig } from "../types/quickConfig";

class QuickConfigService {
  private configPath: string;

  constructor() {
    this.configPath = path.join(
      process.env.HOME || process.env.USERPROFILE || ".",
      ".stackforge",
      "config.json"
    );

    const dir = path.dirname(this.configPath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  }

  loadConfig(): QuickConfig | null {
    if (!fs.existsSync(this.configPath)) return null;
    return JSON.parse(fs.readFileSync(this.configPath, "utf-8"));
  }

  saveConfig(config: QuickConfig) {
    fs.writeFileSync(this.configPath, JSON.stringify(config, null, 2), "utf-8");
  }
}

export const quickConfigService = new QuickConfigService();