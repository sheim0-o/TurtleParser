import React, { useState, useEffect, memo } from 'react';
import CSS from "./ModalAlert.module.css"

export type AlertType = 'error' | 'warning' | 'success' | 'info';

interface ModalAlertProps {
  type?: AlertType;
  message?: string;
  onClose?: () => void;
}

const iconMap: Record<AlertType, string> = {
  error: '🚨',
  warning: '⚠️',
  success: '✅',
  info: 'ℹ️',
};

export const ModalAlert = memo(({type = "info", message = "", onClose}: ModalAlertProps) => {
  return (
    <div className={CSS["modal-overlay"]}>
      <div className={`${CSS["modal-alert"]} ${CSS["modal-alert_"+type]}`}>
        <div className={CSS["modal-alert__content"]} onClick={onClose}>
          <span className={CSS["modal-alert__icon"]}>{iconMap[type]}</span>
          <span className={CSS["modal-alert__message"]}>{message}</span>
        </div>
      </div>
    </div>
  );
});