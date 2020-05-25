import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {EventService} from '../shared/services/event.service';
import {AuthService} from '../shared/services/auth.service';

@Component({
    selector: 'app-login-page',
    templateUrl: './login-page.component.html',
    styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
    private loginForm: FormGroup;
    private errorMsg;
    private submitted = false;

    constructor(
        private eventService: EventService,
        private authService: AuthService,
        private router: Router) {
    }

    ngOnInit() {
        this.loginFormValidation();
    }


    private login() {
        if (this.loginForm.invalid) {
            this.submitted = true;
            this.errorMsg = 'Email or password is invalid';
            return;
        }

        this.submitted = true;

        const user = {...this.loginForm.value};

        this.authService.login(user).subscribe(
            (data) => {

                this.loginForm.reset();

                this.setLocalStorageData(data);

                // @ts-ignore
                if (data.user.isAdmin) {
                    localStorage.setItem('isAdmin', 'admin');
                    this.router.navigate(['/admin', 'dashboard']);
                    localStorage.setItem('admin', 'yes');
                    this.submitted = false;
                } else {
                    this.router.navigate(['/user', 'dashboard']);
                    this.submitted = false;
                }
            },
            error => {
                console.log(error);
                this.errorMsg = error.error.message;
                console.log(this.errorMsg);
                this.submitted = false;
            }
        );
    }

    private loginFormValidation() {
        this.loginForm = new FormGroup({
            email: new FormControl(null, [
                Validators.required,
                Validators.email
            ]),
            password: new FormControl(null, [
                Validators.required,
                Validators.minLength(3)
            ]),
        });
    }

    setLocalStorageData(data) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userName', data.user.name);
        localStorage.setItem('userSrName', data.user.srName);
    }
}


