import React from 'react';
import { Boxes, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from './ui/Button';

export function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="bg-blue-600 text-white p-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Boxes size={32} />
          <h1 className="text-2xl font-bold">Controle de Estoque SENAC</h1>
        </div>
        {user && (
          <div className="flex items-center gap-4">
            <span className="text-sm">
              {user.name}
            </span>
            <Button onClick={logout} variant="danger" icon={LogOut}>
              Sair
            </Button>
          </div>
        )}
      </div>
    </header>
  );
}