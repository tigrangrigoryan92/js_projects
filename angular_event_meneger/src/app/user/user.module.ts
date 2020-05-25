import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {UserDashboardComponent} from './user-dashboard/user-dashboard.component';
import {EventComponent} from './event/event.component';
import {EventsGridComponent} from './events-grid/events-grid.component';
import {CommonModule} from '@angular/common';
import {SharedModule} from '../shared/shared.module';

@NgModule({
    imports: [HttpClientModule, CommonModule, SharedModule],
    exports: [HttpClientModule],
    declarations: [
        UserDashboardComponent,
        EventsGridComponent,
        EventComponent
    ]
})
export class UserModule {
    constructor() {
    }
}
