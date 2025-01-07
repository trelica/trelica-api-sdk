import { Trelica } from "../models/team.js";
export declare function findNodeByName(hierarchy: Trelica.ITeamNode[], targetName: string): {
    node: Trelica.ITeamNode | null;
    path: string[];
};
