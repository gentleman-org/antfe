'use client';

import type { RefObject } from 'react';
import { NestedMessage } from './nestedMessage';
import type { ChatLayer, ChatTheme, NestMode } from './types';

interface PreviewPanelProps {
  canvasRef: RefObject<HTMLDivElement | null>;
  layers: ChatLayer[];
  mode: NestMode;
  scale: number;
  theme: ChatTheme;
}

export function PreviewPanel({ canvasRef, layers, mode, scale, theme }: PreviewPanelProps) {
  return (
    <section className="bg-muted/60 min-w-0 rounded-lg p-4 sm:p-6">
      <div className="flex min-h-[560px] items-start justify-center overflow-auto py-6">
        <div
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'center top',
          }}
          className="transition-transform duration-200">
          <div
            ref={canvasRef}
            className="flex min-h-[360px] w-[420px] items-start px-6 py-8 shadow-[0_18px_50px_rgba(0,0,0,0.18)]"
            style={{
              backgroundColor: theme.canvas,
            }}>
            <NestedMessage layers={layers} theme={theme} mode={mode} />
          </div>
        </div>
      </div>
    </section>
  );
}
