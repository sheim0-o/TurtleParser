import React from 'react'
import CSS from "./InfoButton.module.css"

type InfoButtonProps = {
    onClick: ()=>void
}

export default function InfoButton({onClick}: InfoButtonProps) {
  return (
    <button className={CSS["info-button"]} onClick={onClick}>
      <span className={CSS["info-button__icon"]}>i</span>
    </button>
  )
}