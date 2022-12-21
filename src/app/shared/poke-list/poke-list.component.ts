import { Component, HostListener, OnInit } from '@angular/core';
import { PokeApiService } from 'src/app/service/poke-api.service';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
})
export class PokeListComponent implements OnInit {
  private setAllPokemons: any = [];

  public getAllPokemons: any;
  public initialValue: number = 0;
  public finalValue: number = 100;
  public apiError: boolean = false;

  @HostListener('window:scroll', [])
  onScroll(): void {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      console.log('deu');
      this.listPokemons();
    }
  }

  constructor(private pokeApiService: PokeApiService) {}

  ngOnInit(): void {
    this.listPokemons();
  }

  public listPokemons(): void {
    this.pokeApiService
      .listAllPokemons(this.initialValue, this.finalValue)
      .subscribe(
        (data) => {
          this.setAllPokemons.push(...data.results);
          this.getAllPokemons = this.setAllPokemons;
          console.log(this.getAllPokemons);
        },
        (error) => {
          this.apiError = true;
        }
      );
    this.initialValue += 50;
    this.finalValue += 50;
  }

  public getSearchValue(value: string): any {
    const FILTERPOKEMON = this.setAllPokemons.filter((res: any) => {
      return !res.name.indexOf(value.toLowerCase());
    });
    this.getAllPokemons = FILTERPOKEMON;
  }
}
