import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {DishListComponent} from './dish-list/dish-list.component';
import {DishEditComponent} from './dish-edit/dish-edit.component';
import {OktaCallbackComponent} from '@okta/okta-angular';
import {HomeComponent} from './home/home.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {
    path: 'dish-list',
    component: DishListComponent
  },
  {
    path: 'home',
    component: HomeComponent
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
