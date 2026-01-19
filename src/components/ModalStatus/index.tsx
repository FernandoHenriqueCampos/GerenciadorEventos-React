import { useState, useEffect } from 'react';
import { AlertContainer, IconImage, AlertText, CloseBtn } from './style';
import ReactDOM from "react-dom";

import iconCheck from '../../assets/icons/done.png';
import iconError from '../../assets/icons/alert.png';
import iconInfo from '../../assets/icons/info.png';
import iconWarn from '../../assets/icons/warning.png';

export type AlertVariant = 'success' | 'error' | 'warning' | 'info';

interface AlertCardProps {
  variant: AlertVariant; 
  text: string;         
  onClose?: () => void;
}

const ALERT_CONFIG = {
  success: {
    bgColor: '#E8F5E9',      
    icon: iconCheck
  },
  error: {
    bgColor: '#FFEBEE',       
    icon: iconError
  },
  warning: {
    bgColor: '#FFF8E1',       
    icon: iconWarn
  },
  info: {
    bgColor: '#E1F5FE',      
    icon: iconInfo
  }
};

export const AlertCard = ({ variant, text, onClose }: AlertCardProps) => {
  const [visible, setVisible] = useState(true);

  const { bgColor, icon } = ALERT_CONFIG[variant];

  const handleManualClose = () => {
    setVisible(false);
    if (onClose) onClose();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      if (onClose) onClose();
    }, 2000); 
    
    return () => clearTimeout(timer);
  }, [text, onClose]);

  if (!visible) return null;

  const alertContent = (
    <AlertContainer $bgColor={bgColor}>
      <CloseBtn onClick={handleManualClose} title="Fechar">&times;</CloseBtn>
      <IconImage src={icon} alt={`Ícone de ${variant}`} />
      <AlertText>{text}</AlertText>
    </AlertContainer>
  );
  
  return ReactDOM.createPortal(
    alertContent,
    document.getElementById("alert-root") || document.body
  );
};