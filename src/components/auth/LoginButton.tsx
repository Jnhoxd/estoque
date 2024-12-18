import React from 'react';
import { LogIn } from 'lucide-react';
import { Button } from '../ui/Button';
import { useAuth } from '../../contexts/AuthContext';

export function LoginButton() {
  const { user, login, logout } = useAuth();

  if (!user) {
    return (
      <Button onClick={login} icon={LogIn}>
        Entrar com Outlook
      </Button>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <span className="text-sm text-white">
        {user.username}
      </span>
      <Button onClick={logout} variant="danger">
        Sair
      </Button>
    </div>
  );
}