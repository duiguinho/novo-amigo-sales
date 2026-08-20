import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Jornal } from './jornal';

describe('Jornal', () => {
  let component: Jornal;
  let fixture: ComponentFixture<Jornal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Jornal],
    }).compileComponents();

    fixture = TestBed.createComponent(Jornal);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
