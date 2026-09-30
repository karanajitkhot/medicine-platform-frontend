import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Box, Check, PackageCheck, Barcode, CheckCircle2, ShieldCheck } from 'lucide-react';

export const PharmacyPackingPage: React.FC = () => {
  const { orders, selectedOrderId, setSelectedOrderId, markOrderPacked, updateOrderStatus, setPharmacyView } = useApp();
  const [bagBarcode, setBagBarcode] = useState(`SEAL-${Math.floor(1000 + Math.random() * 9000)}-KRG`);
  const [packedItems, setPackedItems] = useState<Record<string, boolean>>({});
  const [successNotice, setSuccessNotice] = useState<string | null>(null);

  // Orders in stock confirmed or packing state
  const packableOrders = orders.filter(
    o => o.status === 'STOCK_CONFIRMED' || o.status === 'PACKING' || o.rxStatus === 'APPROVED' && o.status === 'PLACED'
  );

  const currentOrder = orders.find(o => o.id === selectedOrderId) || packableOrders[0] || orders[0];

  const handleStartPacking = () => {
    if (!currentOrder) return;
    updateOrderStatus(currentOrder.id, 'PACKING');
  };

  const toggleItemPacked = (id: string) => {
    setPackedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleMarkPacked = () => {
    if (!currentOrder) return;
    markOrderPacked(currentOrder.id, bagBarcode);
    setSuccessNotice(`Order #${currentOrder.id} successfully packed into Security Bag ${bagBarcode}! Order is now Ready for Delivery.`);
    setTimeout(() => {
      setSuccessNotice(null);
      setPharmacyView('assignment');
    }, 1500);
  };

  if (!currentOrder) {
    return (
      <div className="card p-6 text-center">
        <CheckCircle2 size={40} color="var(--color-success)" style={{ margin: '0 auto 0.5rem' }} />
        <h3 className="font-bold text-lg">No Orders in Packing Queue</h3>
        <p className="text-xs text-muted mt-1">All verified orders are currently packed and ready for route assignment.</p>
        <button
          type="button"
          className="btn btn-secondary btn-sm mt-3"
          onClick={() => setPharmacyView('orders')}
        >
          Check All Orders
        </button>
      </div>
    );
  }

  const allItemsChecked = currentOrder.items.every((_, idx) => packedItems[`item-${idx}`]);

  return (
    <div className="pharmacy-packing-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Pharmacy Packing Station</h2>
          <p className="text-xs text-muted">Dispensation verification & tamper-evident barcode sealing</p>
        </div>

        {packableOrders.length > 1 && (
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted">Select Order:</span>
            <select
              className="form-select text-xs"
              value={currentOrder.id}
              onChange={e => setSelectedOrderId(e.target.value)}
            >
              {packableOrders.map(o => (
                <option key={o.id} value={o.id}>
                  #{o.id} - {o.customerName} ({o.deliveryAddress.village})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {successNotice && (
        <div className="alert alert-success mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{successNotice}</span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        {/* Left: Order Items & Checklist */}
        <div className="card">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h3 className="font-bold text-base">Packing Checklist: Order #{currentOrder.id}</h3>
              <p className="text-xs text-muted">{currentOrder.customerName} • Village {currentOrder.deliveryAddress.village}</p>
            </div>
            <Badge variant="info">{currentOrder.status.replace(/_/g, ' ')}</Badge>
          </div>

          <div className="alert alert-info text-xs mb-3">
            Verify each batch expiry and blister foil before checking off items.
          </div>

          <div className="flex flex-col gap-2 mb-4">
            {currentOrder.items.map((item, idx) => {
              const isChecked = packedItems[`item-${idx}`] || false;
              return (
                <div
                  key={idx}
                  className="p-3 border rounded flex items-center justify-between card-clickable"
                  style={{
                    borderColor: isChecked ? 'var(--color-primary)' : 'var(--color-border)',
                    background: isChecked ? 'var(--color-primary-light)' : '#ffffff'
                  }}
                  onClick={() => toggleItemPacked(`item-${idx}`)}
                >
                  <div className="flex items-center gap-3">
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => toggleItemPacked(`item-${idx}`)}
                      onClick={e => e.stopPropagation()}
                    />
                    <div>
                      <div className="font-semibold text-sm">{item.name} ({item.strength})</div>
                      <div className="text-xs text-muted">
                        Pack: {item.packSize} • Prescribed Strength: <strong>{item.strength}</strong>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="font-bold text-sm">Qty: {item.quantity}</span>
                    <span className="text-xs text-muted block">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {currentOrder.status !== 'PACKING' && (
            <button
              type="button"
              className="btn btn-secondary btn-block btn-sm"
              onClick={handleStartPacking}
            >
              Start Packing Session
            </button>
          )}
        </div>

        {/* Right: Security Sealing & Dispatch Readiness */}
        <div className="card flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Barcode size={20} color="var(--color-primary)" />
              <h3 className="font-bold text-base">Tamper-Proof Barcode Seal</h3>
            </div>

            <p className="text-xs text-secondary mb-4">
              Pack medicines in opaque corrugated shipping carton and affix tamper-evident security barcode. The delivery rider and customer will verify this seal number.
            </p>

            <div className="form-group mb-4">
              <label className="form-label text-xs">Security Seal Barcode ID</label>
              <input
                type="text"
                className="form-input font-mono font-bold"
                value={bagBarcode}
                onChange={e => setBagBarcode(e.target.value)}
              />
              <span className="text-xs text-muted mt-1 block">
                Auto-generated unique bag seal tracker.
              </span>
            </div>

            <div className="p-3 rounded mb-4" style={{ background: '#f8fafc', border: '1px solid var(--color-border)' }}>
              <div className="flex items-center gap-2 text-xs font-semibold mb-1">
                <ShieldCheck size={16} color="var(--color-primary)" />
                <span>Verification Safeguards:</span>
              </div>
              <ul className="text-xs text-muted" style={{ paddingLeft: '1.25rem', lineHeight: 1.6 }}>
                <li>No patient diagnosis label affixed on outer box (Full Privacy).</li>
                <li>Pharmacist signature slip included inside parcel.</li>
                <li>Invoice and batch analysis attached for customer.</li>
              </ul>
            </div>
          </div>

          <div>
            <button
              type="button"
              className="btn btn-primary btn-block"
              onClick={handleMarkPacked}
            >
              <PackageCheck size={18} />
              <span>Mark Packed & Sealed for Delivery</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
