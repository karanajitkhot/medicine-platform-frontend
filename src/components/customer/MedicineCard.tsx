import React from 'react';
import { Medicine } from '../../types';
import { useApp } from '../../context/AppContext';
import { Badge } from '../common/Badge';
import { Plus, CalendarPlus, Pill } from 'lucide-react';

interface MedicineCardProps {
  medicine: Medicine;
  onOpenDetails: (medicine: Medicine) => void;
}

export const MedicineCard: React.FC<MedicineCardProps> = ({ medicine, onOpenDetails }) => {
  const { addToCart, addToRegularMedicines, t } = useApp();

  const savings = medicine.mrp - medicine.customerPrice;
  const savingsPct = Math.round((savings / medicine.mrp) * 100);

  return (
    <div className="card mb-3 card-clickable" onClick={() => onOpenDetails(medicine)}>
      <div className="flex justify-between items-start mb-2">
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-base">{medicine.name}</h4>
            {medicine.requiresPrescription ? (
              <Badge variant="rx">Rx</Badge>
            ) : (
              <span className="badge badge-success" style={{ fontSize: '10px' }}>OTC</span>
            )}
          </div>
          <div className="text-xs text-muted mt-1">{medicine.genericName}</div>
        </div>
        <div 
          style={{
            background: 'var(--color-primary-light)',
            color: 'var(--color-primary)',
            padding: '6px',
            borderRadius: 'var(--radius-sm)'
          }}
        >
          <Pill size={18} />
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted mb-3">
        <span>Strength: <strong>{medicine.strength}</strong></span>
        <span>•</span>
        <span>Pack: {medicine.packSize}</span>
      </div>

      <div className="flex items-center justify-between pt-2 border-t" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="flex items-baseline gap-2">
            <span className="font-bold text-lg text-primary">₹{medicine.customerPrice}</span>
            <span className="text-xs text-muted" style={{ textDecoration: 'line-through' }}>₹{medicine.mrp}</span>
          </div>
          <div className="text-xs text-success font-semibold">
            {t('save')} ₹{savings} ({savingsPct}% off)
          </div>
        </div>

        <div className="flex items-center gap-2" onClick={e => e.stopPropagation()}>
          <button
            type="button"
            className="btn btn-recurring btn-sm"
            onClick={() => {
              addToRegularMedicines(medicine);
              alert(`Added ${medicine.name} to Regular Medicines list for scheduled refills.`);
            }}
            title="Set up scheduled monthly refill"
          >
            <CalendarPlus size={14} />
            <span className="hide-mobile">Regular</span>
          </button>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              addToCart(medicine, 1);
            }}
            title="Add to current order cart"
          >
            <Plus size={15} />
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
};
