import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../shared/services/event.service';

@Component({
    selector: 'app-delete',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss']
})
export class DeleteComponent implements OnInit {
    @Output() close = new EventEmitter<void>();
    private event;
    private id;

    constructor(
        private eventService: EventService,
        private router: Router,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.getIdFromParams();

        this.getEventById();
    }

    private getIdFromParams() {
        this.route.paramMap.subscribe(paramMap => {
            this.id = paramMap.get('id');
        });
    }

    private getEventById() {
        this.eventService.getEventById(this.id).subscribe(event => {
            this.event = event;
        });
    }

    private cancelDeletePage() {
        this.router.navigate(['admin', 'dashboard']);
        this.close.emit();
    }

    private removeEvent() {
        this.router.navigate(['admin', 'dashboard']);
        this.close.emit();

        this.eventService.removeEvent(this.id).subscribe(() => {
            console.log('Element deleted');
        });

        this.eventService.changed.next(this.id);
    }
}
