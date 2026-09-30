import React from 'react';
import { useApp } from '../../context/AppContext';
import { OrderTimeline } from '../../components/customer/OrderTimeline';
import { Badge } from '../../components/common/Badge';
import { ArrowLeft, Phone, Package, ShieldCheck, MapPin, KeyRound } from 'lucide-react';

export const OrderTrackingPage: React.FC = () => {
  const { orders, selectedOrderId, setCustomerView } = useApp();

  const currentOrder = orders.find(o => o.id === selectedOrderId) || orders[0];

  if (!currentOrder) {
    return (
      <div className="card text-center p-4">
        <p className="text-muted text-sm">No order selected for tracking.</p>
        <button
          type="button"
          className="btn btn-primary btn-sm mt-3"
          onClick={() => setCustomerView('orders')}
        >
          View All Orders
        </button>
      </div>
    );
  }

  return (
    <div className="order-tracking-page">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <button
            type="button"
            className="btn btn-secondary btn-sm"
            onClick={() => setCustomerView('orders')}
            style={{ padding: '6px' }}
          >
            <ArrowLeft size={16} />
          </button>
          <div>
            <h2 className="font-bold text-xl">Order #{currentOrder.id}</h2>
            <span className="text-xs text-muted">Placed on {currentOrder.orderDate}</span>
          </div>
        </div>

        <Badge variant={currentOrder.status === 'DELIVERED' ? 'success' : 'info'}>
          {currentOrder.status.replace(/_/g, ' ')}
        </Badge>
      </div>

      {/* OTP Delivery Verification Banner */}
      {currentOrder.otpCode && currentOrder.status !== 'DELIVERED' && (
        <div className="card mb-4 p-3" style={{ background: '#fefce8', border: '1px solid #fef08a' }}>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound size={20} color="var(--color-warning)" />
              <div>
                <span className="font-bold text-xs" style={{ color: 'var(--color-warning-text)' }}>
                  Delivery Verification OTP
                </span>
                <p className="text-xs text-muted">Share with rider only after inspecting sealed package</p>
              </div>
            </div>
            <div 
              style={{ 
                fontSize: '20px', 
                fontWeight: 'bold', 
                letterSpacing: '3px',
                padding: '4px 12px',
                background: '#ffffff',
                border: '1px dashed #ca8a04',
                borderRadius: 'var(--radius-sm)'
              }}
            >
              {currentOrder.otpCode}
            </div>
          </div>
        </div>
      )}

      {/* Timeline UI */}
      <OrderTimeline order={currentOrder} />

      {/* Order Items Summary */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Package size={16} color="var(--color-primary)" />
            <h4 className="font-bold text-sm">Package Contents</h4>
          </div>
          <span className="text-xs text-muted">{currentOrder.items.length} product(s)</span>
        </div>

        <div className="flex flex-col gap-2">
          {currentOrder.items.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center text-xs py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <span className="font-semibold">{item.name} ({item.strength})</span>
                <span className="text-muted block">{item.packSize} • Qty: {item.quantity}</span>
              </div>
              <span className="font-bold">₹{item.price * item.quantity}</span>
            </div>
          ))}

          <div className="flex justify-between items-center pt-2 font-bold text-sm">
            <span>Total Payable:</span>
            <span className="text-primary">₹{currentOrder.totalAmount} ({currentOrder.paymentMethod})</span>
          </div>
        </div>
      </div>

      {/* Delivery Destination */}
      <div className="card mb-4">
        <div className="flex items-center gap-2 mb-2">
          <MapPin size={16} color="var(--color-primary)" />
          <h4 className="font-bold text-sm">Delivery Address</h4>
        </div>
        <p className="text-xs text-secondary leading-relaxed">
          {currentOrder.customerName}<br />
          {currentOrder.deliveryAddress.landmark}, {currentOrder.deliveryAddress.village}<br />
          Taluka {currentOrder.deliveryAddress.taluka}, District {currentOrder.deliveryAddress.district} - {currentOrder.deliveryAddress.pincode}<br />
          Contact: <strong>{currentOrder.customerPhone}</strong>
        </p>

        {currentOrder.assignedDeliveryBoyName && (
          <div className="mt-3 pt-2 border-t flex justify-between items-center" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <span className="text-xs text-muted block">Assigned Rider</span>
              <span className="text-xs font-semibold">{currentOrder.assignedDeliveryBoyName}</span>
            </div>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => alert(`Calling rider ${currentOrder.assignedDeliveryBoyName} (${currentOrder.assignedDeliveryBoyPhone || '+91 97654 32109'})...`)}
              style={{ fontSize: '11px', padding: '4px 8px' }}
            >
              <Phone size={12} />
              <span>Call Rider</span>
            </button>
          </div>
        )}
      </div>

      <div className="flex items-center justify-center gap-1 text-xs text-muted mb-4">
        <ShieldCheck size={14} color="var(--color-primary)" />
        <span>Sealed tamper-evident package dispensed by licensed pharmacist.</span>
      </div>
    </div>
  );
};
