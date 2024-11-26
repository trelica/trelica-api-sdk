import { AppsAPI } from "./api/apps.js";
import APIClient from "./client.js";

export class TrelicaSDK {
    public apps: AppsAPI;

    constructor(baseURL: string, clientId: string, clientSecret: string) {
        const client = new APIClient(baseURL, clientId, clientSecret);
        this.apps = new AppsAPI(client);
    }
}