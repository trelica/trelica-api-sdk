import { AppsAPI } from "./api/apps.js";
import APIClient from "./client.js";
export class TrelicaSDK {
    constructor(baseURL, clientId, clientSecret) {
        const client = new APIClient(baseURL, clientId, clientSecret);
        this.apps = new AppsAPI(client);
    }
}
