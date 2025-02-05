import { useState } from 'react';

interface AlertState {
  show: boolean;
  text: string;
  type: 'success' | 'danger' | 'info' | 'warning';
}

interface ShowAlertOptions {
  text: string;
  type?: 'success' | 'danger' | 'info' | 'warning';
}

const useAlert = () => {
  const [alert, setAlert] = useState<AlertState>({ show: false, text: '', type: 'danger' });

  const showAlert = ({ text, type = 'danger' }: ShowAlertOptions) => 
    setAlert({ show: true, text, type });

  const hideAlert = () => 
    setAlert({ show: false, text: '', type: 'danger' });

  return { alert, showAlert, hideAlert };
};

export default useAlert;
