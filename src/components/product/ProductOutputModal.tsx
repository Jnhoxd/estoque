import React, { useState } from 'react';
import { Modal } from '../ui/Modal';
import { Button } from '../ui/Button';
import type { Product, ProductMovement } from '../../types/Product';

interface ProductOutputModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  onConfirm: (movement: ProductMovement) => void;
}

export function ProductOutputModal({ 
  isOpen, 
  onClose, 
  product, 
  onConfirm 
}: ProductOutputModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [recipient, setRecipient] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm({
      productId: product.id,
      quantity,
      recipient
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Saída de Produto"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Produto
          </label>
          <input
            type="text"
            value={product.nome}
            disabled
            className="mt-1 block w-full rounded-md border-gray-300 bg-gray-50 shadow-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantidade
          </label>
          <input
            type="number"
            required
            min="1"
            max={product.quantidade}
            value={quantity}
            onChange={(e) => setQuantity(Math.min(parseInt(e.target.value), product.quantidade))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Destinatário
          </label>
          <input
            type="text"
            required
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button
            type="button"
            onClick={onClose}
            className="bg-gray-100 text-gray-700 hover:bg-gray-200"
          >
            Cancelar
          </Button>
          <Button type="submit">
            Confirmar Saída
          </Button>
        </div>
      </form>
    </Modal>
  );
}