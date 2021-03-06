import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DishService {
  public API = `http://${window.location.hostname}:8080`;
  public DISH_API = this.API + '/dishes';

  constructor(private http: HttpClient) {}
  getAll(): Observable<any> {
    return this.http.get(this.DISH_API, {withCredentials: true});
  }

  get(id: string) {
    return this.http.get(this.DISH_API + '/' + id, {withCredentials: true});
  }

  save(dish: any, id: any): Observable<any> {
    let result: Observable<any>;
    if (id) {
      result = this.http.patch(this.DISH_API + '/' + id, dish, {withCredentials: true});
    } else {
      result = this.http.post(this.DISH_API, dish, {withCredentials: true});
    }
    return result;
  }

  remove(id: string) {
    return this.http.delete(this.DISH_API + '/' + id, {withCredentials: true});
  }
}
