import React from 'react';
import { useApp } from '../../context/AppContext';
import { Home, Search, CalendarClock, ShoppingBag, FileText, User } from 'lucide-react';

export const CustomerNav: React.FC = () => {
  const { customerView, setCustomerView, cart } = useApp();

  const totalCartCount = cart.reduce((acc, curr) => acc + curr.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: <Home size={18} /> },
    { id: 'search', label: 'Medicines', icon: <Search size={18} /> },
    { id: 'regular', label: 'Regular', icon: <CalendarClock size={18} /> },
    { 
      id: 'cart', 
      label: 'Cart', 
      icon: <ShoppingBag size={18} />, 
      badge: totalCartCount > 0 ? totalCartCount : undefined 
    },
    { id: 'orders', label: 'Orders', icon: <FileText size={18} /> },
    { id: 'profile', label: 'Profile', icon: <User size={18} /> }
  ];

  return (
    <nav className="mobile-bottom-nav">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`bottom-nav-item ${customerView === item.id ? 'active' : ''}`}
          onClick={() => setCustomerView(item.id)}
        >
          {item.badge && <span className="cart-badge-pill">{item.badge}</span>}
          {item.icon}
          <span>{item.label}</span>
        </button>
      ))}
    </nav>
  );
};
