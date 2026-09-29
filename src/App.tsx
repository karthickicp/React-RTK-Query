import { Provider } from "react-redux";
import { store } from "./store";
import { Products } from "./Pages/Products";
import { CategoriesPage } from "./Pages/Categories";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./components/ui/tabs";

function App() {
  return (
    <Provider store={store}>
      <Tabs defaultValue="products">
        <TabsList>
          <TabsTrigger value="products">Products</TabsTrigger>
          <TabsTrigger value="categories">Categories</TabsTrigger>
        </TabsList>
        <TabsContent value="products">
          <Products />
        </TabsContent>
        <TabsContent value="categories">
          <CategoriesPage />
        </TabsContent>
      </Tabs>
    </Provider>
  );
}

export default App;
