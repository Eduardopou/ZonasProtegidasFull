import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAnimal } from './edit-animal';

describe('EditAnimal', () => {
  let component: EditAnimal;
  let fixture: ComponentFixture<EditAnimal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditAnimal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditAnimal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
