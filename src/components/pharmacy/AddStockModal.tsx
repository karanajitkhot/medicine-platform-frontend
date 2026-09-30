import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Medicine } from '../../types';
import { PackagePlus, CheckCircle2 } from 'lucide-react';

interface AddStockModalProps {
  isOpen: boolean;
  onClose: () => void;
  medicines: Medicine[];
  onAddStock: (medicineId: string, batchNumber: string, expiryDate: string, qty: number, purchasePrice: number) => void;
}

export const AddStockModal: React.FC<AddStockModalProps> = ({
  isOpen,
  onClose,
  medicines,
  onAddStock
}) => {
  const [selectedMedId, setSelectedMedId] = useState<string>(medicines[0]?.id || '');
  const [batchNumber, setBatchNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('12/2027');
  const [quantity, setQuantity] = useState(100);
  const [purchasePrice, setPurchasePrice] = useState(65);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMedId || !batchNumber) {
      alert('Please fill all required batch fields.');
      return;
    }
    onAddStock(selectedMedId, batchNumber, expiryDate, Number(quantity), Number(purchasePrice));
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Receive Inventory Batch (Mock GRN)">
      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <label className="form-label text-xs">Select Medicine</label>
          <select
            className="form-select"
            value={selectedMedId}
            onChange={e => setSelectedMedId(e.target.value)}
          >
            {medicines.map(m => (
              <option key={m.id} value={m.id}>
                {m.name} ({m.strength}) - {m.packSize}
              </option>
            ))}
          </select>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-3">
          <div className="form-group">
            <label className="form-label text-xs">Manufacturer Batch No.</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. LOT-2026-B8"
              value={batchNumber}
              onChange={e => setBatchNumber(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label text-xs">Expiry Date (MM/YYYY)</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 10/2028"
              value={expiryDate}
              onChange={e => setExpiryDate(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="form-group">
            <label className="form-label text-xs">Quantity Received (Packs)</label>
            <input
              type="number"
              className="form-input"
              min={1}
              value={quantity}
              onChange={e => setQuantity(Number(e.target.value))}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label text-xs">Purchase Cost (₹/pack)</label>
            <input
              type="number"
              className="form-input"
              min={1}
              value={purchasePrice}
              onChange={e => setPurchasePrice(Number(e.target.value))}
              required
            />
          </div>
        </div>

        <div className="alert alert-info text-xs mb-4">
          Simulated Goods Received Note (GRN). This increments the licensed inventory batch records.
        </div>

        <div className="flex justify-end gap-2">
          <button type="button" className="btn btn-secondary btn-sm" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn-primary btn-sm">
            <PackagePlus size={16} />
            <span>Add Stock to Inventory</span>
          </button>
        </div>
      </form>
    </Modal>
  );
};
