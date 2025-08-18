import { QuickConfig } from "../types/quickConfig";
declare class QuickConfigService {
    private configPath;
    constructor();
    loadConfig(): QuickConfig | null;
    saveConfig(config: QuickConfig): void;
}
export declare const quickConfigService: QuickConfigService;
export {};
