/**
 *
 *  Barra de carga
 *
 */
export declare function initProgressBar(steps: string[]): void;
export declare function advanceStep(task: string): void;
export declare function stopProgressBar(): void;
export declare function step(action: () => Promise<void>, task: string): Promise<void>;
//# sourceMappingURL=progressBar.d.ts.map