import { FormTextComponent } from "./formText.component";
import { FormDropdownComponent } from "./formDropdown.component";
import { IntrusivenessComponent } from "./intrusiveness.component";
import { FormComboboxComponent } from "./formCombobox.component";




let controlMappings = {
    'form-text': FormTextComponent,
    'form-dropdown': FormDropdownComponent,
    'form-intrusive': IntrusivenessComponent,
    'form-combobox': FormComboboxComponent
}

export {controlMappings};