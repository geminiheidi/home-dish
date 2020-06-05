import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DishListComponent} from './dish-list/dish-list.component';
import {DishEditComponent} from './dish-edit/dish-edit.component';
import {OktaCallbackComponent} from '@okta/okta-angular';

const routes: Routes = [
  {path: '', redirectTo: '/dish-list', pathMatch: 'full'},
  {
    path: 'dish-list',
    component: DishListComponent
  },
  {
    path: 'dish-add',
    component: DishEditComponent
  },
  {
    path: 'dish-add/:id',
    component: DishEditComponent
  },
  {
    path: 'implicit/callback',
    component: OktaCallbackComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
