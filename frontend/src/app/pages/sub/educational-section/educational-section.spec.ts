import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EducationalSection } from './educational-section';

describe('EducationalSection', () => {
  let component: EducationalSection;
  let fixture: ComponentFixture<EducationalSection>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationalSection]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EducationalSection);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
