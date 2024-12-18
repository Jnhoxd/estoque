import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Product } from '../../types/Product';
import { ProductFormFields } from './ProductFormFields';
import { Button } from '../ui/Button';

interface ProductFormProps {
  onSubmit: (product: Omit<Product, 'id'>) => void;
}

export function ProductForm({ onSubmit }: ProductFormProps) {
  const [formData, setFormData] = useState({
    nome: '',
    quantidade: 0,
    dataValidade: '',
    observacoes: ''
  });

  const handleChange = (field: string, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      dataEntrada: new Date().toISOString()
    });
    setFormData({ nome: '', quantidade: 0, dataValidade: '', observacoes: '' });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">Adicionar Novo Produto</h2>
      
      <ProductFormFields 
        formData={formData}
        onChange={handleChange}
      />

      <Button type="submit" icon={Plus}>
        Adicionar Produto
      </Button>
    </form>
  );
}