import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Title} from "@angular/platform-browser";
import {debounceTime, distinctUntilChanged, Subject, switchMap} from "rxjs";
import {CharactersService} from "../../services/characters.service";
import {SearchOption} from "../../models/search-option";
import {Router} from "@angular/router";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() selectedSymbol = new EventEmitter<string>();
  $search = new Subject<string>();
  searchOptions: SearchOption[] = [];
  searchResults: any[] = [];
  openMobMenu: boolean;
  _searchText: string;

  constructor(private titlePage: Title, private charactersService: CharactersService, private router: Router) { }

  ngOnInit(): void {
    this.$search.pipe(debounceTime(500),
      distinctUntilChanged(),
      switchMap(t => {
        this._searchText = t;
        return this.charactersService.charactersSearch(t); }))
      .subscribe(res => {
        this.searchOptions = [];
        this.searchResults = [];
        this.searchResults = res.data.results;
        console.log('this.searchResults', this.searchResults);
        this.searchResults.forEach(item => {
          if (item) {
            this.searchOptions.push({id: item.id, name: item.name });
          }
        });
      });
  }

  selectSymbol(option: SearchOption) {
    this.selectedSymbol.emit(option.id);
    this.router.navigate(['/character-details', option.id]);
  }

  openMobMenuToggle(): void {
    this.openMobMenu = !this.openMobMenu;
  }

  setPageTitle(title: string): void {
    this.titlePage.setTitle('Marvels Characters App | '  + title);
  }
}
