export declare function setGitHubConfig({ token, userName }: {
    token: string;
    userName: string;
}): Promise<void>;
export declare function getGitHubConfig(): {
    token?: string | undefined;
    userName?: string | undefined;
};
export declare function isGitHubSessionValid(): boolean;
//# sourceMappingURL=envSerivce.d.ts.map