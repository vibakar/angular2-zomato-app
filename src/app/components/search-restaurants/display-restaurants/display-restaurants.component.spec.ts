import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayRestaurantsComponent } from './display-restaurants.component';

describe('DisplayRestaurantsComponent', () => {
  let component: DisplayRestaurantsComponent;
  let fixture: ComponentFixture<DisplayRestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DisplayRestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DisplayRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
