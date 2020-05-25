import {NgModule} from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {HeaderComponent} from './components/header/header.component';
import {ZoomHoverDirective} from './directives/zoom-hover.directive';
import {PaginationService} from "./services/pagination.service";

@NgModule({
    imports: [
        HttpClientModule
    ],
    declarations: [
        HeaderComponent,
        ZoomHoverDirective
    ],
    exports: [
        HttpClientModule,
        HeaderComponent,
        ZoomHoverDirective
    ],
    providers: [PaginationService]
})
export class SharedModule {
    constructor() {
    }
}
