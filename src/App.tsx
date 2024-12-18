import React, { useState } from 'react';
import { FileDown, History } from 'lucide-react';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { AuthForms } from './components/auth/AuthForms';
import { ProductForm } from './components/product/ProductForm';
import { ProductList } from './components/product/ProductList';
import { ProductOutputModal } from './components/product/ProductOutputModal';
import { MovementHistory } from './components/movement/MovementHistory';
import { Button } from './components/ui/Button';
import type { Product, MovimentoEstoque, ProductMovement } from './types/Product';
import { calculateNewQuantity } from './utils/product';
import { exportToExcel } from './utils/excel';

function App() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [movements, setMovements] = useState<MovimentoEstoque[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isOutputModalOpen, setIsOutputModalOpen] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    if (!user) return;

    const product = {
      ...newProduct,
      id: crypto.randomUUID()
    };
    
    setProducts(prev => [...prev, product]);
    setMovements(prev => [...prev, {
      id: crypto.randomUUID(),
      produtoId: product.id,
      tipo: 'entrada',
      quantidade: product.quantidade,
      data: new Date().toISOString(),
      observacoes: product.observacoes,
      usuario: user.name
    }]);
  };

  const handleMovement = (productId: string, type: 'entrada' | 'saida', quantidade: number) => {
    if (!user) return;

    if (type === 'saida') {
      const product = products.find(p => p.id === productId);
      if (product) {
        setSelectedProduct(product);
        setIsOutputModalOpen(true);
      }
      return;
    }

    updateProductQuantity(productId, type, quantidade);
    addMovementRecord(productId, type, quantidade);
  };

  const handleOutputConfirm = (movement: ProductMovement) => {
    updateProductQuantity(movement.productId, 'saida', movement.quantity);
    addMovementRecord(movement.productId, 'saida', movement.quantity, movement.recipient);
  };

  const updateProductQuantity = (productId: string, type: 'entrada' | 'saida', quantidade: number) => {
    setProducts(prev => prev.map(product => {
      if (product.id === productId) {
        return {
          ...product,
          quantidade: calculateNewQuantity(product.quantidade, type, quantidade)
        };
      }
      return product;
    }));
  };

  const addMovementRecord = (
    productId: string, 
    type: 'entrada' | 'saida', 
    quantidade: number,
    destinatario?: string
  ) => {
    if (!user) return;

    setMovements(prev => [...prev, {
      id: crypto.randomUUID(),
      produtoId: productId,
      tipo: type,
      quantidade,
      data: new Date().toISOString(),
      destinatario,
      usuario: user.name
    }]);
  };

  const handleExportToExcel = () => {
    exportToExcel(products, movements);
  };

  const productNames = products.reduce((acc, product) => ({
    ...acc,
    [product.id]: product.nome
  }), {} as Record<string, string>);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto py-6 px-4">
          <AuthForms />
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      
      <main className="container mx-auto py-6 px-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-1">
            <ProductForm onSubmit={handleAddProduct} />
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Produtos em Estoque</h2>
              <div className="flex gap-2">
                <Button
                  onClick={() => setShowHistory(!showHistory)}
                  icon={History}
                >
                  {showHistory ? 'Ver Produtos' : 'Ver Movimentações'}
                </Button>
                <Button
                  onClick={handleExportToExcel}
                  icon={FileDown}
                >
                  Exportar Excel
                </Button>
              </div>
            </div>
            
            {showHistory ? (
              <MovementHistory 
                movements={movements} 
                products={productNames}
              />
            ) : (
              <ProductList 
                products={products} 
                onMovement={handleMovement}
              />
            )}
          </div>
        </div>
      </main>

      {selectedProduct && (
        <ProductOutputModal
          isOpen={isOutputModalOpen}
          onClose={() => {
            setIsOutputModalOpen(false);
            setSelectedProduct(null);
          }}
          product={selectedProduct}
          onConfirm={handleOutputConfirm}
        />
      )}
    </div>
  );
}

export default App;