import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {EventService} from '../../shared/services/event.service';
import {PaginationService} from "../../shared/services/pagination.service";


// ngOnChanges(): void {
//     this.dataReady = !!this.eventsTotalCount;
//     this.pageCount = Math.ceil(this.eventsTotalCount / 4);
// }
@Component({
    selector: 'app-pagination',
    templateUrl: './pagination.component.html',
    styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnChanges {
    @Input() totalEventsCount = 0;
    @Input() limit = 0;
    // tslint:disable-next-line:no-output-on-prefix
    @Output() onPageChange: EventEmitter<number> = new EventEmitter();

    public pages = [];
    activePage: number;
    private allEvents;

    constructor(private paginationService: PaginationService) {
    }

    ngOnChanges() {
        const pageCount = this.getPageCount();
        this.pages = this.getArrayOfPage(pageCount);
        this.activePage = 1;
        this.onPageChange.emit(1);
    }

    private getPageCount(): number {
        let totalPage = 0;

        if (this.totalEventsCount > 0 && this.limit > 0) {
            const pageCount = this.totalEventsCount / this.limit;
            const roundedPageCount = Math.ceil(pageCount);

            totalPage = roundedPageCount < pageCount ? roundedPageCount + 1 : roundedPageCount;
        }

        return totalPage;
    }

    getArrayOfPage(pageCount) {
        const pageArray = [];

        if (pageCount > 0) {
            for (let i = 1; i <= pageCount; i++) {
                pageArray.push(i);
            }
        }

        return pageArray;
    }

    onClickPage(pageNumber) {
        if (pageNumber < 1) {
            return;
        }
        if (pageNumber > this.pages.length) {
            return;
        }
        this.activePage = pageNumber;
        this.onPageChange.emit(this.activePage);
    }

    getEventsTotalCount() {
        return this.paginationService.getEventsTotalCount(1).subscribe(res => {
            this.allEvents = res.body;
        });
    }


}
