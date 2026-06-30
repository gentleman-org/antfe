'use client';

import { MessageSquare, Plus, RotateCcw, Trash2, ZoomIn, ZoomOut } from 'lucide-react';
import { Button } from '~/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '~/components/ui/card';
import { Input } from '~/components/ui/input';
import { Textarea } from '~/components/ui/textarea';
import type { ChatLayer, ChatTheme, NestMode, ThemeName } from './types';

interface StylePanelProps {
  themeName: ThemeName;
  themes: Record<ThemeName, ChatTheme>;
  nestMode: NestMode;
  nestModeLabels: Record<NestMode, string>;
  scale: number;
  onThemeChange: (themeName: ThemeName) => void;
  onModeChange: (mode: NestMode) => void;
  onScaleChange: (scale: number) => void;
}

interface LayerListProps {
  layers: ChatLayer[];
  onAddLayer: () => void;
  onRemoveLayer: (id: string) => void;
  onUpdateLayer: (id: string, updates: Partial<ChatLayer>) => void;
  onAvatarUpload: (layerId: string, file: File) => void;
}

interface LayerEditorProps {
  layer: ChatLayer;
  index: number;
  layers: ChatLayer[];
  onRemoveLayer: (id: string) => void;
  onUpdateLayer: (id: string, updates: Partial<ChatLayer>) => void;
  onAvatarUpload: (layerId: string, file: File) => void;
}

const MIN_SCALE = 0.6;
const MAX_SCALE = 1.6;
const SCALE_STEP = 0.1;

const nextScale = (scale: number, direction: 'in' | 'out'): number => {
  const signedStep = direction === 'in' ? SCALE_STEP : -SCALE_STEP;
  const rawScale = Number((scale + signedStep).toFixed(1));

  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, rawScale));
};

export function StylePanel({ themeName, themes, nestMode, nestModeLabels, scale, onThemeChange, onModeChange, onScaleChange }: StylePanelProps) {
  return (
    <Card className="gap-4 rounded-lg py-4">
      <CardHeader className="px-4">
        <CardTitle className="flex items-center gap-2 text-base">
          <MessageSquare className="h-4 w-4" />
          样式
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4 px-4">
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(themes).map(([name, item]) => (
            <Button key={name} type="button" variant={themeName === name ? 'default' : 'outline'} onClick={() => onThemeChange(name as ThemeName)} className="w-full">
              {item.name}
            </Button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-2">
          {Object.entries(nestModeLabels).map(([mode, label]) => (
            <Button key={mode} type="button" variant={nestMode === mode ? 'default' : 'outline'} onClick={() => onModeChange(mode as NestMode)} className="w-full">
              {label}
            </Button>
          ))}
        </div>
        <div className="flex items-center gap-1 rounded-lg border p-1">
          <Button variant="ghost" size="sm" onClick={() => onScaleChange(nextScale(scale, 'out'))} className="h-8 w-8 p-0">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <span className="min-w-16 flex-1 text-center text-sm tabular-nums">{Math.round(scale * 100)}%</span>
          <Button variant="ghost" size="sm" onClick={() => onScaleChange(nextScale(scale, 'in'))} className="h-8 w-8 p-0">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="sm" onClick={() => onScaleChange(1)} className="h-8 w-8 p-0" title="重置缩放">
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

function LayerEditor({ layer, index, layers, onRemoveLayer, onUpdateLayer, onAvatarUpload }: LayerEditorProps) {
  return (
    <Card className="gap-3 rounded-lg py-4">
      <CardHeader className="px-4">
        <div className="flex items-center justify-between">
          <CardTitle className="text-sm">第 {index + 1} 层</CardTitle>
          {layers.length > 1 && (
            <Button variant="ghost" size="sm" onClick={() => onRemoveLayer(layer.id)} className="h-8 w-8 p-0 text-red-500 hover:text-red-600">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-3 px-4">
        <div className="flex items-center gap-3">
          <img
            src={layer.avatar}
            alt={layer.nickname}
            className="bg-muted h-10 w-10 rounded-[4px] object-cover"
            onError={(event) => {
              event.currentTarget.src = '/logo.png';
            }}
          />
          <Input
            type="file"
            accept="image/*"
            onChange={(event) => {
              const file = event.target.files?.[0];

              if (file) {
                onAvatarUpload(layer.id, file);
              }
            }}
            className="text-xs file:text-xs"
          />
        </div>
        <Input value={layer.nickname} onChange={(event) => onUpdateLayer(layer.id, { nickname: event.target.value })} placeholder="昵称" />
        <Textarea value={layer.message} onChange={(event) => onUpdateLayer(layer.id, { message: event.target.value })} placeholder="消息内容" rows={2} resize="none" />
      </CardContent>
    </Card>
  );
}

export function LayerList({ layers, onAddLayer, onRemoveLayer, onUpdateLayer, onAvatarUpload }: LayerListProps) {
  return (
    <div className="space-y-3">
      {layers.map((layer, index) => (
        <LayerEditor key={layer.id} layer={layer} index={index} layers={layers} onRemoveLayer={onRemoveLayer} onUpdateLayer={onUpdateLayer} onAvatarUpload={onAvatarUpload} />
      ))}
      <Button onClick={onAddLayer} variant="outline" className="w-full">
        <Plus className="h-4 w-4" />
        添加层级
      </Button>
    </div>
  );
}
