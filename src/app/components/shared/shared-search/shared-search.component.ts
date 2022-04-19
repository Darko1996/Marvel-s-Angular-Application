import {Component, EventEmitter, Input, OnInit, Output, SimpleChanges} from '@angular/core';
import {SearchOption} from "../../../models/search-option";

@Component({
  selector: 'app-shared-search',
  templateUrl: './shared-search.component.html',
  styleUrls: ['./shared-search.component.scss']
})
export class SharedSearchComponent implements OnInit {
  @Input() open = true;
  @Input() viewSearchId = false;
  _searchText: string;
  @Input() set searchText(v: string) { this._searchText = v; }
  get searchText() { return this._searchText; }
  @Input() options: SearchOption[] = [];
  @Output() textOut = new EventEmitter<any>();
  @Output() selectOption = new EventEmitter<SearchOption>();
  @Output() searchTextChange = new EventEmitter();

  filteredOptions: SearchOption[];
  isOpen = false;

  constructor() { }

  ngOnInit(): void {}

  textChanged(): void {
    this.textOut.emit(this.searchText);
  }

  onClick(item: SearchOption) {
    this.isOpen = false;
    this.selectOption.emit(item);
    this._searchText = item.name;
  }

  clearSearch() {
    this._searchText = '';
    this.isOpen = false;
    this.textOut.emit(this.searchText);
  }

  filterOptions() {
    if (this._searchText && this._searchText.length > 0) {
      this.isOpen = true;
      this.filteredOptions = [];
      this.filteredOptions = this.options;
    } else {
      this.isOpen = false;
    }
  }

  notFound() {
    this.isOpen = false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['options']) {
      this.filterOptions();
    }
  }
}
