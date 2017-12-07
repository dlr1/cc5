import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormTextComponent } from './formText.component';
import { HostDirective } from './host.directive';
import { FormDropdownComponent } from './formDropdown.component';
import { FormsModule }   from '@angular/forms';
import { IntrusivenessComponent } from './intrusiveness.component';
import { FormComboboxComponent } from './formCombobox.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormCheckboxComponent } from './formCheckbox.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule.forRoot(),
  ],
  declarations: [FormTextComponent, FormDropdownComponent, HostDirective, IntrusivenessComponent, FormComboboxComponent, FormCheckboxComponent],
  entryComponents:[FormTextComponent, FormDropdownComponent, IntrusivenessComponent,FormComboboxComponent, FormCheckboxComponent],
  exports: [HostDirective]
})
export class FormComponentsModule { }
