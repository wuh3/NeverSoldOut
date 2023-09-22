import './App.css';
import Header from './components/Header';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { UIDemo } from './demo/UIDemo';
import { RetailPage } from './pages/retail/RetailPage';
import { ProductPage } from './pages/product/ProductPage';
import Status from './pages/status/Status';
import SearchResult from './components/search/SearchResult'
import { AdminPage } from './pages/admin/AdminPage';
import { DiscountPage } from './pages/discount/DiscountPage';
import SignIn from './pages/login/login';

const App = () => {

  return (
    <>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={<SignIn/>}></Route>
          <Route path='/home' element={<UIDemo/>}></Route>
          <Route path='/retail' element={<RetailPage />}></Route>
          <Route path='/product' element={<ProductPage />}></Route>
          <Route path='/status' element={<Status />}></Route>
          <Route path='/query' element={<SearchResult />}></Route>
          <Route path='/admin' element={<AdminPage />}></Route>
          <Route path='/discount' element={<DiscountPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
