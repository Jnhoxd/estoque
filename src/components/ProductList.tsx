import React from 'react';
import { AlertTriangle, ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Product } from '../types/Product';

interface ProductListProps {
  products: Product[];
  onMovement: (productId: string, type: 'entrada' | 'saida', quantidade: number) => void;
}

export function ProductList({ products, onMovement }: ProductListProps) {
  const isExpired = (date: string) => new Date(date) < new Date();

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Produto
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Quantidade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Validade
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Ações
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {products.map((product) => (
            <tr key={product.id}>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">{product.nome}</div>
                {product.observacoes && (
                  <div className="text-sm text-gray-500">{product.observacoes}</div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {product.quantidade}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                {new Date(product.dataValidade).toLocaleDateString('pt-BR')}
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                {isExpired(product.dataValidade) ? (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                    <AlertTriangle className="h-4 w-4 mr-1" />
                    Vencido
                  </span>
                ) : (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Válido
                  </span>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <div className="flex space-x-2">
                  <button
                    onClick={() => onMovement(product.id, 'entrada', 1)}
                    className="text-green-600 hover:text-green-900"
                  >
                    <ArrowUpCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => onMovement(product.id, 'saida', 1)}
                    className="text-red-600 hover:text-red-900"
                    disabled={product.quantidade <= 0}
                  >
                    <ArrowDownCircle className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}