var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class TeamsAPI {
    constructor(client) {
        this.client = client;
    }
    /**
      * Delete a team.
      *
      * @param teamId - Team ID
      */
    deleteTeam(teamId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.delete(`/api/people/v1/teams/${encodeURIComponent(teamId)}`);
        });
    }
    /**
      * To update a team you must specify an id, otherwise a team will be created.
      *
      * @param teamId - Team ID
      */
    createOrUpdateTeam(updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.put(`/api/people/v1/teams`, updates);
        });
    }
    /**
     * Fetch an array of teams.
     *
     */
    listTeams() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.get('/api/people/v1/teams/list');
        });
    }
    /**
     * Fetch a teams hierarchy.
     *
     */
    listTeamsAsTree() {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.get('/api/people/v1/teams/tree');
        });
    }
}
