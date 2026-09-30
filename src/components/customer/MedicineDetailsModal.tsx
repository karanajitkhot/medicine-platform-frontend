import React, { useState } from 'react';
import { Medicine } from '../../types';
import { useApp } from '../../context/AppContext';
import { Modal } from '../common/Modal';
import { Badge } from '../common/Badge';
import { ShoppingBag, CalendarPlus, ShieldAlert, CheckCircle2 } from 'lucide-react';

interface MedicineDetailsModalProps {
  medicine: Medicine | null;
  onClose: () => void;
}

export const MedicineDetailsModal: React.FC<MedicineDetailsModalProps> = ({ medicine, onClose }) => {
  const { addToCart, addToRegularMedicines } = useApp();
  const [quantity, setQuantity] = useState<number>(1);
  const [frequency, setFrequency] = useState<'Monthly' | 'Bi-Monthly' | 'Every 45 Days' | 'Quarterly'>('Monthly');
  const [addedNotice, setAddedNotice] = useState<string | null>(null);

  if (!medicine) return null;

  const savings = medicine.mrp - medicine.customerPrice;

  const handleAddToCart = () => {
    addToCart(medicine, quantity);
    setAddedNotice(`Added ${quantity} pack(s) to Cart!`);
    setTimeout(() => {
      setAddedNotice(null);
      onClose();
    }, 900);
  };

  const handleAddToRegular = () => {
    addToRegularMedicines(medicine, frequency, quantity);
    setAddedNotice(`Added to Regular Medicines (${frequency} refill cycle)!`);
    setTimeout(() => {
      setAddedNotice(null);
      onClose();
    }, 1100);
  };

  return (
    <Modal isOpen={Boolean(medicine)} onClose={onClose} title="Medicine Information">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="font-bold text-xl">{medicine.name}</h2>
          <div className="text-sm text-muted">{medicine.genericName}</div>
        </div>
        <div>
          {medicine.requiresPrescription ? (
            <Badge variant="rx">Prescription Required</Badge>
          ) : (
            <Badge variant="success">Over-the-Counter</Badge>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 p-3 rounded mb-4" style={{ background: 'var(--color-bg-subtle)' }}>
        <div>
          <span className="text-xs text-muted block">Dosage Form</span>
          <span className="font-semibold text-sm">{medicine.dosageForm}</span>
        </div>
        <div>
          <span className="text-xs text-muted block">Strength</span>
          <span className="font-semibold text-sm">{medicine.strength}</span>
        </div>
        <div>
          <span className="text-xs text-muted block">Pack Packaging</span>
          <span className="font-semibold text-sm">{medicine.packSize}</span>
        </div>
        <div>
          <span className="text-xs text-muted block">Manufacturer</span>
          <span className="font-semibold text-sm">{medicine.manufacturer}</span>
        </div>
      </div>

      <div className="mb-4">
        <h4 className="text-xs font-bold text-muted mb-1 uppercase tracking-wide">Product Details</h4>
        <p className="text-sm text-secondary" style={{ lineHeight: 1.6 }}>
          {medicine.description}
        </p>
      </div>

      {/* Compliance Notice */}
      <div className="alert alert-warning mb-4">
        <ShieldAlert size={18} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span style={{ fontSize: '13px', lineHeight: 1.4 }}>
          <strong>Notice:</strong> Prescription medicines are subject to applicable prescription and licensed pharmacist verification requirements. We do not diagnose diseases or recommend self-medication.
        </span>
      </div>

      {/* Price Summary */}
      <div className="p-3 border rounded mb-4 flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <span className="text-xs text-muted block">Customer Doorstep Price</span>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-2xl text-primary">₹{medicine.customerPrice}</span>
            <span className="text-sm text-muted" style={{ textDecoration: 'line-through' }}>₹{medicine.mrp}</span>
          </div>
        </div>
        <div className="text-right">
          <span className="badge badge-success" style={{ fontSize: '12px' }}>
            Save ₹{savings} / pack
          </span>
        </div>
      </div>

      {/* Quantity & Actions */}
      <div className="flex items-center justify-between gap-3 mb-4">
        <span className="font-semibold text-sm">Select Quantity:</span>
        <div className="flex items-center border rounded" style={{ overflow: 'hidden' }}>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            style={{ borderRadius: 0, width: '36px' }}
          >
            -
          </button>
          <span style={{ minWidth: '40px', textAlign: 'center', fontWeight: 'bold' }}>
            {quantity}
          </span>
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setQuantity(quantity + 1)}
            style={{ borderRadius: 0, width: '36px' }}
          >
            +
          </button>
        </div>
      </div>

      {addedNotice && (
        <div className="alert alert-success mb-3 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{addedNotice}</span>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <button type="button" className="btn btn-primary btn-block" onClick={handleAddToCart}>
          <ShoppingBag size={16} />
          <span>Add to Cart (₹{medicine.customerPrice * quantity})</span>
        </button>

        <div className="p-3 border rounded mt-2" style={{ background: 'var(--color-recurring-light)', borderColor: 'var(--color-recurring-border)' }}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold" style={{ color: 'var(--color-recurring)' }}>
              SCHEDULE REGULAR REFILL (NO AUTO-CHARGE)
            </span>
          </div>
          <div className="flex gap-2 items-center">
            <select
              className="form-select"
              value={frequency}
              onChange={e => setFrequency(e.target.value as any)}
              style={{ fontSize: '13px', padding: '6px' }}
            >
              <option value="Monthly">Monthly Cycle</option>
              <option value="Bi-Monthly">Every 2 Months</option>
              <option value="Every 45 Days">Every 45 Days</option>
              <option value="Quarterly">Quarterly (3 Months)</option>
            </select>

            <button type="button" className="btn btn-recurring" onClick={handleAddToRegular} style={{ whiteSpace: 'nowrap' }}>
              <CalendarPlus size={15} />
              <span>Add to Regular</span>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};
