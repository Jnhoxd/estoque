import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';

export function AuthForms() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <div className="max-w-md w-full mx-auto">
      {showLogin ? (
        <LoginForm onShowRegister={() => setShowLogin(false)} />
      ) : (
        <RegisterForm onShowLogin={() => setShowLogin(true)} />
      )}
    </div>
  );
}