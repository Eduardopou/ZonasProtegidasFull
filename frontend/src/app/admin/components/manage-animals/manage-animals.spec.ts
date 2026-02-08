import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAnimals } from './manage-animals';

describe('ManageAnimals', () => {
  let component: ManageAnimals;
  let fixture: ComponentFixture<ManageAnimals>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageAnimals]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageAnimals);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
