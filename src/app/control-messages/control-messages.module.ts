import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { ControlMessagesComponent } from './control-messages.component';
@NgModule({
    imports: [SharedModule],
    declarations: [ControlMessagesComponent],
    exports: [ControlMessagesComponent]
})
export class ControlMessagesModule {
}
