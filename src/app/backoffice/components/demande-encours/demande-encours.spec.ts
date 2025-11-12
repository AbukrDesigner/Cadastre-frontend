import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemandeEncours } from './demande-encours';

describe('DemandeEncours', () => {
  let component: DemandeEncours;
  let fixture: ComponentFixture<DemandeEncours>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DemandeEncours]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DemandeEncours);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
