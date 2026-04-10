export const getCurrentSeason = () => {
  const month = new Date().getMonth(); // 0-indexed (0 = Jan, 11 = Dec)
  
  if (month === 1 || month === 2) return 'Spring';
  if (month >= 3 && month <= 5) return 'Summer';
  if (month >= 6 && month <= 8) return 'Monsoon';
  return 'Winter'; // 9, 10, 11, 0
};

export const getSeasonDetails = (season) => {
  const settings = {
    Spring: {
      greeting: "Spring is here! Enjoy fresh deals 🌸",
      themeColor: "from-pink-100 to-rose-50",
      bgAccent: "bg-rose-500",
      textAccent: "text-rose-600",
      borderAccent: "border-rose-200",
      heroTitle: "Refresh Your Spring Style",
      heroDesc: "Discover the perfect products for a fresh start to the year."
    },
    Summer: {
      greeting: "It's Summer in India! Stay Cool 🌞",
      themeColor: "from-orange-100 to-amber-50",
      bgAccent: "bg-orange-500",
      textAccent: "text-orange-600",
      borderAccent: "border-orange-200",
      heroTitle: "Beat the Heat with our Best",
      heroDesc: "Must-have gadgets and cool gear for the Indian summer."
    },
    Monsoon: {
      greeting: "Monsoon Showers are Here! Stay Dry 🌧️",
      themeColor: "from-blue-200 to-cyan-50",
      bgAccent: "bg-blue-600",
      textAccent: "text-blue-600",
      borderAccent: "border-blue-200",
      heroTitle: "Monsoon Ready Gear",
      heroDesc: "Waterproof essentials and cozy comforts for the rainy days."
    },
    Winter: {
      greeting: "Embrace the Winter Chill ❄️",
      themeColor: "from-slate-200 to-blue-50",
      bgAccent: "bg-slate-800",
      textAccent: "text-slate-800",
      borderAccent: "border-slate-300",
      heroTitle: "Warm Up Your Winter",
      heroDesc: "Cozy finds and heaters to keep you comfortably warm."
    }
  };

  return settings[season];
};
