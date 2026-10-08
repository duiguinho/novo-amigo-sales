import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GerenciarAvisos } from './gerenciar-avisos';

describe('GerenciarAvisos', () => {
  let component: GerenciarAvisos;
  let fixture: ComponentFixture<GerenciarAvisos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GerenciarAvisos],
    }).compileComponents();

    fixture = TestBed.createComponent(GerenciarAvisos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
