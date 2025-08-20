export interface Tool {
  name: string;
  description: string;
  url: string;
  icon?: string;
  category?: string[];
  status?: 'active' | 'maintenance' | 'deprecated';
}

export async function getTools(locale: string = 'en'): Promise<Tool[]> {
  if (typeof window === 'undefined') {
    // Server-side: always use file system in build time
    try {
      const fs = await import('fs');
      const path = await import('path');

      const publicPath = path.resolve(process.cwd(), 'public', 'tools');
      const filePath = path.join(publicPath, `${locale}.json`);
      const fallbackPath = path.join(publicPath, 'en.json');

      console.log('Server-side: Trying to read tools from:', filePath);

      let data: string;
      if (fs.existsSync(filePath)) {
        data = fs.readFileSync(filePath, 'utf8');
        console.log(`Server-side: Successfully read ${locale}.json`);
      } else {
        console.log('Server-side: Locale file not found, using fallback en.json');
        data = fs.readFileSync(fallbackPath, 'utf8');
      }

      const tools: Tool[] = JSON.parse(data);

      // Set default values
      const processedTools = tools.map((tool) => ({
        ...tool,
        category: tool.category || ['tool'],
        status: tool.status || ('active' as const),
      }));

      console.log(`Server-side: Successfully loaded ${processedTools.length} tools for locale: ${locale}`);
      return processedTools;
    } catch (error) {
      console.error('Server-side: Error reading tools data:', error);
      return [];
    }
  } else {
    // Client-side: use fetch
    try {
      console.log(`Client-side: Fetching /tools/${locale}.json`);
      const response = await fetch(`/tools/${locale}.json`);
      if (!response.ok) {
        console.log(`Client-side: Failed to fetch ${locale}.json, trying fallback to en.json`);
        const fallbackResponse = await fetch('/tools/en.json');
        if (!fallbackResponse.ok) {
          throw new Error('Failed to fetch tools data');
        }
        const tools: Tool[] = await fallbackResponse.json();
        const processedTools = tools.map((tool) => ({
          ...tool,
          category: tool.category || ['tool'],
          status: tool.status || ('active' as const),
        }));
        console.log(`Client-side: Successfully loaded ${processedTools.length} tools (fallback)`);
        return processedTools;
      }
      const tools: Tool[] = await response.json();
      const processedTools = tools.map((tool) => ({
        ...tool,
        category: tool.category || ['tool'],
        status: tool.status || ('active' as const),
      }));
      console.log(`Client-side: Successfully loaded ${processedTools.length} tools for locale: ${locale}`);
      return processedTools;
    } catch (error) {
      console.error('Client-side: Error fetching tools:', error);
      return [];
    }
  }
}

export function getToolStats(tools: Tool[]) {
  const totalTools = tools.length;
  const activeTools = tools.filter((t) => t.status === 'active').length;

  return { totalTools, activeTools };
}

export function filterTools(tools: Tool[], searchQuery: string, selectedCategory: string, selectedStatus: string) {
  return tools.filter((tool) => {
    const matchesSearch = tool.name.toLowerCase().includes(searchQuery.toLowerCase()) || tool.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = selectedCategory === 'all' || (tool.category && tool.category.includes(selectedCategory));
    const matchesStatus = selectedStatus === 'all' || tool.status === selectedStatus;

    return matchesSearch && matchesCategory && matchesStatus;
  });
}
