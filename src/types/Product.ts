export interface Product {
  id: string;
  nome: string;
  quantidade: number;
  dataValidade: string;
  observacoes?: string;
  dataEntrada: string;
}

export interface MovimentoEstoque {
  id: string;
  produtoId: string;
  tipo: 'entrada' | 'saida';
  quantidade: number;
  data: string;
  destinatario?: string;
  observacoes?: string;
  usuario: string;
}

export interface ProductMovement {
  productId: string;
  quantity: number;
  recipient: string;
}