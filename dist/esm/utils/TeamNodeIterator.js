export class TeamNodeIterator {
    constructor(roots) {
        this.roots = roots;
    }
    // Generator function to yield nodes, their depth, and the full path
    *traverse(nodes, depth, path) {
        for (const node of nodes) {
            const currentPath = [...path, node.name]; // Build the full path
            yield { node, depth, path: currentPath }; // Yield node with depth and path
            if (node.children) {
                yield* this.traverse(node.children, depth + 1, currentPath); // Recurse into children
            }
        }
    }
    // Implement the iterable protocol
    [Symbol.iterator]() {
        return this.traverse(this.roots, 0, []); // Start with depth 0 and an empty path
    }
}
