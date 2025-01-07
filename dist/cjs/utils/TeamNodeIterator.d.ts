import { Trelica } from "../models/team.js";
export declare class TeamNodeIterator implements Iterable<{
    node: Trelica.ITeamNode;
    depth: number;
    path: string[];
}> {
    private roots;
    constructor(roots: Trelica.ITeamNode[]);
    private traverse;
    [Symbol.iterator](): Iterator<{
        node: Trelica.ITeamNode;
        depth: number;
        path: string[];
    }>;
}
