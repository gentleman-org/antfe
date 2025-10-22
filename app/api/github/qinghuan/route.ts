import { NextResponse } from 'next/server';

interface BlogResponse {
  repo: string;
  url: string;
  success: boolean;
  content?: string;
  base64?: string;
  error?: string;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { repos = [] } = body;

    if (!Array.isArray(repos) || repos.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: 'repos must be a non-empty array',
        },
        { status: 400 }
      );
    }

    // 使用 Promise.allSettled 来处理部分失败的情况
    const blogsPromises = repos.map(async (repo: string): Promise<BlogResponse> => {
      try {
        const response = await fetch(`https://api.github.com/repos/Asaki-M/${repo}/contents/BLOG.md`, {
          headers: {
            Accept: 'application/vnd.github.object',
            'X-GitHub-Api-Version': '2022-11-28',
            Authorization: ``,
          },
          // 添加超时和缓存控制
          signal: AbortSignal.timeout(10000), // 10秒超时
        });

        if (!response.ok) {
          return {
            repo,
            success: false,
            url: '',
            error: `GitHub API returned ${response.status}: ${response.statusText}`,
          };
        }

        const data = await response.json();

        // GitHub 返回的是 base64 编码的内容
        let content = data.content;
        let base64Content = data.content;

        if (data.encoding === 'base64') {
          // 解码 base64 得到文本内容
          content = Buffer.from(data.content, 'base64').toString('utf-8');
          // 同时保留带前缀的 base64 格式
          base64Content = `data:text/markdown;base64,${data.content}`;
        }

        return {
          repo,
          success: true,
          content,
          url: data.html_url,
          base64: base64Content,
        };
      } catch (error) {
        return {
          repo,
          success: false,
          url: '',
          error: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    });

    const results = await Promise.allSettled(blogsPromises);

    // 处理结果
    const blogs = results.map((result, index) => {
      if (result.status === 'fulfilled') {
        return result.value;
      } else {
        return {
          repo: repos[index],
          success: false,
          error: result.reason?.message || 'Promise rejected',
        };
      }
    });

    const successCount = blogs.filter((b) => b.success).length;

    return NextResponse.json({
      success: true,
      data: blogs,
      summary: {
        total: repos.length,
        successful: successCount,
        failed: repos.length - successCount,
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : 'Internal server error',
      },
      { status: 500 }
    );
  }
}
