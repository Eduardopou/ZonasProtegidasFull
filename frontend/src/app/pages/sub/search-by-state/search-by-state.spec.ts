import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchByState } from './search-by-state';

describe('SearchByState', () => {
  let component: SearchByState;
  let fixture: ComponentFixture<SearchByState>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SearchByState]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchByState);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
