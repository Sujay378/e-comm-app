import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { appConfig } from "../../environment/environment.dev";
import { ConfigService } from "./";
import { map } from "rxjs";

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
      ...(ConfigService.get('sessionId') ? {sessionid: ConfigService.get('sessionId')} : {}),
      ...(ConfigService.get('authorize') ? {authorize: ConfigService.get('authorize')} : {})
    };
  }

  backendGet(service: string, path: string, extraHeaders?: object, fullResponse: boolean = false) {
    const url = this.getURL(service, path);
    const headers = {
      ...this.getGlobalHeaders,
      ...extraHeaders
    };

    return this.http.get(url, { headers, observe: 'response' }).pipe(
      map(value => {
        const { headers, body } = value;
        ConfigService.set('authorize', headers.get('authorize'));

        return fullResponse ? value : body;
      })
    );
  }

  backendPost(service: string, path: string, payload: object, extraHeaders?: object, fullResponse: boolean = false) {
    const url = this.getURL(service, path);
    const headers = {
      ...this.getGlobalHeaders,
      ...extraHeaders
    };

    return this.http.post(url, payload, { headers, observe: 'response' }).pipe(
      map(value => {
        const { headers, body } = value;
        ConfigService.set('authorize', headers.get('authorize'));

        return fullResponse ? value : body;
      })
    )
  }

  getGlobalContent() {
    return this.backendGet('content', 'global');
  }

  generateSession() {
    return this.backendGet('session', 'generate');
  }
}
