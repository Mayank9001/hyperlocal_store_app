import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import StorePage from "./pages/StorePage";
import CartPage from "./pages/CartPage";
import Navbar from "./pages/Navbar";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
function App() {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/store/:storeId" element={<StorePage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route
            path="/order-confirmation"
            element={<OrderConfirmationPage />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
