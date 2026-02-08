import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EyeMenu } from './eye-menu';

describe('EyeMenu', () => {
  let component: EyeMenu;
  let fixture: ComponentFixture<EyeMenu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EyeMenu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EyeMenu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
