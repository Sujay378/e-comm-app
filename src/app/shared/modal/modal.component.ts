import { Component, OnInit } from '@angular/core';
import { Modal } from 'src/app/models/generic.model';
import { ModalService } from './modal.service';
import { ContentService } from 'src/app/services';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent implements OnInit {
  idOfComponent: string = 'modal';
  showModal: boolean = false;
  params: Modal = {};
  modalatype: string = '';

  constructor(
    private _modalService: ModalService,
    private _contentService: ContentService
  ) {}

  ngOnInit(): void {
    this._modalService.initiateModal.subscribe(value => {
      this.showModal = true;
      this.modalatype = value.type;
      this.params = value.params;
      this.fetchAllContents();
    });

    this._modalService.closeModal.subscribe(value => {
      this.showModal = false;
    })
  }

  fetchAllContents() {
    Object.keys(this.params).forEach(key => {
      if(typeof this.params[key] === 'string') {
        this.params[key] = this._contentService.getCopyContent(this.idOfComponent, this.params[key]);
      }
    })
  }

  primaryClicked() {
    this.params.primaryCallback();
    this._modalService.primaryButtonClick.emit();
    this.close();
  }

  secondaryClicked() {
    this.params.secondaryCallback();
    this._modalService.secondaryButtonClick.emit();
    this.close();
  }

  close() {
    this._modalService.closeModal.emit();
  }
}
