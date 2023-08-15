import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from '../models/state.model';
import { logged } from '../store';
import { ConfigService } from '../services';

export const authGuard: CanActivateFn = (route, state) => {
  const store = inject(Store<AppState>);
  const router = inject(Router);

  return new Observable<boolean>(subscriber => {
    store.select(logged).subscribe(logged => {
      if(logged) {
        subscriber.next(logged);
      } else {
        ConfigService.set('prevPath', route.pathFromRoot);
        router.navigate(['/login']);
      }
    })
  })
}
