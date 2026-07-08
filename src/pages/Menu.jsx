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
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <form
        onSubmit={handleConfirm}
        className="w-full max-w-md rounded-3xl border border-gray-200 bg-white p-6 shadow-2xl"
      >
        <h3 className="font-display text-2xl font-semibold text-gray-900">Pay now (demo)</h3>
        <p className="mt-1 text-sm text-gray-500">Total: {formatRwf(total)}</p>
        <div className="mt-4 space-y-3">
          <input
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
            placeholder="Card number"
            className="w-full rounded-lg border border-gray-300 px-4 py-2"
            required
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              placeholder="MM/YY"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              required
            />
            <input
              value={cvc}
              onChange={(e) => setCvc(e.target.value)}
              placeholder="CVC"
              className="w-full rounded-lg border border-gray-300 px-4 py-2"
              required
            />
          </div>
        </div>
        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button type="button" onClick={onClose} className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold hover:bg-gray-50 transition-colors">
            Cancel
          </button>
          <button type="submit" className="flex-1 rounded-lg bg-[#8c4021] text-white px-4 py-2 font-semibold hover:bg-[#733318] transition-colors">
            Pay
          </button>
        </div>
      </form>
    </div>
  );
}

function MenuItemCard({ item, qty, onAdd, onSub, menuUrl }) {
  return (
    <article className="flex items-center gap-4 bg-[#fdfaf6] rounded-[16px] p-2.5 mb-3 shadow-[0_2px_10px_rgba(0,0,0,0.06)] border border-white">
      <img
        src={item.image || PLACEHOLDER}
        alt={item.name}
        className="h-[84px] w-[84px] rounded-[12px] object-cover shrink-0 shadow-sm"
        loading="lazy"
      />
      <div className="flex-1 min-w-0 py-1 flex flex-col justify-center">
        <h4 className="font-bold text-[16px] text-gray-900 leading-tight truncate">{item.name}</h4>
        {item.desc && (
          <p className="text-[12px] text-gray-400 mt-1 line-clamp-1">{item.desc}</p>
        )}
        <div className="mt-1.5 font-bold text-[15px] text-[#8c4021]">
          {formatRwf(item.price)}
        </div>
      </div>
      <div className="shrink-0 pr-2 flex items-center h-full">
        {qty > 0 ? (
          <div className="flex items-center gap-3 bg-[#f5efe6] rounded-[10px] px-2 py-1.5 text-sm font-bold text-[#8c4021]">
            <button type="button" onClick={onSub} className="w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-50">-</button>
            <span>{qty}</span>
            <button type="button" onClick={onAdd} className="w-6 h-6 flex items-center justify-center rounded-md bg-white shadow-sm hover:bg-gray-50">+</button>
          </div>
        ) : (
          <button
            type="button"
            onClick={onAdd}
            className="rounded-[10px] bg-[#8c4021] px-5 py-2 text-[14px] font-bold text-white transition hover:bg-[#733318] shadow-md"
          >
            Add
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
    <div className="min-h-screen bg-white relative pb-10 font-sans flex flex-col items-center">
      {/* Top Header */}
      <div 
        className="w-full h-64 sm:h-80 bg-cover bg-center relative"
        style={{ backgroundImage: `url('/homepageimgs/628B0243-Edited-1920x1280.jpg.jpeg')` }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-5xl sm:text-[60px] font-display text-white mt-8 tracking-wide drop-shadow-lg">Our Menu</h1>
        </div>
      </div>

      {/* Main Container - The Mobile Box */}
      <div className="w-full max-w-[480px] h-[700px] overflow-y-auto relative shadow-[0_10px_40px_rgba(0,0,0,0.15)] bg-white flex flex-col rounded-b-md scrollbar-thin scrollbar-thumb-gray-300">
        
        {/* Yellow Patio Background inside the box */}
        <div 
          className="absolute inset-0 z-0 bg-top bg-cover"
          style={{ backgroundImage: `url('/homepageimgs/628B0145-Edited-scaled.jpg.jpeg')` }}
        ></div>
        <div className="absolute inset-0 z-0 bg-white/10 pointer-events-none"></div> 

        <div className="relative z-10 flex flex-col items-center pt-8 px-5 pb-24">
          <img src="/homepageimgs/cropped-Velvet-.png" className="w-[84px] h-[84px] rounded-full border-[3px] border-white bg-[#5e1914] p-1 object-cover shadow-lg" alt="Velvet Suites" />
          <h2 className="text-[#4a2311] font-display font-bold tracking-[0.2em] uppercase mt-3 mb-6 text-[18px] drop-shadow-sm">VELVET</h2>
          
          <div className="w-full relative mb-5">
            <FileText className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#8c4021]" strokeWidth={2} />
            <select 
              value={activeCategory} 
              onChange={(e) => setActiveCategory(e.target.value)}
              className="w-full bg-white text-[#8c4021] rounded-[14px] pl-[46px] pr-10 py-[14px] text-[15px] font-bold outline-none shadow-[0_2px_10px_rgba(0,0,0,0.05)] appearance-none border border-[#4a2311]/20 cursor-pointer"
            >
              <option value="all">All Items</option>
              {categories.map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
          </div>

          <div className="w-full flex items-center gap-2.5 overflow-x-auto pb-5 scrollbar-hide">
            <button 
              onClick={() => setActiveCategory('all')}
              className={`shrink-0 px-6 py-[9px] rounded-[10px] text-[12px] tracking-wider font-bold transition-all shadow-sm ${activeCategory === 'all' ? 'bg-[#8c4021] text-white border-transparent' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
            >
              ALL
            </button>
            {categories.map(c => (
              <button 
                key={c.id}
                onClick={() => setActiveCategory(c.id)}
                className={`shrink-0 px-5 py-[9px] rounded-[10px] text-[12px] tracking-wider font-bold transition-all shadow-sm uppercase ${activeCategory === c.id ? 'bg-[#8c4021] text-white border-transparent' : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'}`}
              >
                {c.name}
              </button>
            ))}
            <div className="ml-auto shrink-0 pl-2">
              <button className="w-10 h-10 flex items-center justify-center rounded-full bg-white shadow-sm border border-gray-200 text-gray-500 hover:text-gray-900 transition-colors">
                <Search className="w-4 h-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="w-full space-y-3.5">
            {loading ? (
              <div className="text-gray-800 text-center py-10 flex flex-col items-center bg-white/80 rounded-[16px] backdrop-blur-sm">
                <Loader2 className="h-6 w-6 animate-spin mb-2" />
                Loading menu...
              </div>
            ) : visibleItems.length === 0 ? (
              <div className="text-gray-800 font-medium text-center py-10 bg-white/80 rounded-[16px] shadow-sm backdrop-blur-sm">No items match your search.</div>
            ) : (
              visibleItems.map((item) => (
                <MenuItemCard
                  key={item.id}
                  item={item}
                  qty={cart[item.id]?.qty || 0}
                  onAdd={() => addItem(item)}
                  onSub={() => subItem(item)}
                  menuUrl={menuUrl}
                />
              ))
            )}
          </div>
        </div>
      </div>

      {/* Floating Cart Bar (Constrained to the mobile container) */}
      {hasCartItems && !showCartModal && (
        <div className="fixed bottom-0 z-[60] w-full max-w-[480px] bg-white border-t border-gray-200 p-4 shadow-[0_-10px_20px_rgba(0,0,0,0.05)] rounded-b-md">
          <div className="flex items-center justify-between">
            <div className="flex flex-col">
              <span className="text-sm text-gray-500 font-medium">{totalQty} {totalQty === 1 ? 'item' : 'items'}</span>
              <span className="text-lg font-bold text-gray-900">{formatRwf(total)}</span>
            </div>
            <button 
              onClick={() => setShowCartModal(true)}
              className="bg-[#8c4021] text-white px-8 py-3 rounded-xl font-bold shadow-[0_4px_14px_rgba(140,64,33,0.4)] transition hover:bg-[#733318]"
            >
              View Cart
            </button>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      {showCartModal && (
        <div className="fixed inset-0 z-[70] flex justify-center bg-black/40 backdrop-blur-sm">
          <div className="w-full max-w-[480px] bg-[#fcfaf5] h-full flex flex-col shadow-2xl relative">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-5 py-4 flex items-center justify-between z-10 shadow-sm">
              <div className="flex items-center gap-2">
                <ShoppingCart className="h-5 w-5 text-[#8c4021]" strokeWidth={2} />
                <h3 className="text-[20px] font-display font-semibold text-gray-900">Your Order</h3>
              </div>
              <button onClick={() => setShowCartModal(false)} className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 transition-colors">
                ✕
              </button>
            </div>
            
            <div className="flex-1 p-5 overflow-y-auto space-y-4">
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <User className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                  Your details
                </div>
                <div className="grid gap-3">
                  <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8c4021] transition-colors" />
                  <input value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm outline-none focus:border-[#8c4021] transition-colors" />
                </div>
              </div>
              <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-gray-900">
                  <CreditCard className="h-4 w-4 text-gray-500" strokeWidth={1.5} />
                  Payment
                </div>
                <div className="grid gap-3 text-gray-900">
                  <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input type="radio" checked={paymentMethod === 'pay-counter'} onChange={() => setPaymentMethod('pay-counter')} className="w-4 h-4 text-[#8c4021] focus:ring-[#8c4021]" />
                    Pay at counter
                  </label>
                  <label className="flex items-center gap-3 text-sm cursor-pointer">
                    <input type="radio" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} className="w-4 h-4 text-[#8c4021] focus:ring-[#8c4021]" />
                    Pay now (card)
                  </label>
                </div>
              </div>

              <div className="space-y-4 pt-2">
                {Object.values(cart).map(({ item, qty }) => (
                  <div key={item.id} className="flex flex-col gap-3 border-b border-gray-100 pb-4 sm:flex-row sm:items-center">
                    <div className="flex min-w-0 flex-1 items-center gap-3">
                      <img src={item.image || PLACEHOLDER} className="h-14 w-14 rounded-xl object-cover" />
                      <div className="min-w-0">
                        <div className="truncate text-sm font-bold text-gray-900">{item.name}</div>
                        <div className="text-xs text-gray-500">{formatRwf(item.price)}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="inline-flex items-center rounded-full border border-gray-200 bg-white">
                        <button type="button" onClick={() => subItem(item)} className="px-3 py-1.5 text-gray-600 hover:text-gray-900 transition-colors">-</button>
                        <div className="px-2 text-sm font-bold text-gray-900">{qty}</div>
                        <button type="button" onClick={() => addItem(item)} className="px-3 py-1.5 text-gray-600 hover:text-gray-900 transition-colors">+</button>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="p-2 text-rose-500 hover:bg-rose-50 rounded-full transition-colors"><Trash2 className="h-4 w-4" /></button>
                    </div>
                  </div>
                ))}

                <div className="space-y-1 pt-2 text-sm">
                  <div className="flex justify-between text-gray-500"><span>Subtotal</span><span>{formatRwf(subtotal || 0)}</span></div>
                  <div className="flex items-center justify-between pt-2 text-lg font-bold text-gray-900">
                    <span>Total</span><span className="text-[#8c4021]">{formatRwf(total || 0)}</span>
                  </div>
                </div>

                {statusMessage && (
                  <div className={`p-3 rounded-lg text-sm font-medium ${statusMessage.type === 'error' ? 'bg-rose-50 text-rose-600' : 'bg-green-50 text-green-700'}`}>
                    {statusMessage.text}
                  </div>
                )}

                <div className="pt-2 pb-4">
                  <button onClick={handleBuyNow} disabled={placingOrder} className="w-full bg-[#8c4021] text-white rounded-xl py-3.5 font-bold shadow-md transition-colors hover:bg-[#733318] disabled:opacity-70">
                    {placingOrder ? 'Placing...' : 'Buy now'}
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
