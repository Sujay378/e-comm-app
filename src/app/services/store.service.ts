import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private state = {
    pizzas: ['test']
  };

  //Private selector functions
  private pizzas: Function = () => this.subscribe()['pizzas'];

  constructor() { }

  subscribe() {
    return this.state;
  }

  select(key: string): any {
    return this[key]();
  }

}
