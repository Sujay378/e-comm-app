import { Component, OnInit } from '@angular/core';
import { ModalService } from '../shared/modal/modal.service';
import { Modal } from '../models/generic.model';
import { NgxSpinnerService } from 'ngx-spinner';
import { Store } from '@ngrx/store';
import { AppState } from '../models/state.model';
import { isViewLoading, updateViewLoading } from '../store';

@Component({
  selector: 'app-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {

  constructor(
    private _modalService: ModalService,
    private _spinnerService: NgxSpinnerService,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {
    this._store.select(isViewLoading).subscribe(isViewLoading => {
      if(isViewLoading) this._spinnerService.show();
      else this._spinnerService.hide();
    })

    //Dipatch actions same as shown below to show or hide spinner
    //Uncomment below code to see spinner working demo
    // setTimeout(() => {
    //   this._store.dispatch(updateViewLoading({payload: true}))
    // }, 3000)

    // setTimeout(() => {
    //   this._store.dispatch(updateViewLoading({payload: false}))
    // },6000)
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
