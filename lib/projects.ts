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
  try {
    // Use fetch for both server and client side for consistency
    // This works better in deployment environments like Vercel
    const baseUrl = typeof window === 'undefined' ? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000') : '';

    const response = await fetch(`${baseUrl}/projects/${locale}.json`);
    if (!response.ok) {
      console.log(`Failed to fetch ${locale}.json, trying fallback to en.json`);
      const fallbackResponse = await fetch(`${baseUrl}/projects/en.json`);
      if (!fallbackResponse.ok) {
        throw new Error('Failed to fetch projects data');
      }
      const projects = await fallbackResponse.json();
      console.log(`Successfully loaded ${projects.length} projects (fallback)`);
      return projects;
    }

    const projects = await response.json();
    console.log(`Successfully loaded ${projects.length} projects for locale: ${locale}`);
    return projects;
  } catch (error) {
    console.error('Error fetching projects:', error);

    // Fallback to file system only in development
    if (typeof window === 'undefined' && process.env.NODE_ENV === 'development') {
      try {
        const fs = await import('fs');
        const path = await import('path');

        const publicPath = path.resolve(process.cwd(), 'public', 'projects');
        const filePath = path.join(publicPath, `${locale}.json`);
        const fallbackPath = path.join(publicPath, 'en.json');

        let data: string;
        if (fs.existsSync(filePath)) {
          data = fs.readFileSync(filePath, 'utf8');
        } else {
          data = fs.readFileSync(fallbackPath, 'utf8');
        }

        const projects = JSON.parse(data);
        console.log(`Successfully loaded ${projects.length} projects from filesystem`);
        return projects;
      } catch (fsError) {
        console.error('File system fallback failed:', fsError);
      }
    }

    return [];
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
