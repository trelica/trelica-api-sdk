import { AppsAPI } from "./api/apps";
import APIClient from "./client";
export class TrelicaSDK {
    constructor(baseURL, clientId, clientSecret) {
        const client = new APIClient(baseURL, clientId, clientSecret);
        this.apps = new AppsAPI(client);
    }
}
