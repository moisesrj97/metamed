import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() search!: EventEmitter<string>;
  darkMode!: boolean;

  constructor(public store: Store<{ darkMode: { darkMode: boolean } }>) {
    this.search = new EventEmitter<string>();
  }

  ngOnInit(): void {
    this.store.select('darkMode').subscribe((state) => {
      this.darkMode = state.darkMode;
    });
  }

  emitSearch(event: Event) {
    let target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}
