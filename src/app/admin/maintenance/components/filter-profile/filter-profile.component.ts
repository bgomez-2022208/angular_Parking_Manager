import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-profile',
  templateUrl: './filter-profile.component.html',
  styleUrls: ['./filter-profile.component.scss']
})
export class FilterProfileComponent {
  @Input() searchQuery: string = '';
  @Output() searchChange = new EventEmitter<string>();

  clearSearch() {
    this.searchQuery = '';
  }

  onChange(event: any) {
    event.preventDefault();
    console.log('texto de los querys', event.target.value);

    this.searchChange.emit(event.target.value);
  }
}
