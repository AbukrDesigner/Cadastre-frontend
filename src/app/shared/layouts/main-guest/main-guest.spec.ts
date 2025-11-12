import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainGuest } from './main-guest';

describe('MainGuest', () => {
  let component: MainGuest;
  let fixture: ComponentFixture<MainGuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainGuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainGuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
