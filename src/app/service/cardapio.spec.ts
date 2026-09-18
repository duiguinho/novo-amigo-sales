import { TestBed } from '@angular/core/testing';

import { Cardapio } from './cardapio';

describe('Cardapio', () => {
  let service: Cardapio;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Cardapio);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
