import { Component, OnInit } from '@angular/core';
import {DishService} from '../shared/dish/dish.service';

@Component({
  selector: 'app-dish-list',
  templateUrl: './dish-list.component.html',
  styleUrls: ['./dish-list.component.css']
})
export class DishListComponent implements OnInit {
  dishes: Array<any>;
  selectedDishes: any[] = [];
  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishService.getAll().subscribe(data =>
    {
      this.dishes = data;
    } );
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
  }
}
