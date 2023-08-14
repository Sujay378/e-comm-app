import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { appConfig } from "../../environment/environment.dev";
import { Login, Register } from "../models/generic.model";
import { ConfigService } from "./";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private http: HttpClient
  ) {}

  private queryToString(obj: object): string {
    return Object.keys(obj)
    .reduce((acc, key, index, arr) => acc += `${key}=${obj[key]}${index+1 < arr.length ? '&' : ''}`, '?')
  }

  getURL(service: string, path: string, query?: object): string {
    const protocol = appConfig.protocol;
    const host = appConfig.host;
    const apiPath = appConfig.apis[service][path];
    return `${protocol}://${host}/${apiPath}${query ? this.queryToString(query) : ''}`
  }

  private get getGlobalHeaders() {
    return {
      appName: 'e-comm-app',
      ...(ConfigService.get('sessionId') ? {sessionid: ConfigService.get('sessionId')} : {})
    };
  }

  backendGet(service: string,path: string, extraHeaders?: object) {
    const url = this.getURL(service, path);
    const headers = {
      ...this.getGlobalHeaders,
      ...extraHeaders
    };
    return this.http.get(url, { headers });
  }

  backendPost(service: string,path: string, payload: object, extraHeaders?: object) {
    const url = this.getURL(service, path);
    const headers = {
      ...this.getGlobalHeaders,
      ...extraHeaders
    };
    return this.http.post(url, payload, { headers })
  }

  getGlobalContent() {
    return this.backendGet('content', 'global');
  }

  generateSession() {
    return this.backendGet('session', 'generate');
  }

  endSession() {
    return this.backendPost('session', 'end', { sessionid: ConfigService.get('sessionId') });
  }
}
