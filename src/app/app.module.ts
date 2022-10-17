import { RouteGuardService } from './guard/route-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './templates/toolbar/toolbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { registerLocaleData } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MatPaginatorIntlCro } from './config/table-config';
import { SnackbarComponent } from './shared/components/snackbar/snackbar.component';
import { TitleComponent } from './components/common/title/title.component';
import { MaterialModule } from './shared/material-angular/material-angular.module';
import { PaginaInicialComponent } from './paginas/pagina-inicial/pagina-inicial.component';
import { EntrarComponent } from './paginas/login/entrar/entrar.component';
import { AtualizacaoComponent } from './paginas/atualizacao/atualizacao.component';
import { PaginaInicialModule } from './paginas/pagina-inicial/pagina-inicial.module';
import { PagamentoComponent } from './paginas/pagamento/pagamento.component';
import { ConfirmarDialogComponent } from './paginas/pagamento/dialog/confirmar/confirmar.component';
import { EditarDialogComponent } from './paginas/pagamento/dialog/editar-pagamento/editar-pagamento.component';
import { AdicionarSaldoDialogComponent } from './paginas/pagamento/dialog/adicionar-saldo/adicionar-saldo.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { LoaderPagamentosComponent } from './components/common/loader-pagamentos/loader-pagamentos.component';
import { MatSortModule } from '@angular/material/sort';
import { ButtonComponent } from './components/common/button/button.component';
import { InputComumComponent } from './components/common/inputs/input-comum/input-comum.component';
import { MatIconModule } from '@angular/material/icon';
import { TabelaComponent } from './components/common/tabela/tabela.component';
import { MenuComponent } from './shared/components/menu/menu.component';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    PaginaInicialComponent,
    ToolbarComponent,
    PagamentoComponent,
    EntrarComponent,
    SnackbarComponent,
    TitleComponent,
    AtualizacaoComponent,
    ConfirmarDialogComponent,
    EditarDialogComponent,
    AdicionarSaldoDialogComponent,
    LoaderPagamentosComponent,
    ButtonComponent,
    InputComumComponent,
    TabelaComponent,
    MenuComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    MatSortModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    PaginaInicialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  providers: [
    HttpClient,
    RouteGuardService,
    {
      provide: LOCALE_ID, useValue: 'pt-BR',
    },
    {
      provide: MatDialogRef,
      useValue: [],
    },
    {
      provide: MatPaginatorIntl,
      useClass: MatPaginatorIntlCro,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
