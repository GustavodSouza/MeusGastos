import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { PerfilService } from 'src/app/utils/perfil.service';
import { SnackbarService } from 'src/app/components/common/snackbar/snackbar.service';
import { Pagamentos, Pagamento } from '../interface/pagamento.interface';
import { Meses } from '../interface/mes.interface';
import { MomentService } from 'src/app/utils/moment.service';
@Injectable({
  providedIn: 'root'
})
export class PagamentoService {

  _CHAVE = this.perfilService.getPerfil().user.uid + this.perfilService.getPerfil().user.email.slice(0, 3);
  URL = `pagamentos/${this._CHAVE}`;

  constructor(
    private db: AngularFireDatabase,
    private perfilService: PerfilService,
    private snackBarService: SnackbarService,
    private momentService: MomentService,
  ) { }

  public adicionarNovoPagamento(pagamento: Pagamento): void {
    const { ano, mes } = this.momentService.obterDataQuebrada(pagamento.dataPagamento);

    this.db.list(`${this.URL}/${ano}/${mes}`)
      .push(pagamento).then(() => this.snackBarService.showSnackbar('Pagamento cadastrado com sucesso!'))
      .catch((error) => {
        console.error('Erro: ', error);
        this.snackBarService.showSnackbar('Erro ao cadastrar o pagamento!');
      });
  }

  public buscarTodosPagamentos(): any {
    const { ano, mes } = this.momentService.obterDataQuebrada(new Date());

    return this.db.list(`${this.URL}/${ano}/${mes}`)
      .snapshotChanges()
      .pipe(
        map(changes => changes.map((c) => ({
          key: c.payload.key,
          ...c.payload.val() as Pagamentos
        })
        ))
      );
  }

  public deletarPagamento(key: string, pagamento: Pagamento): void {
    const { ano, mes} = this.momentService.obterDataQuebrada(pagamento.dataPagamento);

    this.db.object(`${this.URL}/${ano}/${mes}/${key}`).remove().then(() => {
      this.snackBarService.showSnackbar('Item removido com sucesso!');
    }).catch((error) => {
      console.error('Erro', error);
      this.snackBarService.showSnackbar('Erro ao remover o item!');
    });
  }

  public buscarPagamentoPorId(dataDoItem: string, key: string): any {
    const { mes, ano } = this.momentService.obterDataQuebrada(dataDoItem);

    return this.db.object(`${this.URL}/${ano}/${mes}/${key}`).valueChanges();
  }

  public filtrarMesAno(mes: string, ano: string): any {
    return this.db.list(`${this.URL}/${ano}/${mes}`)
      .snapshotChanges()
      .pipe(
        map(changes => changes.map(c =>
        ({
          key: c.payload.key,
          ...c.payload.val() as {}
        })
        ))
      );
  }

  public atualizarPagamento(key: string, pagamento: Pagamento) {
    const { ano, mes } = this.momentService.obterDataQuebrada(pagamento.dataPagamento);

    this.db.list(`${this.URL}/${ano}/${mes}`).update(key, pagamento).then(() => {
      this.snackBarService.showSnackbar('Pagamento atualizado com sucesso!');
    }).catch((error) => {
      console.error('Erro', error);
      this.snackBarService.showSnackbar('Erro ao atualizar o pagamento!');
    });
  }

  public obterMeses(): Meses {
    return [
      { nome: 'Janeiro', valor: '01' },
      { nome: 'Fevereiro', valor: '02' },
      { nome: 'Março', valor: '03' },
      { nome: 'Abril', valor: '04' },
      { nome: 'Maio', valor: '05' },
      { nome: 'Junho', valor: '06' },
      { nome: 'Julho', valor: '07' },
      { nome: 'Agosto', valor: '08' },
      { nome: 'Setembro', valor: '09' },
      { nome: 'Outubro', valor: '10' },
      { nome: 'Novembro', valor: '11' },
      { nome: 'Dezembro', valor: '12' }
    ];
  }
  public obterAno() {
    return [
      { nome: '2020' },
      { nome: '2021' },
      { nome: '2022' },
      { nome: '2023' },
      { nome: '2024' },
      { nome: '2025' },
      { nome: '2026' },
      { nome: '2027' },
      { nome: '2028' },
      { nome: '2029' },
      { nome: '2030' },
      { nome: '2031' }
    ];
  }
}
