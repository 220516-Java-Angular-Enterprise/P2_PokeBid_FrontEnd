import { TestBed } from '@angular/core/testing';

import { PokemonService } from './pokemon.service';

import {determineRarity} from './pokemon.service';


describe('PokemonService', () => {
  let service: PokemonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PokemonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  
});

fdescribe('determineRarity', () =>{
  it('should print rarity amazing', () =>{
    expect(determineRarity('Amazing Rare')).toContain('amazing');
  })

  it('should print rarity classic', () =>{
    expect(determineRarity('Classic Collection')).toContain('classic');
  })

  it('should print rarity radiant', () =>{
    expect(determineRarity('Radiant Rare')).toContain('radiant');
  })

  it('should print rarity break', () =>{
    expect(determineRarity('Rare BREAK')).toContain('break');
  })

  it('should print rarity holo', () =>{
    expect(determineRarity('Rare Holo')).toContain('holo');
  })

  it('should print rarity ex', () =>{
    expect(determineRarity('Rare Holo EX')).toContain('ex');
  })

  it('should print rarity gx', () =>{
    expect(determineRarity('Rare Holo GX')).toContain('gx');
  })

  it('should print rarity lv', () =>{
    expect(determineRarity('Rare Holo LV.X')).toContain('lv');
  })

})