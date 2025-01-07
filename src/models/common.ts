export namespace Trelica {
    export interface ICompactUser {
        userId: string;
        name: string;
        email: string;
    }

    export type IPatchCompactUser =
        | { userId: string; email?: string; name?: string; } // Case 1: userId is present
        | { email: string; userId?: string; name?: string; }; // Case 2: email is present

    export interface IObject {
        createdBy: ICompactUser;
        createdDtm: string;
        lastModifiedDtm: string;
    }
}