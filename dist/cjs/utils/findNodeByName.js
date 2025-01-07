"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findNodeByName = findNodeByName;
function findNodeByName(hierarchy, targetName) {
    // Helper to recursively search for the node
    function traverse(nodes, path) {
        for (const node of nodes) {
            const currentPath = [...path, node.name];
            if (node.name === targetName) {
                return { node, path: currentPath };
            }
            if (node.children) {
                const result = traverse(node.children, currentPath);
                if (result.node) {
                    return result; // Return if found
                }
            }
        }
        return { node: null, path: [] }; // Return null if not found
    }
    return traverse(hierarchy, []);
}
