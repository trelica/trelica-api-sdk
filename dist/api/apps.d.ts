import APIClient from "../client";
import { ITrelicaApp } from "../models/app";
export declare class AppsAPI {
    private client;
    constructor(client: APIClient);
    listApps(params?: Record<string, any>): Promise<{
        next?: string;
        results: ITrelicaApp[];
    }>;
    updateApp(appId: string, updates: Partial<ITrelicaApp>): Promise<ITrelicaApp>;
    listAppUsers(appId: string, params?: Record<string, any>): Promise<{
        next?: string;
        results: any[];
    }>;
}
