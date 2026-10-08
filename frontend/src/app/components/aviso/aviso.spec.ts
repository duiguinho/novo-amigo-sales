import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Aviso } from './aviso';

describe('Aviso', () => {
  let component: Aviso;
  let fixture: ComponentFixture<Aviso>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Aviso],
    }).compileComponents();

    fixture = TestBed.createComponent(Aviso);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
