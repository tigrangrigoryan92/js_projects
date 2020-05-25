import {Injectable} from '@angular/core';
import {environment} from '../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class PaginationService {

    constructor(private http: HttpClient) {
    }

    getEventsTotalCount(page) {
        return this.http.get(`${environment.baseURL}/events`, {
            observe: 'response',
            params: {
                _page: page,
                _limit: '5'
            }
        });
    }

}
