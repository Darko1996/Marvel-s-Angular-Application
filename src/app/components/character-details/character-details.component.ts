import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {finalize} from "rxjs";
import {CharacterDetailsService} from "../../services/character-details.service";
import {Character} from "../../models/character";

@Component({
  selector: 'app-character-details',
  templateUrl: './character-details.component.html',
  styleUrls: ['./character-details.component.scss']
})
export class CharacterDetailsComponent implements OnInit {
  character: Character;
  characterId: any;
  constructor(private activatedRoute: ActivatedRoute, private characterDetailsService: CharacterDetailsService) { }

  ngOnInit(): void {
    this.characterId = this.activatedRoute.snapshot.paramMap.get('id');
    this.getCharacterDetail();
  }

  getCharacterDetail(): void {
    this.characterDetailsService.getCharacterDetail(this.characterId).pipe(finalize( () => true)).subscribe((data: Character) => {
      console.log('character-detail', data);
    });
  }

}
