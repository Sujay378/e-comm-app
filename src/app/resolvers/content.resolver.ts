import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable } from 'rxjs'
import { BackendService, ContentService } from '../services';

export const contentResolver: ResolveFn<Observable<boolean>> = (route, state) => {
  const router = inject(Router);
  const backendService = inject(BackendService);
  const contentService = inject(ContentService);

  return new Observable<boolean>(subscriber => {
    backendService.getGlobalContent().subscribe({
      next: value => {
        if(value) {
          contentService.globalContents(value);
          subscriber.next(true);
        } else router.navigate(['pagenotfound']);
      },
      error: err => router.navigate(['pagenotfound'])
    })
  });
};
