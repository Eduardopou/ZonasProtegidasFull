import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZonasDialog } from './zonas-dialog';

describe('ZonasDialog', () => {
  let component: ZonasDialog;
  let fixture: ComponentFixture<ZonasDialog>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ZonasDialog]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ZonasDialog);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
