import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule} from '@angular/forms';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {SharedModule} from './shared/shared.module';
import {LoginPageComponent} from './login-page/login-page.component';
import {AdminModule} from './admin/admn.module';
import {UserModule} from './user/user.module';
import {ErrorComponent} from './error/error.component';
import {AuthGuard} from './shared/guards/auth.guard';
import {AuthInterceptor} from './shared/interceptors/auth.interceptor';
import {AdminGuard} from './shared/guards/admin.guard';
import {UserGuard} from './shared/guards/user.guard';

const INTERCEPTOR_PROVIDER: Provider = {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
};

@NgModule({
    declarations: [
        AppComponent,
        LoginPageComponent,
        ErrorComponent,
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        HttpClientModule,
        SharedModule,
        AdminModule,
        UserModule,
        ReactiveFormsModule

    ],
    providers: [
        AuthGuard,
        AdminGuard,
        UserGuard,
        INTERCEPTOR_PROVIDER
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
