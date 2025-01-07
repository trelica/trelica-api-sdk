/**
 * Utility for encoding credentials
 */
export function encodeCredentials(clientId, clientSecret) {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}
