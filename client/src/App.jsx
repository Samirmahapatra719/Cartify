import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
import Navbar from './components/Navbar';
import AnnouncementBar from './components/AnnouncementBar';
import Home from './pages/Home';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';

function App() {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existing = cartItems.find(item => item.id === product.id);
    if (existing) {
      setCartItems(cartItems.map(item => 
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
    toast.success(`${product.name} added to cart!`, {
      style: {
        borderRadius: '10px',
        background: '#0f172a',
        color: '#fff',
      },
      iconTheme: {
        primary: '#10b981',
        secondary: '#0f172a',
      },
    });
  };

  const removeFromCart = (productId) => {
    const item = cartItems.find(i => i.id === productId);
    setCartItems(cartItems.filter(item => item.id !== productId));
    if (item) {
      toast.error(`${item.name} removed from cart.`, {
        icon: '🗑️',
        style: {
          borderRadius: '10px',
          background: '#fff',
          color: '#333',
        },
      });
    }
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) return;
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  return (
    <Router>
      <div className="min-h-screen flex flex-col font-sans bg-slate-50">
        <Toaster position="bottom-right" reverseOrder={false} />
        <AnnouncementBar />
        <Navbar cartItemCount={cartItems.reduce((acc, item) => acc + item.quantity, 0)} />
        <main className="flex-grow pb-12">
          <Routes>
            <Route path="/" element={<Home addToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetails addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />} />
          </Routes>
        </main>
        
        {/* Simple Footer */}
        <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm border-t border-slate-800 mt-auto">
          <p>© {new Date().getFullYear()} Cartify India. All rights reserved.</p>
        </footer>
      </div>
    </Router>
  );
}

export default App;
