import { AppsAPI } from "./api/apps";
export declare class TrelicaSDK {
    apps: AppsAPI;
    constructor(baseURL: string, clientId: string, clientSecret: string);
}
