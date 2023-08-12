import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { config } from "../../environment/environment.dev";

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

  private getURL(service: string, path: string, query?: object): string {
    const protocol = config.protocol;
    const host = config.host;
    const apiPath = config.apis[service][path];
    return `${protocol}://${host}/${apiPath}${query ? this.queryToString(query) : ''}`
  }

  private get getGlobalHeaders(): HttpHeaders {
    return new HttpHeaders({
      appName: 'e-comm-app'
    });
  }

  backendGet(url: string, extraHeaders?: object) {
    const headers = new HttpHeaders({
      ...this.getGlobalHeaders,
      ...extraHeaders
    });
    return this.http.get(url, { headers });
  }

  backendPost(url: string, payload: object, extraHeaders?: object) {
    const headers = new HttpHeaders({
      ...this.getGlobalHeaders,
      ...extraHeaders
    });
    return this.http.post(url, payload, { headers })
  }

  getGlobalContent() {
    const url = this.getURL('content', 'global');
    return this.backendGet(url);
  }
}
