export interface UserAnswers {
    projectName: string;
    packageName: string;
    bundler: 'Vite' | 'Ninguno';
    language: 'TypeScript' | 'JavaScript' | 'JavaScript + SWC' | 'TypeScript + SWC';
    useTailwind: boolean;
    tailwindVersion?: 'latest' | '4.1' | '3.4.17' | '2.2.19' | '1.9.6' | '0.7.4' | undefined;
    installDeps: boolean;
    depsList?: string;
    createFolders: boolean;
    folderStructure?: string;
    packageManager: 'npm' | 'pnpm';
}
//# sourceMappingURL=index.d.ts.map