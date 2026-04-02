export interface AiTool {
  id: string;
  name: string;
  description: string;
  url: string;
}

export interface AiTip {
  id: string;
  title: string;
  description: string;
}

export interface AiTokenStation {
  id: string;
  name: string;
  url: string;
  categories: string;
}

export interface AiContent {
  tools: AiTool[];
  tips: AiTip[];
  tokens: {
    public: AiTokenStation[];
    commercial: AiTokenStation[];
  };
}

const EMPTY_AI_CONTENT: AiContent = {
  tools: [],
  tips: [],
  tokens: {
    public: [],
    commercial: [],
  },
};

export async function getAiContent(locale: string = 'en'): Promise<AiContent> {
  if (typeof window === 'undefined') {
    try {
      const fs = await import('fs');
      const path = await import('path');

      const publicPath = path.resolve(process.cwd(), 'public', 'ai');
      const filePath = path.join(publicPath, `${locale}.json`);
      const fallbackPath = path.join(publicPath, 'en.json');

      console.log('Server-side: Trying to read ai content from:', filePath);

      let data: string;
      if (fs.existsSync(filePath)) {
        data = fs.readFileSync(filePath, 'utf8');
        console.log(`Server-side: Successfully read ${locale}.json`);
      } else {
        console.log('Server-side: Locale file not found, using fallback en.json');
        data = fs.readFileSync(fallbackPath, 'utf8');
      }

      const content: AiContent = JSON.parse(data);
      console.log(`Server-side: Successfully loaded ai content for locale: ${locale}`);
      return normalizeAiContent(content);
    } catch (error) {
      console.error('Server-side: Error reading ai content:', error);
      return EMPTY_AI_CONTENT;
    }
  } else {
    try {
      console.log(`Client-side: Fetching /ai/${locale}.json`);
      const response = await fetch(`/ai/${locale}.json`);

      if (!response.ok) {
        console.log(`Client-side: Failed to fetch ${locale}.json, trying fallback to en.json`);
        const fallbackResponse = await fetch('/ai/en.json');
        if (!fallbackResponse.ok) {
          throw new Error('Failed to fetch ai content');
        }
        const content: AiContent = await fallbackResponse.json();
        return normalizeAiContent(content);
      }

      const content: AiContent = await response.json();
      return normalizeAiContent(content);
    } catch (error) {
      console.error('Client-side: Error fetching ai content:', error);
      return EMPTY_AI_CONTENT;
    }
  }
}

function normalizeAiContent(content: AiContent): AiContent {
  return {
    tools: content.tools || [],
    tips: content.tips || [],
    tokens: {
      public: content.tokens?.public || [],
      commercial: content.tokens?.commercial || [],
    },
  };
}
