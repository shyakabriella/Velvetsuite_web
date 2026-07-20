import { useEffect, useMemo, useState } from 'react';
import {
  Search,
  ShoppingCart,
  User,
  CreditCard,
  Trash2,
  Loader2,
  ChevronDown,
  FileText
} from 'lucide-react';
import {
  buildOrderPayload,
  fetchRestaurantMenu,
  flattenMenuItems,
  formatRwf,
  submitRestaurantOrder,
} from '../lib/restaurantApi';

const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"><rect fill="#f3ede0" width="320" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8c6540" font-size="14" font-family="sans-serif">No image</text></svg>',
  );

function CardPaymentModal({ open, total, onClose, onConfirm }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry] = useState('');
  const [cvc, setCvc] = useState('');

  if (!open) return null;

  function handleConfirm(e) {
    e.preventDefault();
    const masked = cardNumber.replace(/\s/g, '').slice(-4);
    onConfirm({ masked: masked ? `**** **** **** ${masked}` : '****' });
    setCardNumber('');
    setExpiry('');
    setCvc('');
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur-[8px] p-4">
      <form 
        onSubmit={handleConfirm} 
        className="w-full max-w-[420px] bg-white/95 backdrop-blur-[20px] rounded-[28px] p-10 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.25)] relative border border-white/50"
      >
        <button 
          type="button" 
          onClick={onClose}
          className="absolute top-6 right-6 bg-transparent border-none text-2xl cursor-pointer text-gray-400 hover:text-[#1c1a18] transition-colors"
        >
          ×
        </button>

        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#faf9f7] text-[#c9a84c] mb-4">
            <CreditCard size={24} strokeWidth={1.5} />
          </div>
          <h3 className="font-sans text-[1.4rem] font-semibold m-0 mb-2 text-[#1c1a18] tracking-tight">Complete Payment</h3>
          <p className="m-0 text-gray-500 text-[0.95rem]">Amount due: <strong className="text-[#1c1a18] text-[1.1rem]">{formatRwf(total)}</strong></p>
        </div>

        <div className="grid gap-5">
          <div className="relative">
            <label className="block text-[0.75rem] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Card Number</label>
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" className="w-full py-3.5 px-4 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-base text-[#1c1a18] font-mono outline-none focus:border-[#c9a84c] transition-colors" required />
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <label className="block text-[0.75rem] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">Expiry</label>
              <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" className="w-full py-3.5 px-4 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-base text-[#1c1a18] font-mono text-center outline-none focus:border-[#c9a84c] transition-colors" required />
            </div>
            <div>
              <label className="block text-[0.75rem] font-semibold text-gray-400 uppercase tracking-wider mb-1.5">CVC</label>
              <input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" type="password" maxLength={4} className="w-full py-3.5 px-4 rounded-xl border border-[#e0dbd3] bg-[#faf9f7] text-base text-[#1c1a18] font-mono text-center outline-none focus:border-[#c9a84c] transition-colors" required />
            </div>
          </div>
        </div>

        <div className="mt-10">
          <button type="submit" className="w-full bg-[#1c1a18] text-white p-4 rounded-full font-semibold text-[1.05rem] shadow-[0_10px_20px_rgba(28,26,24,0.2)] hover:bg-[#c9a84c] transition-colors">
            Pay {formatRwf(total)}
          </button>
        </div>
      </form>
    </div>
  );
}

function MenuItemCard({ item, qty, onAdd, onSub, menuUrl }) {
  return (
    <article className="flex flex-col bg-white rounded-[24px] p-5 shadow-[0_5px_20px_rgba(0,0,0,0.03)] border border-transparent transition-all hover:shadow-[0_15px_35px_rgba(0,0,0,0.08)] hover:-translate-y-1 h-full relative overflow-hidden group">
      <div className="w-full h-[240px] relative rounded-[16px] overflow-hidden mb-5 bg-[#faf9f7]">
        <img
          src={item.image || PLACEHOLDER}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
      </div>
      <div className="flex-1 flex flex-col">
        <div className="flex justify-between items-start gap-4">
          <h4 className="font-semibold text-[1.4rem] text-[#1c1a18] leading-tight font-display">{item.name}</h4>
          <div className="font-bold text-[1.1rem] text-[#c9a84c] shrink-0">
            {formatRwf(item.price)}
          </div>
        </div>
        {item.desc && (
          <p className="text-[1rem] text-gray-500 mt-3 line-clamp-3 leading-relaxed flex-1">{item.desc}</p>
        )}
      </div>
      <div className="mt-6 flex items-center justify-between border-t border-[#f0ede8] pt-5">
        {qty > 0 ? (
          <div className="flex items-center gap-4 bg-[#faf9f7] rounded-full px-2 py-2 text-sm font-bold text-[#1c1a18] border border-[#e0dbd3] w-full justify-between">
            <button type="button" onClick={onSub} className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm hover:bg-gray-100 transition-colors">-</button>
            <span className="text-[1.1rem]">{qty}</span>
            <button type="button" onClick={onAdd} className="w-10 h-10 flex items-center justify-center rounded-full bg-[#1c1a18] text-white shadow-sm hover:bg-[#c9a84c] transition-colors">+</button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="w-full rounded-full bg-[#1c1a18] px-6 py-3.5 text-[1rem] font-semibold text-white transition hover:bg-[#c9a84c] shadow-md"
          >
            Add to order
          </button>
        )}
      </div>
    </article>
  );
}

export default function Menu() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pay-counter');
  const [cart, setCart] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const menuUrl = useMemo(
    () => `${typeof window !== 'undefined' ? window.location.origin : ''}/menu`,
    [],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError('');
        
        // Dummy data for presentation
        const data = [
          {
            id: 'foods',
            name: 'Foods',
            items: [
              { id: '1', name: 'Whole Chicken', price: 15000, desc: 'Deliciously roasted whole chicken served with crispy fries and a side salad.', image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '2', name: 'Hot Starters', price: 8000, desc: 'A mix of spicy wings, meatballs, and cheese bites.', image: 'https://images.unsplash.com/photo-1541592106381-b31e9677c0e5?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '3', name: 'Beef Burger', price: 7000, desc: 'Juicy beef patty with cheese, lettuce, and our special sauce.', image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '4', name: 'Grilled Fish', price: 12000, desc: 'Freshly caught fish, grilled to perfection with lemon butter sauce.', image: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '10', name: 'Steak & Fries', price: 25000, desc: 'Premium cut beef steak, cooked to order with thick-cut chips.', image: 'https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=400&h=400' },
            ]
          },
          {
            id: 'drinks',
            name: 'Drinks',
            items: [
              { id: '5', name: 'Classic Mojito', price: 5000, desc: 'Refreshing mint and lime cocktail.', image: 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '6', name: 'Fresh Juice', price: 3000, desc: 'Freshly squeezed seasonal fruits.', image: 'https://images.unsplash.com/photo-1600271886742-f049cd451bba?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '7', name: 'Local Beer', price: 2000, desc: 'Ice-cold local beer.', image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '8', name: 'Red Wine (Glass)', price: 6000, desc: 'House red wine, served by the glass.', image: 'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&q=80&w=400&h=400' },
              { id: '9', name: 'Iced Coffee', price: 3500, desc: 'Chilled espresso with milk and ice.', image: 'https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80&w=400&h=400' },
            ]
          }
        ];
        
        // Simulate network delay
        await new Promise(resolve => setTimeout(resolve, 600));
        
        if (!cancelled) setCategories(data);
      } catch (err) {
        if (!cancelled) setError(err?.message || 'Failed to load menu.');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  const allItems = useMemo(() => flattenMenuItems(categories), [categories]);

  const visibleItems = useMemo(() => {
    let items = allItems;
    if (activeCategory !== 'all') {
      items = items.filter((item) => String(item.categoryId) === String(activeCategory));
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(query) || item.desc?.toLowerCase().includes(query),
      );
    }
    return items;
  }, [activeCategory, allItems, search]);

  const subtotal = useMemo(
    () => Object.values(cart).reduce((sum, line) => sum + line.item.price * line.qty, 0),
    [cart],
  );

  const total = subtotal;
  const hasCartItems = Object.keys(cart).length > 0;
  const totalQty = Object.values(cart).reduce((sum, line) => sum + line.qty, 0);

  function addItem(item) {
    setCart((current) => {
      const line = current[item.id] || { item, qty: 0 };
      return { ...current, [item.id]: { item, qty: line.qty + 1 } };
    });
  }

  function subItem(item) {
    setCart((current) => {
      const line = current[item.id];
      if (!line) return current;
      const qty = Math.max(0, line.qty - 1);
      const next = { ...current };
      if (qty === 0) delete next[item.id];
      else next[item.id] = { item: line.item, qty };
      return next;
    });
  }

  function removeItem(itemId) {
    setCart((current) => {
      const next = { ...current };
      delete next[itemId];
      return next;
    });
  }

  function validateCustomer() {
    if (!name.trim() || !phone.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your name and phone number.' });
      return false;
    }
    return true;
  }

  async function placeOrder(cardMasked) {
    await submitRestaurantOrder(
      buildOrderPayload({
        serviceType: 'dine-in',
        date: new Date().toISOString().split('T')[0],
        time: '12:00',
        partySize: 1,
        notes: '',
        promoCode: '',
        cart,
        customRequest: '',
        subtotal,
        discount: 0,
        total,
        paymentMethod,
        cardMasked,
        name,
        phone,
      }),
    );
    setStatusMessage({
      type: 'success',
      text: 'Order placed! We’ll start preparing your meal shortly.',
    });
    setCart({});
    setName('');
    setPhone('');
  }

  async function handleBuyNow() {
    if (!hasCartItems) {
      setStatusMessage({ type: 'error', text: 'Add some items first.' });
      return;
    }
    if (!validateCustomer()) return;
    if (paymentMethod === 'card') {
      setShowCardModal(true);
      return;
    }

    setPlacingOrder(true);
    try {
      await placeOrder();
    } catch (err) {
      setStatusMessage({ type: 'error', text: err?.message || 'Failed to place order.' });
    } finally {
      setPlacingOrder(false);
    }
  }

  async function handleCardConfirm({ masked }) {
    setShowCardModal(false);
    setPlacingOrder(true);
    try {
      await placeOrder(masked);
    } catch (err) {
      setStatusMessage({ type: 'error', text: err?.message || 'Payment failed.' });
    } finally {
      setPlacingOrder(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#faf9f7] relative pb-32 font-sans flex flex-col items-center w-full">
      {/* Top Header */}
      <div 
        className="w-full h-80 sm:h-[450px] bg-cover bg-center relative"
        style={{ backgroundImage: `url('/images/menu_hero.png')` }}
      >
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center pt-10">
          <div className="w-24 h-24 rounded-full border-[4px] border-white/20 bg-[#1c1a18] flex items-center justify-center shadow-2xl overflow-hidden mb-6">
            <img src="/homepageimgs/cropped-Velvet-.png" className="w-full h-full object-cover scale-110" alt="Velvet Suites" />
          </div>
          <h1 className="text-5xl sm:text-[70px] font-display text-white tracking-wide drop-shadow-xl font-medium">Our Menu</h1>
          <p className="text-[#c9a84c] tracking-[0.3em] uppercase text-sm sm:text-base mt-6 font-semibold">Velvet Restaurant & Bar</p>
        </div>
      </div>

      {/* Main Container - Full Page Layout */}
      <div className="w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col mt-[-50px]">
        
        <div className="bg-[#faf9f7] rounded-[3rem] shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-white p-6 sm:p-12">
          
          {/* Search Bar */}
          <div className="w-full max-w-2xl mx-auto relative mb-12">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 w-6 h-6 text-gray-400" strokeWidth={2} />
            <input 
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search our menu..."
              className="w-full bg-white text-[#1c1a18] rounded-full pl-16 pr-8 py-5 text-[1.1rem] outline-none shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-transparent focus:border-[#c9a84c] transition-all"
            />
          </div>

          {/* Category Navigation */}
          <div className="w-full flex flex-wrap justify-center gap-4 mb-14">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`px-8 py-3.5 rounded-full text-[14px] tracking-widest uppercase font-semibold transition-all shadow-sm ${activeCategory === 'all' ? 'bg-[#1c1a18] text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-[#e0dbd3] hover:bg-gray-50'}`}
            >
              All Items
            </button>
            {categories.map(c => (
              <button 
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`px-8 py-3.5 rounded-full text-[14px] tracking-widest uppercase font-semibold transition-all shadow-sm ${activeCategory === c.id ? 'bg-[#1c1a18] text-white shadow-lg scale-105' : 'bg-white text-gray-500 border border-[#e0dbd3] hover:bg-gray-50'}`}
              >
                {c.name}
              </button>
            ))}
          </div>

          {/* Menu Grid */}
          <div className="w-full">
            {loading ? (
              <div className="text-gray-500 text-center py-20 flex flex-col items-center bg-white rounded-3xl">
                <Loader2 className="h-10 w-10 animate-spin mb-4 text-[#c9a84c]" />
                <span className="text-lg">Loading our selection...</span>
              </div>
            ) : visibleItems.length === 0 ? (
              <div className="text-gray-500 font-medium text-center py-20 bg-white rounded-3xl shadow-sm text-lg">We couldn't find any items matching your search.</div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {visibleItems.map((item) => (
                  <MenuItemCard
                    key={item.id}
                    item={item}
                    qty={cart[item.id]?.qty || 0}
                    onAdd={() => addItem(item)}
                    onSub={() => subItem(item)}
                    menuUrl={menuUrl}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Pill */}
      {hasCartItems && !showCartModal && (
        <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60] bg-white border border-[#e0dbd3] pl-6 pr-3 py-3 shadow-[0_20px_50px_rgba(0,0,0,0.15)] rounded-full flex items-center justify-between gap-6 sm:gap-12 w-[90%] max-w-[500px]">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#faf9f7] flex items-center justify-center text-[#c9a84c] shrink-0">
              <ShoppingCart size={20} strokeWidth={2.5} />
            </div>
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-medium leading-none mb-1">{totalQty} {totalQty === 1 ? 'item' : 'items'}</span>
              <span className="text-[1.2rem] font-bold text-[#1c1a18] leading-none">{formatRwf(total)}</span>
            </div>
          </div>
          <button 
            onClick={() => setShowCartModal(true)}
            className="bg-[#1c1a18] text-white px-8 py-3.5 rounded-full font-semibold shadow-[0_8px_20px_rgba(28,26,24,0.3)] transition hover:bg-[#c9a84c] hover:shadow-[0_8px_20px_rgba(201,168,76,0.3)] whitespace-nowrap"
          >
            Checkout
          </button>
        </div>
      )}

      {/* Cart Modal Centered */}
      {showCartModal && (
        <div className="fixed inset-0 z-[100] flex justify-center items-start bg-black/60 backdrop-blur-sm pt-[130px] px-4 pb-6">
          <div className="w-full max-w-[600px] bg-[#faf9f7] max-h-[calc(100vh-160px)] rounded-[2rem] flex flex-col shadow-2xl relative animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="bg-white border-b border-[#e0dbd3] px-8 py-6 flex items-center justify-between z-10 shadow-sm shrink-0">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-[#faf9f7] flex items-center justify-center text-[#c9a84c]">
                  <ShoppingCart className="h-6 w-6" strokeWidth={2} />
                </div>
                <h3 className="text-[1.6rem] font-display font-semibold text-[#1c1a18]">Your Order</h3>
              </div>
              <button onClick={() => setShowCartModal(false)} className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center hover:bg-gray-200 text-gray-600 transition-colors">
                ✕
              </button>
            </div>
            
            <div className="flex-1 p-8 overflow-y-auto space-y-6">
              <div className="rounded-3xl border border-[#e0dbd3] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#1c1a18] uppercase tracking-wider">
                  <User className="h-5 w-5 text-[#c9a84c]" strokeWidth={2} />
                  Your details
                </div>
                <div className="grid gap-4">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full bg-[#faf9f7] border border-[#e0dbd3] rounded-2xl px-5 py-4 text-[1rem] outline-none focus:border-[#c9a84c] transition-colors text-[#1c1a18]" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full bg-[#faf9f7] border border-[#e0dbd3] rounded-2xl px-5 py-4 text-[1rem] outline-none focus:border-[#c9a84c] transition-colors text-[#1c1a18]" />
                </div>
              </div>
              
              <div className="rounded-3xl border border-[#e0dbd3] bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
                <div className="mb-5 flex items-center gap-2 text-sm font-semibold text-[#1c1a18] uppercase tracking-wider">
                  <CreditCard className="h-5 w-5 text-[#c9a84c]" strokeWidth={2} />
                  Payment
                </div>
                <div className="grid gap-5 text-[#1c1a18]">
                  <label className="flex items-center gap-3 text-[1.1rem] cursor-pointer">
                    <input type="radio" checked={paymentMethod === 'pay-counter'} onChange={() => setPaymentMethod('pay-counter')} className="w-5 h-5 text-[#1c1a18] focus:ring-[#1c1a18]" />
                    Pay at counter
                  </label>
                  <label className="flex items-center gap-3 text-[1.1rem] cursor-pointer">
                    <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-5 h-5 text-[#1c1a18] focus:ring-[#1c1a18]" />
                    Pay now (card)
                  </label>
                </div>
              </div>

              <div className="space-y-5 pt-4">
                <h4 className="text-[1.2rem] font-display font-semibold text-[#1c1a18] mb-2">Order Items</h4>
                {Object.values(cart).map(({ item, qty }) => (
                  <div key={item.id} className="flex flex-col gap-4 border-b border-[#e0dbd3] pb-5 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-5">
                      <img src={item.image || PLACEHOLDER} className="h-20 w-20 rounded-2xl object-cover shadow-sm" />
                      <div className="min-w-0">
                        <div className="truncate text-[1.1rem] font-semibold text-[#1c1a18] font-display">{item.name}</div>
                        <div className="text-[0.95rem] text-gray-500 mt-1">{formatRwf(item.price)}</div>
                      </div>
                    </div>
                    <div className="flex items-center justify-between sm:justify-end gap-4">
                      <div className="inline-flex items-center rounded-full border border-[#e0dbd3] bg-white">
                        <button type="button" onClick={() => subItem(item)} className="px-4 py-2 text-gray-600 hover:text-[#1c1a18] transition-colors">-</button>
                        <div className="px-2 text-[1.1rem] font-bold text-[#1c1a18] min-w-[24px] text-center">{qty}</div>
                        <button type="button" onClick={() => addItem(item)} className="px-4 py-2 text-gray-600 hover:text-[#1c1a18] transition-colors">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-3 text-rose-500 hover:bg-rose-50 rounded-full transition-colors"><Trash2 className="h-5 w-5" /></button>
                    </div>
                  </div>
                ))}

                <div className="space-y-3 pt-6">
                  <div className="flex justify-between text-gray-500 text-[1.1rem]"><span>Subtotal</span><span>{formatRwf(subtotal || 0)}</span></div>
                  <div className="flex items-center justify-between pt-4 text-[1.6rem] font-bold text-[#1c1a18] font-display border-t border-dashed border-[#e0dbd3]">
                    <span>Total</span><span className="text-[#c9a84c]">{formatRwf(total || 0)}</span>
                  </div>
                </div>

                {statusMessage && (
                  <div className={`p-5 rounded-2xl text-[1rem] font-medium text-center ${statusMessage.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-green-50 text-green-700'}`}>
                    {statusMessage.text}
                  </div>
                )}

                <div className="pt-8 pb-10">
                  <button onClick={handleBuyNow} disabled={placingOrder} className="w-full bg-[#1c1a18] text-white rounded-full py-5 text-[1.2rem] font-semibold shadow-[0_15px_30px_rgba(28,26,24,0.2)] transition-colors hover:bg-[#c9a84c] disabled:opacity-70">
                    {placingOrder ? 'Placing Order...' : 'Confirm Order'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <CardPaymentModal
        open={showCardModal}
        total={total || 0}
        onClose={() => setShowCardModal(false)}
        onConfirm={handleCardConfirm}
      />
    </div>
  );
}
