import React from 'react';
import { ArrowDownCircle, ArrowUpCircle } from 'lucide-react';
import type { Product } from '../../types/Product';
import { Badge } from '../ui/Badge';
import { Button } from '../ui/Button';
import { formatDate, isExpired } from '../../utils/dates';

interface ProductListItemProps {
  product: Product;
  onMovement: (productId: string, type: 'entrada' | 'saida', quantidade: number) => void;
}

export function ProductListItem({ product, onMovement }: ProductListItemProps) {
  return (
    <tr>
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
        {product.dataValidade ? formatDate(product.dataValidade) : '-'}
      </td>
      <td className="px-6 py-4 whitespace-nowrap">
        {product.dataValidade ? (
          <Badge 
            variant={isExpired(product.dataValidade) ? 'warning' : 'success'}
            showIcon={isExpired(product.dataValidade)}
          >
            {isExpired(product.dataValidade) ? 'Vencido' : 'Válido'}
          </Badge>
        ) : (
          <Badge variant="success">
            Sem validade
          </Badge>
        )}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
        <div className="flex space-x-2">
          <Button
            variant="success"
            icon={ArrowUpCircle}
            onClick={() => onMovement(product.id, 'entrada', 1)}
          />
          <Button
            variant="danger"
            icon={ArrowDownCircle}
            onClick={() => onMovement(product.id, 'saida', 1)}
            disabled={product.quantidade <= 0}
          />
        </div>
      </td>
    </tr>
  );
}