import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { StoreService, selectors, actionTypes } from './services/store.service';
import { BackendService } from './services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(
    private store: StoreService,
    private backend: BackendService
  ) {}

  ngOnInit(): void {
    this.store.dispatch(actionTypes.addOrder, {id: "test"})
    console.log(this.store.select(selectors.orders));

    this.backend.backendGet().subscribe(data => {
      console.log(data);
    });
  }
}
