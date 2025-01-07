export class SDKError extends Error {
    constructor(message, context) {
        super(message);
        this.context = context;
        this.name = 'SDKError';
    }
}
export class SDKValidationError extends SDKError {
    constructor(objectType, validationErrors) {
        super(`Validation failed for ${objectType}.`, { validationErrors });
        this.name = 'SDKValidationError';
    }
}
export class SDKServerError extends SDKError {
    constructor(message, url, responseCode, responseText) {
        super(message, { url: url.toString(), responseCode, responseText });
        this.name = 'SDKServerError';
    }
}
