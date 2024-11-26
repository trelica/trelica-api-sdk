export interface ITrelicaCompactLicense {
    name: string;
    startDate: string;
    lastModifiedDtm: string;
}
export interface ITrelicaApp {
    id: string;
    name: string;
    status: "Managed" | "Accepted" | "Closed" | "New" | "InReview" | "PlanToClose";
    riskLevel: "Low" | "Medium" | "High";
    vendor: {
        id: string;
        name: string;
    };
    licences: ITrelicaCompactLicense[];
    deleted: boolean;
    lastModifiedDtm: string;
}
