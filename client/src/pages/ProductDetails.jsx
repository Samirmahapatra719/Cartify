import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, ShoppingCart, ShieldCheck } from 'lucide-react';
import TrustSection from '../components/TrustSection';

const ProductDetails = ({ addToCart }) => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`/api/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching product:", error);
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className="p-20 text-center">Loading...</div>;
  if (!product) return <div className="p-20 text-center text-rose-500">Product not found.</div>;

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
    : 0;

  return (
    <>
      <div className="container mx-auto px-4 max-w-6xl py-8 mb-16">
        <Link to="/" className="inline-flex items-center text-slate-500 hover:text-blue-600 mb-8 transition font-medium">
          <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
        </Link>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-6 md:p-10 rounded-3xl shadow-sm border border-slate-100">
          <div className="aspect-square bg-slate-50 rounded-2xl overflow-hidden p-8 flex items-center justify-center relative">
            {discount > 0 && (
              <span className="absolute top-6 left-6 bg-rose-500 text-white text-sm font-bold px-3 py-1 rounded-md shadow-sm z-10">
                {discount}% OFF
              </span>
            )}
            <img src={product.image} alt={product.name} className="w-full h-full object-contain mix-blend-multiply" />
          </div>
          
          <div className="flex flex-col justify-center">
            <div className="mb-2">
              <span className="text-xs font-semibold tracking-wider text-slate-400 uppercase">Cartify Premium</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{product.name}</h1>
            
            <div className="flex items-end gap-3 mb-6">
              <span className="text-3xl font-bold text-slate-900">₹{product.price.toLocaleString('en-IN')}</span>
              {product.originalPrice && (
                <span className="text-xl text-slate-400 line-through mb-1">₹{product.originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            <div className="prose prose-slate mb-8 text-slate-600">
              <p className="text-lg leading-relaxed">{product.description}</p>
            </div>
            
            <button 
              onClick={() => addToCart(product)}
              className="w-full md:w-auto bg-slate-900 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-slate-800 flex items-center justify-center gap-2 transition-transform active:scale-95 shadow-md"
            >
              <ShoppingCart className="w-5 h-5" />
              Add to Cart
            </button>
            
            <div className="mt-10 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>1 Year Brand Warranty</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-green-600" />
                <span>7 Days Replacement</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TrustSection />
    </>
  );
};

export default ProductDetails;
