import React from 'react';
import { useApp } from '../../context/AppContext';
import { CalendarClock, AlertCircle, ArrowRight, Clock } from 'lucide-react';

export const RefillBanner: React.FC = () => {
  const { setCustomerView, regularMedicines } = useApp();

  const activeMedicines = regularMedicines.filter(m => m.status === 'Active');
  if (activeMedicines.length === 0) return null;

  const dueItems = activeMedicines.slice(0, 2);

  return (
    <div 
      className="card mb-4" 
      style={{ 
        borderLeft: '4px solid var(--color-recurring)', 
        background: 'linear-gradient(to right, #ffffff, #faf5ff)' 
      }}
    >
      <div className="flex justify-between items-start mb-2">
        <div className="flex items-center gap-2">
          <div 
            style={{ 
              background: 'var(--color-recurring-light)', 
              color: 'var(--color-recurring)', 
              padding: '6px', 
              borderRadius: 'var(--radius-sm)' 
            }}
          >
            <CalendarClock size={20} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-bold text-sm" style={{ color: 'var(--color-recurring)' }}>
                Regular Refill Due Soon
              </h4>
              <span className="badge badge-warning" style={{ fontSize: '10px' }}>Due 10 Oct 2026</span>
            </div>
            <p className="text-xs text-muted mt-1">
              Your scheduled monthly maintenance dose is due in 3 days.
            </p>
          </div>
        </div>
      </div>

      <div className="p-2 rounded mb-3" style={{ background: '#f5f3ff', border: '1px solid #ede9fe' }}>
        <ul style={{ listStyle: 'none', fontSize: '12px' }}>
          {dueItems.map(item => (
            <li key={item.id} className="flex justify-between items-center py-1">
              <span className="font-semibold">{item.medicineName} ({item.strength})</span>
              <span className="text-muted">{item.quantity} pack(s) • ₹{item.customerPrice * item.quantity}</span>
            </li>
          ))}
          {activeMedicines.length > 2 && (
            <li className="text-xs text-muted pt-1">
              + {activeMedicines.length - 2} more scheduled regular medicine(s)
            </li>
          )}
        </ul>
      </div>

      <div className="flex items-center justify-between gap-2">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => alert('Reminder snoozed. We will remind you 24 hours prior to refill date.')}
          style={{ fontSize: '12px' }}
        >
          <Clock size={13} />
          <span>Remind Later</span>
        </button>

        <button
          type="button"
          className="btn btn-recurring btn-sm"
          onClick={() => setCustomerView('refill')}
        >
          <span>Review Refill</span>
          <ArrowRight size={14} />
        </button>
      </div>

      <div className="flex items-center gap-1 mt-2 text-xs text-muted">
        <AlertCircle size={12} />
        <span>Important: Refills are never auto-billed. Your confirmation is required.</span>
      </div>
    </div>
  );
};
