import React from 'react';
import type { Product } from '../../types/Product';

interface ProductFormFieldsProps {
  formData: Omit<Product, 'id' | 'dataEntrada'>;
  onChange: (field: string, value: string | number) => void;
}

export function ProductFormFields({ formData, onChange }: ProductFormFieldsProps) {
  return (
    <>
      <div>
        <label className="block text-sm font-medium text-gray-700">Nome do Produto</label>
        <input
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.nome}
          onChange={(e) => onChange('nome', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Quantidade</label>
        <input
          type="number"
          required
          min="0"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.quantidade}
          onChange={(e) => onChange('quantidade', parseInt(e.target.value))}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Data de Validade (opcional)</label>
        <input
          type="date"
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.dataValidade}
          onChange={(e) => onChange('dataValidade', e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Observações</label>
        <textarea
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.observacoes}
          onChange={(e) => onChange('observacoes', e.target.value)}
        />
      </div>
    </>
  );
}