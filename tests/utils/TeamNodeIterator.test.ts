import { Trelica } from "../../src/models/team.js";
import { TeamNodeIterator } from "../../src/utils/TeamNodeIterator";

describe('TeamNodeIterator with Depth and Path', () => {
    it('should iterate over all nodes with correct depth and path', () => {
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

        const iterator = new TeamNodeIterator(teamHierarchy);
        const result = Array.from(iterator);

        expect(result).toEqual([
            { node: { id: "1", name: "CEO", children: expect.any(Array) }, depth: 0, path: ["CEO"] },
            { node: { id: "2", name: "VP of Engineering", children: [] }, depth: 1, path: ["CEO", "VP of Engineering"] },
            { node: { id: "3", name: "VP of Sales", children: expect.any(Array) }, depth: 1, path: ["CEO", "VP of Sales"] },
            { node: { id: "4", name: "Regional Manager", children: [] }, depth: 2, path: ["CEO", "VP of Sales", "Regional Manager"] },
            { node: { id: "5", name: "CFO", children: expect.any(Array) }, depth: 0, path: ["CFO"] },
            { node: { id: "6", name: "Accounting Manager", children: [] }, depth: 1, path: ["CFO", "Accounting Manager"] },
        ]);
    });
});