import type { Theme } from '@react-navigation/native';
import { DarkTheme as RNDark, DefaultTheme as RNLight } from '@react-navigation/native';
import { theme } from './index';

export const NavLight: Theme = {
    ...RNLight,
    colors: {
        ...RNLight.colors,
        primary: theme.light.tint,
        background: theme.light.background,
        card: theme.light.card,
        text: theme.light.text,
        border: theme.light.border,
        notification: theme.light.tint,
    },
};

export const NavDark: Theme = {
    ...RNDark,
    colors: {
        ...RNDark.colors,
        primary: theme.dark.tint,
        background: theme.dark.background,
        card: theme.dark.card,
        text: theme.dark.text,
        border: theme.dark.border,
        notification: theme.dark.tint,
    },
};
