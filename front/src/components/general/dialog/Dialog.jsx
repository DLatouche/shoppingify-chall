import React, { useEffect } from "react"
import { createPortal } from "react-dom"
import "./Dialog.scss"
import CloseIcon from "@material-ui/icons/Close"
import BigButton from "../bigButton/BigButton"
const modalRoot = document.getElementById("modal-root")
const Dialog = ({ variant, className, onCancel, onValid, text, open, oneChoice, children }) => {
  let el = document.createElement("div")

  useEffect(() => {
    //Didmount
    modalRoot.appendChild(el)
    return () => {
      //willUnmount
      modalRoot.removeChild(el)
    }
  }, [])
  if (oneChoice) {
    return createPortal(
      <div
        className={
          open
            ? "dialog dialog--opened dialog--" + variant + " " + className
            : "dialog  dialog--" + variant + " " + className
        }
      >
        <div className="dialog__container">
          <div className="dialog__container__icon">
            <CloseIcon onClick={onCancel} className="dialog__container__icon__close" />
          </div>
          {children}
          <div className="dialog__container__actions dialog__container__actions--centered">
            <BigButton className="dialog__container__actions__button" onClick={onValid} variant="blue">
              Continue
            </BigButton>
          </div>
        </div>
      </div>,
      modalRoot
    )
  } else {
    return createPortal(
      <div
        className={
          open
            ? "dialog dialog--opened dialog--" + variant + " " + className
            : "dialog  dialog--" + variant + " " + className
        }
      >
        <div className="dialog__container">
          <div className="dialog__container__icon">
            <CloseIcon onClick={onCancel} className="dialog__container__icon__close" />
          </div>
          <p className="dialog__container__text">{text}</p>
          <div className="dialog__container__actions">
            <BigButton className="dialog__container__actions__button" onClick={onCancel} variant="transparent">
              Cancel
            </BigButton>
            <BigButton className="dialog__container__actions__button" onClick={onValid} variant="red">
              Continue
            </BigButton>
          </div>
        </div>
      </div>,
      modalRoot
    )
  }
}

export default Dialog
