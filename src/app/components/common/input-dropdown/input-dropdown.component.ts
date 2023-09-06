import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-input-dropdown',
    templateUrl: './input-dropdown.component.html',
    styleUrls: ['./input-dropdown.component.scss']
})
export class InputDropDownComponent {
    @Input() opcoes: Array<any>;
    @Input() tipo: string;
    @Input() dadoSelecionado: string;
    @Output() emitDados = new EventEmitter();

    constructor() {}

    change(valor: string): void {
        this.emitDados.emit(valor);
    }
}
