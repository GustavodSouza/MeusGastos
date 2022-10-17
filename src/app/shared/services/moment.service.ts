import { Injectable } from '@angular/core';
import * as moment from 'moment';

interface IData {
  dia: string;
  mes: string;
  ano: string;
}
@Injectable({
  providedIn: 'root'
})
export class MomentService {

  constructor() { }

  public dateFormatBR(date: Date): string {
    return moment.utc(date).format('DD/MM/YYYY');
  }

  public obterDataQuebrada(data: string | Date): IData {
    return typeof data === 'string' ? {
      dia: data.split('/')[0],
      mes: data.split('/')[1],
      ano: data.split('/')[2],
    } : {
      dia: this.dateFormatBR(data).split('/')[0],
      mes: this.dateFormatBR(data).split('/')[1],
      ano: this.dateFormatBR(data).split('/')[2],
    };
  }

  public obterMesPorExtenso(data: Date): string {
    moment.locale('pt-br');

    const momentInstancia: moment.Moment = moment.utc(data);

    return momentInstancia.format('MMMM');
  }
}
