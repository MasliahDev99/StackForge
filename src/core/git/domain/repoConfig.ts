export interface RepoCreationConfig {
    name: string;
    description: string;
    repoVisibility?: "Private" | "Public";
    autoInit: boolean;
    defaultBranch?:string;
  
  }