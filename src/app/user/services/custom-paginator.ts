import { Injectable } from '@angular/core'
import { MatPaginatorIntl } from '@angular/material/paginator'
import { TranslateService } from '@ngx-translate/core'
import { Subject } from 'rxjs'

@Injectable()
export class CustomPaginatorIntl extends MatPaginatorIntl {
  
  override changes = new Subject<void>()

  constructor(private translate: TranslateService) {
    super()
    this.getAndInitTranslations()
  }

  getAndInitTranslations() {
    this.translate.stream([
      'PAGINATOR.ITEMS_PER_PAGE',
      'PAGINATOR.NEXT_PAGE_LABEL',
      'PAGINATOR.PREVIOUS_PAGE_LABEL',
      'PAGINATOR.FIRST_PAGE_LABEL',
      'PAGINATOR.LAST_PAGE_LABEL',
      'PAGINATOR.RANGE'
    ]).subscribe(translation => {
      this.itemsPerPageLabel = translation['PAGINATOR.ITEMS_PER_PAGE']
      this.nextPageLabel = translation['PAGINATOR.NEXT_PAGE']
      this.previousPageLabel = translation['PAGINATOR.PREVIOUS_PAGE']
      this.firstPageLabel = translation['PAGINATOR.FIRST_PAGE']
      this.lastPageLabel = translation['PAGINATOR.LAST_PAGE']
      this.changes.next()  
    })
  }

  override getRangeLabel = (page: number, pageSize: number, length: number): string => {
    if (length === 0 || pageSize === 0) {
      return this.translate.instant('PAGINATOR.RANGE', { startIndex: 0, endIndex: 0, length })
    }

    const startIndex = page * pageSize
    const endIndex = startIndex < length
      ? Math.min(startIndex + pageSize, length)
      : startIndex + pageSize

    return this.translate.instant('PAGINATOR.RANGE', { startIndex: startIndex + 1, endIndex, length })
  }
}
