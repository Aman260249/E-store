import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import CategoryPage from './pages/CategorySlider';
import ProductDetails from './pages/ProductDetails';
import Footer from './components/Footer';
import Cart from './pages/Cart';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import BrandPage from './pages/BrandPage'; 
import Checkout from './pages/Checkout';
import Success from './pages/Success';
import { CartProvider } from './context/CartContext';

// 🔐 Private Route Component: Har render par storage check karega
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/" replace />;
};

const AppContent = () => {
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {!isAdminPage && <Navbar />}
      
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/category/:type" element={<CategoryPage />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/brand/:brandName" element={<BrandPage />} />
          <Route path="/admin" element={<AdminLogin />} /> 
          <Route path="/admin/dashboard" element={<AdminDashboard />} />

          {/* 🔐 Protected Checkout */}
          <Route 
            path="/checkout" 
            element={
              <PrivateRoute>
                <Checkout />
              </PrivateRoute>
            } 
          />
          
          <Route path="/success" element={<Success />} />
        </Routes>
      </main>

      {!isAdminPage && <Footer />}
    </div>
  );
};

function App() {
  return (
    <Router>
      <CartProvider> 
        <AppContent />
      </CartProvider>
    </Router>
  );
}

export default App;