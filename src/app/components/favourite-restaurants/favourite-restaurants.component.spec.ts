import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteRestaurantsComponent } from './favourite-restaurants.component';

describe('FavouriteRestaurantsComponent', () => {
  let component: FavouriteRestaurantsComponent;
  let fixture: ComponentFixture<FavouriteRestaurantsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavouriteRestaurantsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavouriteRestaurantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
