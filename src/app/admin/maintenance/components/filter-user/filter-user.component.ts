import { Component } from '@angular/core';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss']
})
export class FilterUserComponent {
  searchQuery: string = '';

  clearSearch() {
    this.searchQuery = '';
  }
}
