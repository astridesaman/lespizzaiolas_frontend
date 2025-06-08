import { toast } from 'react-hot-toast';

type ToastType = 'success' | 'error' | 'loading';

interface ToastOptions {
  type?: ToastType;
  action?: 'ajouté' | 'supprimé' | 'mis à jour' | string;
  entity?: string; // ex: "pizza", "commande", "client"
  emoji?: string;
  duration?: number;
}

export function showToast({
  type = 'success',
  action = 'effectué',
  entity = '',
  emoji = '✅',
  duration = 3000,
}: ToastOptions) {
  const message = `${emoji} ${entity ? entity + ' ' : ''}${action} avec succès !`;

  toast[type](message, {
    duration,
    style: {
      background: '#1a1a1a',
      color: '#fff',
      border: '1px solid orange',
      fontSize: '14px',
    },
  });
}
