import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { AES } from 'crypto-js'

import { appConfig } from '../../environment/environment.dev'
import { BackendService, ConfigService } from "./";

@Injectable({
  providedIn: 'root'
})
export class E2EService {
  key: string = '';

  constructor(
    private http: HttpClient,
    private backend: BackendService
  ) {}

  initiateEncryptionCall() {
    return new Observable<boolean>(subscribe => {
      this.backend.backendGet('auth', 'e2e').subscribe({
        next: value => {
          if(value) {
            this.key = value['encryptedKey']
            subscribe.next(true);
          } else subscribe.next(false);

          subscribe.complete();
        },
        error: value => {
          console.error('Call generated following error: ', value['type']);
          subscribe.next(false);
          subscribe.complete();
        }
      })
    })
  }

  encryptValue(value: string) {
    return AES.encrypt(value, this.key).toString();
  }
}
