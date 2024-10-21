import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss']
})
export class FilterUserComponent {
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
