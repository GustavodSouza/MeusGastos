export class Pagamento {
  id: number;
  key: string;
  descricao: string;
  preco: number;
  dataPagamento: string;
  uidUser: string;
}

export type Pagamentos = Array<Pagamento>;
