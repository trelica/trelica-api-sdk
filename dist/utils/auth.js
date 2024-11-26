// Utility functions for authentication can go here
/**
 * Example utility for encoding credentials
 */
export function encodeCredentials(clientId, clientSecret) {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}
