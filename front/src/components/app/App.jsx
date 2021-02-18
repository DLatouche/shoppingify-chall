import "./App.scss"
import store from "../../redux/store"
import { BrowserRouter, Switch, useHistory } from "react-router-dom"
import { Provider } from "react-redux"
import { ContainerAppStore } from "../containerApp/ContainerApp"
import { useEffect } from "react"
import { Route } from "react-router-dom"
import API from "../../utilities/API"
import { CSSTransition } from "react-transition-group"
import Signin from "./Signin"

function App() {
  const history = useHistory()

  const fetch = async () => {
    try {
    } catch (e) {
      console.log("%cApp.jsx -> 11 ERROR: e", "background: #FF0000; color:#FFFFFF", e)
    }
  }

  useEffect(() => {
    if (API.getTokenFromURL()) {
      console.log("App.jsx -> 22: key")
      fetch()
    } else {
      history.push("/signin")
      console.log("App.jsx -> 25: noKeyu")
    }
  }, [])

  const routes = [
    { path: "/", name: "App", Component: ContainerAppStore },
    { path: "/signin", name: "Signin", Component: Signin },
  ]

  return (
    <Provider store={store}>
      {routes.map(({ path, Component }) => (
        <Route key={path} exact path={path}>
          {({ match }) => (
            <CSSTransition in={match != null} timeout={300} classNames="fade" unmountOnExit>
              <Component />
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
