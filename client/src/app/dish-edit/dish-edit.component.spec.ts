import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LunchDishEditComponent } from './dish-edit.component';

describe('LunchDishEditComponent', () => {
  let component: LunchDishEditComponent;
  let fixture: ComponentFixture<LunchDishEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LunchDishEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LunchDishEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
