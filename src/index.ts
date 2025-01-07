
import { AppsAPI } from "./api/apps.js";
import { AssetsAPI } from "./api/assets.js";
import { PeopleAPI } from "./api/people.js";
import { TeamsAPI } from "./api/teams.js";
import APIClient from "./client.js";
import { findNodeByName } from "./utils/findNodeByName.js";
import { TeamNodeIterator } from "./utils/TeamNodeIterator.js";

export type ITrelicaCompactUser = import('./models/common.js').Trelica.ICompactUser;
export type ITrelicaApp = import('./models/app.js').Trelica.IApp;
export type ITrelicaPatchApp = import('./models/app.js').Trelica.IPatchApp;

export const utils = {
    TeamNodeIterator,
    findNodeByName
};

export class TrelicaSDK {
    public apps: AppsAPI;
    public people: PeopleAPI;
    public assets: AssetsAPI;
    public teams: TeamsAPI;

    public static isOptionAppCustomField = AppsAPI.isOptionAppCustomField;
    public static isOptionAssetCustomField = AssetsAPI.isOptionAssetCustomField;

    constructor(baseURL: string, clientId: string, clientSecret: string) {
        const client = new APIClient(baseURL, clientId, clientSecret);
        this.apps = new AppsAPI(client);
        this.people = new PeopleAPI(client);
        this.assets = new AssetsAPI(client);
        this.teams = new TeamsAPI(client);
    }
}