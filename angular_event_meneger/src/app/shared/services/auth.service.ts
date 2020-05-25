import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../../../environments/environment';
import {Router} from '@angular/router';
import {catchError, delay, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable({providedIn: 'root'})
export class AuthService {
    constructor(private http: HttpClient, private router: Router) {
    }

    login(user) {
        return this.http.post(`${environment.baseURL}/login`, user);
    }

    logout() {
        localStorage.clear();
        this.router.navigate(['/login']);
    }


    isAuthenticated() {
        return !!localStorage.getItem('token');
    }

    loggedIn() {
        return !!localStorage.getItem('admin');
    }

    isAdmin() {
        return !!localStorage.getItem('isAdmin');
    }

}

