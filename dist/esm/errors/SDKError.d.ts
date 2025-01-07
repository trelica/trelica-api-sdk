export declare class SDKError extends Error {
    context?: any | undefined;
    constructor(message: string, context?: any | undefined);
}
export declare class SDKValidationError extends SDKError {
    constructor(objectType: string, validationErrors: string[]);
}
export declare class SDKServerError extends SDKError {
    constructor(message: string, url: URL, responseCode: number, responseText: string);
}
