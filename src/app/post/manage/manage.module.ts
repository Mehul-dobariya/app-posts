import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';

import { ManageRoutingModule } from './manage-routing.module'
import { ControlMessagesModule } from '../../control-messages/control-messages.module';

@NgModule({
    imports: [SharedModule, ManageRoutingModule, ControlMessagesModule],
    declarations: [ManageRoutingModule.components]
})
export class ManageModule {
}
