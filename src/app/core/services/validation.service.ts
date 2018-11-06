import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable } from "rxjs";
import { map } from 'rxjs/operators';

import { DataService } from './data.service';

@Injectable()
export class ValidationService {

    /*
     * Return error message.
     */
    static getValidatorErrorMessage(validatorName:string, validatorValue?:any, customErrorMessage?:any) {
        let config = {
            'required'         : 'This field is required.',
            'minlength'        : `This fields should contain atleast ${validatorValue.requiredLength} characters.`,
            'maxlength'        : `This fields should contain atmost ${validatorValue.requiredLength} characters.`
        };

        return customErrorMessage[validatorName] || config[validatorName];
    }
}

