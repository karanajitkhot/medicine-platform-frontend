import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { AddStockModal } from '../../components/pharmacy/AddStockModal';
import { Search, Plus, Filter, AlertTriangle, CheckCircle2, PackageCheck } from 'lucide-react';

export const PharmacyInventoryPage: React.FC = () => {
  const { inventory, medicines, addInventoryStock } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [showAddModal, setShowAddModal] = useState(false);
  const [banner, setBanner] = useState<string | null>(null);

  const filteredInventory = inventory.filter(item => {
    const matchesSearch = 
      item.medicineName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.batchNumber.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || item.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const handleAddStock = (medicineId: string, batchNumber: string, expiryDate: string, qty: number, purchasePrice: number) => {
    addInventoryStock(medicineId, batchNumber, expiryDate, qty, purchasePrice);
    setBanner(`Successfully added ${qty} packs of Batch ${batchNumber} into inventory!`);
    setTimeout(() => setBanner(null), 3000);
  };

  return (
    <div className="pharmacy-inventory-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Pharmacy Hub Inventory & Batch Records</h2>
          <p className="text-xs text-muted">Real-time batch tracking, expiry monitoring, and stock allocation</p>
        </div>

        <button
          type="button"
          className="btn btn-primary btn-sm"
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={16} />
          <span>Add New Stock / Batch</span>
        </button>
      </div>

      {banner && (
        <div className="alert alert-success mb-3 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{banner}</span>
        </div>
      )}

      {/* Search and Filters */}
      <div className="card p-3 mb-4 flex flex-wrap items-center justify-between gap-3">
        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={16} color="var(--color-text-muted)" style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)' }} />
          <input
            type="text"
            className="form-input text-xs"
            style={{ paddingLeft: '32px' }}
            placeholder="Search by Medicine Name or Batch ID..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs text-muted">Status:</span>
          {(['ALL', 'IN_STOCK', 'LOW_STOCK'] as const).map(s => (
            <button
              key={s}
              type="button"
              className={`btn btn-sm ${statusFilter === s ? 'btn-primary' : 'btn-secondary'}`}
              style={{ fontSize: '11px', padding: '3px 8px', minHeight: '28px' }}
              onClick={() => setStatusFilter(s)}
            >
              {s.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Inventory Table */}
      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Medicine Name</th>
              <th>Batch Number</th>
              <th>Expiry</th>
              <th>Available Qty</th>
              <th>Purchase Price</th>
              <th>Customer Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredInventory.map(item => {
              const isLow = item.status === 'LOW_STOCK' || item.availableQuantity <= item.safetyStock;

              return (
                <tr key={item.id}>
                  <td className="font-semibold">{item.medicineName}</td>
                  <td className="font-mono text-xs font-bold text-primary">{item.batchNumber}</td>
                  <td className="text-xs">{item.expiryDate}</td>
                  <td>
                    <span className={`font-bold ${isLow ? 'text-danger' : 'text-main'}`}>
                      {item.availableQuantity} packs
                    </span>
                    <span className="text-xs text-muted block">Safety: {item.safetyStock}</span>
                  </td>
                  <td className="text-xs">₹{item.purchasePrice}</td>
                  <td className="text-xs font-semibold">₹{item.customerPrice}</td>
                  <td>
                    <Badge variant={isLow ? 'warning' : 'success'}>
                      {item.status.replace(/_/g, ' ')}
                    </Badge>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-secondary btn-sm"
                      style={{ padding: '2px 8px', fontSize: '11px', minHeight: '26px' }}
                      onClick={() => alert(`Batch ${item.batchNumber} details: Stored in Rack A-04, Temperature Controlled 22°C.`)}
                    >
                      Details
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <AddStockModal
        isOpen={showAddModal}
        onClose={() => setShowAddModal(false)}
        medicines={medicines}
        onAddStock={handleAddStock}
      />
    </div>
  );
};
