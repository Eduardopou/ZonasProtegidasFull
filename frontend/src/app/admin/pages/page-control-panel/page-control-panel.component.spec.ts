import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageControlPanelComponent } from './page-control-panel.component';

describe('PageControlPanelComponent', () => {
  let component: PageControlPanelComponent;
  let fixture: ComponentFixture<PageControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PageControlPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PageControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
