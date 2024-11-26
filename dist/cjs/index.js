"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrelicaSDK = void 0;
const apps_js_1 = require("./api/apps.js");
const client_js_1 = require("./client.js");
class TrelicaSDK {
    constructor(baseURL, clientId, clientSecret) {
        const client = new client_js_1.default(baseURL, clientId, clientSecret);
        this.apps = new apps_js_1.AppsAPI(client);
    }
}
exports.TrelicaSDK = TrelicaSDK;
