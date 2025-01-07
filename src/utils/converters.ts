export const safeConvertToString = (value: unknown): string => {
    if (typeof value === 'string') return value;
    if (typeof value === 'number') return value.toString();
    if (value instanceof Date) return value.toISOString();
    throw new Error(`Unsupported value type: ${typeof value}`);
};