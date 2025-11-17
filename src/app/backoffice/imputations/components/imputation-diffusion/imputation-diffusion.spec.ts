import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationDiffusion } from './imputation-diffusion';

describe('ImputationDiffusion', () => {
  let component: ImputationDiffusion;
  let fixture: ComponentFixture<ImputationDiffusion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImputationDiffusion]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImputationDiffusion);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
