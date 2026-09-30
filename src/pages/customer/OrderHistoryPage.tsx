import React from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { EmptyState } from '../../components/common/EmptyState';
import { FileText, ArrowRight, RefreshCw, ArrowLeft, Calendar, Package } from 'lucide-react';

export const OrderHistoryPage: React.FC = () => {
  const { orders, setSelectedOrderId, setCustomerView } = useApp();

  return (
    <div className="order-history-page">
      <div className="flex items-center gap-2 mb-3">
        <button
          type="button"
          className="btn btn-secondary btn-sm"
          onClick={() => setCustomerView('home')}
          style={{ padding: '6px' }}
        >
          <ArrowLeft size={16} />
        </button>
        <div>
          <h2 className="font-bold text-xl">Order History</h2>
          <span className="text-xs text-muted">Past orders & recurring deliveries</span>
        </div>
      </div>

      {orders.length === 0 ? (
        <EmptyState
          icon={<FileText size={48} />}
          title="No Orders Found"
          description="You haven't placed any medicine orders yet. Explore our medicines or regular scheduled refills."
          actionText="Browse Medicines"
          onAction={() => setCustomerView('search')}
        />
      ) : (
        <div className="flex flex-col gap-3">
          {orders.map(order => {
            const isDelivered = order.status === 'DELIVERED';
            const isCancelled = order.status === 'CANCELLED';

            let badgeVariant: 'success' | 'warning' | 'info' | 'danger' = 'info';
            if (isDelivered) badgeVariant = 'success';
            else if (isCancelled) badgeVariant = 'danger';
            else if (order.status === 'PLACED') badgeVariant = 'warning';

            return (
              <div 
                key={order.id} 
                className="card card-clickable p-3"
                onClick={() => {
                  setSelectedOrderId(order.id);
                  setCustomerView('order_details');
                }}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">Order #{order.id}</span>
                      <Badge variant={badgeVariant}>
                        {order.status.replace(/_/g, ' ')}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-muted mt-1">
                      <Calendar size={12} />
                      <span>{order.orderDate}</span>
                    </div>
                  </div>

                  <span className="font-bold text-base text-primary">₹{order.totalAmount}</span>
                </div>

                <div className="p-2 rounded mb-3" style={{ background: 'var(--color-bg-subtle)' }}>
                  <div className="flex items-center gap-1 text-xs text-muted mb-1">
                    <Package size={12} />
                    <span>{order.items.length} item(s):</span>
                  </div>
                  <ul className="text-xs font-medium" style={{ listStyle: 'none' }}>
                    {order.items.map((item, idx) => (
                      <li key={idx} className="truncate">
                        • {item.name} {item.strength} (Qty: {item.quantity})
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex items-center justify-between pt-2 border-t text-xs" style={{ borderColor: 'var(--color-border)' }}>
                  <span className="text-muted">Payment: {order.paymentMethod}</span>

                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-primary flex items-center gap-1">
                      Track Details
                      <ArrowRight size={13} />
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
