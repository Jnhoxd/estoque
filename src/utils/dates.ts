export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pt-BR');
};

export const isExpired = (date?: string) => {
  if (!date) return false;
  return new Date(date) < new Date();
};