import React from 'react';
import type { Product } from '../../types/Product';
import { ProductListItem } from './ProductListItem';

interface ProductListProps {
  products: Product[];
  onMovement: (productId: string, type: 'entrada' | 'saida', quantidade: number) => void;
}

export function ProductList({ products, onMovement }: ProductListProps) {
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
            <ProductListItem
              key={product.id}
              product={product}
              onMovement={onMovement}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
}