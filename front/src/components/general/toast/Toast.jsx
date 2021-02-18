import React from "react"
import { Snackbar } from "@material-ui/core"
import Icon from "@material-ui/core/Icon"

import "./Toast.scss"

const Toast = ({ open, severity, message, handleClose }) => {
  let className = "toast toast-" + severity
  const icons = {
    error: "error",
    warning: "warning",
    success: "check",
    info: "info",
  }
  return (
    <Snackbar
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      open={open}
      autoHideDuration={2000}
      onClose={handleClose}
    >
      <div className={className}>
        <Icon>{icons[severity]}</Icon>
        <p>{message}</p>
      </div>
    </Snackbar>
  )
}

export default Toast
