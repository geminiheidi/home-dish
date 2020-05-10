import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute, Router} from '@angular/router';
import {NgForm} from '@angular/forms';
import {DishService} from '../shared/dish/dish.service';
import {UploadImageComponent} from '../upload-image/upload-image.component';

@Component({
  selector: 'app-lunch-dish-edit',
  templateUrl: './dish-edit.component.html',
  styleUrls: ['./dish-edit.component.css']
})
export class DishEditComponent implements OnInit, OnDestroy {
  @ViewChild(UploadImageComponent, {static: false}) uploadComponent;

  dish: any = {};
  sub: Subscription;
  edit = false;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private dishServe: DishService) {
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params.id;
      if (id) {
        this.dishServe.get(id).subscribe((dish: any) => {
          if (dish) {
            this.dish = dish;
            this.dish.href = dish._links.self.href;
            this.edit = true;
          } else {
            console.log(`Dish with id '${id}' not found, returning to list`);
            this.gotoList();
          }
        });
      }
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  gotoList() {
    this.router.navigate(['/dish-list']);
  }

  save(form: any) {
    const dish = new FormData();
    for ( const key of Object.keys(form) ) {
      const value = form[key];
      dish.append(key, value);
    }
    if (this.uploadComponent) {
      dish.append('imageFile', this.uploadComponent.fileToUpload);
    }
    this.dishServe.save(form.href ? form : dish).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }

  remove(href) {
    this.dishServe.remove(href).subscribe(result => {
      this.gotoList();
    }, error => console.error(error));
  }
}
