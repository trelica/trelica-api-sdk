export namespace Trelica {
    export interface ITeam {
        id: string;
        parentId?: string;
        name: string;
    }

    export interface IPutTeam {
        id?: string;
        parentId?: string;
        name: string;
    }

    export interface ITeamNode {
        id: string;
        name: string;
        children?: ITeamNode[];
    }
}