import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OnFormSubmitDirective } from '../../directives/on-form-submit.directive';

@NgModule({
  declarations: [OnFormSubmitDirective],
  imports: [CommonModule],
  exports: [OnFormSubmitDirective]
})
export class OpsFormModule { }
