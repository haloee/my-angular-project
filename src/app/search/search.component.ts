import { SavedPokemonService } from './../saved-pokemon.service';
import { Component } from '@angular/core';
import { ApiService } from '../api.service';
import { catchError } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  searchTerm: string = '';
  searchResult: any;
  pokemonImage: string = '';
  pokemonTypes:string[]=[];
  pokemonArtwork:string='';
  errorMessage:string='';
  loading:boolean=false;

  constructor(private pokemonService: ApiService, private savedPokemonService:SavedPokemonService) {}
  savedPokemons:any[]=[];
  savePokemon() {
    if (this.searchResult) {
      this.savedPokemonService.addSavedPokemon({
        name: this.searchResult.name,
        types: this.pokemonTypes,
        artwork: this.pokemonArtwork,
      });
      this.savedPokemons=this.savedPokemonService.getSavedPokemon();
    }
  }
  searchPokemon() {
    if (this.searchTerm.trim() === '') {
      return;
    }
this.loading=true;
timer(2000).subscribe(()=>{
    this.pokemonService.searchPokemonByName(this.searchTerm)
    .subscribe(
      (data) => {
        if (data.name) {
          
          this.searchResult = data;
          this.errorMessage = ''; 
          this.pokemonImage = data.sprites.front_default;
          this.pokemonTypes = data.types.map((typeInfo: any) => typeInfo.type.name);
          this.pokemonArtwork = data.sprites.other['official-artwork'].front_default;
          this.loading=false;
        } else {
          
          this.searchResult = null; 
          this.errorMessage = 'Pokémon not found. Please try a different name.';
          this.clearPokemonData(); 
          this.loading=false;
        }
      },
      (error) => {
        
        this.loading=false;//
      },
      ()=>{

      }
    );
});
}

clearPokemonData() {
  this.pokemonArtwork = '';
  this.pokemonTypes = [];
  this.pokemonArtwork = '';
}
}