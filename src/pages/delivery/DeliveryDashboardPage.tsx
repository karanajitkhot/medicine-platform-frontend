import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { 
  Truck, 
  MapPin, 
  Clock, 
  Package, 
  CheckCircle2, 
  ArrowRight, 
  AlertCircle, 
  ShieldCheck, 
  Navigation,
  History
} from 'lucide-react';

export const DeliveryDashboardPage: React.FC = () => {
  const { orders, setSelectedOrderId, setDeliveryView, deliveryBoys } = useApp();

  const currentRider = deliveryBoys[0] || {
    name: 'Ganesh Shinde',
    assignedRoute: 'Route 4: Koregaon - Rahimatpur Belt',
    vehicleType: 'Hero Splendor (MH 11 BV 4021)'
  };

  // Orders assigned or relevant to delivery boy
  const assignedOrders = orders.filter(
    o => (o.assignedDeliveryBoyId === currentRider.id || o.status === 'READY_FOR_DELIVERY' || o.status === 'ASSIGNED' || o.status === 'OUT_FOR_DELIVERY') &&
         o.status !== 'CANCELLED'
  );

  const pendingDeliveries = assignedOrders.filter(o => o.status !== 'DELIVERED');
  const completedDeliveries = orders.filter(o => o.status === 'DELIVERED');

  return (
    <div className="delivery-dashboard-page">
      {/* Rider Header Card */}
      <div className="card mb-4 p-4" style={{ background: 'linear-gradient(135deg, #0f172a, #1e293b)', color: '#ffffff' }}>
        <div className="flex justify-between items-start mb-2">
          <div>
            <span className="text-xs text-muted" style={{ color: '#94a3b8' }}>Rider Terminal</span>
            <h2 className="font-bold text-xl text-light">{currentRider.name}</h2>
            <div className="text-xs text-muted mt-1" style={{ color: '#cbd5e1' }}>
              Vehicle: {currentRider.vehicleType}
            </div>
          </div>
          <span className="badge badge-success">On Duty</span>
        </div>

        <div className="mt-3 pt-3 border-t text-xs flex items-center justify-between" style={{ borderColor: '#334155' }}>
          <div className="flex items-center gap-1">
            <Navigation size={13} color="#38bdf8" />
            <span>{currentRider.assignedRoute}</span>
          </div>
          <button
            type="button"
            className="text-xs font-semibold"
            style={{ background: 'none', border: 'none', color: '#38bdf8', cursor: 'pointer' }}
            onClick={() => setDeliveryView('history')}
          >
            History →
          </button>
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-3 gap-2 mb-4 text-center">
        <div className="card p-3">
          <span className="text-xs text-muted block">Pending</span>
          <span className="font-bold text-2xl text-warning">{pendingDeliveries.length}</span>
        </div>
        <div className="card p-3">
          <span className="text-xs text-muted block">Delivered</span>
          <span className="font-bold text-2xl text-success">{completedDeliveries.length}</span>
        </div>
        <div className="card p-3">
          <span className="text-xs text-muted block">Route Total</span>
          <span className="font-bold text-2xl text-primary">{pendingDeliveries.length + completedDeliveries.length}</span>
        </div>
      </div>

      {/* Privacy Notice */}
      <div className="alert alert-info mb-4">
        <ShieldCheck size={18} style={{ flexShrink: 0 }} />
        <span className="text-xs">
          <strong>Privacy Rule:</strong> Medical diagnosis and prescription details are protected and hidden from delivery personnel. Verify packages solely by tamper seal barcode.
        </span>
      </div>

      {/* Assigned Orders List */}
      <div className="mb-4">
        <div className="flex justify-between items-center mb-3">
          <h3 className="font-bold text-base">Route Deliveries ({pendingDeliveries.length})</h3>
          <span className="text-xs text-muted">Optimized Stop Sequence</span>
        </div>

        {pendingDeliveries.length === 0 ? (
          <div className="card p-4 text-center">
            <CheckCircle2 size={36} color="var(--color-success)" style={{ margin: '0 auto 0.5rem' }} />
            <p className="font-semibold text-sm">All Assigned Route Deliveries Completed!</p>
            <p className="text-xs text-muted mt-1">Check back for the next scheduled route dispatch.</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {pendingDeliveries.map((order, index) => {
              const isOutForDelivery = order.status === 'OUT_FOR_DELIVERY';
              const isReady = order.status === 'READY_FOR_DELIVERY' || order.status === 'ASSIGNED';

              return (
                <div
                  key={order.id}
                  className="card card-clickable p-4"
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setDeliveryView('details');
                  }}
                  style={{
                    borderLeft: isOutForDelivery ? '4px solid var(--color-info)' : '4px solid var(--color-warning)'
                  }}
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span 
                          style={{
                            width: '20px',
                            height: '20px',
                            borderRadius: '50%',
                            background: '#e2e8f0',
                            fontSize: '11px',
                            fontWeight: 'bold',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center'
                          }}
                        >
                          {index + 1}
                        </span>
                        <h4 className="font-bold text-base">{order.customerName}</h4>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-muted mt-1">
                        <MapPin size={13} color="var(--color-primary)" />
                        <span>{order.deliveryAddress.village} ({order.deliveryAddress.landmark})</span>
                      </div>
                    </div>

                    <Badge variant={isOutForDelivery ? 'info' : 'warning'}>
                      {order.status.replace(/_/g, ' ')}
                    </Badge>
                  </div>

                  <div className="grid grid-cols-2 gap-2 p-2 rounded my-2 text-xs" style={{ background: 'var(--color-bg-subtle)' }}>
                    <div>
                      <span className="text-muted block">Order Reference</span>
                      <span className="font-semibold">#{order.id}</span>
                    </div>
                    <div>
                      <span className="text-muted block">Tamper Seal Bag</span>
                      <span className="font-semibold" style={{ color: 'var(--color-primary)' }}>
                        {order.tamperBagNumber || 'SEAL-4491-KRG'}
                      </span>
                    </div>
                    <div>
                      <span className="text-muted block">Package Count</span>
                      <span className="font-semibold">1 Sealed Box</span>
                    </div>
                    <div>
                      <span className="text-muted block">Payment Mode</span>
                      <span className="font-semibold">
                        {order.paymentMethod === 'COD' ? `COD (Collect ₹${order.totalAmount})` : 'Prepaid (₹0 to collect)'}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t text-xs font-semibold" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-1 text-muted">
                      <Clock size={13} />
                      <span>Expected: {order.deliverySlot.slice(0, 24)}</span>
                    </div>

                    <span className="text-primary flex items-center gap-1">
                      <span>Open Delivery</span>
                      <ArrowRight size={14} />
                    </span>
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
