"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDKError_js_1 = require("./errors/SDKError.js");
const converters_js_1 = require("./utils/converters.js");
function isVoid() {
    return undefined === undefined;
}
class APIClient {
    constructor(baseURL, clientId, clientSecret) {
        this.baseURL = baseURL;
        this.clientId = clientId;
        this.clientSecret = clientSecret;
        this.fetch = null;
        this.token = null;
        this.tokenExpiry = null;
    }
    getFetch() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!this.fetch) {
                const { default: nodeFetch } = yield Promise.resolve().then(() => require('node-fetch')); // Dynamic import
                this.fetch = nodeFetch;
            }
            return this.fetch;
        });
    }
    authenticate() {
        return __awaiter(this, void 0, void 0, function* () {
            const fetch = yield this.getFetch();
            const url = `${this.baseURL}/connect/token`;
            const body = new URLSearchParams({
                grant_type: 'client_credentials',
                client_id: this.clientId,
                client_secret: this.clientSecret,
            });
            const response = yield fetch(url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: body.toString(),
            });
            if (!response.ok) {
                throw new SDKError_js_1.SDKError(`Failed to authenticate: ${response.statusText}`, { clientId: this.clientId });
            }
            const data = (yield response.json());
            this.token = data.access_token;
            this.tokenExpiry = Date.now() + data.expires_in * 1000;
        });
    }
    request(method_1, endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (method, endpoint, options = {}) {
            if (!this.token || (this.tokenExpiry && Date.now() >= this.tokenExpiry)) {
                yield this.authenticate();
            }
            const fetch = yield this.getFetch();
            const url = new URL(endpoint, this.baseURL);
            if (options.params) {
                for (const key in options.params) {
                    let value = options.params[key];
                    let convertedValue;
                    try {
                        convertedValue = (0, converters_js_1.safeConvertToString)(value);
                    }
                    catch (error) {
                        if (error instanceof Error) {
                            throw new SDKError_js_1.SDKError(`Invalid parameter "${key}": ${error.message}`, { key, value });
                        }
                        throw new SDKError_js_1.SDKError('An unknown error occurred during conversion.', { value });
                    }
                    url.searchParams.append(key, convertedValue);
                }
            }
            const response = yield fetch(url.toString(), {
                method,
                headers: {
                    'Authorization': `Bearer ${this.token}`,
                    'Content-Type': 'application/json',
                },
                body: options.body ? JSON.stringify(options.body) : null,
            });
            if (!response.ok) {
                throw new SDKError_js_1.SDKServerError(`Request failed: ${response.statusText}`, url, response.status, yield response.text());
            }
            if (response.status === 204 || response.headers.get('Content-Length') === '0') {
                // If T is explicitly `void`, return undefined
                if (isVoid()) {
                    return undefined;
                }
                throw new SDKError_js_1.SDKError('Expected a response body but received none.', { status: response.status, url });
            }
            try {
                return yield response.json();
            }
            catch (error) {
                throw new SDKError_js_1.SDKError('Failed to parse response JSON.', { status: response.status, url });
            }
        });
    }
    /**
   * Fetch all items from a paginated endpoint.
   * @param endpoint - The API endpoint to fetch data from.
   * @param params - Query parameters for the request.
   * @returns A promise that resolves to an array of all results.
   */
    fetchAll(endpoint_1) {
        return __awaiter(this, arguments, void 0, function* (endpoint, params = {}) {
            const results = [];
            let next = endpoint;
            while (next) {
                const response = yield this.get(next, params);
                results.push(...response.results);
                // Update `next` for the next page
                next = response.next;
                // Clear query parameters for subsequent pages
                params = {};
            }
            return results;
        });
    }
    get(endpoint, params) {
        return this.request('GET', endpoint, { params });
    }
    patch(endpoint, body) {
        return this.request('PATCH', endpoint, { body });
    }
    put(endpoint, body) {
        return this.request('PUT', endpoint, { body });
    }
    post(endpoint, body) {
        return this.request('POST', endpoint, { body });
    }
    delete(endpoint) {
        return this.request('DELETE', endpoint);
    }
}
exports.default = APIClient;
