import { HttpParams } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ConfigService {
  private static config = {};

  constructor() {

  }

  static getSiteParams() {
    const params = new HttpParams({
      fromString: window.location.search.slice(1)
    });
    params.keys().forEach(key => this.config[key] = params.get(key));
  }

  static get(key: string) {
    return this.config[key];
  }

  static set(key: string, value: any) {
    this.config[key] = value;
  }
}
