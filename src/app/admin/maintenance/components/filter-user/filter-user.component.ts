import { Component, EventEmitter, Input, Output } from '@angular/core';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-filter-user',
  templateUrl: './filter-user.component.html',
  styleUrls: ['./filter-user.component.scss'],
  animations: [
    trigger('transitionMessages', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms', style({ opacity: 0 })),
      ]),
    ]),
  ],
})
export class FilterUserComponent {
  @Input() searchQuery: string = '';
  @Output() searchChange = new EventEmitter<string>();

  clearSearch() {
    this.searchQuery = '';
    this.searchChange.emit(this.searchQuery);
  }

  onChange(event: any) {
    event.preventDefault();
    console.log('texto de los querys', event.target.value);

    this.searchChange.emit(event.target.value);
  }
}
