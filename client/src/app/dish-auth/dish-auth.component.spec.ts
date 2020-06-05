import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DishAuthComponent } from './dish-auth.component';

describe('DishAuthComponent', () => {
  let component: DishAuthComponent;
  let fixture: ComponentFixture<DishAuthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DishAuthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DishAuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
