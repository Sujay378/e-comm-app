import { Injectable } from '@angular/core';

export enum actionTypes {
  loadMenu = '[Menu] load menu',
  addOrder = '[Orders] add order'
}

export enum selectors {
  menu = 'menu',
  orders = 'orders'
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private state = {
    menu: [{id: 1, name: 'pizza', description: 'Tasty Pizza with lots of flavour', price: 200}],
    orders: [{item: 'Pizza', quantity: 3, itemPrice: 200}]
  };

  //Private selector functions
  private menu: Function = () => this.subscribe()['menu'];
  private orders: Function = () => this.subscribe()['orders']

  //Private reducer
  private reducer(action) {
    switch (action.type) {
      case actionTypes.loadMenu:
        return {
          ...this.state,
          menu: [...action.payload]
        }
      case actionTypes.addOrder:
        return {
          ...this.state,
          orders: [...this.state.orders, action.payload]
        };

      default:
        return this.state;
    }
  }

  constructor() { }

  subscribe() {
    return this.state;
  }

  select(key: string): any {
    return this[key]();
  }

  dispatch(type: string, payload?: any | null) {
    this.state = this.reducer({ type, payload });
  }
}
