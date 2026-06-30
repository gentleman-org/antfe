export interface ChatLayer {
  id: string;
  avatar: string;
  nickname: string;
  message: string;
}

export interface ChatTheme {
  canvas: string;
  bubble: string;
  bubbleText: string;
  nickname: string;
  childPanel: string;
  childPanelBorder: string;
  name: string;
}

export type ThemeName = 'dark' | 'light';

export type NestMode = 'bubble' | 'message';
