import React, { useState, useRef, forwardRef, useImperativeHandle, useEffect } from 'react';
import { ModalAlert,  AlertType } from './ModalAlert/ModalAlert';
import ReactDOM from 'react-dom';

interface AlertData {
  type: AlertType;
  message: string;
  duration?: number;
}

interface ModalAlertManagerProps {}

export interface ModalAlertManagerRef {
  showCustomAlert: (type: AlertType, message: string, duration?: number) => void;
}
export const ModalAlertManager = forwardRef(({}: ModalAlertManagerProps, ref) => {
  const [alertQueue, setAlertQueue] = useState<AlertData[]>([]);
  const [displayedAlert, setDisplayedAlert] = useState<AlertData | null>(null);
  const timerIdRef = useRef<NodeJS.Timeout | null>(null);

  let portal: HTMLElement = document.getElementById("portal") || document.body;

  const showAlert = (type: AlertType, message: string, duration: number = 3000) => {
    const newAlert = { type, message, duration };
    const newAlertQueue = [...alertQueue, newAlert];
    setAlertQueue(newAlertQueue);

    if (!displayedAlert) {
      showNextAlert();
    }
  };

  const closeModal = (curAlertQueue: AlertData[]) => {
    setDisplayedAlert(null);
    const newAlertQueue = curAlertQueue.slice(1);
    setAlertQueue((prevQueue) => prevQueue.slice(1));
    if(newAlertQueue.length > 0)
      showNextAlert(newAlertQueue, null);
  }

  const showNextAlert = (currentAlertQueue?: AlertData[]|null, currentDisplayedAlert?: AlertData|null) => {
    const curAlertQueue = currentAlertQueue ? currentAlertQueue : alertQueue;
    const curDisplayedAlert = currentDisplayedAlert ? currentDisplayedAlert : displayedAlert;

    if (curAlertQueue.length > 0) {
      const nextAlert = curAlertQueue[0];

      if (!curDisplayedAlert) {
        timerIdRef.current = setTimeout(() => {
          closeModal(curAlertQueue);
        }, nextAlert.duration);
        setDisplayedAlert(nextAlert);
      }
    }
  };

  useImperativeHandle(ref, () => ({
    showCustomAlert: showAlert,
  }));

  const handleForceRemoveAlert = () => {
    if (timerIdRef.current) {
      clearTimeout(timerIdRef.current);
      timerIdRef.current = null;
    }
    
    closeModal(alertQueue);
  };


  useEffect(() => {
    showNextAlert();
  }, [alertQueue]);

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    top: 0,
    left: 0,
    height: "100vh",
    width: "100%",
    opacity: displayedAlert ? 1 : 0,
    transform: displayedAlert ? 'translateY(0%)' : 'translateY(-100%)',
    transition: "opacity 0.5s, transform 0.5s"
  };

  return ReactDOM.createPortal(
    <div className="modal-alert-manager">
        <div style={overlayStyle}>
            <ModalAlert
                type={displayedAlert?.type}
                message={displayedAlert?.message}
                onClose={handleForceRemoveAlert}
            />
        </div>
    </div>
  , portal );
});