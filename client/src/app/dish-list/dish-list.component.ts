import { Component, OnInit } from '@angular/core';
import {DishService} from '../shared/dish/dish.service';
import {LocalStorageService} from 'ngx-webstorage';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Array<any>;
  selectedDishes: any[] = [];
  constructor(private dishService: DishService, public localSt: LocalStorageService) { }

  ngOnInit(): void {
    this.dishService.getAll().subscribe(data =>
    {
      this.dishes = data;
    } );
  }

  showDishes(){
    return this.localSt.retrieve('selectedDishes') || [];
  }
  saveSelected() {
    this.localSt.store('selectedDishes', this.selectedDishes);
  }
  checkSelected(dish: any) {
    return this.showDishes().indexOf(dish.name) > -1;
  }

  clearSelected() {
    this.localSt.clear('selectedDishes');
    this.selectedDishes = [];
  }

  onChange(name: any, e) { // here e is a boolean, true if checked, otherwise false
    if (e.checked){
      this.selectedDishes.push(name);
    }
    else{
      const index = this.selectedDishes.indexOf(name, 0);
      if (index > -1) {
        this.selectedDishes.splice(index, 1);
      }
    }
    this.saveSelected();
  }
}
