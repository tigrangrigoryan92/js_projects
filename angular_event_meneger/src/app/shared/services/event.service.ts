import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {catchError, delay} from 'rxjs/operators';
import {Observable, Subject, throwError} from 'rxjs';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {Event, EventType} from '../../../environments/interfaces';

@Injectable({providedIn: 'root'})
export class EventService {
    changed = new Subject();

    constructor(private http: HttpClient, private router: Router) {
    }


    getAllEvents(): Observable<Event[]> {
        return this.http.get<Event[]>(`${environment.baseURL}/events`).pipe(
            catchError(error => {
                return throwError('Error from getAllEvents', error);
            })
        );
    }

    getAllEventTypes(): Observable<EventType[]> {
        return this.http.get<EventType[]>(`${environment.baseURL}/eventTypes`).pipe(
            catchError(error => {
                return throwError('Error from getAllEventTypes', error);
            })
        );
    }

    createEvent(newEvent): Observable<Event> {
        return this.http.post<Event>(`${environment.baseURL}/events`, newEvent).pipe(
            catchError(error => {
                return throwError('Error from createEvent', error);
            })
        );
    }

    removeEvent(id: number): Observable<void> {
        return this.http.delete<void>(`${environment.baseURL}/events/${id}`).pipe(
            catchError(error => {
                return throwError('Error from removeEvent', error);
            })
        );
    }

    editEvent(id, body): Observable<Event> {
        return this.http.put<Event>(`${environment.baseURL}/events/${id}`, body).pipe(
            catchError(error => {
                return throwError('Error from editEvent', error);
            })
        );
    }

    getEventById(id): Observable<Event> {
        return this.http.get<Event>(`${environment.baseURL}/events/${id}`).pipe(
            catchError(error => {
                return throwError('Error from getEventById', error);
            })
        );
    }

    uploadImg(image, id) {
        const formData = new FormData();

        formData.append('image', image);

        return this.http.post(`${environment.baseURL}/image-upload/${id}`, formData);
    }

    getImg(name) {
        return this.http.get(`${environment.baseURL}/image/${name}`);
    }
}
