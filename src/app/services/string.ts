export const getUri = (text: string) =>
    encodeURIComponent(text)

export const toStringArray = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    return Array.isArray(value) ? value : value.split(",").map(v => v.trim()).filter(Boolean);
}

export const isString = (value: unknown): value is string => typeof value === 'string';
