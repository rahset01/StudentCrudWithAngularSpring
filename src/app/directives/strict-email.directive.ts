import { Directive } from '@angular/core';
import {
  AbstractControl,
  NG_VALIDATORS,
  ValidationErrors,
  Validator
} from '@angular/forms';

@Directive({
  selector: '[appStrictEmail]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: StrictEmailDirective,
      multi: true
    }
  ]
})
export class StrictEmailDirective implements Validator {
  private emailRegex: RegExp =
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

  validate(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if (!value) return null; // Required validator will handle empty
    return this.emailRegex.test(value)
      ? null
      : { strictEmail: true }; // Return custom error key
  }
}
