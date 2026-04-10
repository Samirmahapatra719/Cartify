import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import TrustSection from '../components/TrustSection';

const Cart = ({ cartItems, removeFromCart, updateQuantity }) => {
  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const tax = subtotal * 0.18; // 18% GST in India
  const total = subtotal + tax;

  return (
    <>
      <div className="container mx-auto px-4 max-w-6xl py-8 mb-16">
        <h1 className="text-3xl font-bold text-slate-900 mb-10">Shopping Cart</h1>
        
        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-center bg-white rounded-3xl border border-slate-100 shadow-sm">
            <div className="bg-slate-50 p-6 rounded-full mb-6 text-slate-300">
              <ShoppingBag className="w-16 h-16" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Your cart is empty</h2>
            <p className="text-slate-500 mb-8 max-w-md">Browse our selection and find something you like.</p>
            <Link to="/" className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-3 rounded-full font-medium transition-colors shadow-md">
              Start Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2 space-y-6">
              {cartItems.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row gap-6 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm relative group">
                  <div className="w-24 h-24 sm:w-32 sm:h-32 bg-slate-50 rounded-xl overflow-hidden flex-shrink-0 p-2">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                  </div>
                  
                  <div className="flex-grow flex flex-col justify-between">
                    <div className="pr-10">
                      <h3 className="text-lg font-semibold text-slate-900 line-clamp-2">
                        <Link to={`/product/${item.id}`} className="hover:text-blue-600">{item.name}</Link>
                      </h3>
                      <p className="text-slate-500 font-medium mt-1">₹{item.price.toLocaleString('en-IN')} / item</p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="flex items-center bg-slate-50 rounded-full border border-slate-200 px-2 py-1">
                        <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="text-slate-500 hover:text-slate-900 p-2 transition"><Minus className="w-4 h-4" /></button>
                        <span className="w-8 text-center font-semibold text-slate-900">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="text-slate-500 hover:text-slate-900 p-2 transition"><Plus className="w-4 h-4" /></button>
                      </div>
                      <span className="font-bold text-lg text-slate-900">
                        ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                      </span>
                    </div>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item.id)}
                    className="absolute top-4 right-4 text-slate-300 hover:text-rose-500 p-2 transition bg-white sm:bg-transparent rounded-full shadow-sm sm:shadow-none"
                    title="Remove Item"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
            
            <div className="lg:col-span-1">
              <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm sticky top-28">
                <h2 className="text-xl font-bold text-slate-900 mb-6">Price Details</h2>
                
                <div className="space-y-4 text-slate-600 mb-6">
                  <div className="flex justify-between">
                    <span>Price ({cartItems.length} items)</span>
                    <span className="font-medium text-slate-900">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Delivery Charges</span>
                    <span className="font-medium">Free</span>
                  </div>
                  <div className="flex justify-between">
                    <span>GST (18%)</span>
                    <span className="font-medium text-slate-900">₹{tax.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                  </div>
                </div>
                
                <div className="border-t border-slate-100 pt-6 mb-8 flex justify-between items-center">
                  <span className="text-lg font-bold text-slate-900">Total Amount</span>
                  <span className="text-2xl font-bold text-slate-900">₹{total.toLocaleString('en-IN', {maximumFractionDigits: 0})}</span>
                </div>
                
                <button className="w-full bg-slate-900 hover:bg-slate-800 text-white py-4 rounded-full font-bold text-lg transition-transform active:scale-95 flex items-center justify-center gap-2 shadow-md">
                  Place Order <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <TrustSection />
    </>
  );
};

export default Cart;
