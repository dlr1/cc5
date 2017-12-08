import { FormTextComponent } from "./formText.component";
import { FormDropdownComponent } from "./formDropdown.component";
import { IntrusivenessComponent } from "./intrusiveness.component";
import { FormComboboxComponent } from "./formCombobox.component";
import { FormCheckboxComponent } from "./formCheckbox.component";
import { FormSelectComponent } from "./formSelect.component";
import { formReadOnlyTextComponent } from "./formReadOnlyText.component";




let controlMappings = {
    'form-text': FormTextComponent,
    'form-dropdown': FormDropdownComponent,
    'form-intrusive': IntrusivenessComponent,
    'form-combobox': FormComboboxComponent,
    'form-checkbox': FormCheckboxComponent,
    'form-select': FormSelectComponent,
    'form-ro-text': formReadOnlyTextComponent
}

export {controlMappings};