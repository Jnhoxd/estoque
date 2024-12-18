import type { Product } from '../types/Product';

export const calculateNewQuantity = (
  currentQuantity: number,
  type: 'entrada' | 'saida',
  amount: number
) => {
  return type === 'entrada'
    ? currentQuantity + amount
    : Math.max(0, currentQuantity - amount);
};