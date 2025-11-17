import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImputationCreate } from './imputation-create';

describe('ImputationCreate', () => {
  let component: ImputationCreate;
  let fixture: ComponentFixture<ImputationCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImputationCreate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImputationCreate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
