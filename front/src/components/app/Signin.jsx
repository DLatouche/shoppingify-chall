import { useState } from "react"
import BigButton from "../general/bigButton/BigButton"
import Input from "../general/input/Input"
import "./Signin.scss"
import API from "../../utilities/API"
import { useHistory } from "react-router-dom"
import Dialog from "../general/dialog/Dialog"

const Signin = ({ showToast }) => {
  const history = useHistory()
  const [key, setKey] = useState("Imtoken12345withnumberandletters156")
  const [newKey, setNewKey] = useState("")
  const [open, setOpen] = useState(false)
  const onInputChange = (e, value) => {
    setKey(value)
  }

  const onConnection = async () => {
    let result = await API.request({ url: "users/" + key, type: "GET" })
    if (result.status === 200) {
      API.setToken(key)
      history.push("/app/")
    } else {
      showToast({
        text: `Key is incorrect`,
        severity: "error",
      })
      console.log("%cSignin.jsx -> 19 ERROR: Key not found", "background: #FF0000; color:#FFFFFF")
    }
  }

  const onCreateKey = async () => {
    let result = await API.request({ url: "users", type: "POST" })
    console.log("Signin.jsx -> 28: result", result)
    if (result.status === 200) {
      API.setToken(result.data.user.token)
      setNewKey(result.data.user.token)
      setOpen(true)
    } else {
      showToast({
        text: `An error has occured`,
        severity: "error",
      })
      console.log("%cSignin.jsx -> 33 ERROR: Key not found", "background: #FF0000; color:#FFFFFF")
    }
  }

  const onValid = () => {
    setOpen(false)
    history.push("/app/")
  }

  return (
    <div className="signin">
      <Dialog open={open} oneChoice={true} onValid={onValid} onCancel={onValid}>
        <p className="signin__text__title">Your key is created</p>
        <p className="signin__text">Your key are: {newKey}</p>
        <p className="signin__text">
          You can connect on Shoppingify with this link:{" "}
          <a className="signin__link" href={"http://localhost:3000/?token=" + newKey}>
            http://localhost:3000/?token={newKey}
          </a>
        </p>
      </Dialog>
      <div className="signin__container">
        <div className="signin__container__bloc">
          <p className="signin__title">Shoppingify</p>
          <Input
            className="signin__input"
            value={key}
            placeholder="Enter your key"
            name="key"
            label="Do you have a key?"
            onChange={onInputChange}
          />
          <p className="signin__info">
            A key allows access to your lists. If you lose it, you lose your data permanently. Moreover, if no
            connection is made for a period of two weeks, the data is deleted.
          </p>
        </div>
        <div className="signin__container__buttons">
          <BigButton onClick={onConnection} className="signin__button">
            connection
          </BigButton>
          <BigButton onClick={onCreateKey} className="signin__button" variant="blue">
            Create a key
          </BigButton>
        </div>
      </div>
    </div>
  )
}

export default Signin
