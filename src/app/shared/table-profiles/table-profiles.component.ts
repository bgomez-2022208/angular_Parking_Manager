import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core'

export interface Profile {
  profileId: number
  description: string
  status: boolean
}
@Component({
  selector: 'app-table-profiles',
  templateUrl: './table-profiles.component.html',
  styleUrls: ['./table-profiles.component.scss']
})
export class TableProfilesComponent implements OnChanges {
  @Input() profiles: Profile[] = []
  @Input() itemsPerPage: number = 5
  @Input() currentPage: number = 1
  @Input() totalPages: number = 1
  @Input() itemsPerPageOptions: number[] = [5, 10, 20]
  @Output() pageChange = new EventEmitter<number>()
  @Output() profileSelected = new EventEmitter<number>()
  @Output() profileDeleted = new EventEmitter<number>()
  @Output() profileUpdated = new EventEmitter<number>()
  @Output() itemsPerPageChange = new EventEmitter<number>()


  paginatedProfiles: Profile[] = []
  @Input() mostrarBoton: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['profiles'] || changes['currentPage'] || changes['itemsPerPage']) {
      this.updatePagination()
    }
  }

  updatePagination(){
    this.mostrarBoton = true;
    const startIndex = (this.currentPage - 1) * this.itemsPerPage
    const endIndex = startIndex + this.itemsPerPage
    this.paginatedProfiles = this.profiles.slice(startIndex, endIndex)
  }

  changePage(event: Event, pageNumber: number){
    event.preventDefault()
    if (pageNumber >= 1 && pageNumber <= this.totalPages){
      this.currentPage = pageNumber
      this.updatePagination()
      this.pageChange.emit(pageNumber)
    }
  }

  onItemsPerPageChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement
    const itemsPerPage = Number(selectElement.value)
    this.itemsPerPage = itemsPerPage
    this.currentPage = 1 // Reset to first page
    this.updatePagination()
    this.itemsPerPageChange.emit(itemsPerPage)
  }

  deleteProfile(profileId: number, event: Event) {
    event.stopPropagation()
    this.profileDeleted.emit(profileId)
  }
}
