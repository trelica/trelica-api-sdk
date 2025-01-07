import APIClient from "../client.js";
import { Trelica } from "../models/team.js";
export declare class TeamsAPI {
    private client;
    constructor(client: APIClient);
    /**
      * Delete a team.
      *
      * @param teamId - Team ID
      */
    deleteTeam(teamId: string, updates: Trelica.ITeam): Promise<void>;
    /**
      * To update a team you must specify an id, otherwise a team will be created.
      *
      * @param teamId - Team ID
      */
    createOrUpdateTeam(updates: Trelica.IPutTeam): Promise<Trelica.ITeam>;
    /**
     * Fetch an array of teams.
     *
     */
    listTeams(): Promise<Trelica.ITeam[]>;
    /**
     * Fetch a teams hierarchy.
     *
     */
    listTeamsAsTree(): Promise<Trelica.ITeamNode[]>;
}
