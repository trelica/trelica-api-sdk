/**
 * Utility for encoding credentials
 */
export function encodeCredentials(clientId: string, clientSecret: string): string {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}