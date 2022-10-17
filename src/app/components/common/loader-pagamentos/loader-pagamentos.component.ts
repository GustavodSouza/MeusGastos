import { Component, OnInit } from '@angular/core';
import { LoaderPagamentosService } from './loader-pagamentos.service';

@Component({
  selector: 'app-loader-pagamentos',
  templateUrl: './loader-pagamentos.component.html',
  styleUrls: ['./loader-pagamentos.component.scss']
})
export class LoaderPagamentosComponent implements OnInit {

  constructor(
    public loaderPagamentosService: LoaderPagamentosService,
  ) { }

  ngOnInit(): void {
  }

}
