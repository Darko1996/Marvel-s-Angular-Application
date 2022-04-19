import { Component, OnInit } from '@angular/core';
import {CharactersService} from "../../services/characters.service";
import {finalize, map} from "rxjs";
import {Router} from "@angular/router";
import {Character} from "../../models/character";
import {SharedLoaderService} from "../../services/shared-loader.service";
import {ToastrService} from "ngx-toastr";
import {slideIn} from "../../animations";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [slideIn]
})
export class HomeComponent implements OnInit {
  characters: Character[];
  p = 1;
  pageSize = 8;
  total = 0;
  offset = 0;

  constructor(private charactersService: CharactersService,
              private router: Router,
              private toastr: ToastrService,
              private loader: SharedLoaderService) { }

  ngOnInit(): void {
    this.getCharacters();
  }

  getCharacters(): void {
    this.loader.showFullLoader();
    this.offset = (this.p - 1) * this.pageSize;

    this.charactersService.getCharacters(this.pageSize, this.offset).pipe(
      map((result => result.data)),
      finalize( () => this.loader.dismissLoader())
    ).subscribe((data: any) => {
      this.characters = data.results;
      this.total = data.total;
    },(err) => {
        this.toastr.error(err);
      });
  }

  pageChangeEvent(event: any){
    this.p = event;
    this.getCharacters();
  }

  redirectToCharacterDetails(character: Character): void {
    this.router.navigate(['/character-details', character.id]);
  }

}
