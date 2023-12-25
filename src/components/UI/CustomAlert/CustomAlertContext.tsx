import React, { ReactNode, createContext, memo, useContext, useRef } from 'react';
import { AlertType } from './ModalAlert/ModalAlert';
import { ModalAlertManager } from './ModalAlertManager';

interface CustomAlertContextType {
  showCustomAlert: (type: AlertType, message: string, duration?: number) => void;
}

const CustomAlertContext = createContext<CustomAlertContextType | undefined>(undefined);
type CustomAlertProviderProps = { children: ReactNode; }

export const CustomAlertProvider = memo(({ children }: CustomAlertProviderProps ) => {
  const showAlertRef = useRef<CustomAlertContextType | null>(null);

  const showCustomAlert = (type: AlertType, message: string, duration?: number) => {
    if (showAlertRef.current) {
      showAlertRef.current.showCustomAlert(type, message, duration);
    }
  };

  return (
    <CustomAlertContext.Provider value={{ showCustomAlert }}>
      <ModalAlertManager ref={showAlertRef} />
      {children}
    </CustomAlertContext.Provider>
  );
});

export const useCustomAlert = () => {
  const context = useContext(CustomAlertContext);
  if (!context) {
    throw new Error('useCustomAlert must be used within a CustomAlertProvider');
  }
  return context;
};
