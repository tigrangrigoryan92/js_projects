import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {EventService} from '../../shared/services/event.service';


@Component({
    selector: 'app-edit',
    templateUrl: './edit.component.html',
    styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {
    @Output() close = new EventEmitter<void>();
    private editForm: FormGroup;
    private event;
    private allEventTypes;
    private selectedFile = null;
    private id;

    constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.editFormValidation();

        this.getEventTypes();
    }

    private editFormValidation() {
        this.route.paramMap.subscribe(paramMap => {
            this.id = +paramMap.get('id');
            this.eventService.getEventById(this.id)
                .subscribe(event => {
                    this.event = event;

                    this.editForm = new FormGroup({
                        name: new FormControl({value: this.event.name, disabled: true}, [
                            Validators.required,
                            Validators.minLength(3),
                            Validators.maxLength(12)
                        ]),
                        eventType: new FormControl({value: this.event.eventType, disabled: true}, [
                            Validators.required
                        ]),
                        date: new FormControl({value: this.event.date, disabled: false}, [
                            Validators.required
                        ]),
                        description: new FormControl({value: this.event.description, disabled: false}, [
                            Validators.required,
                            Validators.minLength(30),
                            Validators.maxLength(100)
                        ]),
                        image: new FormControl(null)
                    });

                });
        });
    }

    private getEventTypes() {
        this.eventService.getAllEventTypes().subscribe(res => {
            this.allEventTypes = res;
        });
    }

    private cancelEditPage() {
        this.close.emit();
        this.router.navigate(['admin', 'dashboard']);
    }

    private editEvent(id) {
        if (this.editForm.invalid) {
            return;
        }

        const editedEvent = {
            id: this.event.id,
            name: this.event.name,
            eventType: this.event.eventType,
            date: this.editForm.value.date,
            description: this.editForm.value.description,
            image: this.editForm.value.image
        };

        this.eventService.editEvent(id, editedEvent).subscribe(() => {
            console.log('Event Edited');
        });

        this.router.navigate(['admin', 'dashboard']);

        this.eventService.changed.next(editedEvent);

    }

}


