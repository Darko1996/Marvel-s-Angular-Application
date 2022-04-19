import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {finalize, map} from "rxjs";
import {CharacterDetailsService} from "../../services/character-details.service";
import {Character} from "../../models/character";
import {SharedLoaderService} from "../../services/shared-loader.service";
import {ToastrService} from "ngx-toastr";
import {slideIn} from "../../animations";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss'],
  animations: [slideIn]
})
export class CharacterDetailsComponent implements OnInit {
  character: Character;
  characterId: any;
  selectedOption: any;
  title: string;

  constructor(private activatedRoute: ActivatedRoute,
              private characterDetailsService: CharacterDetailsService,
              private loader: SharedLoaderService,
              private toastr: ToastrService) { }

  ngOnInit(): void {
    this.characterId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCharacterDetail();
  }

  getCharacterDetail(): void {
    this.loader.showFullLoader();

    this.characterDetailsService.getCharacterDetail(this.characterId).pipe(
      map((result => result.data.results[0])),
      finalize( () => this.loader.dismissLoader()))
      .subscribe((data: Character) => {
      console.log('character-detail', data);
      this.character = data;
      this.select(this.character.comics, 'Comics')
    },(err) => {
          this.toastr.error(err);
        });
  }

  select(data: any, title: string): void {
    this.title = title;
    this.selectedOption = data.items;
  }

}
