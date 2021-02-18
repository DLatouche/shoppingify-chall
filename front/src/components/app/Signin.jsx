import { useState } from "react"
import BigButton from "../general/bigButton/BigButton"
import Input from "../general/input/Input"
import "./Signin.scss"
import API from "../../utilities/API"
import { useHistory } from "react-router-dom"

const Signin = () => {
  const history = useHistory()
  const [key, setKey] = useState("")

  const onInputChange = (e, value) => {
    setKey(value)
  }

  const onConnection = async () => {
    let result = await API.request({ url: "users/" + key, type: "GET" })
    if (result.status === 200) {
      API.setToken(key)
      history.push("/")
    } else {
      console.log("%cSignin.jsx -> 19 ERROR: Key not found", "background: #FF0000; color:#FFFFFF")
    }
  }

  const onCreateKey = async () => {
    let result = await API.request({ url: "users", type: "POST" })
    console.log("Signin.jsx -> 28: result", result)
    if (result.status === 200) {
      API.setToken(result.data.user.token)
      history.push("/")
    } else {
      console.log("%cSignin.jsx -> 33 ERROR: Key not found", "background: #FF0000; color:#FFFFFF")
    }
  }

  return (
    <div className="signin">
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
