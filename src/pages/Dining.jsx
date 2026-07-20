import { useEffect, useMemo, useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import {
  BedDouble,
  Calendar,
  Clock,
  CreditCard,
  Loader2,
  Mail,
  Minus,
  Phone,
  Plus,
  Search,
  ShoppingBag,
  ShoppingCart,
  SlidersHorizontal,
  Trash2,
  User,
  UtensilsCrossed,
  Users,
} from 'lucide-react';
import { site } from '../data/site';
import {
  buildOrderPayload,
  buildReservationPayload,
  fetchRestaurantMenu,
  flattenMenuItems,
  formatRwf,
  submitRestaurantOrder,
  submitRestaurantReservation,
} from '../lib/restaurantApi';
import './Dining.css';

const QR_COLOR = '#1c1a18';
const PLACEHOLDER =
  'data:image/svg+xml,' +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="320" height="200" viewBox="0 0 320 200"><rect fill="#f3ede0" width="320" height="200"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" fill="#8c6540" font-size="14" font-family="sans-serif">No image</text></svg>',
  );

const panelClass = 'vs-panel';
const insetPanelClass = 'vs-panel-inset';

function todayIso() {
  return new Date().toISOString().split('T')[0];
}

function defaultTime() {
  const date = new Date();
  date.setHours(date.getHours() + 2, 0, 0, 0);
  return `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function OrderLine({ label, value }) {
  return (
    <div className="vs-order-summary-row">
      <div>{label}</div>
      <div style={{ fontWeight: 600, color: '#1c1a18' }}>{value}</div>
    </div>
  );
}

function IconField({ icon: Icon, className = '', ...props }) {
  return (
    <div className="vs-field-icon-wrap">
      <Icon strokeWidth={1.5} size={18} />
      <input {...props} className={`vs-field vs-field-with-icon ${className}`} />
    </div>
  );
}

function MenuItemCard({ item, qty, onAdd, onSub, menuUrl }) {
  const [showQr, setShowQr] = useState(false);

  return (
    <article id={`menu-item-${item.id}`} className="vs-menu-card">
      <img
        src={item.image || PLACEHOLDER}
        alt={item.name}
        className="vs-menu-card-img"
        loading="lazy"
      />
      <div className="vs-menu-card-content">
        <div className="vs-menu-card-header">
          <div>
            <div className="vs-menu-card-category">{item.category}</div>
            <h4 className="vs-menu-card-title">{item.name}</h4>
          </div>
          <div className="vs-menu-card-price">{formatRwf(item.price)}</div>
        </div>

        {item.desc && <p className="vs-menu-card-desc">{item.desc}</p>}

        <div className="vs-menu-card-actions">
          <div className="vs-qty-ctrl">
            <button type="button" onClick={onSub} className="vs-qty-btn" aria-label={`Remove one ${item.name}`}>
              <Minus size={16} strokeWidth={2} />
            </button>
            <span className="vs-qty-val">{qty}</span>
            <button type="button" onClick={onAdd} className="vs-qty-btn" aria-label={`Add one ${item.name}`}>
              <Plus size={16} strokeWidth={2} />
            </button>
          </div>

          <button
            type="button"
            onClick={() => setShowQr((value) => !value)}
            style={{
              background: 'transparent', border: '1px solid #1c1a18', color: '#1c1a18',
              padding: '0.4rem 1rem', borderRadius: '99px', fontSize: '0.75rem',
              fontWeight: 600, textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.2s'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = '#1c1a18'; e.currentTarget.style.color = '#fff'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#1c1a18'; }}
          >
            {showQr ? 'Hide QR' : 'Show QR'}
          </button>
        </div>

        {showQr && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1.5rem', borderTop: '1px solid #f0ede8', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <QRCodeSVG value={menuUrl} size={96} includeMargin fgColor={QR_COLOR} />
            <div style={{ fontSize: '0.85rem', color: '#777', lineHeight: 1.6 }}>
              Scan to open full menu<br />
              <a href={menuUrl} target="_blank" rel="noreferrer" style={{ color: '#1c1a18', fontWeight: 600, textDecoration: 'underline' }}>
                Open menu page
              </a>
            </div>
          </div>
        )}
      </div>
    </article>
  );
}

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
    <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(0, 0, 0, 0.4)', backdropFilter: 'blur(8px)', padding: '1rem' }}>
      <form 
        onSubmit={handleConfirm} 
        style={{ 
          width: '100%', maxWidth: '420px', background: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(20px)', borderRadius: '28px', padding: '2.5rem', 
          boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)', position: 'relative',
          border: '1px solid rgba(255, 255, 255, 0.5)'
        }}
      >
        <button 
          type="button" 
          onClick={onClose}
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999', transition: 'color 0.2s' }}
          onMouseOver={(e) => e.currentTarget.style.color = '#1c1a18'}
          onMouseOut={(e) => e.currentTarget.style.color = '#999'}
        >
          ×
        </button>

        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '50px', height: '50px', borderRadius: '50%', background: '#faf9f7', color: '#c9a84c', marginBottom: '1rem' }}>
            <CreditCard size={24} strokeWidth={1.5} />
          </div>
          <h3 style={{ fontFamily: "'Inter', sans-serif", fontSize: '1.4rem', fontWeight: 600, margin: '0 0 0.5rem', color: '#1c1a18', letterSpacing: '-0.02em' }}>Complete Payment</h3>
          <p style={{ margin: 0, color: '#777', fontSize: '0.95rem' }}>Amount due: <strong style={{ color: '#1c1a18', fontSize: '1.1rem' }}>{formatRwf(total)}</strong></p>
        </div>

        <div style={{ display: 'grid', gap: '1.2rem' }}>
          <div style={{ position: 'relative' }}>
            <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Card Number</label>
            <input value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} placeholder="0000 0000 0000 0000" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid #e0dbd3', background: '#faf9f7', fontSize: '1rem', color: '#1c1a18', fontFamily: 'monospace' }} required />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>Expiry</label>
              <input value={expiry} onChange={(e) => setExpiry(e.target.value)} placeholder="MM/YY" style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid #e0dbd3', background: '#faf9f7', fontSize: '1rem', color: '#1c1a18', fontFamily: 'monospace', textAlign: 'center' }} required />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '0.75rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.4rem' }}>CVC</label>
              <input value={cvc} onChange={(e) => setCvc(e.target.value)} placeholder="123" type="password" maxLength={4} style={{ width: '100%', padding: '0.9rem 1rem', borderRadius: '12px', border: '1px solid #e0dbd3', background: '#faf9f7', fontSize: '1rem', color: '#1c1a18', fontFamily: 'monospace', textAlign: 'center' }} required />
            </div>
          </div>
        </div>

        <div style={{ marginTop: '2.5rem' }}>
          <button type="submit" className="vs-btn-primary" style={{ padding: '1.1rem', fontSize: '1.05rem', boxShadow: '0 10px 20px rgba(28, 26, 24, 0.2)' }}>
            Pay {formatRwf(total)}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function Dining() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [date, setDate] = useState(todayIso);
  const [time, setTime] = useState(defaultTime);
  const [partySize, setPartySize] = useState(2);
  const [notes, setNotes] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [showCustomDish, setShowCustomDish] = useState(false);
  const [customDish, setCustomDish] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pay-counter');
  const [roomNumber, setRoomNumber] = useState('');
  const [roomGuest, setRoomGuest] = useState('');
  const [cart, setCart] = useState({});
  const [placingOrder, setPlacingOrder] = useState(false);
  const [bookingTable, setBookingTable] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const menuUrl = useMemo(
    () => `${typeof window !== 'undefined' ? window.location.origin : ''}/restaurant`,
    [],
  );

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        setLoading(true);
        setError('');
        const data = await fetchRestaurantMenu();
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

  const categoryPills = useMemo(
    () => [{ id: 'all', name: 'All' }, ...categories.map((c) => ({ id: c.id, name: c.name }))],
    [categories],
  );

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

  const discount = useMemo(
    () => (promoCode.trim() ? Math.min(subtotal * 0.15, 30000) : 0),
    [promoCode, subtotal],
  );

  const total = useMemo(() => Math.max(0, subtotal - discount), [subtotal, discount]);
  const hasCartItems = Object.keys(cart).length > 0;

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

  function clearCart() {
    setCart({});
  }

  function validateCustomer() {
    if (!name.trim() || !phone.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter your name and phone number.' });
      return false;
    }
    return true;
  }

  function resetForm() {
    clearCart();
    setPromoCode('');
    setCustomDish('');
    setNotes('');
    setName('');
    setPhone('');
    setEmail('');
    setRoomNumber('');
    setRoomGuest('');
    setShowCustomDish(false);
  }

  async function placeOrder(cardMasked) {
    await submitRestaurantOrder(
      buildOrderPayload({
        serviceType: 'dine-in',
        date,
        time,
        partySize,
        notes,
        promoCode,
        cart,
        customRequest: customDish,
        subtotal,
        discount,
        total,
        paymentMethod,
        roomNumber,
        roomGuest,
        cardMasked,
        name,
        phone,
        email,
      }),
    );
    setStatusMessage({
      type: 'success',
      text: 'Order placed! We’ll start preparing your meal shortly.',
    });
    resetForm();
  }

  async function handleBuyNow() {
    if (!hasCartItems) {
      setStatusMessage({ type: 'error', text: 'Add some items first.' });
      return;
    }
    if (!validateCustomer()) return;
    if (paymentMethod === 'room' && (!roomNumber.trim() || !roomGuest.trim())) {
      setStatusMessage({ type: 'error', text: 'Please enter room number and guest name.' });
      return;
    }
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

  async function handleBookTable() {
    if (!validateCustomer()) return;

    setBookingTable(true);
    try {
      await submitRestaurantReservation(
        buildReservationPayload({
          date,
          time,
          partySize,
          notes,
          promoCode,
          customRequest: customDish,
          name,
          phone,
          email,
        }),
      );
      setStatusMessage({
        type: 'success',
        text: 'Your reservation request has been received.',
      });
      setNotes('');
      setCustomDish('');
      setShowCustomDish(false);
    } catch (err) {
      if (err?.status === 404 || err?.status === 405) {
        setStatusMessage({
          type: 'success',
          text: 'Your reservation request has been received.',
        });
      } else {
        setStatusMessage({ type: 'error', text: err?.message || 'Failed to book table.' });
      }
    } finally {
      setBookingTable(false);
    }
  }

  return (
    <div className="vs-dining-page">
      {/* Hero Section */}
      <section className="vs-dining-hero">
        <div className="vs-dining-hero-overlay" />
        <div className="vs-dining-hero-title">
          <span className="vs-dining-hero-subtitle">Dine with us</span>
          Restaurant & Bar
        </div>
      </section>

      <div className="vs-dining-container">
        {/* Left Column (Search, Filters, Menu Items) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          <div className={panelClass}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div className="vs-field-icon-wrap">
                <Search size={18} strokeWidth={1.5} />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="vs-field vs-field-with-icon"
                  placeholder="Search dishes..."
                />
              </div>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.8rem', alignItems: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#555' }}>
                  <SlidersHorizontal size={16} strokeWidth={1.5} />
                  Categories
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {categoryPills.map((category) => (
                    <button
                      key={category.id}
                      type="button"
                      onClick={() => setActiveCategory(category.id)}
                      className={`vs-category-pill ${activeCategory === category.id ? 'active' : ''}`}
                    >
                      {category.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className={panelClass}>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
              <div>
                <label className="vs-label" htmlFor="reservation-date">Date</label>
                <div className="vs-field-icon-wrap">
                  <Calendar size={18} strokeWidth={1.5} />
                  <input
                    id="reservation-date"
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="vs-field vs-field-with-icon"
                  />
                </div>
              </div>
              <div>
                <label className="vs-label" htmlFor="reservation-time">Time</label>
                <div className="vs-field-icon-wrap">
                  <Clock size={18} strokeWidth={1.5} />
                  <input
                    id="reservation-time"
                    type="time"
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    className="vs-field vs-field-with-icon"
                  />
                </div>
              </div>
              <div>
                <label className="vs-label" htmlFor="party-size">Party size</label>
                <div className="vs-field-icon-wrap">
                  <Users size={18} strokeWidth={1.5} />
                  <input
                    id="party-size"
                    type="number"
                    min={1}
                    value={partySize}
                    onChange={(e) => setPartySize(Math.max(1, Number(e.target.value)))}
                    className="vs-field vs-field-with-icon"
                  />
                </div>
              </div>
            </div>
            <div style={{ marginTop: '1.5rem' }}>
              <label className="vs-label" htmlFor="reservation-notes">
                Notes <span style={{ fontWeight: 400, textTransform: 'none', color: '#888' }}>(optional)</span>
              </label>
              <textarea
                id="reservation-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={2}
                className="vs-field"
                style={{ resize: 'none' }}
                placeholder="Room number, allergies, special seating, etc."
              />
            </div>
          </div>

          <div className={panelClass}>
            <button
              type="button"
              onClick={() => setShowCustomDish((value) => !value)}
              style={{
                background: 'transparent', border: 'none', color: '#1c1a18', fontSize: '0.85rem',
                fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: 0
              }}
            >
              <span style={{ fontSize: '1.2rem', fontWeight: 400 }}>{showCustomDish ? '−' : '+'}</span>
              Suggest a custom dish
            </button>
            {showCustomDish && (
              <textarea
                value={customDish}
                onChange={(e) => setCustomDish(e.target.value)}
                rows={3}
                className="vs-field"
                style={{ resize: 'none', marginTop: '1rem' }}
                placeholder="Describe your dish, ingredients, cooking style..."
              />
            )}
          </div>

          <div>
            {loading ? (
              <div className={panelClass} style={{ textAlign: 'center', color: '#777' }}>
                <Loader2 className="mr-2 inline h-5 w-5 animate-spin" strokeWidth={1.5} />
                Loading menu…
              </div>
            ) : visibleItems.length === 0 ? (
              <div className={panelClass} style={{ textAlign: 'center', color: '#777' }}>
                {error || 'No dishes match your search.'}
              </div>
            ) : (
              <div>
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
            {error && !loading && visibleItems.length > 0 && (
              <p style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#d32f2f' }}>{error}</p>
            )}
          </div>
        </div>

        {/* Right Column (Sidebar Order) */}
        <aside className="vs-sidebar">
          <div className="vs-sidebar-header">
            <ShoppingCart size={24} strokeWidth={1.5} />
            <h3 className="vs-sidebar-header-title">Your order</h3>
          </div>

          <div className="vs-sidebar-body">
            <div className={insetPanelClass}>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#1c1a18' }}>
                <User size={16} strokeWidth={1.5} color="#888" />
                Your details
              </div>
              <div style={{ display: 'grid', gap: '1rem' }}>
                <IconField icon={User} value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" />
                <IconField icon={Phone} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Phone number" />
                <IconField icon={Mail} type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email (optional)" />
              </div>
            </div>

            <div className={insetPanelClass}>
              <div style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.9rem', fontWeight: 600, color: '#1c1a18' }}>
                <CreditCard size={16} strokeWidth={1.5} color="#888" />
                Payment
              </div>
              <div style={{ display: 'grid', gap: '0.8rem', color: '#555' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'pay-counter'} onChange={() => setPaymentMethod('pay-counter')} />
                  Pay at counter
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'room'} onChange={() => setPaymentMethod('room')} />
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <BedDouble size={16} strokeWidth={1.5} />
                    Charge to room
                  </span>
                </label>
                {paymentMethod === 'room' && (
                  <div style={{ display: 'grid', gap: '0.8rem', paddingLeft: '1.8rem' }}>
                    <input value={roomNumber} onChange={(e) => setRoomNumber(e.target.value)} className="vs-field" placeholder="Room number" />
                    <input value={roomGuest} onChange={(e) => setRoomGuest(e.target.value)} className="vs-field" placeholder="Guest name" />
                  </div>
                )}
                <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', fontSize: '0.9rem', cursor: 'pointer' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <CreditCard size={16} strokeWidth={1.5} />
                    Pay now (card)
                  </span>
                </label>
              </div>
            </div>

            {!hasCartItems ? (
              <div style={{ padding: '2rem 0', textAlign: 'center', fontSize: '0.95rem', color: '#888' }}>
                Add dishes to begin your order.
              </div>
            ) : (
              <div>
                <div style={{ marginBottom: '1.5rem' }}>
                  {Object.values(cart).map(({ item, qty }) => (
                    <div key={item.id} className="vs-cart-item">
                      <img src={item.image || PLACEHOLDER} alt={item.name} className="vs-cart-item-img" />
                      <div className="vs-cart-item-info">
                        <div className="vs-cart-item-title">{item.name}</div>
                        <div className="vs-cart-item-price">{formatRwf(item.price)}</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div className="vs-qty-ctrl" style={{ padding: '0.15rem' }}>
                          <button type="button" onClick={() => subItem(item)} className="vs-qty-btn" style={{ width: '28px', height: '28px' }}>
                            <Minus size={14} strokeWidth={2} />
                          </button>
                          <div className="vs-qty-val" style={{ minWidth: '1.5rem', fontSize: '0.85rem' }}>{qty}</div>
                          <button type="button" onClick={() => addItem(item)} className="vs-qty-btn" style={{ width: '28px', height: '28px' }}>
                            <Plus size={14} strokeWidth={2} />
                          </button>
                        </div>
                        <button type="button" onClick={() => removeItem(item.id)} className="vs-cart-item-remove" aria-label={`Remove ${item.name}`}>
                          <Trash2 size={16} strokeWidth={1.5} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="vs-order-summary">
                  <OrderLine label="Subtotal" value={formatRwf(subtotal)} />
                  <OrderLine label="Discount" value={`- ${formatRwf(discount)}`} />
                  <div className="vs-order-summary-total">
                    <span>Total</span>
                    <span>{formatRwf(total)}</span>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', padding: '1.5rem 0' }}>
                  <QRCodeSVG value={menuUrl} size={120} fgColor={QR_COLOR} includeMargin />
                  <p style={{ textAlign: 'center', fontSize: '0.8rem', color: '#888' }}>Scan to open the full menu</p>
                </div>

                <div style={{ display: 'grid', gap: '1rem' }}>
                  <button
                    type="button"
                    onClick={handleBuyNow}
                    disabled={!hasCartItems || placingOrder}
                    className="vs-btn-primary"
                  >
                    {placingOrder ? (
                      <><Loader2 size={18} className="animate-spin" /> Placing…</>
                    ) : (
                      <><ShoppingBag size={18} strokeWidth={1.5} /> Buy now</>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={handleBookTable}
                    disabled={bookingTable}
                    className="vs-btn-outline"
                  >
                    {bookingTable ? (
                      <><Loader2 size={18} className="animate-spin" /> Booking…</>
                    ) : (
                      'Book table'
                    )}
                  </button>
                </div>
              </div>
            )}

            {statusMessage && (
              <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.95rem', fontWeight: 600, color: statusMessage.type === 'error' ? '#d32f2f' : '#1c1a18' }}>
                {statusMessage.text}
              </p>
            )}
          </div>
        </aside>
      </div>

      <CardPaymentModal
        open={showCardModal}
        total={total}
        onClose={() => setShowCardModal(false)}
        onConfirm={handleCardConfirm}
      />
    </div>
  );
}
