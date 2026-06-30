'use client';

import type React from 'react';
import type { ChatLayer, ChatTheme, NestMode } from './types';

interface NestedMessageProps {
  layers: ChatLayer[];
  theme: ChatTheme;
  mode: NestMode;
}

interface MessageNodeProps {
  layer: ChatLayer;
  child: ChatLayer | null;
  childTree: React.ReactNode;
  depth: number;
  mode: NestMode;
  theme: ChatTheme;
}

interface BubbleShellProps {
  children: React.ReactNode;
  depth: number;
  theme: ChatTheme;
}

const AVATAR_SIZE = 44;
const INNER_AVATAR_SIZE = 34;
const MAX_BUBBLE_WIDTH = 310;
const MAX_CHILD_WIDTH = 260;

const avatarSizeByDepth = (depth: number): number => (depth === 0 ? AVATAR_SIZE : INNER_AVATAR_SIZE);

const bubbleWidthByDepth = (depth: number): number => Math.max(MAX_CHILD_WIDTH, MAX_BUBBLE_WIDTH - depth * 26);

const childPanelClassName = (mode: NestMode, childGap: string): string => {
  const baseClassName = `${childGap} relative rounded-[6px] py-3`;

  return mode === 'bubble' ? `${baseClassName} border px-3` : `${baseClassName} px-0`;
};

const renderAvatar = (layer: ChatLayer, depth: number): React.ReactNode => (
  <img
    src={layer.avatar}
    alt={layer.nickname}
    className="shrink-0 rounded-[4px] object-cover"
    style={{
      width: avatarSizeByDepth(depth),
      height: avatarSizeByDepth(depth),
    }}
    onError={(event) => {
      event.currentTarget.src = '/logo.png';
    }}
  />
);

function BubbleShell({ children, depth, theme }: BubbleShellProps) {
  return (
    <div
      className="relative rounded-[7px] px-4 py-3 shadow-[0_1px_1px_rgba(0,0,0,0.18)]"
      style={{
        backgroundColor: theme.bubble,
        color: theme.bubbleText,
        maxWidth: bubbleWidthByDepth(depth),
      }}>
      <span
        aria-hidden="true"
        className="absolute top-4 -left-1.5 h-3 w-3 rotate-45"
        style={{
          backgroundColor: theme.bubble,
        }}
      />
      {children}
    </div>
  );
}

function MessageNode({ layer, child, childTree, depth, mode, theme }: MessageNodeProps) {
  const showBubbleText = layer.message.trim().length > 0;
  const childGap = showBubbleText ? 'mt-2' : 'mt-0';
  const showBubble = mode === 'bubble' || showBubbleText;

  return (
    <div className="flex items-start gap-3">
      {renderAvatar(layer, depth)}
      <div className="min-w-0">
        <div
          className="mb-1 truncate text-[15px] leading-none font-semibold"
          style={{
            color: theme.nickname,
            maxWidth: bubbleWidthByDepth(depth),
          }}>
          {layer.nickname}
        </div>
        {showBubble && (
          <BubbleShell depth={depth} theme={theme}>
            {showBubbleText && <p className="relative m-0 text-[17px] leading-[1.35] font-semibold break-words whitespace-pre-wrap">{layer.message}</p>}
            {mode === 'bubble' && child && (
              <div
                className={childPanelClassName(mode, childGap)}
                style={{
                  backgroundColor: theme.childPanel,
                  borderColor: theme.childPanelBorder,
                }}>
                {childTree}
              </div>
            )}
          </BubbleShell>
        )}
        {mode === 'message' && child && (
          <div
            className={childPanelClassName(mode, childGap)}
            style={{
              backgroundColor: theme.childPanel,
            }}>
            {childTree}
          </div>
        )}
      </div>
    </div>
  );
}

const buildTree = (layers: ChatLayer[], theme: ChatTheme, mode: NestMode, index: number): React.ReactNode => {
  const layer = layers[index];

  if (!layer) {
    return null;
  }

  const child = layers[index + 1] ?? null;
  const childTree = child ? buildTree(layers, theme, mode, index + 1) : null;

  return <MessageNode layer={layer} child={child} childTree={childTree} depth={index} mode={mode} theme={theme} />;
};

export function NestedMessage({ layers, theme, mode }: NestedMessageProps) {
  return <>{buildTree(layers, theme, mode, 0)}</>;
}
