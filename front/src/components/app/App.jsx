import "./App.scss"
import store from "../../redux/store"
import { BrowserRouter, Switch, useHistory } from "react-router-dom"
import { Provider } from "react-redux"
import { ContainerAppStore } from "../containerApp/ContainerApp"
import { useCallback, useEffect, useState } from "react"
import { Route } from "react-router-dom"
import API from "../../utilities/API"
import { CSSTransition } from "react-transition-group"
import Signin from "./Signin"
import Toast from "../general/toast/Toast"

function App() {
  const [stateToast, setOpenToast] = useState({ open: false, text: "", severity: "" })
  const history = useHistory()
  const closeToast = () => {
    setOpenToast(false)
  }
  const showToast = useCallback(({ text, severity }) => {
    setOpenToast((prev) => ({ ...prev, open: true, text, severity }))
  }, [])

  useEffect(() => {
    let token = API.getToken()
    if (token) {
      history.push("/app/")
    } else {
      history.push("/")
    }
  }, [])

  const routes = [
    { path: "/app", name: "App", Component: ContainerAppStore, exact: false },
    { path: "/", name: "Signin", Component: Signin, exact: true },
  ]

  return (
    <Provider store={store}>
      <Toast open={stateToast.open} severity={stateToast.severity} message={stateToast.text} handleClose={closeToast} />
      {routes.map(({ path, Component, exact }) => (
        <Route key={path} exact={exact} path={path}>
          {({ match }) => (
            <CSSTransition in={match != null} timeout={300} classNames="fade" unmountOnExit>
              <Component showToast={showToast} />
            </CSSTransition>
          )}
        </Route>
      ))}
    </Provider>
  )
}

const RoutedApp = () => {
  return (
    <BrowserRouter>
      <Switch>
        {" "}
        <App />
      </Switch>
    </BrowserRouter>
  )
}

export default RoutedApp
