import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  constructor(
    private http: HttpClient
  ) {}

  backendGet() {
    return this.http.get('http://localhost:3000/content');
  }
}
