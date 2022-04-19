import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CharactersService {
  private static readonly ROOT_ENDPOINT = 'characters';

  constructor(private http: HttpClient) { }

  getCharacters(pageSize: number, offset: number): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}${CharactersService.ROOT_ENDPOINT}?limit=${pageSize}&offset=${offset}&apikey=${environment.apikey}`);
  }

}
