import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Output() search!: EventEmitter<string>;

  constructor() {
    this.search = new EventEmitter<string>();
  }

  ngOnInit(): void {}

  emitSearch(event: Event) {
    let target = event.target as HTMLInputElement;
    this.search.emit(target.value);
  }
}