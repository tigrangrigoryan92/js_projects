import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/services/event.service';

@Component({
    selector: 'app-events-grid',
    templateUrl: './events-grid.component.html',
    styleUrls: ['./events-grid.component.scss']
})
export class EventsGridComponent implements OnInit {
    private allEvents;

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.getAllEvents();
    }

    private getAllEvents() {
        this.eventService.getAllEvents().subscribe(
            res => {
                this.allEvents = res;
                console.log('all', this.allEvents);
            }
        );
    }


}
