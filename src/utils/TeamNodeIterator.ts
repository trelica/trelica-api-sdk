import { Trelica } from "../models/team.js";

export class TeamNodeIterator implements Iterable<{ node: Trelica.ITeamNode; depth: number; path: string[]; }> {
    private roots: Trelica.ITeamNode[];

    constructor(roots: Trelica.ITeamNode[]) {
        this.roots = roots;
    }

    // Generator function to yield nodes, their depth, and the full path
    private *traverse(nodes: Trelica.ITeamNode[], depth: number, path: string[]): Generator<{ node: Trelica.ITeamNode; depth: number; path: string[]; }> {
        for (const node of nodes) {
            const currentPath = [...path, node.name]; // Build the full path
            yield { node, depth, path: currentPath }; // Yield node with depth and path
            if (node.children) {
                yield* this.traverse(node.children, depth + 1, currentPath); // Recurse into children
            }
        }
    }

    // Implement the iterable protocol
    [Symbol.iterator](): Iterator<{ node: Trelica.ITeamNode; depth: number; path: string[]; }> {
        return this.traverse(this.roots, 0, []); // Start with depth 0 and an empty path
    }
}