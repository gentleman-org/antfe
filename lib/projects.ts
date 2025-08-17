export type Project = {
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
};

export async function getProjects(locale: string = 'en'): Promise<Project[]> {
  if (typeof window === 'undefined') {
    // Server-side: use fs module
    const fs = await import('fs');
    const path = await import('path');

    try {
      const filePath = path.join(process.cwd(), 'public/projects', `${locale}.json`);
      const fallbackPath = path.join(process.cwd(), 'public/projects', 'en.json');

      let data: string;
      try {
        data = fs.readFileSync(filePath, 'utf8');
      } catch {
        data = fs.readFileSync(fallbackPath, 'utf8');
      }

      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading projects data:', error);
      return [];
    }
  } else {
    // Client-side: use fetch
    try {
      const response = await fetch(`/projects/${locale}.json`);
      if (!response.ok) {
        const fallbackResponse = await fetch('/projects/en.json');
        if (!fallbackResponse.ok) {
          throw new Error('Failed to fetch projects data');
        }
        return await fallbackResponse.json();
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching projects:', error);
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
