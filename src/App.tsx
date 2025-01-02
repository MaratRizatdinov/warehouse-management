import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/MainPage/MainPage";
import DirectoriesPage from "./pages/DirectoriesPage/DirectoriesPage";
import SuppliersPage from "./pages/SuppliersPage/SuppliersPage";
import CustomersPage from "./pages/CustomersPage/CustomersPage";
import WarehousesPage from "./pages/WarehousesPage/WarehousesPage";
import ProductsPage from "./pages/ProductsPage/ProductsPage";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/directories" element={<DirectoriesPage />} />
        <Route path="/directories/suppliers" element={<SuppliersPage />} />
        <Route path="/directories/customers" element={<CustomersPage />} />
        <Route path="/directories/warehouses" element={<WarehousesPage />} />
        <Route path="/directories/products" element={<ProductsPage />} />
      </Routes>
    </Router>
  );
};

export default App;
