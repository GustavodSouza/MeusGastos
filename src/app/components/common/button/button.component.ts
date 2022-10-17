import { Component, EventEmitter, Input, Output } from "@angular/core";

enum tipos {
  SUCESSO = 'sucesso',
  INFORMACAO = 'informacao',
  ERRO = 'erro'
}

@Component({
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  selector: 'app-button',
})
export class ButtonComponent {
  @Input() nome: string;
  @Input() loader: boolean;
  @Input() tipo: string; // Excluir, Cancelar (Vermelho), Confirmar, Concluir, etc (Verde)
  @Output() evento = new EventEmitter;

  dispararEvento(): void {
    this.evento.emit();
  }
}