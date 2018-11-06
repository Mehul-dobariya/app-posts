import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from '../core/services/validation.service';

@Component({
    selector: 'app-control-messages',
    templateUrl: './control-messages.component.html',
    styleUrls: ['./control-messages.component.scss']
})
export class ControlMessagesComponent implements OnInit {

    @Input() control:FormControl;
    @Input() customErrorMessage:any;

    constructor() {
    }

    ngOnInit() {
    }

    get errorMessage() {
        for (let propertyName in this.control.errors) {
            if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
                return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName], this.customErrorMessage);
            }
        }

        return null;
    }

}
