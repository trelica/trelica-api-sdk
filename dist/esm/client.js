var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export default class APIClient {
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
                const { default: nodeFetch } = yield import('node-fetch'); // Dynamic import
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
                throw new Error(`Failed to authenticate: ${response.statusText}`);
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
                Object.entries(options.params).forEach(([key, value]) => url.searchParams.append(key, value));
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
                throw new Error(`Request failed: ${response.statusText}`);
            }
            return response.json();
        });
    }
    get(endpoint, params) {
        return this.request('GET', endpoint, { params });
    }
    patch(endpoint, body) {
        return this.request('PATCH', endpoint, { body });
    }
}
