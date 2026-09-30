import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { ArrowLeft, CheckCircle2, MapPin, Calendar, Banknote } from 'lucide-react';

export const DeliveryHistoryPage: React.FC = () => {
  const { orders, setDeliveryView } = useApp();

  const completedOrders = orders.filter(o => o.status === 'DELIVERED');

  const totalCashCollected = completedOrders
    .filter(o => o.paymentMethod === 'COD')
    .reduce((acc, curr) => acc + curr.totalAmount, 0);

  return (
    <div className="delivery-history-page">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setDeliveryView('dashboard')}
          style={{ padding: '6px' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="font-bold text-xl">Delivery History</h2>
          <span className="text-xs text-muted">Completed doorstep handovers</span>
        </div>
      </div>

      {/* Summary Banner */}
      <div className="card mb-4 p-3 grid grid-cols-2 gap-2 text-center" style={{ background: 'var(--color-bg-subtle)' }}>
        <div>
          <span className="text-xs text-muted block">Delivered Stops</span>
          <span className="font-bold text-xl text-success">{completedOrders.length}</span>
        </div>
        <div>
          <span className="text-xs text-muted block">COD Cash Collected</span>
          <span className="font-bold text-xl text-primary">₹{totalCashCollected}</span>
        </div>
      </div>

      {completedOrders.length === 0 ? (
        <div className="card p-4 text-center">
          <p className="text-muted text-sm">No completed deliveries on record for this shift yet.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-3">
          {completedOrders.map(order => (
            <div key={order.id} className="card p-3">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Order #{order.id}</span>
                    <Badge variant="success">Delivered</Badge>
                  </div>
                  <div className="text-xs font-semibold text-main mt-1">{order.customerName}</div>
                </div>
                <span className="font-bold text-sm text-primary">₹{order.totalAmount}</span>
              </div>

              <div className="flex items-center gap-1 text-xs text-muted mb-2">
                <MapPin size={12} color="var(--color-primary)" />
                <span>{order.deliveryAddress.village}, Tal. {order.deliveryAddress.taluka}</span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs p-2 rounded" style={{ background: '#f8fafc' }}>
                <div>
                  <span className="text-muted block">Payment</span>
                  <span className="font-semibold">{order.paymentMethod}</span>
                </div>
                <div>
                  <span className="text-muted block">Tamper Seal</span>
                  <span className="font-mono">{order.tamperBagNumber || 'SEAL-3920-KRG'}</span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 mt-2 border-t text-xs text-muted" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-1">
                  <CheckCircle2 size={12} color="var(--color-success)" />
                  <span>OTP Verified at Doorstep</span>
                </div>
                <span>{order.orderDate}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
