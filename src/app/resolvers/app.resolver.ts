import { inject } from '@angular/core';
import { ResolveFn, Router } from '@angular/router';
import { Observable, forkJoin } from 'rxjs'
import { BackendService, ContentService, ConfigService } from '../services';

export const appResolver: ResolveFn<Observable<boolean>> = (route, state) => {
  const router = inject(Router);
  const backendService = inject(BackendService);
  const contentService = inject(ContentService);

  return new Observable<boolean>(subscriber => {
    const startUpCalls = {
      content: backendService.getGlobalContent(),
      session: backendService.generateSession()
    };

    forkJoin(startUpCalls).subscribe({
      next: value => {
        if(value) {
          if(value['content'] && value['session']) {
            contentService.globalContents(value['content']);
            ConfigService.set('sessionId', value['session']['id']);
          }
          subscriber.next(true);
        } else router.navigate(['pagenotfound']);
      },
      error: err => router.navigate(['pagenotfound'])
    })
  });
};
