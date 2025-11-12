export const CLASSES = ['A','B','C','D'] as const;
export type ClassId = typeof CLASSES[number];
