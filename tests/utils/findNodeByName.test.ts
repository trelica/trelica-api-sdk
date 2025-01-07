import { Trelica } from "../../src/models/team.js";
import { findNodeByName } from "../../src/utils";

describe('findNodeByName', () => {
    const teamHierarchy: Trelica.ITeamNode[] = [
        {
            id: "1",
            name: "CEO",
            children: [
                { id: "2", name: "VP of Engineering", children: [] },
                {
                    id: "3", name: "VP of Sales", children: [
                        { id: "4", name: "Regional Manager", children: [] },
                    ]
                },
            ],
        },
        {
            id: "5",
            name: "CFO",
            children: [
                { id: "6", name: "Accounting Manager", children: [] },
            ],
        },
    ];

    it('should find a node by name and return its object and path', () => {
        const result = findNodeByName(teamHierarchy, "Regional Manager");
        expect(result.node).toEqual({ id: "4", name: "Regional Manager", children: [] });
        expect(result.path).toEqual(["CEO", "VP of Sales", "Regional Manager"]);
    });

    it('should return null and an empty path if the node is not found', () => {
        const result = findNodeByName(teamHierarchy, "Nonexistent Node");
        expect(result.node).toBeNull();
        expect(result.path).toEqual([]);
    });

    it('should find a root node by name', () => {
        const result = findNodeByName(teamHierarchy, "CEO");
        expect(result.node).toEqual({
            id: "1",
            name: "CEO",
            children: expect.any(Array),
        });
        expect(result.path).toEqual(["CEO"]);
    });
});