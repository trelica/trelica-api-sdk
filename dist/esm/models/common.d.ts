export declare namespace Trelica {
    interface ICompactUser {
        userId: string;
        name: string;
        email: string;
    }
    type IPatchCompactUser = {
        userId: string;
        email?: string;
        name?: string;
    } | {
        email: string;
        userId?: string;
        name?: string;
    };
    interface IObject {
        createdBy: ICompactUser;
        createdDtm: string;
        lastModifiedDtm: string;
    }
}
