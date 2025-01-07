"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SDKServerError = exports.SDKValidationError = exports.SDKError = void 0;
class SDKError extends Error {
    constructor(message, context) {
        super(message);
        this.context = context;
        this.name = 'SDKError';
    }
}
exports.SDKError = SDKError;
class SDKValidationError extends SDKError {
    constructor(objectType, validationErrors) {
        super(`Validation failed for ${objectType}.`, { validationErrors });
        this.name = 'SDKValidationError';
    }
}
exports.SDKValidationError = SDKValidationError;
class SDKServerError extends SDKError {
    constructor(message, url, responseCode, responseText) {
        super(message, { url: url.toString(), responseCode, responseText });
        this.name = 'SDKServerError';
    }
}
exports.SDKServerError = SDKServerError;
