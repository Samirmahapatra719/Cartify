import { Link } from 'react-router-dom';
import { Plus } from 'lucide-react';
import { getCurrentSeason } from '../utils/season';

const ProductCard = ({ product, addToCart }) => {
  const currentSeason = getCurrentSeason();
  const isSeasonal = product.seasons?.includes(currentSeason);
  
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <div className="bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 overflow-hidden group flex flex-col h-full relative">
      
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-2 items-start">
        {discount > 0 && (
          <span className="bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            {discount}% OFF
          </span>
        )}
        {isSeasonal && (
          <span className="bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded-md shadow-sm">
            Great for {currentSeason}
          </span>
        )}
      </div>

      <Link to={`/product/${product.id}`} className="aspect-video overflow-hidden relative bg-slate-50 p-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-contain mix-blend-multiply group-hover:scale-105 transition-transform duration-500"
        />
      </Link>
      
      <div className="p-5 flex flex-col flex-grow">
        <Link to={`/product/${product.id}`} className="mt-1 flex-grow">
          <h3 className="text-lg font-semibold text-slate-900 line-clamp-2 hover:text-blue-600 transition">
            {product.name}
          </h3>
          <p className="text-sm text-slate-500 mt-2 line-clamp-2">{product.description}</p>
        </Link>
        
        <div className="mt-4 flex items-end justify-between gap-3">
          <div className="min-w-0">
            <span className="text-xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
            {product.originalPrice && (
              <span className="text-sm text-slate-400 line-through ml-1 block sm:inline">₹{product.originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          <button 
            onClick={() => addToCart(product)}
            className="flex-shrink-0 flex items-center gap-1 bg-slate-900 text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-slate-800 transition-colors active:scale-95 shadow-sm"
          >
            <Plus className="w-4 h-4" /> Add
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
