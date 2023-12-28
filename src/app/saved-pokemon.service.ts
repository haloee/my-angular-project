import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root',
})
export class SavedPokemonService {
  private savedPokemon: any[] = [];
  constructor() {
    
    const savedData = localStorage.getItem('savedPokemon');
    if (savedData) {
      this.savedPokemon = JSON.parse(savedData);
    }
  }

  addSavedPokemon(pokemon: any) {
    this.savedPokemon.push(pokemon);
    localStorage.setItem('savedPokemon', JSON.stringify(this.savedPokemon));
  }

  getSavedPokemon() {
    return this.savedPokemon;
  }
  deleteSavedPokemon(pokemon: any) {
    const index = this.savedPokemon.findIndex((p) => p.name === pokemon.name);
    if (index !== -1) {
      this.savedPokemon.splice(index, 1);
    }
  }
}