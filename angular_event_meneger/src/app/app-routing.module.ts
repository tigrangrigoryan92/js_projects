import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {LoginPageComponent} from './login-page/login-page.component';
import {DashboardComponent} from './admin/dashboard/dashboard.component';
import {UserDashboardComponent} from './user/user-dashboard/user-dashboard.component';
import {EditComponent} from './admin/edit/edit.component';
import {ErrorComponent} from './error/error.component';
import {CreateComponent} from './admin/create/create.component';
import {DeleteComponent} from './admin/delete/delete.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {AdminGuard} from './shared/guards/admin.guard';
import {UserGuard} from './shared/guards/user.guard';
import {LoggedInGuard} from './shared/guards/logged-in.guard';

const routes: Routes = [
    {path: '', redirectTo: 'login', pathMatch: 'full'},
    {path: 'login', component: LoginPageComponent, canActivate: [LoggedInGuard]},
    {
        path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard, AdminGuard], children: [
            {path: 'create', component: CreateComponent},
            {path: 'event/edit/:id', component: EditComponent},
            {path: 'event/:id', component: DeleteComponent}
        ]
    },
    {path: 'user/dashboard', component: UserDashboardComponent, canActivate: [AuthGuard, UserGuard]},
    {path: '**', component: ErrorComponent}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
