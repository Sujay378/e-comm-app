import { EventEmitter, Injectable } from "@angular/core";
import { Modal } from "src/app/models/generic.model";

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  initiateModal = new EventEmitter<{type: string, params: Modal}>();
  closeModal = new EventEmitter<boolean>();
  primaryButtonClick = new EventEmitter();
  secondaryButtonClick = new EventEmitter();

  constructor() {}
}
