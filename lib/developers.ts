import fs from 'fs';
import path from 'path';

export type Developer = {
  id?: string;
  name: string;
  username?: string;
  slug?: string; // Directory name for routing
  avatar: string;
  bio: string;
  location?: string;
  company?: string;
  position?: string;
  skills: string[];
  links: {
    github?: string;
    website?: string;
  };
  rss?: string;
  joinedAt?: string;

  // Legacy fields for backward compatibility
  title?: string;
  experience?: 'junior' | 'mid' | 'senior' | 'lead';
  projects?: number;
  contributions?: number;
};

export function getAllDevelopers(): Developer[] {
  const meDir = path.join(process.cwd(), 'app', '(me)');
  const developers: Developer[] = [];

  try {
    const directories = fs
      .readdirSync(meDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => !dirent.name.startsWith('_')) // 排除私有目录
      .filter((dirent) => dirent.name !== 'mdx') // 排除mdx目录
      .map((dirent) => dirent.name);

    for (const dir of directories) {
      const meJsonPath = path.join(meDir, dir, 'me.json');

      if (fs.existsSync(meJsonPath)) {
        const fileContent = fs.readFileSync(meJsonPath, 'utf-8');
        const developer = JSON.parse(fileContent) as Developer;

        // Add missing fields for backward compatibility
        const enhancedDeveloper: Developer = {
          ...developer,
          id: developer.id || dir,
          username: developer.username || dir,
          slug: dir, // Always use directory name for routing
          title: developer.title || developer.position || 'Developer',
          experience: developer.experience || 'mid',
          projects: developer.projects || Math.floor(Math.random() * 50) + 1,
          contributions: developer.contributions || Math.floor(Math.random() * 1000) + 100,
          joinedAt: developer.joinedAt || '2024-01-01',
        };

        developers.push(enhancedDeveloper);
      }
    }

    return developers.sort((a, b) => new Date(b.joinedAt || '2024-01-01').getTime() - new Date(a.joinedAt || '2024-01-01').getTime());
  } catch (error) {
    console.error('Error reading developers data:', error);
    return [];
  }
}

export function getDeveloperByUsername(username: string): Developer | null {
  const meJsonPath = path.join(process.cwd(), 'app', '(me)', username, 'me.json');

  try {
    if (fs.existsSync(meJsonPath)) {
      const fileContent = fs.readFileSync(meJsonPath, 'utf-8');
      return JSON.parse(fileContent) as Developer;
    }
    return null;
  } catch (error) {
    console.error(`Error reading developer data for ${username}:`, error);
    return null;
  }
}

export function getDeveloperIds(): string[] {
  const meDir = path.join(process.cwd(), 'app', '(me)');

  try {
    const directories = fs
      .readdirSync(meDir, { withFileTypes: true })
      .filter((dirent) => dirent.isDirectory())
      .filter((dirent) => !dirent.name.startsWith('_')) // 排除私有目录
      .filter((dirent) => dirent.name !== 'mdx') // 排除mdx目录
      .filter((dirent) => {
        const meJsonPath = path.join(meDir, dirent.name, 'me.json');
        return fs.existsSync(meJsonPath);
      })
      .map((dirent) => dirent.name);

    return directories;
  } catch (error) {
    console.error('Error getting developer IDs:', error);
    return [];
  }
}
