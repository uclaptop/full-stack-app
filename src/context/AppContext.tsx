import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Product {
  id: number | string;
  name: string;
  brand?: string;
  specs?: string;
  category?: string;
  tag?: string;
  price?: number | string;
  mrp?: number | string;
  image_url: string;
  secondary_image_url?: string;
  gallery_images?: string;
  is_trending?: boolean;
  description?: string;
  sku?: string;
  sort_order?: number;
  is_active?: boolean;
}

interface StockItem {
  id: number;
  name: string;
  image_url: string;
  sort_order: number;
  is_active: boolean;
}

interface Service {
  id: number;
  title: string;
  description: string;
  icon_name: string;
  sort_order: number;
  is_active: boolean;
}

interface WhyPoint {
  id: number;
  point: string;
  sort_order: number;
  is_active: boolean;
}

export interface CartItem {
  id: number | string;
  name: string;
  brand?: string;
  specs?: string;
  price?: number | string;
  mrp?: number | string;
  image_url?: string;
  secondary_image_url?: string;
  quantity: number;
}

interface AppContextType {
  products: Product[];
  stockItems: StockItem[];
  services: Service[];
  whyPoints: WhyPoint[];
  content: Record<string, string>;
  loading: boolean;
  cart: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (id: number | string) => void;
  updateQuantity: (id: number | string, delta: number) => void;
  clearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  cartCount: number;
  refreshProducts: () => void;
  refreshStock: () => void;
  refreshServices: () => void;
  refreshWhy: () => void;
  refreshContent: () => void;
}

const AppContext = createContext<AppContextType | null>(null);

// Default fallback content (used if API is unavailable)
const defaultContent: Record<string, string> = {
  'hero.badge': 'TRUSTED STORE SINCE 2015',
  'hero.headline_line1': 'UPGRADE',
  'hero.headline_accent1': 'YOUR',
  'hero.headline_accent2': 'TECH.',
  'hero.subtext': 'Premium Refurbished Laptops from Dell, HP & Lenovo. High performance, verified quality, and student-friendly prices.',
  'hero.stat1_value': '1000+', 'hero.stat1_label': 'Happy Clients',
  'hero.stat2_value': '9+ YRS', 'hero.stat2_label': 'Market Leader',
  'hero.stat3_value': '500+', 'hero.stat3_label': 'Daily Inventory',
  'about.eyebrow': "PRODDATUR'S TECH HUB",
  'about.headline': 'TRUSTED SINCE 2015.',
  'about.body': 'Universal Computers (UC) has been a leading technological hub for over 9 years. Our focus has always been on bridging the gap between premium tech and affordable pricing.',
  'about.badge_text': '9+ Years', 'about.badge_sub': 'of Trusted Excellence',
  'about.stat1_value': '1k+', 'about.stat1_label': 'Customers',
  'about.stat2_value': '500+', 'about.stat2_label': 'Models',
  'about.stat3_value': '#1', 'about.stat3_label': 'Rated',
  'contact.email': 'uclaptopstore@gmail.com',
  'contact.phone': '+91 87121 73339',
  'contact.whatsapp_number': '918712173339',
  'contact.address_line1': 'D.No 14/331, Church Complex Upstairs',
  'contact.address_city': 'Proddatur, AP, India.',
  'footer.hours_weekday': 'MON-SAT 9AM-8:30PM',
  'footer.hours_weekend': 'SUN 10AM-6:00PM',
  'footer.tagline': "Bringing premium technology within everyone's reach. Trusted by over 1k+ satisfied customers for more than 9 years in Proddatur.",
  'footer.instagram_url': 'https://www.instagram.com/_universal_computers_',
  'footer.youtube_url': 'https://www.youtube.com/@UniversalComputerspdtr',
  'footer.facebook_url': 'https://www.facebook.com/share/14bJmiFVj6T/',
};

export function AppProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [stockItems, setStockItems] = useState<StockItem[]>([]);
  const [services, setServices] = useState<Service[]>([]);
  const [whyPoints, setWhyPoints] = useState<WhyPoint[]>([]);
  const [content, setContent] = useState<Record<string, string>>(defaultContent);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const r = await fetch('/api/products');
      if (r.ok) setProducts(await r.json());
    } catch { /* use defaults */ }
  };

  const fetchStock = async () => {
    try {
      const r = await fetch('/api/stock');
      if (r.ok) setStockItems(await r.json());
    } catch { /* use defaults */ }
  };

  const fetchServices = async () => {
    try {
      const r = await fetch('/api/services');
      if (r.ok) setServices(await r.json());
    } catch { /* use defaults */ }
  };

  const fetchWhy = async () => {
    try {
      const r = await fetch('/api/why');
      if (r.ok) setWhyPoints(await r.json());
    } catch { /* use defaults */ }
  };

  const fetchContent = async () => {
    try {
      const r = await fetch('/api/content');
      if (r.ok) {
        const data = await r.json();
        setContent({ ...defaultContent, ...data });
      }
    } catch { /* use defaults */ }
  };

  const notifyOtherTabs = () => {
    localStorage.setItem('uc_data_updated', Date.now().toString());
  };

  const refreshProducts = async () => { await fetchProducts(); notifyOtherTabs(); };
  const refreshStock = async () => { await fetchStock(); notifyOtherTabs(); };
  const refreshServices = async () => { await fetchServices(); notifyOtherTabs(); };
  const refreshWhy = async () => { await fetchWhy(); notifyOtherTabs(); };
  const refreshContent = async () => { await fetchContent(); notifyOtherTabs(); };

  useEffect(() => {
    Promise.all([fetchProducts(), fetchStock(), fetchServices(), fetchWhy(), fetchContent()])
      .finally(() => setLoading(false));

    // Listen for updates from the Admin Panel (which runs in another tab/window)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === 'uc_data_updated') {
        fetchProducts();
        fetchStock();
        fetchServices();
        fetchWhy();
        fetchContent();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('uc_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    try {
      localStorage.setItem('uc_cart', JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);

  const addToCart = (product: any) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === (product.id || product.name));
      if (existing) {
        return prev.map((item) =>
          item.id === (product.id || product.name)
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [
        ...prev,
        {
          id: product.id || product.name,
          name: product.name,
          brand: product.brand || '',
          specs: product.specs || '',
          price: product.price || '',
          image_url: product.image_url || product.image || '',
          quantity: 1,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number | string) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number | string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  return (
    <AppContext.Provider value={{
      products, stockItems, services, whyPoints, content, loading,
      cart, addToCart, removeFromCart, updateQuantity, clearCart,
      isCartOpen, setIsCartOpen, cartCount,
      refreshProducts,
      refreshStock,
      refreshServices,
      refreshWhy,
      refreshContent,
    }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be used within AppProvider');
  return ctx;
};

export type { Product, StockItem, Service, WhyPoint };
