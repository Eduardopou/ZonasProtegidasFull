import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAnimalsPageComponent } from './add-animals-page.component';

describe('AddAnimalsPageComponent', () => {
  let component: AddAnimalsPageComponent;
  let fixture: ComponentFixture<AddAnimalsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddAnimalsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddAnimalsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
