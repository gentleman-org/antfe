'use client';

import { useState, useRef } from 'react';
import { Button } from '~/components/ui/button';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { ArrowLeft, Download, Plus, Trash2, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import PageLayout from '~/components/layout/pageLayout';
import { Link } from '~/lib/i18n/navigation';
import html2canvas from 'html2canvas';

interface ChatLayer {
  id: string;
  avatar: string;
  nickname: string;
  message: string;
  avatarFile?: File;
}

type Theme = 'dark' | 'light';

const themes = {
  dark: {
    background: '#2C2C2E',
    bubbleColor: '#4A4A4A',
    bubbleTextColor: '#FFFFFF',
    nicknameColor: '#FFFFFF',
    name: '暗黑模式',
  },
  light: {
    background: '#F7F7F7',
    bubbleColor: '#95EC69',
    bubbleTextColor: '#000000',
    nicknameColor: '#333333',
    name: '浅色模式',
  },
};

export default function NestedChatGeneratorPage() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const [currentTheme, setCurrentTheme] = useState<Theme>('dark');
  const [scale, setScale] = useState(1);

  const [layers, setLayers] = useState<ChatLayer[]>([
    {
      id: '1',
      avatar: '/logo.png',
      nickname: '红烧粽子',
      message: '一群傻狗',
    },
  ]);

  const addLayer = () => {
    const newLayer: ChatLayer = {
      id: Date.now().toString(),
      avatar: '/logo.png',
      nickname: '新用户',
      message: '',
    };
    setLayers([...layers, newLayer]);
  };

  const removeLayer = (id: string) => {
    if (layers.length > 1) {
      setLayers(layers.filter((layer) => layer.id !== id));
    }
  };

  const updateLayer = (id: string, updates: Partial<ChatLayer>) => {
    setLayers(layers.map((layer) => (layer.id === id ? { ...layer, ...updates } : layer)));
  };

  const handleAvatarUpload = (layerId: string, file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateLayer(layerId, {
        avatar: e.target?.result as string,
        avatarFile: file,
      });
    };
    reader.readAsDataURL(file);
  };

  const exportImage = async () => {
    if (canvasRef.current) {
      try {
        const canvas = await html2canvas(canvasRef.current, {
          backgroundColor: '#000000',
          scale: 2,
          width: canvasRef.current.offsetWidth,
          height: canvasRef.current.offsetHeight,
        });

        const link = document.createElement('a');
        link.download = 'nested-chat.png';
        link.href = canvas.toDataURL();
        link.click();
      } catch (error) {
        console.error('Export failed:', error);
      }
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <Button variant="outline" asChild>
            <Link href="/tools" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Tools
            </Link>
          </Button>
        </div>

        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold">嵌套聊天截图生成器</h1>
          <p className="text-gray-600 dark:text-gray-400">生成自定义的嵌套聊天截图，支持多层嵌套、自定义头像、昵称和消息</p>
        </div>

        {/* Configuration Panel - Horizontal Scrollable */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">配置面板</h2>
            <div className="flex items-center gap-4">
              {/* Theme Selector */}
              <div className="flex items-center gap-2">
                <label className="text-sm font-medium">主题:</label>
                <select value={currentTheme} onChange={(e) => setCurrentTheme(e.target.value as Theme)} className="rounded border bg-white px-3 py-1 text-sm dark:bg-gray-800">
                  <option value="dark">{themes.dark.name}</option>
                  <option value="light">{themes.light.name}</option>
                </select>
              </div>
              <Button onClick={addLayer} className="flex items-center gap-2">
                <Plus className="h-4 w-4" />
                添加层级
              </Button>
            </div>
          </div>

          <div className="flex snap-x snap-mandatory gap-3 overflow-x-auto pb-4">
            {layers.map((layer, index) => (
              <Card key={layer.id} className="w-64 flex-none snap-start">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-sm">第 {index + 1} 层</CardTitle>
                    {layers.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeLayer(layer.id)} className="text-red-500 hover:text-red-600">
                        <Trash2 className="h-3 w-3" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 p-4">
                  {/* Avatar Upload */}
                  <div>
                    <label className="mb-1 block text-xs font-medium">头像</label>
                    <div className="flex items-center gap-2">
                      <img
                        src={layer.avatar}
                        alt="Avatar"
                        className="h-6 w-6 rounded-md bg-gray-200 object-cover"
                        onError={(e) => {
                          e.currentTarget.src = '/logo.png';
                        }}
                      />
                      <div className="flex-1">
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              handleAvatarUpload(layer.id, file);
                            }
                          }}
                          className="h-6 text-xs"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Nickname */}
                  <div>
                    <label className="mb-1 block text-xs font-medium">昵称</label>
                    <Input value={layer.nickname} onChange={(e) => updateLayer(layer.id, { nickname: e.target.value })} placeholder="请输入昵称" className="h-6 text-xs" />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="mb-1 block text-xs font-medium">消息内容</label>
                    <Textarea
                      value={layer.message}
                      onChange={(e) => updateLayer(layer.id, { message: e.target.value })}
                      placeholder="请输入消息内容"
                      rows={2}
                      className="text-xs"
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Preview Panel - Full Width Below */}
        <div className="mt-6 rounded-lg bg-gray-100 p-6 dark:bg-gray-900">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">预览</h2>
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 rounded-lg bg-white p-1 dark:bg-gray-800">
                <Button variant="ghost" size="sm" onClick={() => setScale(Math.max(0.5, scale - 0.1))} className="h-8 w-8 p-0">
                  <ZoomOut className="h-4 w-4" />
                </Button>
                <span className="min-w-[3rem] px-2 text-center text-sm">{Math.round(scale * 100)}%</span>
                <Button variant="ghost" size="sm" onClick={() => setScale(Math.min(2, scale + 0.1))} className="h-8 w-8 p-0">
                  <ZoomIn className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={() => setScale(1)} className="h-8 w-8 p-0" title="重置缩放">
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
              <Button onClick={exportImage} className="flex items-center gap-2">
                <Download className="h-4 w-4" />
                导出图片
              </Button>
            </div>
          </div>

          <div className="flex min-h-[500px] items-start justify-center overflow-auto py-8">
            <div
              ref={canvasRef}
              style={{
                transform: `scale(${scale})`,
                transformOrigin: 'center top',
                position: 'relative',
                display: 'inline-block',
              }}
              className="transition-transform duration-200">
              {/* Container to hold all layers */}
              <div
                style={{
                  position: 'relative',
                  display: 'inline-block',
                  // Calculate container size based on all layers
                  width: `${Math.max(
                    ...layers.map((_, index) => {
                      const scaleFactor = Math.pow(0.85, index);
                      const padding = Math.max(8, 20 * scaleFactor);
                      const offsetX = index * 30;
                      // Estimate width based on content + offsets
                      return 200 * scaleFactor + padding * 2 + offsetX;
                    })
                  )}px`,
                  height: `${Math.max(
                    ...layers.map((_, index) => {
                      const scaleFactor = Math.pow(0.85, index);
                      const padding = Math.max(8, 20 * scaleFactor);
                      const offsetY = index * 25;
                      // Estimate height based on content + offsets
                      return 80 * scaleFactor + padding * 2 + offsetY;
                    })
                  )}px`,
                }}>
                {/* Render layers with correct nesting order */}
                {layers.map((layer, index) => {
                  const theme = themes[currentTheme];
                  // Reverse the scale factor so Layer 1 (index 0) is smallest
                  const reverseIndex = layers.length - 1 - index;
                  const scaleFactor = Math.pow(0.85, reverseIndex);
                  const avatarSize = Math.max(12, 24 * scaleFactor);
                  const fontSize = Math.max(12, 16 * scaleFactor);
                  const padding = Math.max(8, 20 * scaleFactor);

                  // Calculate position offsets - Layer 1 should be at bottom-right
                  const offsetX = reverseIndex * 30;
                  const offsetY = reverseIndex * 25;

                  return (
                    <div
                      key={layer.id}
                      className={`overflow-hidden rounded-lg ${index === 0 ? 'shadow-lg' : ''}`}
                      style={{
                        backgroundColor: theme.background,
                        position: 'absolute',
                        bottom: `${offsetY}px`,
                        right: `${offsetX}px`,
                        zIndex: index + 1,
                        display: 'inline-block',
                      }}>
                      {/* Chat Content */}
                      <div style={{ padding: `${padding}px` }}>
                        <div className="flex items-start gap-2">
                          <img
                            src={layer.avatar}
                            alt="Avatar"
                            className="flex-shrink-0 rounded object-cover"
                            style={{
                              width: `${avatarSize}px`,
                              height: `${avatarSize}px`,
                              marginTop: '2px',
                            }}
                            onError={(e) => {
                              e.currentTarget.src = '/logo.png';
                            }}
                          />
                          <div>
                            <div
                              className="font-medium"
                              style={{
                                color: theme.nicknameColor,
                                fontSize: `${fontSize}px`,
                                whiteSpace: 'nowrap',
                                marginBottom: `${padding * 0.25}px`,
                              }}>
                              {layer.nickname}
                            </div>

                            {layer.message.trim() && (
                              <div
                                className="rounded-lg"
                                style={{
                                  backgroundColor: theme.bubbleColor,
                                  padding: `${padding * 0.5}px`,
                                  display: 'inline-block',
                                }}>
                                <p
                                  className="break-words whitespace-pre-wrap"
                                  style={{
                                    color: theme.bubbleTextColor,
                                    fontSize: `${fontSize * 0.9}px`,
                                    margin: 0,
                                    lineHeight: 1.2,
                                  }}>
                                  {layer.message}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Usage Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>使用说明</CardTitle>
          </CardHeader>
          <CardContent className="prose dark:prose-invert max-w-none">
            <ul className="space-y-2">
              <li>🎨 自定义每一层的背景颜色、头像、昵称和消息内容</li>
              <li>📷 上传自定义头像图片（支持 PNG、JPG 等格式）</li>
              <li>🔄 添加或删除嵌套层级（至少保留一层）</li>
              <li>💾 一键导出为高清 PNG 图片</li>
              <li>🎯 实时预览效果，所见即所得</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </PageLayout>
  );
}
