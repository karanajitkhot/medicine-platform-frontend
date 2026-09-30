import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { RefillBanner } from '../../components/customer/RefillBanner';
import { MedicineCard } from '../../components/customer/MedicineCard';
import { MedicineDetailsModal } from '../../components/customer/MedicineDetailsModal';
import { Medicine, MedicineCategory } from '../../types';
import { 
  Search, 
  CalendarClock, 
  UploadCloud, 
  History, 
  MapPin, 
  PhoneCall, 
  Heart, 
  Activity, 
  Layers, 
  ShieldCheck, 
  Truck,
  ArrowRight
} from 'lucide-react';

export const CustomerHomePage: React.FC = () => {
  const { 
    customerProfile, 
    setCustomerView, 
    orders, 
    medicines, 
    setSelectedOrderId, 
    t 
  } = useApp();

  const [selectedMed, setSelectedMed] = useState<Medicine | null>(null);

  const categories: { label: MedicineCategory; icon: React.ReactNode; count: number }[] = [
    { label: 'Diabetes', icon: <Activity size={18} color="#059669" />, count: 2 },
    { label: 'Blood Pressure', icon: <Heart size={18} color="#e11d48" />, count: 2 },
    { label: 'Thyroid', icon: <Layers size={18} color="#d97706" />, count: 1 },
    { label: 'Cholesterol', icon: <ShieldCheck size={18} color="#2563eb" />, count: 1 },
    { label: 'General Wellness', icon: <Activity size={18} color="#7c3aed" />, count: 2 }
  ];

  // Active ongoing orders
  const activeOrders = orders.filter(o => o.status !== 'DELIVERED' && o.status !== 'CANCELLED');
  const latestActiveOrder = activeOrders[0];

  return (
    <div className="customer-home">
      {/* Top Greeting & Village indicator */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <span className="text-xs text-muted">{t('hello')},</span>
          <h2 className="font-bold text-xl">{customerProfile.name}</h2>
          <div className="flex items-center gap-1 text-xs text-muted mt-1">
            <MapPin size={13} color="var(--color-primary)" />
            <span>{customerProfile.village}, Tal. {customerProfile.taluka}</span>
          </div>
        </div>

        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => alert('Dialing Village Health Coordinator Helpline: 1800-202-9900 (Demo Support)')}
          title="Call support"
        >
          <PhoneCall size={14} color="var(--color-primary)" />
          <span style={{ fontSize: '11px' }}>Support</span>
        </button>
      </div>

      {/* Search Bar Shortcut */}
      <div 
        className="card mb-4 p-3 flex items-center gap-3 card-clickable"
        onClick={() => setCustomerView('search')}
        style={{ borderColor: 'var(--color-border)', background: '#ffffff' }}
      >
        <Search size={20} color="var(--color-text-muted)" />
        <span className="text-sm text-muted">{t('searchPlaceholder')}</span>
      </div>

      {/* Refill Due Alert Banner */}
      <RefillBanner />

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-3 gap-2 mb-4">
        <button
          type="button"
          className="card p-3 text-center card-clickable flex flex-col items-center justify-center gap-1"
          onClick={() => setCustomerView('regular')}
          style={{ background: 'var(--color-recurring-light)', borderColor: 'var(--color-recurring-border)' }}
        >
          <CalendarClock size={22} color="var(--color-recurring)" />
          <span className="font-semibold text-xs mt-1" style={{ color: 'var(--color-recurring)' }}>
            Regular Meds
          </span>
        </button>

        <button
          type="button"
          className="card p-3 text-center card-clickable flex flex-col items-center justify-center gap-1"
          onClick={() => setCustomerView('upload_rx')}
          style={{ background: 'var(--color-primary-light)', borderColor: 'var(--color-primary-border)' }}
        >
          <UploadCloud size={22} color="var(--color-primary)" />
          <span className="font-semibold text-xs mt-1" style={{ color: 'var(--color-primary)' }}>
            Upload Rx
          </span>
        </button>

        <button
          type="button"
          className="card p-3 text-center card-clickable flex flex-col items-center justify-center gap-1"
          onClick={() => setCustomerView('orders')}
          style={{ background: 'var(--color-secondary-light)', borderColor: '#bae6fd' }}
        >
          <History size={22} color="var(--color-secondary)" />
          <span className="font-semibold text-xs mt-1" style={{ color: 'var(--color-secondary)' }}>
            My Orders
          </span>
        </button>
      </div>

      {/* Active Order Card Preview if exists */}
      {latestActiveOrder && (
        <div 
          className="card mb-4 p-3 card-clickable" 
          style={{ borderLeft: '4px solid var(--color-info)', background: '#f0f9ff' }}
          onClick={() => {
            setSelectedOrderId(latestActiveOrder.id);
            setCustomerView('order_details');
          }}
        >
          <div className="flex justify-between items-center mb-1">
            <span className="badge badge-info" style={{ fontSize: '10px' }}>
              Ongoing Order #{latestActiveOrder.id}
            </span>
            <span className="text-xs font-bold text-primary">₹{latestActiveOrder.totalAmount}</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-main mt-1">
            <Truck size={14} color="var(--color-info)" />
            <span>Status: {latestActiveOrder.status.replace(/_/g, ' ')}</span>
          </div>
          <p className="text-xs text-muted mt-1">
            Slot: {latestActiveOrder.deliverySlot}
          </p>
          <div className="flex items-center justify-end gap-1 mt-2 text-xs font-semibold text-info">
            <span>Track Progress</span>
            <ArrowRight size={13} />
          </div>
        </div>
      )}

      {/* Therapeutic Category Demo */}
      <div className="mb-4">
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-sm">Chronic Care Refill Categories</h3>
          <span className="text-xs text-muted">UI Demo</span>
        </div>

        <div className="alert alert-info mb-2 p-2" style={{ fontSize: '11px' }}>
          Categories are for UI demonstration only. We do not recommend medicines or replace doctor advice.
        </div>

        <div className="grid grid-cols-2 gap-2">
          {categories.map((cat, idx) => (
            <button
              key={idx}
              type="button"
              className="card p-3 card-clickable flex items-center justify-between"
              onClick={() => setCustomerView('search')}
              style={{ background: '#ffffff', border: '1px solid var(--color-border)', textAlign: 'left' }}
            >
              <div className="flex items-center gap-2">
                <div style={{ background: '#f8fafc', padding: '6px', borderRadius: 'var(--radius-sm)' }}>
                  {cat.icon}
                </div>
                <div>
                  <div className="font-semibold text-xs">{cat.label}</div>
                  <span className="text-xs text-muted">{cat.count} formulas</span>
                </div>
              </div>
              <ArrowRight size={14} color="#94a3b8" />
            </button>
          ))}
        </div>
      </div>

      {/* Commonly Prescribed Regular Medicines */}
      <div>
        <div className="flex justify-between items-baseline mb-2">
          <h3 className="font-bold text-sm">Common Doorstep Formulas</h3>
          <button
            type="button"
            className="text-xs text-primary font-semibold"
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
            onClick={() => setCustomerView('search')}
          >
            View All →
          </button>
        </div>

        <div>
          {medicines.slice(0, 3).map(med => (
            <MedicineCard
              key={med.id}
              medicine={med}
              onOpenDetails={m => setSelectedMed(m)}
            />
          ))}
        </div>
      </div>

      <MedicineDetailsModal
        medicine={selectedMed}
        onClose={() => setSelectedMed(null)}
      />
    </div>
  );
};
