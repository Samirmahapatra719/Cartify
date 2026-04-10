import { ShieldCheck, Truck, Clock, CreditCard } from 'lucide-react';

const TrustSection = () => {
  const features = [
    {
      icon: <Truck className="w-8 h-8 text-slate-700" />,
      title: "Pan-India Delivery",
      desc: "Fast delivery across 25,000+ pincodes in India."
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-slate-700" />,
      title: "100% Genuine",
      desc: "Authentic products with brand warranty."
    },
    {
      icon: <Clock className="w-8 h-8 text-slate-700" />,
      title: "Easy 7-Day Returns",
      desc: "No questions asked return policy."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-slate-700" />,
      title: "Secure Payments",
      desc: "Safe UPI, Card & Netbanking options."
    }
  ];

  return (
    <div className="bg-white py-16 border-t border-slate-100">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold text-center text-slate-900 mb-12">Why Shop With Us</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, idx) => (
            <div key={idx} className="flex flex-col items-center text-center p-6 bg-slate-50 rounded-2xl hover:bg-slate-100 transition-colors">
              <div className="bg-white p-4 rounded-full shadow-sm mb-4">
                {feature.icon}
              </div>
              <h3 className="font-bold text-lg text-slate-900 mb-2">{feature.title}</h3>
              <p className="text-slate-600 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSection;
