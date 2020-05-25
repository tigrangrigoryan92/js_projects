import {Component, Input, OnInit} from '@angular/core';
import {EventService} from '../../shared/services/event.service';

@Component({
    selector: 'app-event',
    templateUrl: './event.component.html',
    styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {
    @Input() event;
    private img;
    private defaultImg = 'http://hammerzzclub.com/img/gallery-3.jpg';
    private allEventTypes;

    constructor(private eventsService: EventService) {
    }

    ngOnInit() {
        this.getAllEventTypes();

        this.getImg();
    }

    private getAllEventTypes() {
        this.eventsService.getAllEventTypes().subscribe(res => {
            this.allEventTypes = res;
        });
    }

    private getImg() {
        if (!this.event.image) {
            return;
        }
        return this.eventsService.getImg(this.event.image).subscribe(
            () => {

            }, error => {
                this.img = error.url;
            });
    }


}
