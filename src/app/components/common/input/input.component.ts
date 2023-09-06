import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { Component, forwardRef, Input } from '@angular/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true
    }
  ]
})
export class InputComponent implements ControlValueAccessor {

  value = '';

  @Input() tipo = 'text';
  @Input() isLimparInput = false;
  @Input() isRequired = true;
  @Input() maxLength: number;

  onChange: any;
  onTouch: any;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  writeValue(value: string) {
    if (value == null) {
      this.value = '';
    }
    this.value = value;
  }

  onInput(value: string) {
    if(this.onChange) {
      this.onChange(value);
    }
  }
}
