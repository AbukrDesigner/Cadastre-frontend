import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterGuest } from './footer-guest';

describe('FooterGuest', () => {
  let component: FooterGuest;
  let fixture: ComponentFixture<FooterGuest>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterGuest]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FooterGuest);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
