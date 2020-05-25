import {NgModule} from '@angular/core';
import {AppRoutingModule} from '../app-routing.module';
import {DeleteComponent} from './delete/delete.component';
import {CommonModule} from '@angular/common';
import {EditComponent} from './edit/edit.component';
import {ReactiveFormsModule} from '@angular/forms';
import {CreateComponent} from './create/create.component';
import {HttpClientModule} from '@angular/common/http';
import {DashboardComponent} from './dashboard/dashboard.component';
import {SharedModule} from '../shared/shared.module';
import { PaginationComponent } from './pageination/pagination.component';

@NgModule({
    imports: [
        HttpClientModule,
        AppRoutingModule,
        CommonModule,
        ReactiveFormsModule,
        SharedModule,
    ],
    declarations: [
        DashboardComponent,
        CreateComponent,
        EditComponent,
        DeleteComponent,
        PaginationComponent
    ],
    exports: [
        HttpClientModule,
        DashboardComponent,
        CreateComponent,
        PaginationComponent
    ]
})
export class AdminModule {

}
