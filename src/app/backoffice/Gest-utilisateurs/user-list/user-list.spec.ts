import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestUlisateurs } from './user-list';

describe('GestUlisateurs', () => {
  let component: GestUlisateurs;
  let fixture: ComponentFixture<GestUlisateurs>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GestUlisateurs]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestUlisateurs);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
