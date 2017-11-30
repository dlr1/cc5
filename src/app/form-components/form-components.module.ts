import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTextComponent } from './formText.component';
import { HostDirective } from './host.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [FormTextComponent, HostDirective],
  entryComponents:[FormTextComponent],
  exports: [HostDirective]
})
export class FormComponentsModule { }
