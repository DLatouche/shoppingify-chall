import './App.scss';
import store from "../../redux/store"
import { BrowserRouter,Switch } from "react-router-dom"
import { Provider } from "react-redux"
import { ContainerAppStore } from '../containerApp/ContainerApp';
function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <ContainerAppStore />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
