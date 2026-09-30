import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { Truck, MapPin, UserCheck, CheckCircle2, ArrowRight, ShieldCheck } from 'lucide-react';

export const PharmacyAssignmentPage: React.FC = () => {
  const { orders, deliveryBoys, assignOrderToDeliveryBoy, setPharmacyView } = useApp();
  const [selectedRiderId, setSelectedRiderId] = useState<Record<string, string>>({});
  const [assignmentNotice, setAssignmentNotice] = useState<string | null>(null);

  // Orders that are ready for delivery or assigned
  const dispatchQueue = orders.filter(
    o => o.status === 'READY_FOR_DELIVERY' || o.status === 'ASSIGNED'
  );

  const handleAssign = (orderId: string) => {
    const riderId = selectedRiderId[orderId] || deliveryBoys[0].id;
    const rider = deliveryBoys.find(r => r.id === riderId);
    assignOrderToDeliveryBoy(orderId, riderId);
    setAssignmentNotice(`Order #${orderId} successfully assigned to ${rider?.name}! Order now dispatched to Rider app.`);
    setTimeout(() => setAssignmentNotice(null), 3500);
  };

  return (
    <div className="pharmacy-assignment-page">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="font-bold text-2xl">Village Route & Rider Dispatch Assignment</h2>
          <p className="text-xs text-muted">Assign packed parcels to trained rural delivery riders based on village clusters</p>
        </div>
      </div>

      {assignmentNotice && (
        <div className="alert alert-success mb-4 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{assignmentNotice}</span>
        </div>
      )}

      {/* Available Delivery Riders Overview */}
      <div className="card mb-4 p-4">
        <h3 className="font-bold text-sm mb-3">Available Delivery Fleet (Today's Shifts)</h3>
        <div className="grid grid-cols-3 gap-3">
          {deliveryBoys.map(rider => (
            <div key={rider.id} className="p-3 border rounded text-xs" style={{ borderColor: 'var(--color-border)', background: 'var(--color-bg-subtle)' }}>
              <div className="flex justify-between items-start mb-1">
                <span className="font-bold text-sm">{rider.name}</span>
                <span className={`badge ${rider.status === 'AVAILABLE' ? 'badge-success' : 'badge-warning'}`} style={{ fontSize: '9px' }}>
                  {rider.status}
                </span>
              </div>
              <div className="text-muted">{rider.assignedRoute}</div>
              <div className="mt-2 pt-2 border-t flex justify-between font-semibold" style={{ borderColor: 'var(--color-border)' }}>
                <span>Active Stops:</span>
                <span className="text-primary">{rider.activeDeliveriesCount} packages</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dispatch Queue */}
      <div className="card">
        <h3 className="font-bold text-base mb-3">Parcels Awaiting Delivery Route ({dispatchQueue.length})</h3>

        {dispatchQueue.length === 0 ? (
          <div className="p-6 text-center text-xs text-muted">
            <CheckCircle2 size={36} color="var(--color-success)" style={{ margin: '0 auto 0.5rem' }} />
            No parcels pending rider assignment.
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {dispatchQueue.map(order => {
              const currentSelectedRider = selectedRiderId[order.id] || order.assignedDeliveryBoyId || deliveryBoys[0].id;
              const isAssigned = order.status === 'ASSIGNED';

              return (
                <div 
                  key={order.id} 
                  className="p-4 border rounded flex flex-wrap items-center justify-between gap-3"
                  style={{ 
                    borderColor: isAssigned ? 'var(--color-primary-border)' : 'var(--color-border)',
                    background: isAssigned ? 'var(--color-primary-light)' : '#ffffff' 
                  }}
                >
                  <div style={{ minWidth: '240px' }}>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-base">Order #{order.id}</span>
                      <Badge variant={isAssigned ? 'success' : 'warning'}>
                        {order.status}
                      </Badge>
                    </div>
                    <div className="text-sm font-semibold mt-1">{order.customerName}</div>
                    <div className="flex items-center gap-1 text-xs text-muted mt-1">
                      <MapPin size={12} color="var(--color-primary)" />
                      <span>{order.deliveryAddress.village}, Taluka {order.deliveryAddress.taluka} ({order.deliveryAddress.pincode})</span>
                    </div>
                    <div className="text-xs text-muted mt-1">
                      Tamper Bag: <strong className="font-mono text-primary">{order.tamperBagNumber || 'SEAL-4491-KRG'}</strong> • Payment: {order.paymentMethod}
                    </div>
                  </div>

                  {/* Rider Assignment Control */}
                  <div className="flex items-center gap-3">
                    <div className="text-left">
                      <label className="text-xs text-muted block mb-1">Assign Route Rider:</label>
                      <select
                        className="form-select text-xs"
                        value={currentSelectedRider}
                        onChange={e => setSelectedRiderId(prev => ({ ...prev, [order.id]: e.target.value }))}
                        style={{ minWidth: '200px' }}
                      >
                        {deliveryBoys.map(r => (
                          <option key={r.id} value={r.id}>
                            {r.name} ({r.assignedRoute.slice(0, 20)}...) - {r.activeDeliveriesCount} stops
                          </option>
                        ))}
                      </select>
                    </div>

                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() => handleAssign(order.id)}
                      style={{ minHeight: '36px', marginTop: '16px' }}
                    >
                      <UserCheck size={15} />
                      <span>{isAssigned ? 'Reassign' : 'Assign to Rider'}</span>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
