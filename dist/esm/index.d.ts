import { AppsAPI } from "./api/apps.js";
import { AssetsAPI } from "./api/assets.js";
import { PeopleAPI } from "./api/people.js";
import { TeamsAPI } from "./api/teams.js";
import { findNodeByName } from "./utils/findNodeByName.js";
import { TeamNodeIterator } from "./utils/TeamNodeIterator.js";
export type ITrelicaCompactUser = import('./models/common.js').Trelica.ICompactUser;
export type ITrelicaApp = import('./models/app.js').Trelica.IApp;
export type ITrelicaPatchApp = import('./models/app.js').Trelica.IPatchApp;
export declare const utils: {
    TeamNodeIterator: typeof TeamNodeIterator;
    findNodeByName: typeof findNodeByName;
};
export declare class TrelicaSDK {
    apps: AppsAPI;
    people: PeopleAPI;
    assets: AssetsAPI;
    teams: TeamsAPI;
    static isOptionAppCustomField: typeof AppsAPI.isOptionAppCustomField;
    static isOptionAssetCustomField: typeof AssetsAPI.isOptionAssetCustomField;
    constructor(baseURL: string, clientId: string, clientSecret: string);
}
