export declare function setGitHubConfig({ token, userName, email }: {
    token: string;
    userName: string;
    email: string;
}): Promise<void>;
export declare function getGitHubConfig(): {
    token?: string | undefined;
    userName?: string | undefined;
    email?: string | undefined;
};
export declare function isGitHubSessionValid(): boolean;
//# sourceMappingURL=envSerivce.d.ts.map