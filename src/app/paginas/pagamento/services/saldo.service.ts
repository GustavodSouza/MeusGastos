import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { map } from 'rxjs/operators';
import { SnackbarService } from 'src/app/components/common/snackbar/snackbar.service';
import { MomentService } from 'src/app/utils/moment.service';
import { PerfilService } from 'src/app/utils/perfil.service';
import { Saldo } from '../interface/saldo.interface';

@Injectable({
  providedIn: 'root',
})
export class SaldoService {

  constructor(
    private dataBase: AngularFireDatabase,
    private perfilService: PerfilService,
    private momentService: MomentService,
    private snackBarService: SnackbarService,
  ) { }

  public buscarSaldoDoMes(): any {
    const _CHAVE = this.perfilService.getPerfil().user.uid + this.perfilService.getPerfil().user.email.slice(0, 3);
    const anoAtual = this.momentService.obterDataQuebrada(new Date()).ano;
    const mesAtual = this.momentService.obterDataQuebrada(new Date()).mes;

    return this.dataBase.list(`saldo/${_CHAVE}/${anoAtual}/${mesAtual}`)
      .snapshotChanges()
      .pipe(
        map(changes => {
          return changes.map(c =>
          ({
            key: c.payload.key,
            ...c.payload.val() as {}
          })
          );
        })
      );
  }

  public criarSaldoDoMes(): void {
    const _CHAVE = this.perfilService.getPerfil().user.uid + this.perfilService.getPerfil().user.email.slice(0, 3);
    const anoAtual = this.momentService.obterDataQuebrada(new Date()).ano;
    const mesAtual = this.momentService.obterDataQuebrada(new Date()).mes;

    this.dataBase.list(`saldo/${_CHAVE}/${anoAtual}/${mesAtual}`).push(
      {
        uidUser: this.perfilService.getPerfil().user.uid,
        saldo: '',
        data: this.momentService.dateFormatBR(new Date())
      }).then().catch((error) => {
        console.error('Erro: ', error);
        this.snackBarService.showSnackbar('Ocorreu um erro ao criar o saldo!');
      });
  }

  public atualizarSaldoDoMes(key: string, novoSaldo: Saldo): void {
    const _CHAVE = this.perfilService.getPerfil().user.uid + this.perfilService.getPerfil().user.email.slice(0, 3);
    const anoAtual = this.momentService.obterDataQuebrada(new Date()).ano;
    const mesAtual = this.momentService.obterDataQuebrada(new Date()).mes;

    this.dataBase.list(`saldo/${_CHAVE}/${anoAtual}/${mesAtual}`).update(key, novoSaldo).then().catch((error) => {
      console.error('Ocorreu um erro ao atualizar o saldo do mês!', error);
      this.snackBarService.showSnackbar('Ocorreu um erro ao atualizar o saldo!');
    });
  }

  public buscarSaldoDoMesPorId(key: string): any {
    const _CHAVE = this.perfilService.getPerfil().user.uid + this.perfilService.getPerfil().user.email.slice(0, 3);
    const anoAtual = this.momentService.obterDataQuebrada(new Date()).ano;
    const mesAtual = this.momentService.obterDataQuebrada(new Date()).mes;

    return this.dataBase.object(`saldo/${_CHAVE}/${anoAtual}/${mesAtual}/${key}`).valueChanges();
  }

  public deletarSaldoDoMes(key: string): void {
    const _CHAVE = this.perfilService.getPerfil().user.uid + this.perfilService.getPerfil().user.email.slice(0, 3);
    const anoAtual = this.momentService.obterDataQuebrada(new Date()).ano;
    const mesAtual = this.momentService.obterDataQuebrada(new Date()).mes;

    this.dataBase.object(`saldo/${_CHAVE}/${anoAtual}/${mesAtual}/${key}`).remove().then(() => {
      this.snackBarService.showSnackbar('Saldo removido com sucesso!');
    }).catch((error) => {
      console.error('Erro', error);
      this.snackBarService.showSnackbar('Erro ao remover o saldo!');
    });
  }
}
