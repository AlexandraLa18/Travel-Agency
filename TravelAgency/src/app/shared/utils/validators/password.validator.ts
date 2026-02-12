import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";
import { RegExp } from "../regex.utils";

export function confirmPasswordValidator(controlName: string, matchingControlName: string): ValidatorFn {
    return (formGroup: AbstractControl): ValidationErrors | null => {
        const control = formGroup.get(controlName);
        const matchingControl = formGroup.get(matchingControlName);

        if (control && matchingControl && control.value !== matchingControl.value) {
            matchingControl.setErrors({ confirmPassword: true});
            return { confirmPassword: true };
        } else {
            matchingControl?.setErrors(null);
            return null;
        }
    }
}

export function passwordValidator(): ValidatorFn {
    return (control: AbstractControl): Record<string, boolean> | null => {
        const value =  control.value as string;
        if(!value) return null;

        if(!RegExp.password.test(value)) {
            return { password: true };
        }
        return null;
    }
}