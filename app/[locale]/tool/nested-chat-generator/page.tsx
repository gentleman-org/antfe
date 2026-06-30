'use client';

import html2canvas from 'html2canvas';
import { ArrowLeft, Download } from 'lucide-react';
import { useRef, useState } from 'react';
import PageLayout from '~/components/layout/pageLayout';
import { Button } from '~/components/ui/button';
import { Link } from '~/lib/i18n/navigation';
import { LayerList, StylePanel } from './controlPanels';
import { PreviewPanel } from './previewPanel';
import type { ChatLayer, ChatTheme, NestMode, ThemeName } from './types';

const themes: Record<ThemeName, ChatTheme> = {
  dark: {
    canvas: '#171717',
    bubble: '#2f3032',
    bubbleText: '#f4f4f5',
    nickname: '#58585c',
    childPanel: '#171717',
    childPanelBorder: '#242427',
    name: '暗黑',
  },
  light: {
    canvas: '#f0f0f0',
    bubble: '#ffffff',
    bubbleText: '#202124',
    nickname: '#6b7280',
    childPanel: '#f7f7f7',
    childPanelBorder: '#e5e7eb',
    name: '浅色',
  },
};

const nestModeLabels: Record<NestMode, string> = {
  bubble: '气泡嵌套',
  message: '整条消息',
};

const createLayer = (index: number): ChatLayer => ({
  id: String(Date.now() + index),
  avatar: '/logo.png',
  nickname: index === 0 ? '红烧粽子' : '红烧粽子',
  message: index === 0 ? '一群傻狗' : '',
});

export default function NestedChatGeneratorPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [themeName, setThemeName] = useState<ThemeName>('dark');
  const [nestMode, setNestMode] = useState<NestMode>('message');
  const [scale, setScale] = useState<number>(1);
  const [layers, setLayers] = useState<ChatLayer[]>([
    {
      id: '1',
      avatar: '/logo.png',
      nickname: '红烧粽子',
      message: '',
    },
    {
      id: '2',
      avatar: '/logo.png',
      nickname: '红烧粽子',
      message: '一群傻狗',
    },
  ]);

  const updateLayer = (id: string, updates: Partial<ChatLayer>): void => {
    setLayers((currentLayers) => currentLayers.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)));
  };

  const addLayer = (): void => {
    setLayers((currentLayers) => [...currentLayers, createLayer(currentLayers.length)]);
  };

  const removeLayer = (id: string): void => {
    setLayers((currentLayers) => (currentLayers.length > 1 ? currentLayers.filter((layer) => layer.id !== id) : currentLayers));
  };

  const handleAvatarUpload = (layerId: string, file: File): void => {
    const reader = new FileReader();

    reader.onload = (event): void => {
      updateLayer(layerId, {
        avatar: String(event.target?.result ?? '/logo.png'),
      });
    };

    reader.readAsDataURL(file);
  };

  const exportImage = async (): Promise<void> => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = await html2canvas(canvasRef.current, {
      backgroundColor: themes[themeName].canvas,
      scale: 2,
      width: canvasRef.current.offsetWidth,
      height: canvasRef.current.offsetHeight,
    });
    const link = document.createElement('a');
    link.download = 'nested-chat.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const theme = themes[themeName];

  return (
    <PageLayout>
      <main className="mx-auto w-full max-w-6xl px-4 py-8">
        <div className="mb-6 flex items-center justify-between gap-3">
          <Button variant="outline" asChild>
            <Link href="/tools" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
          <Button onClick={exportImage} className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            导出图片
          </Button>
        </div>

        <div className="mb-6">
          <h1 className="text-2xl font-semibold tracking-normal">嵌套聊天截图生成器</h1>
        </div>

        <section className="grid gap-6 lg:grid-cols-[360px_minmax(0,1fr)]">
          <aside className="space-y-4">
            <StylePanel
              themeName={themeName}
              themes={themes}
              nestMode={nestMode}
              nestModeLabels={nestModeLabels}
              scale={scale}
              onThemeChange={setThemeName}
              onModeChange={setNestMode}
              onScaleChange={setScale}
            />
            <LayerList layers={layers} onAddLayer={addLayer} onRemoveLayer={removeLayer} onUpdateLayer={updateLayer} onAvatarUpload={handleAvatarUpload} />
          </aside>

          <PreviewPanel canvasRef={canvasRef} layers={layers} mode={nestMode} scale={scale} theme={theme} />
        </section>
      </main>
    </PageLayout>
  );
}
