import APIClient from "../client.js";
import { Trelica } from "../models/team.js";

export class TeamsAPI {
    constructor(private client: APIClient) { }

    /**
      * Delete a team.
      *
      * @param teamId - Team ID
      */
    public async deleteTeam(teamId: string, updates: Trelica.ITeam): Promise<void> {
        return this.client.delete(`/api/people/v1/teams/${encodeURIComponent(teamId)}`);
    }

    /**
      * To update a team you must specify an id, otherwise a team will be created.
      *
      * @param teamId - Team ID
      */
    public async createOrUpdateTeam(updates: Trelica.IPutTeam): Promise<Trelica.ITeam> {
        return this.client.put(`/api/people/v1/teams`, updates);
    }

    /**
     * Fetch an array of teams.
     *
     */
    public async listTeams(): Promise<Trelica.ITeam[]> {
        return this.client.get<Trelica.ITeam[]>('/api/people/v1/teams/list');
    }

    /**
     * Fetch a teams hierarchy.
     *
     */
    public async listTeamsAsTree(): Promise<Trelica.ITeamNode[]> {
        return this.client.get<Trelica.ITeamNode[]>('/api/people/v1/teams/tree');
    }

}