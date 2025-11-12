import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Portail } from './portail';

describe('Portail', () => {
  let component: Portail;
  let fixture: ComponentFixture<Portail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Portail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Portail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
