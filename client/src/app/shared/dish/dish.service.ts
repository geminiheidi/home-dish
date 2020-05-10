import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  public API = `http://${window.location.hostname}:8080`;
  public DISH_API = this.API + '/dishes';
  public DISH_ADD_API = this.API + '/add';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.DISH_API);
  }

  get(id: string) {
    return this.http.get(this.DISH_API + '/' + id);
  }

  save(dish: any): Observable<any> {
    let result: Observable<any>;
    if (dish.href) {
      result = this.http.patch(dish.href, dish);
    } else {
      result = this.http.post(this.DISH_ADD_API, dish);
    }
    return result;
  }

  remove(href: string) {
    return this.http.delete(href);
  }
}
