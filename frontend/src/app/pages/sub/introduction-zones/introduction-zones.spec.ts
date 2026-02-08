import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IntroductionZones } from './introduction-zones';

describe('IntroductionZones', () => {
  let component: IntroductionZones;
  let fixture: ComponentFixture<IntroductionZones>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IntroductionZones]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IntroductionZones);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
