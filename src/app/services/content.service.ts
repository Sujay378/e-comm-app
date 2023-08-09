import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class ContentService {
  private contents = {};

  constructor() {}

  globalContents(response?): object | void {
    if(response) {
      this.contents = response;
    } else return this.contents;
  }

  getCopyContent(section: string, id: string) {
    return this.contents['copies'][section][id];
  }
}
