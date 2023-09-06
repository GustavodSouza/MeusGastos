import { Component, EventEmitter, Input, Output, OnChanges, SimpleChanges } from "@angular/core";

@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  selector: 'app-button',
})
export class ButtonComponent implements OnChanges {
  @Input() loader: boolean;
  @Input() background: string;
  @Input() label: string;
  @Input() disabled: boolean;
  @Output() evento = new EventEmitter();

  isDisabled = false;

  ngOnChanges(changes: SimpleChanges): void {

    if (changes.disabled) {
      this.isDisabled = changes.disabled.currentValue;
    }
  }

  dispararEvento(): void {
    this.evento.emit();
  }
}
