import React, { useState } from 'react'
import CSS from "./InfoModal.module.css"
import TextWithParagraphs from '../TextWithParagraphs/TextWithParagraphs';

type InfoModalProps = {
    modalTitle:string;
    description:string;
    isOpen: boolean;
    onClose: () => void;
}

export default function InfoModal({modalTitle, description, isOpen, onClose}: InfoModalProps) {  
    if (!isOpen) {
      return null;
    }
  
    return (
      <div className={CSS["info-modal"]}>
        <div className={CSS["info-modal__overlay"]}>
            <div className={CSS["info-modal__content"]}>
            <div className={CSS["info-modal__header"]}>
                <h2>{modalTitle}</h2>
                <button className={CSS["info-modal__close-button"]} onClick={onClose}>
                &times;
                </button>
            </div>
            <div className={CSS["info-modal__body"]}>
                <TextWithParagraphs text={description} />
            </div>
            </div>
        </div>
      </div>
    );
}