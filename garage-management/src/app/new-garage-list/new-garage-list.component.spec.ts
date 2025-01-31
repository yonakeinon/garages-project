import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewGarageListComponent } from './new-garage-list.component';

describe('NewGarageListComponent', () => {
  let component: NewGarageListComponent;
  let fixture: ComponentFixture<NewGarageListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NewGarageListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewGarageListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
