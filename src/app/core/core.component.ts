import { Component, OnInit } from '@angular/core';
import { ContentService } from '../services';
import { ModalService } from '../shared/modal/modal.service';
import { Modal } from '../models/generic.model';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(
    private contentService: ContentService,
    private _modalService: ModalService
  ) {}

  ngOnInit(): void {
    console.log(this.contentService.globalContents());
  }

  openModal() {
    const modalParams: Modal = {
      header: "default-header",
      icon: true,
      primaryCallback: this.primaryCallback.bind(this),
      secondaryCallback: this.secondaryCallback.bind(this)
    }

    this._modalService.initiateModal.emit({
      type: 'default',
      params: modalParams
    })
  }

  primaryCallback() {
    console.log("callback working");
  }

  secondaryCallback() {
    console.log("secondary test");
  }
}
