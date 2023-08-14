import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CoreComponent } from './core/core.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

import { appResolver } from './resolvers'

const routes: Routes = [
  { path: '', resolve: { appResolver }, component: CoreComponent, children: []},
  { path: 'pagenotfound', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
