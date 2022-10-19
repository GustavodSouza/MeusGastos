import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagina-inicial',
  templateUrl: './pagina-inicial.component.html',
  styleUrls: ['./pagina-inicial.component.css']
})
export class PaginaInicialComponent implements OnInit {

  public nome: string = '';
  public retorno: any;

  public request = indexedDB.open("MeuBanco", 1);

  constructor() { }

  ngOnInit(): void {
    this.criarBanco();
    this.buscarDados();
  }

  public criarBanco(): void {
    this.request.onupgradeneeded = function (event: any) {
      const db = event.target.result;
      db.createObjectStore("store1", { autoIncrement: true });
    }
  }

  public incluirDados(): void {
    const dados = {
      nome: this.nome,
    };

    const request = indexedDB.open("MeuBanco", 1);

    request.onsuccess = function (event: any) {

      const db = event.target.result;
      var transaction = db.transaction(["store1"], "readwrite");
      var objectStore = transaction.objectStore("store1");
      objectStore.add(dados);
    };
    this.nome = '';
    this.buscarDados();
  }

  public buscarDados(): any {

    const request = indexedDB.open("MeuBanco", 1);

    let dados = [];

    request.onsuccess = function (event: any) {

      const db = event.target.result;
      let transaction = db.transaction(["store1"], "readonly");
      let store = transaction.objectStore('store1');

      let cursor = store.openCursor();

      cursor.onsuccess = e => {

        let atual = e.target.result;

        if (atual) {
          dados.push({
            id: atual.key,
            nome: atual.value.nome,
          });
          atual.continue();

        }
      }
    }

    this.retorno = dados;
  }

  public excluirDados(id: any): void {
    const request = indexedDB.open("MeuBanco", 1);

    request.onsuccess = function (event: any) {

      const db = event.target.result;
      let transaction = db.transaction(["store1"], "readwrite");
      let store = transaction.objectStore('store1');

      store.delete(id);
    }

    this.buscarDados();

  }

}
