import { Component, OnInit } from '@angular/core';
import { ToolbarService } from './paginas/toolbar/service/toolbar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(
    private toolbarService: ToolbarService,
  ) { }

  public ngOnInit(): void {
    this.capturarTamanhoTela();
  }

  capturarTamanhoTela(): void {
    this.toolbarService.mobile = window.innerWidth <= 768;
  }
}
