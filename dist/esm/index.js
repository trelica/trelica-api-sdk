import { AppsAPI } from "./api/apps.js";
import { AssetsAPI } from "./api/assets.js";
import { PeopleAPI } from "./api/people.js";
import { TeamsAPI } from "./api/teams.js";
import APIClient from "./client.js";
import { findNodeByName } from "./utils/findNodeByName.js";
import { TeamNodeIterator } from "./utils/TeamNodeIterator.js";
export const utils = {
    TeamNodeIterator,
    findNodeByName
};
export class TrelicaSDK {
    constructor(baseURL, clientId, clientSecret) {
        const client = new APIClient(baseURL, clientId, clientSecret);
        this.apps = new AppsAPI(client);
        this.people = new PeopleAPI(client);
        this.assets = new AssetsAPI(client);
        this.teams = new TeamsAPI(client);
    }
}
TrelicaSDK.isOptionAppCustomField = AppsAPI.isOptionAppCustomField;
TrelicaSDK.isOptionAssetCustomField = AssetsAPI.isOptionAssetCustomField;
