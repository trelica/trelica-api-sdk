// Utility functions for authentication can go here

/**
 * Example utility for encoding credentials
 */
export function encodeCredentials(clientId: string, clientSecret: string): string {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}