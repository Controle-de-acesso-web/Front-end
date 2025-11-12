// src/theme/index.ts
import { Platform } from 'react-native';

export const theme = {
    light: {
        text: '#11181C',
        background: '#FFFFFF',
        card: '#FFFFFF',
        tint: '#2f6fed',
        icon: '#687076',
        border: '#E6E8EB',
        tabIconDefault: '#687076',
        tabIconSelected: '#2f6fed',
    },
    dark: {
        text: '#ECEDEE',
        background: '#151718',
        card: '#151718',
        tint: '#2f6fed',
        icon: '#9BA1A6',
        border: '#2A2E31',
        tabIconDefault: '#9BA1A6',
        tabIconSelected: '#2f6fed',
    },
} as const;

export const Colors = theme; // compatível com o template

export const Fonts = Platform.select({
    ios: {
        sans: 'system-ui',
        serif: 'ui-serif',
        rounded: 'ui-rounded',
        mono: 'ui-monospace',
    },
    default: {
        sans: 'normal',
        serif: 'serif',
        rounded: 'normal',
        mono: 'monospace',
    },
    web: {
        sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
        serif: "Georgia, 'Times New Roman', serif",
        rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
        mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    },
});
