import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTextComponent } from './formText.component';
import { HostDirective } from './host.directive';
import { FormDropdownComponent } from './formDropdown.component';
import { FormsModule }   from '@angular/forms';
import { IntrusivenessComponent } from './intrusiveness.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule
  ],
  declarations: [FormTextComponent, FormDropdownComponent, HostDirective, IntrusivenessComponent],
  entryComponents:[FormTextComponent, FormDropdownComponent, IntrusivenessComponent],
  exports: [HostDirective]
})
export class FormComponentsModule { }
