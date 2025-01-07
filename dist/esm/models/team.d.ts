export declare namespace Trelica {
    interface ITeam {
        id: string;
        parentId?: string;
        name: string;
    }
    interface IPutTeam {
        id?: string;
        parentId?: string;
        name: string;
    }
    interface ITeamNode {
        id: string;
        name: string;
        children?: ITeamNode[];
    }
}
