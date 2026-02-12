import { Directive, EventEmitter, HostListener, Output, Self } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';

@Directive({
  selector: '[appOnFormSubmit]'
})
export class OnFormSubmitDirective {
  @Output() submitForm: EventEmitter<void> = new EventEmitter();

  get form(): FormGroup {
    return this.formGroupDirective.form;
  }

  constructor(@Self() private formGroupDirective: FormGroupDirective) {}

  @HostListener('submit', ['$event'])
  onSubmit(event: Event) {
    if (this.formGroupDirective.valid) {
      this.submitForm.emit();
      return;
    }

    event.preventDefault();
    this.formGroupDirective.form.markAllAsTouched();
  }
}
