import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {EventService} from '../../shared/services/event.service';
import {AuthService} from '../../shared/services/auth.service';

class ImageSnippet {
    pending = false;
    status = 'init';

    constructor(public src: string, public file: File) {
    }
}

@Component({
    selector: 'app-create',
    templateUrl: './create.component.html',
    styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {
    // tslint:disable-next-line:no-output-native
    @Output() close = new EventEmitter<void>();
    createForm: FormGroup;
    allEventTypes;
    allEvents;
    private selectedFile;
    // id;
    now = Date.now();

    constructor(
        private authService: AuthService,
        private eventService: EventService,
        private router: Router) {
    }

    ngOnInit() {
        this.createFormValidation();

        this.getAllEvents();

        this.getAllEventTypes();
    }

    private createFormValidation() {
        this.createForm = new FormGroup({
            name: new FormControl(null, [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(12)
            ]),
            eventType: new FormControl(null, [
                Validators.required
            ]),
            date: new FormControl(null, [
                Validators.required
            ]),
            description: new FormControl(null, [
                Validators.required,
                Validators.minLength(30),
                Validators.maxLength(100)
            ]),
            image: new FormControl(null)
        });
    }

    private getAllEvents() {
        this.eventService.getAllEvents().subscribe(
            res => {
                this.allEvents = res;
                console.log('all', this.allEvents);
            }
        );
    }

    private getAllEventTypes() {
        this.eventService.getAllEventTypes().subscribe(res => {
            this.allEventTypes = res;
        });
    }


    private createEvent() {
        if (this.createForm.invalid) {
            return;
        }
        this.now = Date.now();

        const newEvent = {
            name: this.createForm.value.name,
            eventType: +this.createForm.value.eventType,
            date: this.createForm.value.date,
            description: this.createForm.value.description,
            image: this.createForm.value.image,
            created: true
        };

        this.eventService.createEvent(newEvent).subscribe((res) => {
            this.eventService.changed.next(res);
        });

        this.router.navigate(['admin', 'dashboard']);

    }

    cancelCreatePage() {
        this.close.emit();
        this.router.navigate(['admin', 'dashboard']);
    }

    // IMAGE UPLOADING

    // private onSuccess() {
    //     this.selectedFile.pending = false;
    //     this.selectedFile.status = 'ok';
    // }
    //
    // private onError() {
    //     this.selectedFile.pending = false;
    //     this.selectedFile.status = 'fail';
    //     this.selectedFile.src = '';
    // }
    //
    // processFile(imageInput: any) {
    //     const file: File = imageInput.files[0];
    //     const reader = new FileReader();
    //
    //     reader.addEventListener('load', (event: any) => {
    //
    //         this.selectedFile = new ImageSnippet(event.target.result, file);
    //
    //         this.selectedFile.pending = true;
    //         this.eventService.uploadImg(this.selectedFile.file, this.id).subscribe(
    //             (res) => {
    //                 this.onSuccess();
    //             },
    //             (err) => {
    //                 this.onError();
    //             });
    //     });
    //
    //     reader.readAsDataURL(file);
    // }

}
