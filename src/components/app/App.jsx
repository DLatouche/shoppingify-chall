import logo from './logo.svg';
import './App.scss';
import store from "../../redux/store"
import { Provider } from "react-redux"
import ItemsStore from '../items/Items';
function App() {
  return (
    <Provider store={store}>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
        </header>
        <ItemsStore />
      </div>
    </Provider>
  );
}

export default App;
