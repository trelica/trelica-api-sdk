"use strict";
// Utility functions for authentication can go here
Object.defineProperty(exports, "__esModule", { value: true });
exports.encodeCredentials = encodeCredentials;
/**
 * Example utility for encoding credentials
 */
function encodeCredentials(clientId, clientSecret) {
    return Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
}
