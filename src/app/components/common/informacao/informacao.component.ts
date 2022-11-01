import { Component, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-informacao',
  templateUrl: './informacao.component.html',
  styleUrls: ['./informacao.component.scss']
})
export class InformacaoComponent {
  diaAtual = new Date();
  @Input() dinheiroTotal = new EventEmitter();
}
