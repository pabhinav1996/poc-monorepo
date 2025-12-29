import { Component, EventEmitter, Input, Output, model, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';


export interface DropdownOption {
  label: string;
  value: string;
}

@Component({
  selector: 'poc-dropdown',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DropdownComponent),
      multi: true
    }
  ]
})
export class DropdownComponent implements ControlValueAccessor {
 
  @Input() options: DropdownOption[] = [];


  @Input() label?: string;
  @Input() placeholder = 'Select...';
  @Input() width?: string;
  @Input() disabled = false;
  value = model<string>('');
  @Output() valueChange = new EventEmitter<string>();

  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value.set(value || '');
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(newValue: string): void {
    this.value.set(newValue);
    this.valueChange.emit(newValue);
    this.onChange(newValue);
    this.onTouched();
  }

  static toOptions(values: string[]): DropdownOption[] {
    return values.map(v => ({ label: v, value: v }));
  }
}
