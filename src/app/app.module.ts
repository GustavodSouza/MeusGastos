import { RouteGuardService } from './guard/route-guard.service';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LOCALE_ID, NgModule } from '@angular/core';
import localePt from '@angular/common/locales/pt';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { ToolbarComponent } from './templates/toolbar/toolbar.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { registerLocaleData } from '@angular/common';
import { MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from './shared/material-angular/material-angular.module';
import { EntrarComponent } from './paginas/login/entrar/entrar.component';
import { ConfirmarDialogComponent } from './paginas/pagamento/dialog/confirmar/confirmar.component';
import { MenuComponent } from './shared/components/menu/menu.component';
import { ServiceWorkerModule } from '@angular/service-worker';

registerLocaleData(localePt);
@NgModule({
  declarations: [
    AppComponent,
    ToolbarComponent,
    EntrarComponent,
    ConfirmarDialogComponent,
    MenuComponent,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    HttpClientModule,
    AngularFireModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      registrationStrategy: 'registerWhenStable:30000'
    }),
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
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
