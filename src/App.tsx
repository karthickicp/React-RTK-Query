import { Provider } from "react-redux";
import { store } from "./store";
import { Products } from "./Pages/Products";

function App() {
  return (
    <Provider store={store}>
      <Products />
    </Provider>
  );
}

export default App;
