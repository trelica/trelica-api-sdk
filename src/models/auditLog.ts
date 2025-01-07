export namespace Trelica {
    type IAuditLogEventType = "integration_apps_found";

    export interface IAuditLogEvent {
        id: number,
        published: string,
        eventType: IAuditLogEventType,
        actor: {
            id: string,
            type: "User",
            displayName: string,
            alternateId: string;
        },
        target: Array<{
            id: string;
            type: "CustomerIntegration" | "CustomerIntegrationId";
        }>,
        details: unknown;
    }
}
