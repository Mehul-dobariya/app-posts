import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import {PostRoutingModule} from './post-routing.module';

@NgModule({
    imports: [SharedModule, PostRoutingModule],
    declarations: [PostRoutingModule.components],
    exports: []
})
export class PostModule {
}
