import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";
import {Character} from "../models/character";

@Injectable({
  providedIn: 'root'
})
export class CharacterDetailsService {
  private static readonly ROOT_ENDPOINT = 'characters';

  constructor(private http: HttpClient) { }

  getCharacterDetail(id: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${CharacterDetailsService.ROOT_ENDPOINT}/${id}?apikey=${environment.apikey}`);
  }
}
