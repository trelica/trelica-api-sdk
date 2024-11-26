import { AppsAPI } from "./api/apps.js";
export declare class TrelicaSDK {
    apps: AppsAPI;
    constructor(baseURL: string, clientId: string, clientSecret: string);
}
