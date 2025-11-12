import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPortail } from './main-portail';

describe('MainPortail', () => {
  let component: MainPortail;
  let fixture: ComponentFixture<MainPortail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainPortail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPortail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
