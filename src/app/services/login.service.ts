import { Injectable } from "@angular/core";
import { BackendService, E2EService } from "./";
import { Login, Register } from "../models/generic.model";
import { User } from "../models/state.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  constructor(
    private backend: BackendService,
    private e2e: E2EService
  ) {}

  login(data: Login) {
    this.formulate(data, 'login');
  }

  register(data: Register) {
    this.formulate(data);
  }

  private formulate(data: Login, path: string = 'register') {
    let payload;
    this.e2e.initiateEncryptionCall().subscribe({
      next: (callDone: boolean) => {
        if(callDone) {
          payload = {
            ...data,
            password: this.e2e.encryptValue(data.password)
          };
        } else {
          payload = {...data};
        }

        this.submit(payload, path);
      },
      error: (callDone: boolean) => {
        this.submit(data, path)
      }
    })
  }

  private submit(payload: Register | Login, path: string) {
    this.backend.backendPost('auth', path, payload).subscribe({
      next: (user: User) => {
        console.log(user);
      }
    })
  }
}
