import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Store } from '@ngrx/store';

import { StoreService, selectors, actionTypes } from './services/store.service';
import { BackendService } from './services/backend.service';
import { appProcessing, isAppProcessing } from './store';
import { AppState } from './models/state.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private store: StoreService,
    private backend: BackendService,
    private _store: Store<AppState>
  ) {}

  ngOnInit(): void {

  }
}
