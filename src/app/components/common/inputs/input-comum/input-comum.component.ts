import { Component, EventEmitter, Input, Output } from '@angular/core';

enum tipos {
  PASSWORD = 'password',
  TEXT = 'text',
  NUMBER = 'number',
}

@Component({
  styleUrls: ['./input-comum.component.scss'],
  templateUrl: './input-comum.component.html',
  selector: 'app-input-comum',
})
export class InputComumComponent {
  @Input() placeholder = '';
  @Input() tipo = 'text'; // Text e Number
  @Input() iconeSenha = false;
  @Output() evento = new EventEmitter<string>();

  public esconderSenha = true;

  emitirDados(dados): void {
    this.evento.emit(dados.target.value);
  }

  controleOlhoSenha(): void {
    this.esconderSenha = !this.esconderSenha;

    this.tipo = this.esconderSenha ? tipos.PASSWORD : tipos.TEXT;
  }
}
