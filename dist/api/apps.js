var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export class AppsAPI {
    constructor(client) {
        this.client = client;
    }
    listApps() {
        return __awaiter(this, arguments, void 0, function* (params = {}) {
            return this.client.get('/api/apps/v1', params);
        });
    }
    updateApp(appId, updates) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.client.patch(`/api/apps/v1/${appId}`, updates);
        });
    }
    listAppUsers(appId_1) {
        return __awaiter(this, arguments, void 0, function* (appId, params = {}) {
            return this.client.get(`/api/apps/v1/${appId}/users`, params);
        });
    }
}
