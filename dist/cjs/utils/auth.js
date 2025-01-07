"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeCredentials = encodeCredentials;
/**
 * Utility for encoding credentials
 */
function encodeCredentials(clientId, clientSecret) {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}
