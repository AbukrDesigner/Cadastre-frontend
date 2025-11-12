import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Depose } from './depose';

describe('Depose', () => {
  let component: Depose;
  let fixture: ComponentFixture<Depose>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Depose]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Depose);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
