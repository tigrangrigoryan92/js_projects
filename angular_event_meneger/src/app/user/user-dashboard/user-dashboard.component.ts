import {Component, OnInit} from '@angular/core';
import {EventService} from '../../shared/services/event.service';

@Component({
    selector: 'app-user-dashboard',
    templateUrl: './user-dashboard.component.html',
    styleUrls: ['./user-dashboard.component.scss']
})
export class UserDashboardComponent implements OnInit {
    userName = localStorage.getItem('userName');
    allEvents;

    constructor(private eventService: EventService) {
    }

    ngOnInit() {
        this.getAllEvent();
    }

    private getAllEvent() {
        this.eventService.getAllEvents().subscribe(
            res => {
                this.allEvents = res;
            }
        );
    }

}
