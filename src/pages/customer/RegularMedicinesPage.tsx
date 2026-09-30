import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { EmptyState } from '../../components/common/EmptyState';
import { Badge } from '../../components/common/Badge';
import { 
  CalendarClock, 
  AlertCircle, 
  Trash2, 
  PauseCircle, 
  PlayCircle, 
  ShoppingBag, 
  PlusCircle, 
  CheckCircle2, 
  Info 
} from 'lucide-react';

export const RegularMedicinesPage: React.FC = () => {
  const { 
    regularMedicines, 
    removeRegularMedicine, 
    toggleRegularMedicineStatus, 
    setCustomerView,
    addToCart,
    medicines
  } = useApp();

  const [notification, setNotification] = useState<string | null>(null);

  const handleOrderSingle = (medicineId: string, qty: number) => {
    const med = medicines.find(m => m.id === medicineId);
    if (med) {
      addToCart(med, qty);
      setNotification(`Added ${med.name} to Cart!`);
      setTimeout(() => setNotification(null), 2500);
    }
  };

  return (
    <div className="regular-medicines-page">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="font-bold text-xl mb-1">Regular Medicines</h2>
          <p className="text-xs text-muted">
            Manage your chronic and recurring refill schedule.
          </p>
        </div>
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setCustomerView('search')}
        >
          <PlusCircle size={15} />
          <span>Add More</span>
        </button>
      </div>

      {/* Critical Business Rule Banner */}
      <div className="alert alert-warning mb-4">
        <AlertCircle size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <div style={{ fontSize: '13px' }}>
          <strong>Notice:</strong> Adding a medicine to Regular Medicines does <strong>NOT</strong> automatically place an order or charge you. When your scheduled refill date approaches, you will receive a reminder to review and confirm.
        </div>
      </div>

      {notification && (
        <div className="alert alert-success mb-3 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{notification}</span>
        </div>
      )}

      {regularMedicines.length === 0 ? (
        <EmptyState
          icon={<CalendarClock size={48} />}
          title="No Regular Medicines Set Up"
          description="Keep your chronic medicines on schedule without running out. Add medicines to your regular list to receive timely refill reminders."
          actionText="Browse Medicines to Add"
          onAction={() => setCustomerView('search')}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {/* Quick Review Refill button at top */}
          <div 
            className="p-3 rounded mb-2 flex items-center justify-between"
            style={{ background: 'var(--color-recurring-light)', border: '1px solid var(--color-recurring-border)' }}
          >
            <div>
              <div className="font-bold text-sm" style={{ color: 'var(--color-recurring)' }}>
                Upcoming Scheduled Refill
              </div>
              <div className="text-xs text-muted">
                {regularMedicines.filter(m => m.status === 'Active').length} active medicine(s) scheduled for 10 Oct 2026
              </div>
            </div>
            <button
              type="button"
              className="btn btn-recurring btn-sm"
              onClick={() => setCustomerView('refill')}
            >
              <span>Review & Refill</span>
            </button>
          </div>

          {regularMedicines.map(item => {
            const isActive = item.status === 'Active';

            return (
              <div 
                key={item.id} 
                className="card"
                style={{ 
                  opacity: isActive ? 1 : 0.75,
                  borderLeft: isActive ? '4px solid var(--color-recurring)' : '4px solid var(--color-border)'
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-base">{item.medicineName}</h4>
                      {item.requiresPrescription ? (
                        <Badge variant="rx">Rx</Badge>
                      ) : (
                        <span className="badge badge-success" style={{ fontSize: '10px' }}>OTC</span>
                      )}
                    </div>
                    <div className="text-xs text-muted mt-1">
                      Strength: <strong>{item.strength}</strong> • Pack: {item.packSize}
                    </div>
                  </div>

                  <span className={`badge ${isActive ? 'badge-recurring' : 'badge-secondary'}`}>
                    {item.status}
                  </span>
                </div>

                <div 
                  className="grid grid-cols-2 gap-2 p-2 rounded mb-3 text-xs" 
                  style={{ background: 'var(--color-bg-subtle)' }}
                >
                  <div>
                    <span className="text-muted block">Quantity per cycle:</span>
                    <span className="font-semibold">{item.quantity} Pack(s)</span>
                  </div>
                  <div>
                    <span className="text-muted block">Frequency:</span>
                    <span className="font-semibold">{item.frequency}</span>
                  </div>
                  <div>
                    <span className="text-muted block">Next Expected Refill:</span>
                    <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                      {item.expectedRefillDate}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted block">Estimated Price:</span>
                    <span className="font-semibold">₹{item.customerPrice * item.quantity}</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      onClick={() => toggleRegularMedicineStatus(item.id)}
                      title={isActive ? 'Pause recurring reminders' : 'Resume reminders'}
                    >
                      {isActive ? <PauseCircle size={14} /> : <PlayCircle size={14} />}
                      <span className="text-xs">{isActive ? 'Pause' : 'Resume'}</span>
                    </button>

                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ color: 'var(--color-danger)' }}
                      onClick={() => {
                        if (confirm(`Remove ${item.medicineName} from regular schedule?`)) {
                          removeRegularMedicine(item.id);
                        }
                      }}
                      title="Remove from regular list"
                    >
                      <Trash2 size={14} />
                      <span className="text-xs">Remove</span>
                    </button>
                  </div>

                  <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    onClick={() => handleOrderSingle(item.medicineId, item.quantity)}
                  >
                    <ShoppingBag size={14} />
                    <span className="text-xs">Order Now</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <div className="card mt-4 p-3 flex items-start gap-2" style={{ background: '#f8fafc' }}>
        <Info size={16} color="var(--color-text-muted)" style={{ flexShrink: 0, marginTop: '2px' }} />
        <span className="text-xs text-muted">
          Our village coordinator calls elderly and non-smartphone users 2 days prior to scheduled refill date to confirm if they need adjustments before packing.
        </span>
      </div>
    </div>
  );
};
