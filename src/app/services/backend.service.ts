import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { config } from "../../environment/environment.dev";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private http: HttpClient
  ) {}

  private toString(obj: object): string {
    return Object.keys(obj)
    .reduce((acc, key, index, arr) => acc += `${key}=${obj[key]}${index+1 < arr.length ? '&' : ''}`, '?')
  }

  private getURL(service: string, path: string, query?: object): string {
    const protocol = config.protocol;
    const host = config.host;
    const apiPath = config.apis[service][path];
    return `${protocol}://${host}/${apiPath}${query ? this.toString(query) : ''}`
  }

  backendGet(url: string) {
    console.log(url)
    return this.http.get(url);
  }

  getGlobalContent() {
    const url = this.getURL('content', 'global');
    return this.backendGet(url);
  }
}
