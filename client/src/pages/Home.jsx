import { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from '../components/ProductCard';
import TrustSection from '../components/TrustSection';
import { Search } from 'lucide-react';
import { getCurrentSeason, getSeasonDetails } from '../utils/season';

const Home = ({ addToCart }) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  const season = getCurrentSeason();
  const seasonDetails = getSeasonDetails(season);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('/api/products');
        setProducts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const seasonalProducts = filteredProducts.filter(p => p.seasons?.includes(season));
  const otherProducts = filteredProducts.filter(p => !p.seasons?.includes(season));

  return (
    <>
      {/* Dynamic Hero Banner */}
      <div className="container mx-auto px-4 max-w-6xl pt-8">
        <div className={`bg-gradient-to-r ${seasonDetails.themeColor} rounded-3xl p-10 md:p-16 mb-12 shadow-sm border ${seasonDetails.borderAccent}`}>
          <div className="max-w-2xl">
            <span className={`inline-block px-3 py-1 bg-white text-sm font-bold rounded-full mb-4 ${seasonDetails.textAccent} shadow-sm`}>
              {season} Collection
            </span>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4 leading-tight">
              {seasonDetails.heroTitle}
            </h1>
            <p className="text-lg text-slate-700 mb-8 max-w-lg">
              {seasonDetails.heroDesc}
            </p>
            <div className="relative max-w-md bg-white rounded-full p-1 shadow-md flex items-center">
              <Search className="text-slate-400 w-5 h-5 ml-4" />
              <input 
                type="text" 
                placeholder="Search for clothes, gadgets..." 
                className="w-full pl-3 pr-4 py-3 rounded-full focus:outline-none bg-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-6xl pb-16">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 ${seasonDetails.borderAccent}`}></div>
          </div>
        ) : (
          <>
            {/* Perfect for this Season */}
            {seasonalProducts.length > 0 && (
              <div className="mb-16">
                <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                  Perfect for {season} <span className="text-2xl">🔥</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {seasonalProducts.map(product => (
                    <ProductCard key={product.id} product={product} addToCart={addToCart} />
                  ))}
                </div>
              </div>
            )}

            {/* All Products */}
            <div className="mb-16">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Explore More</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {otherProducts.map(product => (
                  <ProductCard key={product.id} product={product} addToCart={addToCart} />
                ))}
                {filteredProducts.length === 0 && (
                  <div className="col-span-full py-20 text-center text-slate-500">
                    No products found matching "{searchTerm}".
                  </div>
                )}
              </div>
            </div>
          </>
        )}
      </div>

      <TrustSection />
    </>
  );
};

export default Home;
