export interface Project {
  id: number;
  name: string;
  cover: string;
  description: string;
  category: string[];
  status: string;
  technologies: string[];
  github?: string;
  website?: string;
  download?: string;
}

export async function getProjects(locale: string = 'en'): Promise<Project[]> {
  if (typeof window === 'undefined') {
    // Server-side: always use file system in build time
    try {
      const fs = await import('fs');
      const path = await import('path');

      const publicPath = path.resolve(process.cwd(), 'public', 'projects');
      const filePath = path.join(publicPath, `${locale}.json`);
      const fallbackPath = path.join(publicPath, 'en.json');

      console.log('Server-side: Trying to read projects from:', filePath);

      let data: string;
      if (fs.existsSync(filePath)) {
        data = fs.readFileSync(filePath, 'utf8');
        console.log(`Server-side: Successfully read ${locale}.json`);
      } else {
        console.log('Server-side: Locale file not found, using fallback en.json');
        data = fs.readFileSync(fallbackPath, 'utf8');
      }

      const projects = JSON.parse(data);
      console.log(`Server-side: Successfully loaded ${projects.length} projects for locale: ${locale}`);
      return projects;
    } catch (error) {
      console.error('Server-side: Error reading projects data:', error);
      return [];
    }
  } else {
    // Client-side: use fetch
    try {
      console.log(`Client-side: Fetching /projects/${locale}.json`);
      const response = await fetch(`/projects/${locale}.json`);
      if (!response.ok) {
        console.log(`Client-side: Failed to fetch ${locale}.json, trying fallback to en.json`);
        const fallbackResponse = await fetch('/projects/en.json');
        if (!fallbackResponse.ok) {
          throw new Error('Failed to fetch projects data');
        }
        const projects = await fallbackResponse.json();
        console.log(`Client-side: Successfully loaded ${projects.length} projects (fallback)`);
        return projects;
      }
      const projects = await response.json();
      console.log(`Client-side: Successfully loaded ${projects.length} projects for locale: ${locale}`);
      return projects;
    } catch (error) {
      console.error('Client-side: Error fetching projects:', error);
      return [];
    }
  }
}

export function getProjectStats(projects: Project[]) {
  const totalProjects = projects.length;
  const activeProjects = projects.filter((p) => p.status === 'active').length;

  return { totalProjects, activeProjects, totalContributors: 0, totalStars: 0 };
}

export function filterProjects(projects: Project[], searchQuery: string, selectedCategory: string, selectedStatus: string) {
  return projects.filter((project) => {
    const matchesSearch =
      project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.technologies.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesCategory = selectedCategory === 'all' || project.category.includes(selectedCategory);
    const matchesStatus = selectedStatus === 'all' || project.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });
}
