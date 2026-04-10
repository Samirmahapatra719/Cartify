import { Link } from 'react-router-dom';
import { ShoppingCart, Package2 } from 'lucide-react';

const Navbar = ({ cartItemCount }) => {
  return (
    <nav className="bg-white sticky top-0 z-50 shadow-sm border-b border-slate-100">
      <div className="container mx-auto px-4 py-4 max-w-6xl flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2 text-slate-900 font-bold text-2xl tracking-tight transition hover:text-blue-600">
          <Package2 className="w-8 h-8 text-blue-600" />
          Cartify
        </Link>
        <Link to="/cart" className="relative p-2 text-slate-600 hover:text-slate-900 transition bg-slate-50 rounded-full hover:bg-slate-100">
          <ShoppingCart className="w-6 h-6" />
          {cartItemCount > 0 && (
            <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full shadow-md">
              {cartItemCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
