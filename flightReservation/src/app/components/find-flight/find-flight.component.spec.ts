import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindFlightComponent } from './find-flight.component';

describe('FindFlightComponent', () => {
  let component: FindFlightComponent;
  let fixture: ComponentFixture<FindFlightComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindFlightComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindFlightComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
