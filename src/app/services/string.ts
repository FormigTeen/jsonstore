export const getUri = (text: string) =>
    encodeURIComponent(text)

export const toStringArray = (value: string | string[] | undefined): string[] => {
    if (!value) return [];
    return Array.isArray(value) ? value : value.split(",").map(v => v.trim()).filter(Boolean);
}
