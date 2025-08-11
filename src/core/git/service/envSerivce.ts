import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv'

dotenv.config()


const envPath = path.resolve(process.cwd(), '.env');

export async function setGitHubConfig({ token, userName, email }: { token: string; userName: string; email: string }) {
  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf-8');
  }
  const lines = envContent.split('\n').filter(Boolean);

  const updateOrAdd = (key: string, value: string) => {
    const index = lines.findIndex(line => line.startsWith(`${key}=`));
    if (index >= 0) {
      lines[index] = `${key}=${value}`;
    } else {
      lines.push(`${key}=${value}`);
    }
  };

  updateOrAdd('GITHUB_TOKEN', token);
  updateOrAdd('GITHUB_USERNAME', userName);
  updateOrAdd('GITHUB_EMAIL', email);

  fs.writeFileSync(envPath, lines.join('\n'));
  // También actualizar en runtime
  process.env.GITHUB_TOKEN = token;
  process.env.GITHUB_USERNAME = userName;
  process.env.GITHUB_EMAIL = email;
}


function readEnvFile(): Record<string, string> {
  if (!fs.existsSync(envPath)) return {};
  const content = fs.readFileSync(envPath, 'utf-8');
  return content
    .split('\n')
    .filter(Boolean)
    .map(line => line.trim())
    .filter(line => !line.startsWith('#') && line.includes('='))
    .reduce<Record<string, string>>((acc, line) => {
      const [key, ...rest] = line.split('=');
      if (key) {
        acc[key] = rest.join('=').trim();
      }
      return acc;
    }, {});
}

export function getGitHubConfig(): { token?: string | undefined; userName?: string | undefined; email?: string | undefined } {
  const envVars = readEnvFile();
  return {
    token: process.env.GITHUB_TOKEN ?? envVars.GITHUB_TOKEN,
    userName: process.env.GITHUB_USERNAME ?? envVars.GITHUB_USERNAME,
    email: process.env.GITHUB_EMAIL ?? envVars.GITHUB_EMAIL,
  };
}



export function isGitHubSessionValid(): boolean {
    return !!process.env.GITHUB_TOKEN && !!process.env.GITHUB_USERNAME && !!process.env.GITHUB_EMAIL;
  }