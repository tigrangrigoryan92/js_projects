import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {EventService} from '../../shared/services/event.service';
import {PaginationService} from '../../shared/services/pagination.service';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
    private allEvents;
    private allEventTypes;
    public totalEventsCount;
    @Output() temp = new EventEmitter();
    activePage = 0;

    constructor(private eventService: EventService,
                private paginationService: PaginationService) {
    }

    ngOnInit() {
        this.getAllEventsTypes();

        this.fallowEventChanges();

        // @ts-ignore
        this.displayActivePage();
    }

    private getAllEventsTypes() {
        this.eventService.getAllEventTypes().subscribe(res => {
            this.allEventTypes = res;
        });
    }

    private fallowEventChanges() {
        this.eventService.changed.subscribe((res: any) => {
            if (typeof res === 'string') {
                return this.allEvents = this.allEvents.filter(event => {
                    return event.id !== +res;
                });
            }

            for (let i = 0; i < this.allEvents.length; i++) {
                const tmpEvent = this.allEvents[i];
                if (tmpEvent.id === res.id) {
                    return this.allEvents[i] = res;
                }
            }

            this.allEvents.push(res);
        });
    }

    displayActivePage(activePageNumber) {
        this.paginationService.getEventsTotalCount(activePageNumber).subscribe(res => {
            this.allEvents = res.body;
            this.totalEventsCount = res.headers.get('X-TOTAL-COUNT');
        });
        this.activePage = activePageNumber;
    }




}
