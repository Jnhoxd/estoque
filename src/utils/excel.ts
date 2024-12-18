import * as XLSX from 'xlsx';
import type { Product, MovimentoEstoque } from '../types/Product';

export const exportToExcel = (products: Product[], movements: MovimentoEstoque[]) => {
  // Prepare products data
  const productsData = products.map(product => ({
    'Nome do Produto': product.nome,
    'Quantidade': product.quantidade,
    'Data de Validade': product.dataValidade ? new Date(product.dataValidade).toLocaleDateString('pt-BR') : 'Sem validade',
    'Data de Entrada': new Date(product.dataEntrada).toLocaleDateString('pt-BR'),
    'Observações': product.observacoes || ''
  }));

  // Prepare movements data
  const movementsData = movements.map(movement => ({
    'Tipo': movement.tipo === 'entrada' ? 'Entrada' : 'Saída',
    'Quantidade': movement.quantidade,
    'Data': new Date(movement.data).toLocaleDateString('pt-BR'),
    'Destinatário': movement.destinatario || '-',
    'Observações': movement.observacoes || ''
  }));

  // Create workbook and worksheets
  const wb = XLSX.utils.book_new();
  
  const wsProducts = XLSX.utils.json_to_sheet(productsData);
  XLSX.utils.book_append_sheet(wb, wsProducts, 'Produtos');
  
  const wsMovements = XLSX.utils.json_to_sheet(movementsData);
  XLSX.utils.book_append_sheet(wb, wsMovements, 'Movimentações');

  // Generate Excel file
  XLSX.writeFile(wb, 'controle-estoque.xlsx');
};