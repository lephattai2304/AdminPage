import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayFlightComponent } from './display-flight.component';

describe('DisplayFlightComponent', () => {
  let component: DisplayFlightComponent;
  let fixture: ComponentFixture<DisplayFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DisplayFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisplayFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
