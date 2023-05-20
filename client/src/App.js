import { ChakraProvider } from '@chakra-ui/react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavBar from './components/NavBar';
import ProductsScreen from './screens/ProductsScreen';
import CartScreen from './screens/CartScreen';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <NavBar />
        <main>
          <Routes>
            <Route path='/products' element={<ProductsScreen />}></Route>
            <Route path='/cart' element={<CartScreen />}></Route>
          </Routes>
        </main>
      </Router>
    </ChakraProvider>
  );
}

export default App;
