import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { faCalendarAlt, faDollarSign } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnChanges{
  @Input() tituloCard: string;
  @Input() icone: string;

  iconeSelecionado: any;

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.icone) {
      switch (this.icone) {
        case 'valor':
          this.iconeSelecionado = faDollarSign;
          break;
        case 'calendario':
          this.iconeSelecionado = faCalendarAlt;
      }
    }
  }
}
