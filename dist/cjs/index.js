"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrelicaSDK = exports.utils = void 0;
const apps_js_1 = require("./api/apps.js");
const assets_js_1 = require("./api/assets.js");
const people_js_1 = require("./api/people.js");
const teams_js_1 = require("./api/teams.js");
const client_js_1 = require("./client.js");
const findNodeByName_js_1 = require("./utils/findNodeByName.js");
const TeamNodeIterator_js_1 = require("./utils/TeamNodeIterator.js");
exports.utils = {
    TeamNodeIterator: TeamNodeIterator_js_1.TeamNodeIterator,
    findNodeByName: findNodeByName_js_1.findNodeByName
};
class TrelicaSDK {
    constructor(baseURL, clientId, clientSecret) {
        const client = new client_js_1.default(baseURL, clientId, clientSecret);
        this.apps = new apps_js_1.AppsAPI(client);
        this.people = new people_js_1.PeopleAPI(client);
        this.assets = new assets_js_1.AssetsAPI(client);
        this.teams = new teams_js_1.TeamsAPI(client);
    }
}
exports.TrelicaSDK = TrelicaSDK;
TrelicaSDK.isOptionAppCustomField = apps_js_1.AppsAPI.isOptionAppCustomField;
TrelicaSDK.isOptionAssetCustomField = assets_js_1.AssetsAPI.isOptionAssetCustomField;
