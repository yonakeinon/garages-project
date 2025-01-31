import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GarageListComponent } from './garage-list.component';

describe('GarageListComponent', () => {
  let component: GarageListComponent;
  let fixture: ComponentFixture<GarageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GarageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GarageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
