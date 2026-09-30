import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Badge } from '../../components/common/Badge';
import { OtpConfirmModal } from '../../components/delivery/OtpConfirmModal';
import { 
  ArrowLeft, 
  Phone, 
  MapPin, 
  Navigation, 
  PackageCheck, 
  ShieldCheck, 
  KeyRound, 
  CheckCircle2, 
  Clock,
  AlertTriangle 
} from 'lucide-react';

export const DeliveryDetailsPage: React.FC = () => {
  const { 
    orders, 
    selectedOrderId, 
    setDeliveryView, 
    confirmPickup, 
    confirmDelivery, 
    updateOrderStatus 
  } = useApp();

  const [showOtpModal, setShowOtpModal] = useState(false);
  const [successBanner, setSuccessBanner] = useState<string | null>(null);

  const order = orders.find(o => o.id === selectedOrderId) || orders[0];

  if (!order) {
    return (
      <div className="card p-4 text-center">
        <p className="text-muted text-sm">No delivery order selected.</p>
        <button
          type="button"
          className="btn btn-primary btn-sm mt-2"
          onClick={() => setDeliveryView('dashboard')}
        >
          Return to Queue
        </button>
      </div>
    );
  }

  const isDelivered = order.status === 'DELIVERED';
  const isOutForDelivery = order.status === 'OUT_FOR_DELIVERY';
  const isAssigned = order.status === 'ASSIGNED' || order.status === 'READY_FOR_DELIVERY';

  const handlePickup = () => {
    confirmPickup(order.id);
    setSuccessBanner('Package picked up from Pharmacy Hub counter! Status updated to OUT FOR DELIVERY.');
    setTimeout(() => setSuccessBanner(null), 3500);
  };

  return (
    <div className="delivery-details-page">
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
          <h2 className="font-bold text-xl">Stop: Order #{order.id}</h2>
          <span className="text-xs text-muted">Village Scheduled Route</span>
        </div>
      </div>

      {successBanner && (
        <div className="alert alert-success mb-3 flex items-center gap-2">
          <CheckCircle2 size={16} />
          <span>{successBanner}</span>
        </div>
      )}

      {/* Status banner */}
      <div className="card mb-4 p-3 flex justify-between items-center" style={{ background: 'var(--color-bg-subtle)' }}>
        <div>
          <span className="text-xs text-muted block">Current Delivery State</span>
          <span className="font-bold text-sm">{order.status.replace(/_/g, ' ')}</span>
        </div>
        <Badge variant={isDelivered ? 'success' : isOutForDelivery ? 'info' : 'warning'}>
          {order.status}
        </Badge>
      </div>

      {/* Customer Info & Address */}
      <div className="card mb-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-bold text-base">{order.customerName}</h3>
            <span className="text-xs text-muted">Primary Beneficiary Contact</span>
          </div>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => alert(`Simulated call to customer: ${order.customerPhone}`)}
          >
            <Phone size={14} />
            <span>Call Customer</span>
          </button>
        </div>

        <div className="p-3 rounded mt-3 border" style={{ borderColor: 'var(--color-border)', background: '#ffffff' }}>
          <div className="flex items-start gap-2 mb-1">
            <MapPin size={16} color="var(--color-primary)" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <div className="font-semibold text-xs">Destination Address:</div>
              <p className="text-xs text-secondary mt-1 leading-relaxed">
                {order.deliveryAddress.landmark}<br />
                Village: <strong>{order.deliveryAddress.village}</strong>, Taluka {order.deliveryAddress.taluka}<br />
                District: {order.deliveryAddress.district} - {order.deliveryAddress.pincode}
              </p>
            </div>
          </div>

          <div className="mt-3 pt-2 border-t flex justify-end" style={{ borderColor: 'var(--color-border)' }}>
            <button
              type="button"
              className="btn btn-secondary btn-sm"
              onClick={() => alert('Mock Navigation: Route to ' + order.deliveryAddress.village + ' via State Highway 141 (Estimated 18 mins, 9.4 km).')}
            >
              <Navigation size={14} color="var(--color-primary)" />
              <span>Open Route Navigation (Mock)</span>
            </button>
          </div>
        </div>

        {order.deliveryNotes && (
          <div className="p-2 rounded mt-3 text-xs" style={{ background: '#fefce8', border: '1px solid #fef08a' }}>
            <span className="font-semibold" style={{ color: 'var(--color-warning-text)' }}>Delivery Note: </span>
            <span>{order.deliveryNotes}</span>
          </div>
        )}
      </div>

      {/* Package & Handover Specs (No Medical Details) */}
      <div className="card mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <PackageCheck size={16} color="var(--color-primary)" />
            <h4 className="font-bold text-sm">Package & Handover Details</h4>
          </div>
          <span className="badge badge-info" style={{ fontSize: '10px' }}>Tamper-Evident</span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-xs p-2 rounded mb-3" style={{ background: 'var(--color-bg-subtle)' }}>
          <div>
            <span className="text-muted block">Bag Barcode Seal</span>
            <span className="font-bold text-primary">{order.tamperBagNumber || 'SEAL-4491-KRG'}</span>
          </div>
          <div>
            <span className="text-muted block">Package Count</span>
            <span className="font-semibold">1 Sealed Box</span>
          </div>
          <div>
            <span className="text-muted block">Payment Method</span>
            <span className="font-semibold">{order.paymentMethod}</span>
          </div>
          <div>
            <span className="text-muted block">Payment Collection</span>
            <span className="font-bold" style={{ color: order.paymentMethod === 'COD' ? 'var(--color-warning-text)' : 'var(--color-success)' }}>
              {order.paymentMethod === 'COD' ? `COLLECT ₹${order.totalAmount}` : 'ALREADY PAID (₹0)'}
            </span>
          </div>
        </div>

        <div className="text-xs text-muted flex items-center gap-1">
          <ShieldCheck size={13} color="var(--color-primary)" />
          <span>Notice: Hand over only if tamper barcode seal is intact and matching.</span>
        </div>
      </div>

      {/* Action Buttons based on status */}
      <div className="mb-6 flex flex-col gap-2">
        {isAssigned && (
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={handlePickup}
          >
            <PackageCheck size={16} />
            <span>Confirm Pickup from Pharmacy Hub</span>
          </button>
        )}

        {isOutForDelivery && (
          <button
            type="button"
            className="btn btn-primary btn-block"
            onClick={() => setShowOtpModal(true)}
            style={{ background: 'var(--color-primary)' }}
          >
            <KeyRound size={16} />
            <span>Confirm Delivery with OTP & Handover</span>
          </button>
        )}

        {isDelivered && (
          <div className="alert alert-success text-center flex flex-col items-center gap-1">
            <CheckCircle2 size={24} />
            <span className="font-bold text-sm">Successfully Delivered to Customer</span>
            <span className="text-xs">OTP verified and cash recorded.</span>
          </div>
        )}

        <button
          type="button"
          className="btn btn-secondary btn-block"
          onClick={() => setDeliveryView('dashboard')}
        >
          Back to Route Dashboard
        </button>
      </div>

      <OtpConfirmModal
        order={order}
        isOpen={showOtpModal}
        onClose={() => setShowOtpModal(false)}
        onSuccess={() => {
          setShowOtpModal(false);
          setSuccessBanner('Delivery completed and recorded successfully!');
          setTimeout(() => setSuccessBanner(null), 3000);
        }}
        confirmDelivery={confirmDelivery}
      />
    </div>
  );
};
