import { Component, OnInit } from '@angular/core';
import {CharactersService} from "../../services/characters.service";
import {finalize, map} from "rxjs";
import {Router} from "@angular/router";
import {Character} from "../../models/character";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  characters: Character[];
  constructor(private charactersService: CharactersService, private router: Router) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.charactersService.getCharacters().pipe(
      map((result => result.data.results)),
      finalize( () => true)
    ).subscribe((data: Character[]) => {
      console.log('characters', data);
      this.characters = data;
    });
  }

  redirectToCharacterDetails(character: any): void {
    this.router.navigate(['/character-details', character.id]);
  }

}
