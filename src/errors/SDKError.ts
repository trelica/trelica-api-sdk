export class SDKError extends Error {
    constructor(message: string, public context?: any) {
        super(message);
        this.name = 'SDKError';
    }
}

export class SDKValidationError extends SDKError {
    constructor(objectType: string, validationErrors: string[]) {
        super(`Validation failed for ${objectType}.`, { validationErrors });
        this.name = 'SDKValidationError';
    }
}

export class SDKServerError extends SDKError {
    constructor(message: string, url: URL, responseCode: number, responseText: string) {
        super(message, { url: url.toString(), responseCode, responseText });
        this.name = 'SDKServerError';
    }
}
